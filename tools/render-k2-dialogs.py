"""Render the K2108 dialog catalogue from a staged Sanketa K2 UI folder."""

import argparse
import hashlib
import json
import math
import re
from collections import defaultdict
from functools import lru_cache
from io import BytesIO
from pathlib import Path
from runpy import run_path

from PIL import Image, ImageChops, ImageDraw, ImageFont


SOURCES = {
    "main": ("MainUIInfo.K2.sys", ("MAINUI.HPK",)),
    "intro": ("IntroUIInfo.K2.sys", (
        "INTROUI.hpk", "IntroUIetc.hpk", "IntroUIChar.hpk",
        *(f"IntroUIBack{i}{size}.hpk" for i in range(3) for size in ("", "_800")),
    )),
    "load": ("LoadingUI.K2.sys", ("etc.hpk",)),
}
FRAME_CORNERS = {"rect_left_bot.bmp", "rect_right_bot.bmp", "rect_right_top.bmp"}
KEYED_TGAS = {"quickbar_h.tga", "quickbar_v.tga"}
FULL_ART = FRAME_CORNERS | {"status_text4.bmp", "btn_cancel_n.tga",
                            "btn_prev_n.bmp", "btn_next_n.bmp"}
# Illustrative runtime states. The Naga uses the level and Chakra allocation
# from native_equipment_stats_probe::starter. Portal 101 links to 121 in
# Portal.tsv, whose zone is Shambala (native_portal_travel_probe).
EXAMPLE_VALUES = {
    1001: ("Sample Naga", "1", "Naga", "—", "—", "0", "—", "—", "—",
           "1000", "1000", "—", "—", "—", "—", "0",
           "12", "12", "10", "9", "", "", "", "", "0", "0", "0", "0", "0"),
    1008: ("0",),
    1011: ("0", "0", "Trade partner", "You"),
    1093: ("Mandara",),
    1096: ("Hairstyle 1", "Face 1", "—", "0"),
}
NAMES = {
    "MAINCHECKBUTTON": "Main menu", "캐릭터정보": "Character information",
    "포탈": "Portal", "HP&PR": "Player vitals", "몬스터HP": "Monster health",
    "INVEN": "Inventory", "ITEMREFINE": "Item refinement", "물품보관": "Storage",
    "무기상인": "Weapon merchant", "트레이드": "Trade", "NPCDIALOG": "NPC dialog",
    "파티타이틀": "Party title", "파티미니": "Compact party", "ITEM정보": "Item details",
    "미니맵": "Minimap", "공지사항": "Notice", "채팅1": "Chat 1", "채팅2": "Chat 2",
    "루피아언패킹": "Rupiah unpacking", "초보자가이드축소": "Beginner guide (collapsed)",
    "초보자가이드확대": "Beginner guide (expanded)", "QUEST_NOVICE": "Beginner quests",
    "QUEST_SCINARIO": "Story quests", "QUEST_REQUEST": "Request quests",
    "방어구상인": "Armor merchant", "악세사리상인": "Accessory merchant",
    "캐릭터선택": "Character selection", "분해": "Dismantle", "주소록": "Address book",
    "GUILDMEMBER": "Guild members", "자막표시시스템": "Subtitles",
    "엠블럼제작": "Emblem editor", "지역표시": "Region display", "ITEM갯수": "Item quantity",
    "길드이름입력": "Guild name entry", "서브체크버튼": "Secondary menu", "맵": "World map",
    "MYSKILL": "My skills", "NEWSKILL": "Learn skills", "PRIVATE_SHOP": "Private shop",
    "PRIVATE_SHOP_BUY": "Buy from private shop", "ZONEMOVEPORTAL": "Zone portal",
    "타이머": "Timer", "개인상점안내": "Private shop notice", "아이템구매내역": "Purchase history",
    "종합미용실": "Beauty salon", "엠블럼브라흐마": "Brahma emblem",
    "엠블럼비슈느": "Vishnu emblem", "엠블럼시바": "Shiva emblem",
    "NOTIFY": "Notice", "NOTIFY_800": "Notice (800 × 600)", "START": "Start",
    "START_800": "Start (800 × 600)", "LOGIN_800": "Login (800 × 600)",
    "SERVERSELECT": "Server selection", "SERVERSELECT_800": "Server selection (800 × 600)",
    "버튼다이알로그": "Button dialog", "NEWCHAR": "Character creation",
    "CHARINFO": "Character information", "CREDITNUMBER": "Credit number",
    "MANDARA_SERVER": "Mandara server", "RECONFIRM": "Reconfirmation",
}


def title_for(name, dialog_id, group):
    if group == "load":
        return "Loading (" + ("1024 × 768" if dialog_id == 100 else "800 × 600") + ")"
    tutorial = re.fullmatch(r"TUTORIAL_QUEST(\d+)", name)
    if tutorial:
        return f"Tutorial quest {tutorial[1]}"
    quickbar = re.fullmatch(r"퀵SKILL창_(가로|세로)(\d*)", name)
    if quickbar:
        direction = "Horizontal" if quickbar[1] == "가로" else "Vertical"
        return f"{direction} quickbar {quickbar[2] or '1'}"
    return NAMES.get(name, name.replace("_", " ").title())


def sys_text(path):
    return "\n".join(line.split("//", 1)[0].strip()
                     for line in path.read_text(encoding="cp949").splitlines())


def dialog_sources(path):
    text = sys_text(path).split("[DIALOG]", 1)[1]
    pattern = r"^([^,\n]+?)\s+(\d+),[^\n]*\nSTYLE[^\n]*\n(.*?)^END\s*$"
    dialogs = [(int(i), name, block.splitlines()) for name, i, block in
               re.findall(pattern, text, flags=re.M | re.S)]
    if len(dialogs) != int(text.lstrip().splitlines()[0]):
        raise ValueError(f"Incomplete dialog inventory in {path}")
    return dialogs


def button_captions(path):
    section = sys_text(path).split("[PUSHBUTTON]", 1)[1].split("[TIMER]", 1)[0]
    captions = {}
    for index, normal, sprite in re.findall(
            r"^(\d+)\s+[^\n]+\nNORMAL,1,([^\n]+)\n([^\n]+)", section, re.M):
        label, _, horizontal, vertical, *color = (field.strip() for field in normal.split(","))
        if label:
            captions[int(index)] = (label, horizontal, vertical, tuple(map(int, color[:4])),
                                    tuple(map(float, sprite.split(",")[1:5])))
    return captions


def authored_controls(lines):
    """Include normal radio/check sprites and literal text absent from Layout.tsv."""
    sprites, labels = [], []
    for at, line in enumerate(lines):
        section = re.match(r"^(RADIOGROUP|CHECKBOX|SLIDEBAR|TEXT)\s+(\d+),", line)
        if not section:
            continue
        kind, count = section[1], int(section[2])
        at += 1
        if kind in ("RADIOGROUP", "CHECKBOX"):
            for _ in range(count):
                checks = 1
                if kind == "RADIOGROUP":
                    checks = int(lines[at].split(",")[0])
                    at += 1
                for _ in range(checks):
                    for state in ("NORMAL", "OVER", "DOWN"):
                        fields = lines[at].split(",")
                        if fields[0].strip() != state:
                            raise ValueError(f"Unexpected K2 button state {lines[at]}")
                        images = int(fields[1])
                        at += 1
                        if state == "NORMAL":
                            sprites.extend(line.split(",")[:5] for line in lines[at:at + images])
                        at += images
        elif kind == "SLIDEBAR":
            for line in lines[at:at + count]:
                row = line.split(",")
                # Bitmap, start X/Y, end X/Y, and bitmap scale.
                sprites.append(row[1:4] + row[6:8])
        else:
            for line in lines[at:at + count]:
                row = line.split(",", 8)
                if row[0].strip() == "0" and len(row) == 9:
                    text = row[8].rstrip(" ,\t")
                    if text.strip():
                        labels.append((int(row[1]), int(row[2]), tuple(map(int, row[3:7])), text))
    return sprites, labels


def edit_fields(lines):
    for at, line in enumerate(lines):
        section = re.match(r"^EDITBOX\s+(\d+),", line)
        if section:
            return [[field.strip() for field in row.split(",")]
                    for row in lines[at + 1:at + 1 + int(section[1])]]
    return []


def dialog_placements(group, rows, lines):
    if group != "main":
        return rows
    titles, body = set(), set()
    for at, line in enumerate(lines):
        section = re.match(r"^(TITLEBAR|BITMAP)\s+(\d+),", line)
        if not section:
            continue
        is_title = section[1] == "TITLEBAR"
        offset = 1 if is_title else 0
        for row in lines[at + 1:at + 1 + int(section[2])]:
            fields = tuple(field.strip() for field in row.split(",")[offset:offset + 5])
            if fields[0].isdigit() and int(fields[1]) > 10 and int(fields[2]) < 16:
                (titles if is_title else body).add(fields)
    # The body sometimes supplies a different position for the title
    # graphic. Drop that earlier title layer only, preserving repeated
    # body sprites such as quickbar cells and timer digits.
    positions = {(fields[0], fields[2]) for fields in body}
    alternate = {fields for fields in titles if (fields[0], fields[2]) in positions}
    result = []
    for kind, fields in rows:
        placement = tuple(fields)
        if kind == "I" and placement in alternate:
            alternate.remove(placement)
        else:
            result.append((kind, fields))
    return result


def bottom_rail(group, rows, bitmaps, corner_size):
    """Continue the outer frame rail to the matching right corner."""
    pieces = [(tuple(fields), bitmaps[group, int(fields[0])])
              for kind, fields in rows if kind == "I"]
    left = next((fields for fields, b in pieces if b[0].lower() == "rect_left_bot.bmp"), None)
    right = next((fields for fields, b in pieces if b[0].lower() == "rect_right_bot.bmp"), None)
    if not left or not right or left[2] != right[2]:
        return {}
    corner_width, corner_height = corner_size
    rails = [(fields, width) for fields, (file, width, height, _, _) in pieces
             if file.lower().startswith("widthline_") and fields[3:5] == ("1", "1")
             and int(fields[2]) + height == int(right[2]) + corner_height]
    if not rails:
        return {}
    end = int(right[1]) + corner_width
    rail, width = max(rails, key=lambda pair: int(pair[0][1]) + pair[1])
    required = end - int(rail[1])
    return {rail: required} if required > width else {}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("k2", type=Path)
    parser.add_argument("output", type=Path)
    parser.add_argument("--hpk-reader", type=Path, required=True)
    parser.add_argument("--font", type=Path, required=True)
    args = parser.parse_args()
    read_hpk = run_path(str(args.hpk_reader))["entries"]
    ui, output = args.k2, args.output
    media = output / "media"
    media.mkdir(parents=True, exist_ok=True)

    bitmaps, buttons, placements = {}, {}, defaultdict(list)
    index_ids = set()
    header, *rows = (ui / "Layout.tsv").read_text(encoding="utf-8").splitlines()
    if header != "K2UI\t1":
        raise ValueError("Unsupported K2 layout index")
    for line in rows:
        kind, group, identifier, *fields = line.split("\t")
        key = group, int(identifier)
        if kind == "D":
            index_ids.add(key)
        elif kind == "B":
            bitmaps[key] = (fields[7], int(fields[1]), int(fields[2]),
                            tuple(map(int, fields[3:7])), fields[8] == "1")
        elif kind == "P":
            buttons[key] = int(fields[1])
        elif kind in ("I", "C", "S"):
            placements[key].append((kind, fields))

    font = ImageFont.truetype(str(args.font), 11)
    catalogue, seen, missing = [], set(), {}
    consumed_files = {"Layout.tsv"}
    for group, (source, archives) in SOURCES.items():
        captions = button_captions(ui / source)
        originals = {}
        for archive in archives:
            _, entries = read_hpk(ui / archive)
            for name, contents in entries:
                originals.setdefault(name.decode("cp949").casefold(), contents)
        consumed_files.update((source, *archives))

        @lru_cache(maxsize=256)
        def image_for(name, width=0, height=0):
            data = originals[name.casefold()]
            with Image.open(BytesIO(data)) as original:
                image = original.convert("RGBA")
            if data.startswith(b"BM") or name.casefold() in KEYED_TGAS:
                red, green, blue, alpha = image.split()
                transparent = ImageChops.multiply(red.point(lambda v: 255 if v == 0 else 0),
                                                  green.point(lambda v: 255 if v == 0 else 0))
                transparent = ImageChops.multiply(transparent, blue.point(lambda v: 255 if v == 240 else 0))
                image.putalpha(ImageChops.multiply(alpha, ImageChops.invert(transparent)))
            # K2 files can be power-of-two textures. Sample the registered
            # top-left region before applying the placement's display scale.
            # An axis declared larger than the file has no padding to crop.
            if name.casefold() in FULL_ART:
                # The registered sizes disagree with the visible artwork.
                # Keep the full native pixels at the authored anchor.
                _, _, right, bottom = image.getbbox()
                return image.crop((0, 0, right, bottom))
            crop = (0, 0, min(width or image.width, image.width),
                    min(height or image.height, image.height))
            return image if crop[2:] == image.size else image.crop(crop)

        for number, name, lines in dialog_sources(ui / source):
            identity = group, number
            if identity in seen:
                raise ValueError(f"Duplicate K2 dialog {identity}")
            seen.add(identity)
            entry = {"id": f"k2-{group}-{number}", "group": group, "number": number,
                     "name": name, "title": title_for(name, number, group), "source": source}
            catalogue.append(entry)
            layers, unresolved = [], set()
            labels = []

            def label_in(value, x, y, w, h, horizontal, vertical, color):
                if not value:
                    return
                left, top, right, bottom = font.getbbox(value)
                width, height = right - left, bottom - top
                if horizontal == "EN_CENTER":
                    x += (w - width) // 2
                if vertical == "EN_CENTER":
                    y += (h - height) // 2
                elif vertical == "EN_BOTTOM":
                    y += h - height
                labels.append((x - left, y - top, color, value))

            def place(kind, fields, rail_width=0):
                index, x, y, w, h = (float(value) for value in fields)
                index = int(index)
                control = index
                caption = None
                if kind == "C":
                    caption = captions.get(index)
                    index = buttons[group, index]
                    if caption:
                        dx, dy, w, h = caption[4]
                        x += dx
                        y += dy
                if index < 0:
                    return
                bitmap = bitmaps.get((group, index))
                if not bitmap:
                    unresolved.add(f"bitmap {index}")
                    return
                file, width, height, rgba, solid = bitmap
                if rgba[3] == 0 and not caption:
                    return
                if not solid and file.casefold() not in originals:
                    unresolved.add(file)
                    return
                source_width = rail_width or width
                image = Image.new("RGBA", (1, 1), rgba) if solid else image_for(file, source_width, height)
                if file.casefold() in FULL_ART or (identity == ("main", 1092) and index in (816, 817)):
                    width, height = image.size
                width, height = rail_width or width or image.width, height or image.height
                if kind != "C" or caption:
                    width, height = max(1, math.floor(width * w + .5)), max(1, math.floor(height * h + .5))
                if kind == "C" and identity == ("main", 1096) and control == 113:
                    # HTStatus creates this control at 64 × 19. The K2 SYS
                    # reuses the wide caption sprite next to the wallet fields.
                    width, height = 64, 19
                if caption:
                    label, horizontal, vertical, color, _ = caption
                    label_in(label, int(x), int(y), width, height, horizontal, vertical, color)
                if rgba[3] == 0:
                    return
                if width > 2048 or height > 2048:
                    raise ValueError(f"Oversized K2 placement in {entry['id']}: {width} × {height}")
                if not solid and rgba != (255, 255, 255, 255):
                    image = ImageChops.multiply(image, Image.new("RGBA", image.size, rgba))
                if image.size != (width, height):
                    image = image.resize((width, height), Image.Resampling.BILINEAR)
                if image.getbbox():
                    layers.append((image, int(x), int(y)))

            if group == "load":
                layers.append((image_for("LOAD_TYPE4.bmp" if number == 100 else "LOAD_TYPE1.bmp"), 0, 0))
            rows = dialog_placements(group, placements[identity], lines)
            rails = bottom_rail(group, rows, bitmaps, image_for("RECT_RIGHT_BOT.BMP").size) if group == "main" else {}
            for kind, fields in rows:
                # The refinery indicator is a running-action progress sprite.
                # The static gallery opens on the idle control state.
                if identity == ("main", 1008) and kind == "I" and fields[0] == "340":
                    continue
                place(kind, fields, rails.get(tuple(fields), 0))
            controls, static_labels = authored_controls(lines)
            for fields in controls:
                place("I", fields)
            if group == "main" and number in EXAMPLE_VALUES:
                entry["example"] = True
                for field, value in zip(edit_fields(lines), EXAMPLE_VALUES[number], strict=True):
                    bitmap_id, x, y, width, height = map(int, field[:5])
                    place("I", (bitmap_id, x, y, width, height))
                    color = tuple(map(int, field[10:14]))
                    label_in(value, x, y, width, height, field[7], field[8], color)
                if number == 1093:
                    # First normal radio row in this dialog.
                    _, x, y, width, height = map(int, controls[0])
                    label_in("Shambala · Portal 121", x, y, width, height,
                             "EN_CENTER", "EN_CENTER", (221, 205, 163, 255))
            trade_amounts = []
            if identity == ("main", 1011):
                trade_amounts = [int(fields[1]) for kind, fields in rows
                                 if kind == "I" and fields[0] == "6"]
            for x, y, color, text in [*static_labels, *labels]:
                left, top, right, bottom = font.getbbox(text)
                if right > left and bottom > top:
                    if trade_amounts and text == "RUPIAH":
                        # Keep the gallery font clear of the adjacent authored amount box.
                        x = min(x, min((amount - right - 2 for amount in trade_amounts if amount > x),
                                       default=x))
                    image = Image.new("RGBA", (right - left, bottom - top))
                    ImageDraw.Draw(image).text((-left, -top), text, font=font,
                                               fill=tuple(max(0, min(255, c)) for c in color))
                    layers.append((image, x + left, y + top))
            if unresolved:
                missing[entry["id"]] = sorted(unresolved)
                entry["missing"] = len(unresolved)
            if not layers:
                entry["status"] = "reserved" if name == "RESERVED" else "runtime"
                continue
            left = min(x for _, x, _ in layers)
            top = min(y for _, _, y in layers)
            right = max(x + image.width for image, x, _ in layers)
            bottom = max(y + image.height for image, _, y in layers)
            if group == "load":
                left, top = 0, 0
                right, bottom = (1024, 768) if number == 100 else (800, 600)
            canvas = Image.new("RGBA", (right - left, bottom - top),
                               (0, 0, 0, 255) if group == "load" else (0, 0, 0, 0))
            for image, x, y in layers:
                canvas.alpha_composite(image, (x - left, y - top))
            canvas = canvas.crop(canvas.getbbox())
            canvas.save(media / f"{entry['id']}.webp", lossless=True, method=4)
            entry.update(width=canvas.width, height=canvas.height, status="art")
        image_for.cache_clear()
    if seen != index_ids:
        raise ValueError("Authored SYS inventory and native Layout.tsv disagree")
    report = {"dialogs": catalogue, "unresolved": missing,
              "sourceHashes": {name: hashlib.sha256((ui / name).read_bytes()).hexdigest()
                               for name in sorted(consumed_files)}}
    (output / "K2-DIALOGS.json").write_text(json.dumps(report, indent=2) + "\n", encoding="utf-8")
    print(f"{len(catalogue)} dialogs, {sum(d['status'] == 'art' for d in catalogue)} with art, "
          f"{len(missing)} with unresolved artwork references")


if __name__ == "__main__":
    main()
