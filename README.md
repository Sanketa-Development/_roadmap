# Sanketa roadmap

Website: https://sanketa-development.github.io/_roadmap/

Sanketa is the only project shown. The site has Overview, Tasks, Skills, Items, Quests, Worlds & scope,
and Updates, with a responsive red, bronze and gold design using the supplied
`bg0.jpg` and `site-background.jpg` Tantra artwork.

Overall and phase percentages show checked top-level tasks divided by total
top-level tasks, rounded to whole percentages. Counts remain visible; acceptance
gates and nested tasks stay separate. This is checklist progress, not a weighted
overall game-completion score.

The roadmap and its source documents are AES-256-GCM encrypted before publication.
PBKDF2-SHA-256 derives the key from the visitor's password with a random salt and
600000 iterations. The public repository contains no plaintext password or
separate password verifier. Decryption happens in the browser over HTTPS.

**Remember password** is optional and off by default. When enabled, it saves the
successful password in that browser's local storage and prefills the masked field
on return. It never unlocks automatically. Turning it off removes the saved value.
Use it only on a device you trust.

GitHub Pages is static hosting, so this is encrypted shared-password access rather
than server authentication. Password strength still matters. Older roadmap
snapshots were public and remain in Git history; this change does not revoke them.

## Update and publish

Editable content and source snapshots belong to private `_docs/roadmap` in the
main workspace. Refresh there, then run from this repository:

```powershell
node tools/seal-roadmap.mjs
```

Enter the agreed password at the hidden prompt. A custom private source JSON path
can be supplied as the first argument. Do not put passwords in files or arguments.
Only `assets/roadmap.enc.json` is written. Do not add plaintext source snapshots to
this public repository.

Run `node tools/check-roadmap.cjs` and `node tools/check-rendered-content.cjs` with
the password supplied at their hidden prompts. Push `main` to deploy through the
existing GitHub Actions Pages workflow. Only `index.html` and `assets/` deploy.
No npm packages, server, external scripts, or Jekyll build are required.

## Skills

Skills lists the current player catalog by Asura-Rakshasa, Naga-Kimnara,
Yaksha-Gandharva and Deva-Garuda. Each read-only checkbox sits beside its ID,
English name, description, tribe restrictions, rank/level, costs, timing and
prerequisites. Each skill has separate Weapon Type Based Animations Implemented
and FX Implemented checks: pending entries are red, completed entries green.
The main check requires implemented mechanics and both required visual components.
Passives with no native cast action show Not required and do not block completion.
Unconfirmed coverage stays open. Catalog content and status notes
remain encrypted; author them only in private `_docs/roadmap`.

Original skill icons sit to the left of each entry, preferring K2, then K3,
then Global when unavailable in earlier versions. Images are embedded in the
encrypted skill catalog and appear only after unlocking.

Completed skill names and checkboxes are green. The Skills status controls show
All, Done, or Not done; Not done includes partial and unconfirmed records.

## Items

Items appears directly below Skills. Main tabs include Weapons, Defense,
Accessories, Consumables, Premium and Pets. Each tab shows its complete list in
ascending item-ID order. Toggle one or more subtypes/equipment slots, handedness
and tribes above the list, or search by name/exact ID. Choices within each filter
match any selected value; filters combine to narrow the results. Unrestricted
items match every tribe. Reset filters restores the complete active tab.
Each entry shows its ID, Philippine name and available requirements/stack/base-price
information. Unknown categories stay under Other. The catalog remains encrypted.

## Quests

Quests appears directly below Items, with Tutorial Quests first and Beginner's
Quests second. Categories are tabs derived from `zone/Quest.cpp::E_QUEST_LEVEL`:
Scenario I (11–20), Scenario II (21–30), Scenario III (51–55), first/second class
changes, Jina, Exile and Bukdu. The initial tutorial flag is
0; eTutorialA–E (1–5) use the journal's BEGINNERS QUEST label. Later Global journal
entries with no matching category in this original revision remain separately
labeled Additional Global Quests. Scroll quests have their own tab. Generic NPC
task/exchange rows and independent reset services are excluded. Each entry shows its ID, name,
available native details and a read-only implementation checkbox. Checked entries
and names are green. Unchecked entries are not implemented or unconfirmed;
implementation status is separate from player progress and journey testing.
Click a quest to expand its numbered steps. Story descriptions come from the
native journal history; scroll descriptions come from each stage's authored
UI script. Reward messages remain in sequence. Native `>>` separators become
line breaks, and dynamic counters display `[count]` instead of an invented value.

Private `_docs/roadmap/build-quests.py` reads the native journal/messages,
scroll stages and current native quest identities. Scroll stage rows are
grouped by their quest number. `_docs/roadmap/quests-status.json` holds status
notes and per-quest overrides, keyed as `story:<ID>` or `scroll:<ID>`.
Refresh with `python -X utf8 _docs/roadmap/build-quests.py` from the workspace root,
then seal the payload. Keep all catalog data and status authoring private.
The existing rendered-content check supports `--quests` for this section only.
