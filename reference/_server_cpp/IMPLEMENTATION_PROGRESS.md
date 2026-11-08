## Source cleanup and publication checkpoint - 8 November 2026

Current client delivery includes isolated K2/K3, four rendering APIs, native-pose
batching/culling, corrected intro/offline paths and the administrator monster
spawn/browser tools. Current zone worker includes the owned generation-safe
spawner. Patch1794128886 is staged/published. Reuse the recorded focused Release
checks; this documentation cleanup does not require gameplay rebuilds/retesting.

Full original parity is not complete. The [current backlog](../_roadmap/reference/bgfx/docs/PARITY_BACKLOG.md)
separates missing implementation, partial coverage, unverified scenarios and
release gates. Cleanup archived 37 obsolete/private local files outside the
checkout; kept native assets/HPKs, workbooks, profiles and current build evidence.

## Zone listener ports - 8 November 2026

Zone game ports now use13000 + zone ID, with loopback administration23000 +
zone ID. The existing extra channel uses40000/40001; future channel allocation
starts at40000. Login/shared-service ports remain unchanged. Both server roots,
Data Tools/import defaults, signed client profile20 and the LAN firewall
are updated. One configured Zone01 startup/TLS check passed alongside the original
server on3001; no account operations were performed. Client patch1794112559 is live.

## Item offerings, Quest28 and configurable rules - 7 November 2026

- [x] Native offering values and atomic inventory/equipment/cargo/payment receipts.
- [x] Complete native Quest28 exchange chain, exact rewards and partial/final saving.
- [x] Server vending zone/level admission and Kruma item/function policies.
- [x] Focused Release authority and one changed SDL offering flow accepted;
  matching binaries and patch1794065181 staged. Normal workers remain unchanged.

See [delivery and limitations](../_remake_bgfx/PROGRESS.md) and
[focused evidence](../_remake_bgfx/docs/evidence/offerings-quest28-policy-20261107.json).

## Normal Chaturanga contribution and Nara27 - 7 November 2026

- [x] Native Rupiah contribution, god-owned2946 spawning, ten32-second gate ticks,
  replay rejection and expiry. Normal two-client offering/portal UI entry passes.
- [x] Nara27 original exchange/rewards and partial/final saved return; preserve28
  for later. Materials and prerequisites are seeded in QA; no balance claim.
- [x] Stage matching Release Zone/Service; normal workers/data remain unchanged.

See [BGFX delivery and limitations](../_remake_bgfx/PROGRESS.md) and
[focused evidence](../_remake_bgfx/docs/evidence/normal-z11-frosana-nara27-20261107.json).

## Focused Taras, audio and Chaturanga goal - 7 November 2026

- [x] Taras3121: K3 READY/ACTIVATE animation, ten rank bindings and three FX
  bands, Wing-marker attachment, persistent loop and equipment/removal/death/
  expiry cleanup. Prefer K3 PFX_MSP over Global PFX_MSP2. The native self buff
  does not use projectiles or weapon attack trails.
- [x] Restore one owner-bound looping TFX sound after miniaudio reset. Retain
  once-only cues. The focused real backend check passes reset, spatial/mute
  preservation, duplicate prevention and stop using an original packed sample.
- [x] Z11 native startup, king-room controls, trap cell dispatch and saved return.
  Add original2946 portal picking and god-specific177 routes with live server
  approval. Enabled online profiles control formerly closed11/20 travel; retain
  the original Z11 logout return to the saved zone and offline defaults.

Release client and zone server are staged; Z11 is enabled for the next server
start. Signed client patch1794044192 is published. Reuse passed startup/trap
assertions and rerun only the failed route after its admission correction.
No normal workers restarted or normal player data changed. Original war/event
rules own entrance-gate creation; the check supplies a private original Siva gate.
Z11 assets load with two recorded missing source textures: c2_jina6_TGA.dds and
c1_jina6_TGA.dds. No new full-scene/two-client Z11 graphical journey is claimed.
See [focused evidence](../_remake_bgfx/docs/evidence/focused-taras-audio-chaturanga-20261107.json).

## Focused goal - 7 November 2026

- [x] Finish the pending NPC-handler batch: native20100/20101 counts,2200 clan
  effects and generic1170 immunity. Correct the check's packet offset and event
  proceed type; focused World check passes. Stage matching binaries in both
  server roots. No normal workers restarted or player records changed.
- [x] Finish Quest26 online: original NPC dialogue, inventory-based7119 objective
  tracking, exact Prana/Rupiah/item feedback and saved progress. Reuse the earlier
  earned kill/drop authority result. Connected HUD checks use seeded materials
  and private map relocations; no fresh balance or full3D travel claim.

Both focused goal items are complete. Client signed patch1794039246 is staged.
See [focused evidence](../_remake_bgfx/docs/evidence/focused-npc-quest26-20261107.json).
The older broad expansion remains open.

NPC batch evidence: [native-npc-encounters-20261107.json](../_remake_bgfx/docs/evidence/native-npc-encounters-20261107.json).

## 7 November 2026: native arena dispatch

Correct original actions20180/20190 to open/close the3540-cell duel field;
only20310 checks the winner through original event159. The focused private
World check accepts field changes, no premature result and exact saved return.
One Release production batch, one test-only fixture correction; no client build
or repeated graphical journey. Stage matching apps in both server roots.
Zone16 stays disabled and broader arena/stronghold acceptance remains open.
See [evidence](../_remake_bgfx/docs/evidence/native-arena-dispatch-20261107.json).

## 7 November 2026: connected familiars and combat feedback

Accept one isolated two-client session for rank1 K3 skills3115/3331/3332:
all three native familiar models attack, both clients show six READY/ACTIVATE
clips and three FX families, replacement/removal clears cast loops, and stopped
SQL matches both final native character records beyond HP/TP. No missing assets
in this session. Use ordinary QA accounts with overallocated attributes and160
private generator substitutions; keep source tables and normal data unchanged.
This accepts presentation/lifecycle, not balance, all ranks or public TLS.

Image review exposed a Reserved skill-name damage message. Match original
HTMainCharacter feedback1108/1107, retaining intentional zero-result feedback;
ignore support as damage and separate death acknowledgements from hit glyphs/FX.
Request the native monster death cue once per life. The15-check focused feedback
check passes after a probe-only include correction. Stage the Release client and
signed patch1794035849. Do not repeat the successful graphical session. Wider
combat, quests, graphics/audio and special zones remain open. See
[evidence](../_remake_bgfx/docs/evidence/live-familiar-feedback-20261107.json).

## 7 November 2026: native death shadows

Restore original monster/other-player shadow suppression at death while
keeping corpse geometry and animation visible; restore on positive HP/new life.
Retain the PC root flag through equipment/head replacement and all socket
shadows. Preserve the distinct original main-character death behavior.

The focused D3D11 component passes all eight original PC bodies/sockets,
replacement pose/clocks, revival and production monster2001 death/respawn.
Correct one frame-zero sampling assertion with a probe-only rebuild; retain its
failed attempt. One production Release batch, no Debug/server build or repeated
journey. Stage client and signed patch1794033565. Actual remote-HP rendering,
special blended Lord masks and full scene parity remain open. See [evidence](../_remake_bgfx/docs/evidence/native-death-shadows-20261107.json).

## 7 November 2026: Mandara area effects

Implement2100/2101 using original Mandara tasks54/55: living PCs, current GM
exemption, normalized half-open area, self-owned Hold2/300000ms and native status
broadcast/removal. Compile original TurnOffAffection, including its visual-bit
guard; preserve ordinary AddEffect/RemoveEffect defaults in both source copies.
One Release batch and one first-attempt focused World check cover six players,
both maximum edges, GM/dead exclusions, effect snapshots/removal and exact saved
reopening. Stage matching apps in both server roots. No client/Debug rebuild or
repeated journey. Full arena/TCP/graphical and six-part acceptance remain open.
See [evidence](../_remake_bgfx/docs/evidence/native-area-affection-20261107.json).

## 7 November 2026: native zone reward corrections

Correct reward loading to `Data/Settings.ini [Correct]`, matching original
`LoadZoneSettings`. Implement1185/1186 Prana/Gold extras, additive bonuses,
base-relative native Percent rounding, subtraction/clamping and native1180's
intentional no-op. Preserve Braman/item extras and expose current rates in
zone status; ordinary death rewards and item-rate initialization use the rates.

One focused private World check passes scheduled addition/restoration/clamping,
wrong-INI rejection, actual monster death, corrected Prana/Gold, a guaranteed
potion from the doubled base drop rate, ordinary pickups and exact saved
reopening. Preserve the selected source's existing solo-Prana customization.
All four shipping apps build in one Release batch; correct a missing verifier
include with one verifier-only rebuild. The focused check passes first attempt.
Install matching apps in both server roots. No client/Debug build or repeated
journey. Wider zones and the six-part goal remain open. See
[evidence](../_remake_bgfx/docs/evidence/native-reward-rates-20261107.json).

## 7 November 2026: native event conditions and timers

Implement1030/1080/1100/1120, preserving partial item counts without consumption,
quest-byte checks, effective player clans and source system/NPC bypass. Complete
1090 expiry/off, exact preflight error order and unsigned timing; source target0
is valid. Keep overrides process-local and expose their current state.

The focused component passes14 boundary/count cases and four private World
callbacks with actual calendar execution, expiry/off, conditional/sequential
behavior, cached replay and exact saved reopening. One verifier clock mismatch
is corrected; its failed attempt is retained. Install one production Release
batch in both roots; one verifier-only rebuild, no client/Debug build or repeated
journey. Broader Chaturanga/Nar Durga acceptance remains open. See
[evidence](../_remake_bgfx/docs/evidence/native-event-controls-20261107.json).

## 7 November 2026: native event item drops

Implement1060 with the existing authoritative loot/pickup path and original
durability, count, serial RNG, item-grid ordering, retained task relocation and
failure continuation. Record/skip absent item bindings; share lookup with
GoldBomb. Preserve guards for other unfinished native handlers.

The private World component passes five lookup cases, three same-task drops,
invalid/missing4082 continuation, atomic stacking/pickup replay and exact saved
reopening. Two verifier-mask failures remain recorded. Install one production
Release server batch in both roots; two verifier-only rebuilds, no client/Debug
build or replayed journey. Full Nar Durga/TCP/graphics and broader loot lifecycle
remain open. See
[evidence](../_remake_bgfx/docs/evidence/native-event-items-20261107.json).

## 7 November 2026: revised single quickbar

Stage one quickbar with one default row and a four-row limit. Approved keys are
1–0, F1–F10, Ctrl+1–0 and Shift+1–0. Retire the second panel/Alt activation;
preserve five pages, all50 legacy and300 previous bindings, including inactive
retired cells and an external version1 backup.

One Release batch and focused model/192-check SDL/D3D11 component pass. Publish
signed patch1794028917. The pending QA-only Karya quit fix is compiled without
replaying gameplay. Full online quickbar drag/activation/relogin and the wider
six-part expansion remain open. See
[evidence](../_remake_bgfx/docs/evidence/single-quickbar-20261107.json).

## 7 November 2026: owner revision publication and Karya13/15

Fix committed owner revision publication after native recovery/status/effects,
deduplicate identical snapshots and retain forced explicit refreshes and strict
operation guards. Install matching Release apps and signed patch1794027816.

Accept low13/high15 native menus, paid entries, rendered arrivals, scheduled
saved returns and peer visibility across preserved private runs. Four claimed
handoffs,300,000 total fees and preserved unrelated fields pass the stopped-SQL
audit. Resume only the high leg at canonical level98. Preserve both failed
wrappers: initial high fixture used75; resumed clients completed but omitted QA
quit. Fix the QA exit in source for the next scheduled build, with no rerun.

Enable native-world13/15 in both roots;14 remains disabled after its actual
no-charge/no-transfer level55 denial (menu46–61 versus minimum68). Full Karya
combat/services, offline gates and TLS acceptance remain open. Normal servers,
database and workbooks are untouched. LAN peers still require the existing
administrator firewall helper because observed rules only list3001–3005/30000.
See [evidence](../_remake_bgfx/docs/evidence/native-owner-revisions-karya-20261107.json).

## 7 November 2026: Karya clock and hidden portal carriers

Install the nonzero native runtime clock and proactive calendar initialization.
Implement original zero-mesh `HideAllMesh` semantics in BGFX while retaining
bounds, sockets and picking; skip texture0 overrides and geometry/shadows.
Release builds/staging pass; signed client patch1794026462 is published.

All three isolated connected attempts remain failed. The latest opens gate2202
and renders without the former texture abort, but waits for the destination
menu until timeout. No connected Karya travel/fees/closing-return acceptance or
normal13–15 admission. Preserve normal servers/database and retain the failures.
No further rebuild or rerun at this checkpoint. See
[evidence](../_remake_bgfx/docs/evidence/karya-connected-20261107.json).

## 7 November 2026: generic native map calendars and imports

Earlier checkpoint, 7 November: load native map calendars independently of
Karya gate actors, matching Server.cpp1234 and TNScheduler::Load. Import supplied
Data/Schedule.txt and Language.txt with the five required native files. Manager
review can complete missing optional files on a stopped matching map, under its
worker lock and source-hash checks; preserve existing files and configuration.
Restore both original files for Karya13-15 in both server roots, keeping all six
profiles disabled and their native tables unchanged.

The focused private-World component passes all3 original24-entry calendars,
exact English warning109 once across consecutive scheduler checks, and saved
reopening. Manager completion checks cover running/locked maps, preservation and
conflicting files. Correct one production hash-comparison compile error and one
verifier subscription omission; no Debug/client build or replayed journey.
Install matching Release server apps. Full Karya travel/encounter/graphical
acceptance and the six-part goal remain open. See [evidence](../_remake_bgfx/docs/evidence/native-map-calendars-20261107.json).

## 7 November 2026: original unmatched map-action behavior

Earlier checkpoint, 7 November: match original TriggerEvent fallthrough for
unmatched action IDs. Generate its112 active cases from Server.cpp/Basedef.h;
record IDs without a source handler and perform no invented action. Keep known
native actions behind their existing backend/zone guards. This supersedes the
false missing-handler block for Karya23100 and Biryu3020/3050/3060/3070/3080/3110;
it does not implement newer-version behavior or admit those maps.

One focused private-World check passes unmatched0/23100/3020, following-task
execution, recorded IDs, cached replay and exact saved reopening. Known native
DropItem1060 remains rejected before quest state changes. One Release batch and
one check, no retries, client rebuild or repeated gameplay journey. Install the
matching server binaries in both server roots. Full connected map/gameplay
acceptance remains open. See [evidence](../_remake_bgfx/docs/evidence/native-unmatched-actions-20261107.json).

## 7 November 2026: native quest-event character resets

Earlier checkpoint, 7 November: implement native quest-event reset actions1130,
1140 and1150 using the original CMOB.CPP methods. Chakra/skill resets rebuild
status; class reset preserves skills and live effects, clears promotion quests
31-35, and is a no-op before second class. Save before publishing owner/class
updates. Original Mandara tasks41-43 have no EventList links; keep that data
unchanged rather than inventing dialogue.

The focused component passes24 native cases across8 tribes and one private
quest callback with cached replay and exact saved reopening. Promoted class
reset is checked at native-status level; graphical service acceptance is open.
Install one Release production batch in both server roots; two verifier-only
corrections, no production retry, client rebuild or replayed gameplay journey.
The full goal remains open. See [evidence](../_remake_bgfx/docs/evidence/native-story-resets-20261107.json).

## 7 November 2026: native PC voices and peer death loops

Earlier checkpoint, 7 November: fix native PC combat voices and peer death loops.
Use table order NAG/YAK/ASU/DEV/KIM/GAN/RAK/GAR for attack voices, rather
than indexing directly by client tribe ID. Add peer hit/idle-owner hit voices
and once-per-life death voices, including status-only deaths and revived peers.
Nearby-player death, hit and posture clips play once; idle/movement/sitting
retain their loops. Record missing voice bindings instead of stopping gameplay.

One isolated component passes56 voice cases across all8 tribes,41 decoded
original samples through muted miniaudio, and8 authored GPU death clips reaching
their final pose once. Presentation events are injected; this is not a live
network encounter or full scene acceptance. Two original voice IDs31141/31142
are unbound and stay recorded without substitutes. One production Release
client batch and one small verifier-only correction; no server rebuild or
replayed gameplay journey. Stage the client and signed patch1794018496.
Full combat/quest/graphics/zone acceptance remains open. See [evidence](../_remake_bgfx/docs/evidence/pc-voices-death-loops-20261107.json).

## 7 November 2026: native map close-and-return

Earlier checkpoint, 7 November: implement native event-map closure20120.
Return every playing character, including GMs, then request closure for every
connection, including idle/pre-world connections. Flush queued handoff frames
before transport closure. Explicit same-map/current-channel returns pin the
existing live worker while retaining durable ownership and single-use tickets.
Preserve a validated client handoff after source-socket EOF and stop old-world
traffic while it is pending; ordinary EOF still reports connection loss.

The focused scheduled-World/private-SQL check passes remote and same-instance
secure handoff, GM return, pre-world close requests, replay rejection and saved
reopening. The separate client TCP handoff/EOF component passes. Transport
flush is compiled/source-reviewed; no production-listener/TLS or graphical
Karya journey is claimed. One production Release batch per project; one small
fixture-only correction per verifier. Stage matching client/server binaries
and signed patch1794017500, without replaying accepted journeys or rebuilding
ZIPs. Karya and the full expansion remain open. See [evidence](../_remake_bgfx/docs/evidence/native-map-close-return-20261107.json).

## 7 November 2026: native saved-zone map return

Earlier checkpoint, 7 November: connect native saved-zone return task20121.
Return non-GM players through the existing durable handoff, preserve the source
GM-clan exemption, and commit invalid-save fallback fields with a local warp.
One focused scheduled-World/private-SQL component passes remote ownership
transfer and saved reopening, GM exemption, and local fallback reopening.
Its calendar/event routing is QA; no live Biryu/Karya or graphical acceptance
is inferred. Install one Release Zone batch; no client rebuild or prior journey
replay. A malformed QA TSV append required one verifier-only correction.

The separate task20120 remains gated: its original second pass closes every
connection, including GM/pre-world connections. It is not equivalent to20121.
See [evidence](../_remake_bgfx/docs/evidence/native-map-saved-return-20261107.json).

## 7 November 2026: source inherited/count-based map summons

Earlier checkpoint, 7 November: implement native PopMonster4/6 tasks103/105.
Inherited summons retain both classes, clan, cell and native target memory;
counted summons use authored count, birth type, class/clan and lifetime. Preserve
literal class0 from the source tables. Existing callers still default to Basic
subclass; native allocation, positioning and spawn publication are reused.

- [x] Pass the focused population check: one inherited child, ten counted
  children, published subclass/initial birth flag, native target memory,
  class0/clan0,1800-second expiry timestamp, zero-count RNG, unchanged generator
  pools and retired-actor cleanup. QA subtype/birth variants are explicit.
- [x] Install one production Release Zone batch. Correct the verifier to inspect
  the initial spawn packet rather than the intentionally cleared cached birth
  flag; retain failed/diagnostic logs. Two small verifier-only rebuilds, no
  production rebuild retry, client rebuild or repeated gameplay journey.

Live Jina/arena event acceptance and the full goal remain open. See
[evidence](../_remake_bgfx/docs/evidence/native-task-summons-20261107.json).

## 7 November 2026: shared native NPC map task actions

Latest checkpoint, 7 November: connect native map Speak150, Help160, Link170
and Flee180 tasks to the existing AI speech, threat/group and escape routines.
Speech's recipient is temporary, Help/Link use native codes10/20, and Flee uses
the NPC's current target. Add source clan cleanup130 with NPC/Event exemptions.

- [x] Pass one focused original-population adapter check for150/160/170/180:
  speech RNG/filtering, unchanged combat target, group/flee control agreement and
  invalid player-caller rejection. This does not accept a live map event journey.
- [x] Build/install one Release Zone/verifier batch with no retries, client
  rebuild, completed-journey replay or redundant client patch publication.

Clan cleanup is source-reviewed/compiled; its encounter verification and the
full goal remain open. See
[evidence](../_remake_bgfx/docs/evidence/native-map-npc-tasks-20261107.json).

## 7 November 2026: native count guards and later-map recovery

Latest checkpoint, 7 November: implement original Karya soldier-count guards
20130/20140/20150. Living current-clan5/6/7 mobs stop event progression; corpses
do not. Preserve the existing native proceed-type behavior. No new wave encounter
is claimed; Global action23100 remains an unmatched source-data reference.

- [x] Replace the resurrection destination allowlist with canonical enabled
  native profiles. Retain native recovery plans, statues, grid validation,
  profile availability and durable handoff checks.
- [x] Pass one private World/SQLite recovery check on original Mudha21 and
  Ruins24: actual death, normal saved revival, money/equipment/usable inventory
  preservation and saved reopening. This is not TCP/graphical acceptance.
- [x] Install the Release Zone worker. Correct only the verifier's unsupported
  item-equality comparison after its first compile; no production rebuild retry,
  client rebuild, repeated gameplay journey or redundant client patch publishing.

The full goal remains open. See
[evidence](../_remake_bgfx/docs/evidence/karya-counts-later-recovery-20261107.json).

## 7 November 2026: native dual-wield skill weapon selection

Latest checkpoint, 7 November: dual-wield skills use the original right-hand
Item type rather than combined basic-attack row916. Apply this to online owner/
peer and offline casting, skill FX, body animation, server authored timing and
projectile binding selection. Ordinary dual attacks retain916; an empty right
hand does not force a server dual attack. Native skill/timing data is unchanged.

- [x] Match twelve male/female901/902 cases to original K3 phase/apron fields;
  decode eight TAB clips and retain unarmed behavior. Correct the probe's initial
  requirement for hit markers on ready/cast clips; retain that failed log.
- [x] Build/install the client and Zone worker in one production Release batch,
  with one additional probe-only correction. Publish patch1794013241. No repeated
  production rebuild or completed encounter replay.

This is binding/clip evidence, not a live authoritative or graphical dual-skill
encounter. The full goal remains open. See
[evidence](../_remake_bgfx/docs/evidence/dual-skill-weapon-20261107.json).

## 7 November 2026: restore original Mudha object bindings

Latest checkpoint, 7 November: restore Mudha's exact missing object bindings
from the supplied Global client's Kathana3Obj.txl. Append454 original rows while
preserving all327 existing rows byte-for-byte. Existing names/camera flags have
zero semantic conflicts; unused padding on18072 is retained.

- [x] Accept one original Zone21/portal233 D3D11 arrival component:385 models,
  503 placements,627 referenced payloads and zero skipped object definitions.
  Inspect the capture; retain two missing texture references without substitution.
- [x] Add explicit `--object-tables` imports to the existing asset-staging tool.
  Preserve current rows/conflicts, external backups and packed HPKs. No skill
  tables are eligible through this option.
- [x] Enable the prepared source/deployed Zone21 profiles for Manager startup,
  retaining the original level80 entry rule and native data. Reuse its passed
  authority startup evidence; no C++ rebuild, server start or journey replay.
- [ ] Accept live Zone21 travel, native events/services and saved reentry.

Signed patch1794012493 is published. The full goal remains open. See
[evidence](../_remake_bgfx/docs/evidence/mudha-original-object-table-20261107.json).

## 7 November 2026: native Biryu siege music

Latest checkpoint, 7 November: native0xb570 castle state now reaches Biryu's
music controller, including packets received before world loading. One focused
TCP/miniaudio check passes original village30013, field30014 and battle30015
selection through runtime siege changes and castle-boundary movement. The output
was muted; this does not accept a live siege encounter. One Release batch is
staged and published as patch1794012069, with no server rebuild or journey replay.
See [evidence](../_remake_bgfx/docs/evidence/castle-music-20261107.json). The full goal stays open.

## 7 November 2026: preserve pending quest dialogue requests

Latest checkpoint, 7 November: NPC double-click/reopen no longer replaces an
outstanding story request. Dialogue open/choice waits for the current story,
task or service reply, and task dispatch retains a queued story decision until
that reply completes. Native quest costs, objectives and rewards are unchanged.

- [x] Pass one focused production-channel TCP check with original NPC1107:
  three ordered queries, unchanged conversation during a blocked double-click,
  choice waiting and stale-reply rejection.
- [x] Build/stage one Release batch and publish signed patch1794011733. No
  server rebuild or completed kill/reward journey replay.

This checks request ordering with injected native replies, not a new World
reward or graphical quest journey. The full goal remains open. See
[current evidence](../_remake_bgfx/docs/evidence/quest-request-order-20261107.json).

## 7 November 2026: source-based missing map-object handling

Latest checkpoint, 7 November: restore the original placed-object loader's
continue behavior for missing table bindings, empty filenames and absent model
payloads. Record each resource and affected placement count, skip its visual
geometry in budgeted BGFX uploads and retain original terrain/TCC data.
Malformed data and unsafe paths still fail. No asset search or substitution.

- [x] Build/stage one Release client batch and publish signed patch1794011240.
- [x] Replace Mudha's first unresolved-object abort with an explicit missing
  resource report:385 definitions affect503 placements. Resource loading, GPU
  geometry initialization and four frames now complete.
- [ ] Accept Mudha's full render: the one check fails because its native static
  scenery is missing. Keep Zone21 disabled; retain the failure and skip report.
- [x] Record the already-passed native miniaudio map-fade/recovery evidence;
  do not rerun it or the accepted quest/combat journeys. No server rebuild.

The full goal remains open. See
[current evidence](docs/evidence/map-missing-object-skip-20261107.json).

## 7 November 2026: independent peer attack timing and native impact audio rows

Fixed remote basic-attack timing borrowing the local player's swing counter.
Peers select their own original variant and scale its TAB hit marker to the
server duration, matching body playback. Online hit events also retain the
native weapon-animation/item metadata; combat presentation can select its
original impact sound instead of looking up animation0.

A single production-channel TCP matrix passes156 eligible cases:78 male/78
female,13 weapon families,36 original clips,150 authored impact-sound cases.
No clips are missing. This is protocol/timing metadata evidence, not a live
World or GPU/audio-playback claim. The Release client and patch1794010299 are
installed. K3 English FX data is preserved; no server rebuild or accepted
journey replay. Full goal remains open. See
[evidence](../_remake_bgfx/docs/evidence/peer-attack-timing-20261107.json).

## Earlier 7 November 2026: K3 English skill text and completed Zone06 saved return

Original K3 fxPC.xml contains the English text. The compiler now selects
philippine_szName/philippine_Desc before Windows-1252 encoding. All228 nonzero
K3 labels are English, including RARAMA3306. The editable workbook matches the
exact nine K3 sheets, typed values and Dotum. All non-text animation/FX/sound/UI
bindings match the deployed K3 table. Previous Global files are kept externally.
Only Data Tools was built; the client FX text file is installed and published
without repeating accepted FX or gameplay sessions.

Existing boss-preserved-fresh-relogin evidence closes Zone06's last saved-return
checkbox: both fresh clients preserve native state/items/money/Prana and match
saved gameplay/rendered positions. Zone06's requested implementation is complete.
Reconnect already has accepted evidence. Full combat, selected quests, graphics/
audio and other-zone expansion remain open. See
[evidence](../_remake_bgfx/docs/evidence/k3-skill-english-20261107.json).

## Earlier 7 November 2026: live Anaka Kruma combat and Vedi data gap

Z20 Anaka Kruma is enabled in project/deployed profiles. One original-map live
two-client session verifies native R attacks, K3 skill3306 flight on both clients,
authoritative damage/death, the fixed one-Rupiah drop and saved-point recovery.
Client results and a post-stop database audit preserve native Prana and positions.
The QA wrapper failed to exit after success; that failure is retained and its
exit handoff fixed. The accepted Z20 encounter was not replayed.

Z25's original MapData.tcm is truncated: header1,048,576 cells,107,378 complete
records plus a partial floor. Its2255034 bytes and SHA256 match E:/Global-server;
the other supplied server root has no Zone25 TCM. Keep it disabled and record
the gap. No fabricated collision or broader file hunting. Source statue recovery
is Z10 only; Z20/25 use the saved/town/present plan.

The screenshots exposed missing PC names in combat messages; peer-name indexing
is fixed. QA now clicks the real resurrection dialog and frames both players
for flight captures. Those later presentation/QA changes compile, while Z25
stopped before clients started. Stored K3 skill3306's question-mark label remains
recorded. Current Release client and signed patch are installed; no server
rebuild, normal database changes, commit or push. Full goal remains incomplete.
See [evidence](../_remake_bgfx/docs/evidence/god-pvp-live-20261107.json).

## Earlier 7 November 2026: native player combat targeting

The connected client now accepts hostile PC targets for the existing Z20/25
authority, using native clan metadata and authoritative party refreshes. Basic
attacks and enabled K3 skills replace the current movement destination and
approach the player target; departure, death or friendly allegiance stops the
attack. Remote revival restores standing. E considers visible hostile players,
and native target/attack FX attach to the correct peer character.

One focused real-TCP component run on the original Zone20 floor passes basic
attack, K3 skill3114, party/faction changes, approach/departure and peer life
transitions without local HP mutation. This is not a live World combat or
graphical/audio acceptance claim. Z20/25 remain disabled pending that gate;
field PK, challenges/sieges and High Kruma's source contracts remain open.

Release client and signed patch1794006957 are installed. No server rebuild,
normal database change or repeat of accepted gameplay journeys. See
[evidence](../_remake_bgfx/docs/evidence/player-targeting-20261107.json).

## Earlier 7 November 2026: immediate respawn movement and preserved saved return

Fixed the actual client freeze: native UPDATE_STATUS producers leave speed
fields zero, while the original client reads movement speed from UPDATE_UI.
Vitals packets now preserve speed. Batched death/revival retires stale routes,
dash, cast and posture state immediately. Server resurrection clears transient
movement/action locks, preserving genuine skill cooldowns and anti-replay state.
Offline revival clears posture and continues to work through Start-Offline.cmd.

The focused online first-tick movement and offline revival checks pass. The
prepared dead-viewer K3 projectile replay passes with actual TCP and production
BGFX, without claiming a full World/TLS/SQL encounter. Both fresh graphical
clients reload the earned Zone06 checkpoint with native state, items, money,
Prana and rendered positions preserved; no fight or reward journey was repeated.

Source Z20/25 policy and atomic fatal-HP/Victory recovery settlement are compiled;
policy and rollback/replay/item-conservation checks pass. Full client PvP and
connected acceptance remain open, so those profiles remain disabled. Z10 stays
gated for source card/Kala/BP contracts. This does not complete the full goal.

Matching Release files, signed patch1794006239 and the85-file Respawn-Recovery
server update are installed. Normal servers remain stopped; no normal database
changes or commit/push. Respect the requested build/check/subtask limits.
See [evidence](../_remake_bgfx/docs/evidence/respawn-recovery-20261107.json).

## Earlier 7 November 2026: earned quest26, native metadata and map events

Quest26 continues the exact earned25 state without replaying11–25. Ten actual
2019 kills produce ten7119 pickups; original decline/retry, letters, travel,
100,000 Prana/50,000 Rupiah/tribe reward, replay rejection and partial/final saved
return pass. The first attempt's post-death pickup failure is preserved. Its fix
recognizes inventory70 as native quest-time/Prana-loss metadata, preserves it per
economic owner and retains strict item conservation. Packing now respects the
source48 usable slots; serialized72 include reserved state. Focused inventory
and atomic transaction checks pass. TCP/graphics and balance remain unverified.

Mudha's exact native decks and actions1200/2081/3210/10000/21100 are implemented.
Its World component processes1262 NPCs, but client object18301 and a sky texture
are missing, so Z21 stays disabled. Missing sky layers are recorded/omitted;
shared online projectiles survive the viewer's death until server removal.
Import validation now rejects IDX/grid sizes the native worker cannot host.

Matching Release files, patch1794003546 and the85-file NativeEvents-Quest26 server
update are installed. Normal servers remain stopped; no database migration,
Debug rebuild, commit or push occurred. See [the current evidence](../_remake_bgfx/docs/evidence/native-events-quest26-20261107.json).

## Earlier 7 November 2026: ordinary-map batch, compact geometry and Tomb actions

Enabled native ordinary profiles18/24/26/28/31/32 in the project and deployed
server. A single generic component loads all six through real World authority,
completes160 population ticks each and preserves all native files;30 source and
deployed file hashes match. Final NPC counts are1702/439/1137/529/0/0; the last
two exactly retain the original empty generators. Missing skill/AI rows remain
visible in the report. Original portals are unchanged, with no direct inbound
route from the verified maps. Connected travel and full services remain open.

The client retains all four compact Cart2 subobjects instead of the first one.
Its combined real Type1/Type3 component and545-payload Ruins preparation pass;
Ruins' exact four-triangle corrupt material remains recorded and skipped.
Eight original Tomb actions and quest26 are compiled and installed, with their
new encounter/earned-journey checks still open and missing NPC speech200 noted.

Matching Release binaries are deployed; normal services were left stopped.
Signed patch1794001568 and the82-file OrdinaryMaps-Tomb server update are current.
That update excludes operator-owned zone profiles. See [the evidence](../_remake_bgfx/docs/evidence/ordinary-maps-tomb-type3-20261107.json).
The full goal remains active. No Debug rebuild, commit or push was performed.

## Earlier 7 November 2026: folder-driven zone registration and live boss integration

Server Manager now provides **Add Zone → select folder → analyze → review → add
or reuse**, with optional ordinary-zone enable/start. It checks all five native
files, their world/zone identity, IDX/TCM structure and registry endpoints, then
rechecks source/profile hashes before applying changes. Existing data and
special-zone configurations are preserved. Native IDs01–34 are eligible through
configuration and live authority registration; verified journeys are a separate
inventory. Adding an ordinary map no longer needs a C++ change or rebuild.
The focused12-import Release check passes native/special mode selection,
inherited LAN addresses, discovery, port conflicts and malformed data rejection.

The deployed client also fixes original rigid LOD records, early table texture
binding and multipart MonsterTex resolution. Online monster FX now consume the
received skill directly. A human-assisted two-client Zone06 encounter captures
all four boss animations, five FX graphs, three summons, death and Prana. Saved
SQL and four receipts confirm BgfxPeer's51,825 Rupiah and three source items.
The automated owner-only pickup failure is preserved: the user was playing the
peer and picked up the loot. Fresh graphical relogin/position agreement and
balance are not established by this encounter.

Release Manager PID37352 reports11 native worlds plus the administrator stub
ready. Signed patch1793993819 and the82-file ZoneImporter-Boss server update are
recorded in [the current evidence](../_remake_bgfx/docs/evidence/boss-tomb-native-content-20261107.json).
The full gameplay/zone expansion goal remains open; no commit or push was made.

## 7 November 2026: native Tomb startup — actual World verified

Zone12 now applies the original process-local height10000 and four door-mask
openings before population construction, preserving its TCM and generator files.
Startup executes authored Global Event149 for guardians2252–2255 and summons
the12 original2258 traps at their source positions, classes and presentation
types. Missing source templates are recorded and skipped.

Native event action100 preserves source template, position, presentation,
direction and clan rules, including the caller's target and original attacker
memory order. The existing class14 peace controller now reaches native
SelectSkill before its queued UseSkill, through both World tick paths.
Startup status reports guardian/trap handles, selection count and missing rows.

The focused Release actual-World startup check passes the exact height/door
changes,1722 opened door cells,4 guardians and12 traps. Across160 native ticks,
the traps perform240 native skill selections; the source TCM hash is unchanged.
The eight remaining Tomb room actions1160/2060/2070/2080/2085/1035/22000/20330
remain explicit validation rejections. This does not accept the complete Tomb
room journey, TCP/graphical behavior or the full expansion goal.

Evidence: [boss/Tomb native content](../_remake_bgfx/docs/evidence/boss-tomb-native-content-20261107.json),
with `boss-tomb-native-content/tomb-startup.log` retaining the focused result.

## 7 November 2026: skill timing, quest22–25 and native recovery

Quests22–25 now have an earned actual-World continuation across preserved
checkpoints: native letters,30 Heruka and20 Ananga kills, earned8042/8019,
exact rewards, replay rejection and partial/final saved returns. Previous
quest21 combat and completed continuation steps were not repeated. QA class1
and Heart2000 are explicit duplicate-only prerequisites, and the older
quest20 seed remains recorded. Fresh-player balance, TCP and graphical
acceptance are not claimed.

The continuation exposed a real revived-entry ordering gap. Both native
status implementations now set source temporary living HP/TP before Init,
then restore half-vitals after continuous effects. CHAR_INIT's death flag
agrees with recovered status. The entry component and32 resumed native
kills pass without an injected Stand action.

Source Tomb boss-room logout return and all-common-area generation fallback
are implemented. The39-boundary/actual-World check covers recovered entry,
one durable return save and fresh roster reopening. Data Tools also restores
662 source-selected skill timing rows across31 IDs after the K3 weapon-back
fix; all non-K records and canonical workbooks/parameters/FX are unchanged.

Matching Release client/server/timings are installed; all11 native worlds
and the administration stub report ready. Signed patch1793985972 and
`D:\Tantra-Beta\Global-Tantra-Server-Update-20261107-SkillsAudio-Recovery.zip`
record the current binaries. No Debug build, schema change or normal
character data edit was made. The full expansion goal remains open.

Evidence: [current checkpoint](../_remake_bgfx/docs/evidence/skill-audio-tomb-story-20261107.json).

## 7 November 2026: Manager layout, process counters and earned quests

Server Manager now reports its own CPU/RAM in the footer and each server
process in CPU/RAM columns. The organized sidebar, toolbar, server table,
selected actions and settings/log panel pass the Release GUI check.
**Server update time** replaces the percentile jargon and explains both bounds.
Extra channels have visible suffixes; selected actions require a selected row.

The earned quest11–20 authority journey passes58 real kills,40 pickups,
partial saved returns and earned quest21 acceptance without seeded quest
progress or materials. QA level/attributes are explicit; this is not balance,
TCP or graphical acceptance. Karya2202 contact now validates actor, owner,
session, revision and cell, and exposes only the original level-selected tier.
The actual World check and client TCP/SDL replay component pass separately;
live TLS/full scene and destination admission remain open. The legacy mid-tier
selector46–61 versus Global portal minimum68 mismatch remains recorded.

Matching Release binaries are deployed after a verified schema10 backup.
All11 native worlds plus the administration stub report ready. Prior native
worlds had exited with an expired/fenced authority lease; they were restarted
through their owning Manager. The lease guard and timeout policy were unchanged.
The82-file existing-server update is
`D:\Tantra-Beta\Global-Tantra-Server-Update-20261107-Manager.zip`.

Evidence: [current checkpoint](../_remake_bgfx/docs/evidence/native-gate-story-shadow-manager-20261107.json).
The full expansion goal remains open.

## 6 November 2026: Karya gates, earned class trial and native object LOD

Restore the original process-local Karya gate flag, source Monster2202 actors,
action2050, Data/Schedule.txt and English gate notices. Preserve native GM-clan
portal exceptions and the282/378 Chakra caps. The focused actual World check
opens/closes the gate at exact authored cells, including its0x10 terrain cell,
and verifies observer visibility and notices. Normal disconnects from11/13/14/15
now commit the exact saved-map return; exact-field helper checks cover this rule,
while an end-to-end Karya logout remains unaccepted. Both live Mandara channels
load the original schedule; destination admission and special gate contact/UI
remain closed work. Future channel creation also copies those native inputs.

The class34 authority journey starts with zero quest progress, earns its elder
offer and twenty Ananga retry kills, follows original travel and quiz branches,
earns8071 and exchanges it for8068. Intermediate/final saved reopening and replay
rejection pass. First-class status/QA attributes are prerequisites; full second
promotion and connected graphical acceptance remain open.

The matching client restores separate native rigid-model LOD, TML SM/grass
classification, exclusive distance cutoffs and grass fading. Actual Mandara
GPU components check334 SM placements and4712 grass placements, cutoff/fade
boundaries and cull/restore without replacing323 shared geometry buffers.
The earlier dark probe capture omitted environment time; retain it and use
the corrected authored-Noon component. Full scene parity is not inferred.

Signed patch1793978914 contains the staged Release client. Matching server
binaries are deployed after a verified schema10 backup; all11 native worlds
and the separate admin stub report ready. The existing-server update contains
82 files, including both Mandara channels' original schedule/language inputs.
See `_remake_bgfx/docs/evidence/native-karya-class-lod-20261106.json` for
hashes, sources and scope.
No canonical workbook or beta-admission change is made by this batch.

## 6 November 2026: native entry, local portals and earned materials

Restore the original saved-entry guards: Zone10 requires level60, Zone21
level80 and Zone22 level100, without a GM exemption. Saved Chaturanga11
returns the character to Mandara once while retaining inventory/currency and
releasing its lease. The client now surfaces the exact pre-entry rejection
instead of remaining in an authenticated state. The 24 boundary cases, owned
SQLite/World fallback and actual client loopback check pass.

Add partial Forge actions104/1020/1055/3200/3205 with source item-removal,
party-teleport and deck behavior. Helper checks pass; Forge remains closed.
Its empty deck11, invalid 1000-card deck2, task60/Monster1460 mismatch and
missing K3 skills41783/41784 remain explicit blockers.

The earned-material authority journey passes five cave kills/pickups,
tasks10006/10013/10057, four original portal routes, exact consumption/rewards,
replay rejection and saved reopening. Its first failure omitted local portal
116→117; the corrected route exposed a real server publication gap. Local
portals now update actor occupancy/visibility and population position before
status publication, preserving existing authority and collision checks.
QA attributes are overallocated; this is not TCP, graphical or balance proof.

Matching Release binaries are staged after a verified schema10 backup.
The client uses signed patch1793975834. Current readiness, hashes, source
provenance and preserved failure evidence are recorded in
`_remake_bgfx/docs/evidence/native-entry-forge-material-20261106.json`.
The six-part expansion goal and remaining selected journeys stay open.

## 6 November 2026: earned quest21 and Monster material color

Quest rewards now use the original no-bonus AcquirePrana default while combat
keeps its item bonus. The focused native authority journey earns30 Ulkamulka
and15 Ulkamulka Kaura kills, accepts decline/retry and a save/relogin after15
kills, commits exactly20,000 Prana/30,000 Rupiah/20x7008, rejects reward replay
and reopens the final state exactly. Source charm5805 supplies a5% combat bonus.
Quest20 prerequisite and QA attributes are seeded; full TCP/graphical and other
selected-chain journeys remain open. Native generators/collision are unchanged.

The matching Release BGFX client applies Monster RGB to original diffuse and
emissive terms, with zero RGB inheriting character material. Its isolated
native2008 GPU component passes, including a live animation clock and replacement
cleanup. Ordinary point-light diffuse also respects the selected material;
full scene parity remains open. Signed patch1793971852 is published.

Four matching server binaries are staged after a verified schema10 backup.
Manager18956 and11 native worlds plus the separate admin stub report ready.
No canonical workbook or zone-admission change is made by this checkpoint.
Evidence: `_remake_bgfx/docs/evidence/native-material-quest-20261106.json`.

## 6 November 2026: later-zone client preparation

The BGFX client now reads Naga Dungeon's native PSD-to-DDS material reference
and removes Forge's4096-index-buffer upload limit by sharing each map mesh's
geometry across material ranges. Naga's before/after image is unchanged. Inspect
Naga/Marana arrival components and all Forge geometry uploads. The follow-up
corrects the Forge preview's blocked center cell using native landing selection;
the valid arrival renders correctly with the existing camera. Keep native entry/rule,
actor/service and connected-travel gates open. No server binaries, datasets,
workbooks or zone admission are changed by this client-only checkpoint.

Evidence: `_remake_bgfx/docs/evidence/later-ordinary-zones-20261106.json`.

## 6 November 2026: original second-class trial

- [x] Enable quest34 with the original twenty-question answer table and existing Global NPC scripts. Preserve NPC1006/Zone02, twenty Ananga2016 retry kills, proof8071 and NPC1132/Zone07 exchange for8068.
- [x] Accept actual answer transcripts on the authority; reject unoffered, forged, incomplete and replayed claims. Preserve native inventory, quest states, atomic saves and exact reopening.
- [x] Pass the focused Release authority check and original BGFX dialogue render. Correct the check's initially wrong turn-in zone from the canonical NPC table; production data is unchanged.
- [x] Stage matching Release client/server binaries; all11 native worlds and the admin stub are ready. Existing zone admission and K3 skill data remain unchanged.
- [ ] Accept the complete connected trial travel/kill journey alongside the other selected quest chains.

Evidence: `D:\Tantra-Beta\Expansion-20261106\native-class-trial` and
`_remake_bgfx/docs/evidence/native-class-trial-20261106.json`.

## 6 November 2026: successful caster-affection phases

- [x] Defer implicit AffectSelf until a unit's successful hit, preserving original CastInstant3/OnAffect/AffectSelf order and caster ownership. Misses no longer receive taunt; explicit self-target casts keep their existing path.
- [x] Pass the focused K3 taunt3023 hit/miss, eight-second expiry and inner-affection check, plus3028 area impacts on multiple recipients. Keep the original monster selector/scoring and K3 records unchanged.
- [x] Build/stage matching Release server binaries in the zero-player maintenance window; the client protocol is unchanged and patch1793936845 remains current.
- [ ] Finish wider multiplayer skill graphics and encounter acceptance. The area fixture reaches native player death after its accepted impacts; no survival/boss result is inferred.

Evidence: `D:\Tantra-Beta\Expansion-20261106\k3-successful-self`.

All11 native worlds and the admin stub are ready. Existing-server update SHA256:
`71efb2f751d7c503d60e741ee258d8e45940859cdecea077ca438c471215b828`.

## 6 November 2026: original friendly skill authority

- [x] Generate all seven original faction matrices from Basedef.cpp with a source hash and exact-data check; share the support-intent contract with BGFX.
- [x] Allow native friendly support on an unpartied player, distinguish FriendNParty selected-friend and self-party casts, preserve explicit corpse selection and the skill3337/Party exceptions, and retain recipient identities through impact.
- [x] Pass the focused two-owner K3 authority check for heal3211, buff3204, active-effect delivery, saved HP/TP and living resurrection rejection. Correct the fixture's class without bypassing original initialization guards.
- [ ] Finish broader live party/AoE support graphics and competitive-zone authority, including PC death/BP sharing and guild alliances/siege rules. The existing beta zone allowlist remains unchanged.

Evidence: `D:\Tantra-Beta\Expansion-20261106\native-friendly-skills`.

Matching Release binaries are deployed; all11 native worlds and the admin stub
are ready. Existing-server update SHA256:
`863d2d5266c4acedee1d5506d1238ef0066c759cd222c43dfa46982ee175e2f2`.
The client uses signed patch **1793935443**.

## 6 November 2026: tester access, protection and recovery

- [x] Prepare the external tester kit: verified ZIP/payload installation, normal launcher File Check/login/saved return, machine-bound separate-PC reporting and redacted local bug reports.
- [x] Provision eight individual userLevel=0 accounts with operator-only handouts; preserve existing accounts and exclude credentials from every public archive.
- [x] Pass focused admission, ticket/ownership and economic replay checks; exercise real HTTPS throttling and native TLS ticket rejection in the isolated workload.
- [x] Demonstrate isolated MariaDB restore, interrupted-patch rollback, crash dumps and local health alerts; stage Release server binaries and a new 78-file update.
- [x] Complete the 16-client, 60-second movement/combat/save/reconnect measurement. Fix transient MariaDB snapshot-conflict retries without weakening ownership checks.
- [ ] Meet the performance budget before approving a public cap: worst sampled tick p95 is 63.119 ms against 50 ms. Saves p95 is 78 ms; client/checkpoint/release failures are zero.
- [ ] Receive the separate-PC tester result and configure reachable public hosting. The user confirmed no second PC is currently available.

Downloads: `D:\Tantra-Beta\2026-11-06`. Private handouts:
`D:\Tantra-Beta\Operations-20261106\tester-access`. Production remains running
with five shared services and eleven zone/channel workers. No production database
was restored or wiped. See the [operator runbook](docs/BETA_OPERATIONS_20261106.md)
and [acceptance evidence](docs/evidence/beta-operations-20261106.json).

## 6 November 2026: English combat chat and refreshed beta packages

- [x] Verify Global SpeechComment.szPhilippine: all 348 entries are untranslated placeholders. Suppress unavailable utterances before broadcast, including named forms, while preserving native AI timing/RNG and real dialogue.
- [x] Resolve NPC/monster chat speakers through their Philippine-English parameter names. Render damage, Prana, death and revival messages from the existing English HTMessage templates.
- [x] Build and stage matching Release client/server binaries; pass focused server speech and 35 native chat/UI checks without repeating the full two-client journey.
- [x] Generate the current 5,225-payload client ZIP with two-file signed connections and root Patcher.dat, plus a separate 77-file server update. Verify archived payload hashes, signed profile/tamper rejection and private-file exclusion.

Downloads are in `D:\Tantra-Beta\2026-11-06`. The server update applies to an
existing configured deployment and contains no accounts, credentials or private
keys. Current signed patch release is 1793900170; connection version is 16.
Native missing speech remains untranslated rather than being invented. The
accepted live TLS two-client journey is recorded separately. Public connectivity,
separate-PC, player-cap/abuse and operations gates remain open. Named coverage
stays 173/254 (68%), with 6/10 gates; this follow-up adds no phase completion claim.
See [release notes](docs/BETA_REFRESH_20261106.md) and
[package evidence](docs/evidence/beta-refresh-20261106.json).

## 6 November 2026: live signed-connection two-client journey accepted

Two Release clients launch through Tantra.exe, verify the signed patch feed and
connect using the current two-file format/version 16 over TLS to the deployed
172.16.90.12 servers and shared MariaDB. Login, continuous movement, ordinary
combat, automatic party currency pickup, native item drag/review/trade and fresh
login with exact SQL comparisons pass. The accepted drop was 13 Rupiah: 6 per
member, with the native remainder of 1. Final zone operation/checkpoint/release
failure counts are zero. QA clients exited; the corrected servers remain running.

The live check exposed a movement-unit mismatch. Convert authoritative speed
from correction 15 to the stock guard's correction-10 units without accepting
the packet's claimed speed. Original guard vectors, a sustained legal axis route
and double-speed rejection pass the focused Release movement check. Stage the
corrected TantraZone in both bin folders and the client in _client_bgfx; publish
signed patch release 1793897963. Add a repeatable live fixture/harness; credentials
stay in ignored evidence, outside the client. Pre-existing accounts are preserved.

This is a controlled level-50 two-character LAN session, not fresh progression,
save-point NPC, full content, separate-PC, Internet or capacity acceptance. Native
reserved-message placeholders remain a presentation follow-up. No replacement
beta ZIP or named roadmap gate closure. See [details](docs/LIVE_RELEASE_VERIFICATION.md)
and [machine-readable evidence](docs/evidence/live-release-20261106.json).

## 6 November 2026: two-file client connections and signed root patch configuration

Export only serverlist.bin and system/HTMessage.txl. Preserve the original native
server-list prefix and append bounded signed metadata/public TLS trust. Verify
both files, certificate hash, version/expiry and compiled trust; reject altered,
truncated or stripped data. Retain v1 reads for migration. Update Data Tools,
paired exports, native resource reading and package selection; retire separate
ConnectionProfile.json/ServerTLS.cer files after preserving operator backups.

Move public patch configuration from system/Patcher.cfg to signed root
Patcher.dat. The operator publisher generates it; the launcher displays its
verified address read-only and retains offline launch. File names are based on
the supplied examples, which are plain text; no encryption or unused-file claim.

Focused Release format/TLS loopback, signed patch/tamper/recovery and one launcher
UI/settings session pass. Current URLs/native prefix/TLS trust are unchanged.
Matching client, Manager and Data Tools are staged. Live endpoints could not be
checked because game servers were stopped. No SQL/server configuration changes,
Debug builds, broad gameplay retest or replacement beta ZIP. Named roadmap gates
remain unchanged. See docs/evidence/two-file-connections-20261105.json.

## 5 November 2026: verified launch chain and signed XAMPP patch feed

Implement native C++ Tantra.exe -> ZFLauncher.exe. Merge the patcher into the
original-style Tantra launcher and retire Update.exe. Reject direct game launches;
inherited one-use handoffs verify actual parent identity and installation paths. Offline startup, restarts, verification tools and Manager
launches use this chain. Keep client saves and patch recovery data external.

Use original dialog grouping for shared graphics/audio settings. Apply and
Cancel use the game's existing Graphics.cfg/Interface.sys formats. File Check
preserves player UI preferences; disabled bitmap buttons no longer redraw
captions. One isolated launcher session verifies the reported recheck state and
settings save/reload/cancel without launching gameplay.

Publish signed Patcher.dat, UpdateList.dat, NotifyMsg.dat and content-addressed
native client/runtime payloads to C:/xampp/htdocs/patch, served at
http://172.16.90.12/patch. Validate signatures, hashes, versions and target paths;
stage downloads and journal replacements for rollback/recovery. Native archives,
TFX, MP3, cursors and shader-cache fingerprints are included. Private keys, SQL,
source code and player data stay outside the web feed.

Focused Release handoff/tamper/recovery/install checks and the installed launcher
GUI pass with the full 5,217-file LAN feed. Matching client/Manager binaries are
staged. K2108 executables were inspected statically and their hashes are unchanged.
No Debug, broad game/FX, game login, separate-PC acceptance or replacement beta ZIP
was run. Named roadmap tasks/gates remain unchanged. See [operation and evidence](../_remake_bgfx/docs/LAUNCHER_PATCHING.md).

## 5 November 2026: party controls, shared LAN database and entry fix

Automatic party loot follows the native pickup rules with atomic SQL recipient
updates, receipt replay protection and a leader-owned persisted mode. Native
party/Ashram invitations and leave/kick/disband prompts use original UI images.
Release policy/SQL/social and focused GPU component checks pass.

Signed profile15 and matching TLS now target172.16.90.12; actual staged HTTPS
and six TLS endpoints pass hostname verification. LocalSubnet-only Windows
firewall rules are enabled. Both normal server roots share MariaDB
127.0.0.1:13306/tantra_bgfx, schema9; existing data is preserved. phpMyAdmin now
also selects this instance separately from XAMPP3306.

Fix the reported new-character owner-inventory mismatch: update the channel's
fixed roster slots after successful create/delete ACKs, preserve appearance and
check entry identity. The focused client-channel regression passes creation,
failed creation, deletion/reuse and reconnect; foreign inventory still fails.
The fixed Release ZFLauncher is staged, with a new signed LAN ZIP.

Earlier two-client journey evidence stays separate. Another PC's LAN connection,
live graphical automatic loot and public Internet/capacity/abuse/operations
acceptance remain open. No Debug or broad FX/performance rerun. Named coverage
stays173/254 (68%),6/10 gates. See [source and evidence](docs/PARTY_LOOT_LAN.md).

## 5 November 2026: local beta package, Mandara1st and original social UI

The fresh two-client party/trade/services/saved-return journey passes from an
isolated installation. Mandara1st's 26 NPC placements now originate in the owned
XLSX workbook, with matching client/server exports; NewMandara is rejected.
TantraDataTools is a standalone GUI and Tools is removed from Server Manager.
Missing native resources can be restored from the approved Global client by
exact relative path, preserving existing files and packed archives.

Restore original party panel 229 and Ashram panels 217/218 layouts, HP/TP bars, tribe icons,
member ranks/status, scrolling and G routing. A focused Release GPU component
check and MSGSRV TP/persistence check pass. Automatic party loot distribution
remains unavailable. The prior fresh network journey predates this UI build;
its exact evidence is preserved separately. Public beta is not accepted: the
signed package is local-server configured and a separate clean PC is unavailable.
No Debug or broad FX/performance rerun. Named roadmap stays 173/254 (68%), 6/10 gates.
See [the workflow and verification scopes](docs/BETA_LOCAL_PACKAGE.md).

## 5 November 2026: beta content, account controls and beginner path

All three requested implementation areas are complete. Freeze the connected
beta to Zone01-Zone05,210 enabled skill paths,22 story flags and three tasks;
reject unlisted actions and unfinished quiz34 without changing durable state.
Preserve native passive skills and expose unavailable skill feedback in the UI.

Server Manager Accounts adds timed Block/Unblock, Reset password and Revoke
sessions. Only the operator endpoint accepts controls; game-service RPC rejects
them. Reset replaces both verifier paths and retires all-world sessions, grants,
tickets and handoffs. Native dates, characters and userLevel are preserved.
Dedicated MariaDB upgrades to schema9 with matching pre/post backup rows.

Restore original first-entry message1051, native0/1 quest decisions and local
ordinary tutorial confirmations. Real-network SDL mouse/Escape choices,
starter equipment and reconnect match stopped SQL. The full fresh authority
journey earns92 kills and completes five tutorials, first class, repair,
equipment, death/revival and saved return without restored checkpoints.
Matching Release client/server files are staged. Only new focused checks were
run; no Debug build or broad FX/performance rerun. Public-beta release gates
remain open; the global named roadmap remains173/254 (68%),6/10 gates.
See [source rules, exact evidence and remaining scope](docs/BETA_ACCOUNTS_BEGINNER.md).

## 5 November 2026: guild roles, selected progression and Zone05

Native guild ranks/permissions, promotion/demotion, master succession and paid
marks now pass authority, persistence and actual SDL two-account checks. Use
original packed DDS mark components for owner/nearby-peer nameplates. Schema8
migrates the dedicated MariaDB safely; before/after native backups preserve
existing account/character/warehouse/guild rows. Original SQL in `Tantra/Database`
is documented as read-only reference, including account binary and summary tables.

Selected story21 and tasks10006/10013/10057 pass dialogue, kill/item objectives,
source party rewards, replay rejection and reopen. Dash3014/3114, multiple3012
and ordinary families901/911/915 in Zones02/03/04 pass their bounded authority,
death/rewards/loot/respawn/resurrection checks. Zone05 MandaraCave3rd passes
native resources/actors, two-client paid travel/free return, environment/BGM,
party/chat and two fresh-process saved-state logins. Missing3905 and zero-position
NPCs are recorded/skipped. Matching Release runtime files are staged.

P16-01 and P16-07 close:173/254 named tasks (68%),6/10 gates. The complete C09,
Zones06..10 and public beta remain open. This batch uses focused Release checks;
the prior C08 full benchmark is retained without claiming a rerun for this binary.
See [implementation, exact scope and evidence](docs/GUILD_QUESTS_ZONE05.md).

## 5 November 2026: Zone01–Zone04 accepted

The three two-client graphical routes pass source resource/actor preflight,
authoritative movement, cancellation, fares, return, party/chat, environment/BGM,
stopped persistence and fresh-process saved-zone entry for both characters.
MandaraCave2nd retains the Global level-85/free route. Latest zone binaries and
native Zone02–Zone04 profiles are staged in development and `_server_final`.
Databases/accounts and tested rule bytes are preserved.

Original compact type-4 meshes and the Cave2 67-material scenery load correctly.
Cave2 monster2147's Pop action now preserves the source's no-op Group/React
branches. Native authority failures retain their actual diagnostic context.
Unavailable Vharah animation is skipped per user instruction. See
[implementation, evidence and content limits](docs/FOUR_ZONE_ACCEPTANCE.md).
The full MMO/quest/combat/ten-zone roadmap remains open.

## 3 November 2026: documentation publication

Publish the remaining workspace preferences, saved client UI defaults and
historical Genesis Server Manager report. The report's original project layout
and 19-check claim are preserved as historical context, separate from this
module's implementation and retained Release evidence. Current manager status
is described in this file and `README.md`; the completed five-part checkpoint
and remaining full-game acceptance gates below are unchanged. No game rebuild
or new runtime acceptance is part of this documentation update.

## Completed follow-up - projectile, UI, MandaraCave, interruption and C08

- [x] The two-client Release projectile session completes. Isolated visible/hidden captures contain 4,164 projectile pixels on the attacker and 53 on the peer. The renderer carrier follows the original forward axis; both captures precede damage. The initial test's melee opponent was intercepting the shot according to the original collision rule; finish that opponent before measuring flight.
- [x] Add the native header-only character ping (0x1831) before the transport idle deadline; repeated requests preserve durable character state.
- [x] Native quest journal and implemented guild UI workflows pass. Use CHTUIQuestWindow in HTInterface.cpp and HTMessage parameters; select/scroll original history and safely format remaining kills. Two connected accounts exercise a source quest/reward, guild creation/invite/accept/announcement, UI and server permission rejection, confirmed leave/kick/disband and reconnect. Stopped storage matches flags, rewards, fees, membership and announcement. Guild higher ranks/marks remain open.
- [x] MandaraCave: two visible Release clients complete paid entry/free return, seven authored NPC positions, native fog and map BGM, party/chat across zones and reopened positions/fares. Fixed 512-cell native grids, static mineral/type-4 WORD indices and catalog DDS binding. Matching K3 portal131 landing bounds are a documented four-cell override in the owned Global-baseline workbook; the exact mineral DDS ships in native MonsterTex2.hpk.
- [x] Interrupted operations: two native TCP accounts prove trade cancellation and cash reconciliation/reconnect after an actual purchase socket is closed between committed debit and character delivery (no seeded pending order). Drop source travel after durable debit and destination admission before CHAR_INIT; repeated reconnect retains one claimed handoff, exact destination, one fare and unchanged items/progression, with restored party presence. Stopped storage matches.
- [x] C08 matched Release benchmark: twelve 60-second CPU/GPU trials pass with identical build/quality and initial/median actor counts. Worst GPU p95 13.610 ms; p99 25.356 ms. Raw frame, loading, hardware and preservation evidence is retained. Full C08 configuration/package acceptance stays separate.

Current compact evidence: [projectile, cave and recovery](docs/evidence/projectile-cave-recovery-20261102.json). All five requirements pass within their requested scope. Full map/quest/guild parity and full C08 configuration/package gates remain separate.

## Current continuation - 2 November 2026

- [x] Missing optional INTRO fire is logged once and skipped. Unavailable unused PC warmup entries no longer block characters; displayed appearances remain required. Fix native case-insensitive resource lookup and include the Global UPWear worksheet in generated ClientRes.
- [x] Two visible Release clients enter gameplay and complete paid Mandara2nd travel, free return, cross-map party/chat and a second player's final Mandara2nd entry.
- [x] Manager distinguishes party, chat-room and cash readiness, and displays actual MariaDB connection/schema/version/process status. Matching Release executables are staged in `_server_final/bin` and `_server_cpp/bin`.
- [x] Mandara2nd: validate all 16 server NPC positions, destination terrain/placements, sky/cloud/fog and actual miniaudio map BGM. Stop workers, reopen storage and match final map, coordinates and fare to the visible clients. Missing region-ambience TMS is logged/skipped; no replacement data is invented.
- [x] Native automatic backups, retention and restore feedback pass the focused checks; Manager scheduling is active while it is open. The deployed database was backed up. Restore verification uses the separate validation database.
- [x] Advanced NPC continuation: committed class publication, original priest choices/offerings/god changes, sixteen second-class branches, later task bindings and source party rewards. Two visible clients complete priest services and a promotion; reopened state matches. Premium class reset lacks its original complete request contract and is explicitly unavailable.

All five requested tasks are complete within the documented scope. The separate graphical combat probe did not complete its projectile stage. This continuation does not claim projectile or full-MMO acceptance. See [evidence](docs/evidence/npc-map-backups-20261102.json), [backups](docs/AUTOMATIC_BACKUPS.md) and [NPC implementation and source limits](docs/ADVANCED_NPC_SERVICES.md).

## Simulation follow-up complete, 1 November 2026

All five tasks pass within the revised two-client scope. See [implementation, measurements and limits](docs/SIMULATION_CHECKPOINTS.md). The clean runtime now uses MariaDB 11.8.9 and retains its previous SQLite source.

## Concurrent MMO scaling - implementation and bounded measurement complete, 1 November 2026

- [x] Bounded MariaDB worker/connection pool, independent accounts, FIFO character/warehouse operations, atomic trade/cash receipts, revision fencing and overload responses. Direct and real SQLDMN RPC checks pass.
- [x] Persistent asynchronous service client, bounded queues, queued/in-flight deadlines, no uncertain-write replay, malformed-reply rejection and shutdown drain checks.
- [x] Authentication budgets, case-folded account/IP throttling, reserved database gameplay slots and bounded background work. The packaged HTTPS burst receives 429 responses; existing accounts/characters remain unchanged.
- [x] Spatial actor buckets, movement coalescing across no critical barriers, outgoing byte budgets and native handle audit. Component checks pass; crowded live acceptance remains open.
- [x] Convert live zone state transitions to bounded cooperative completion on the authority thread. Native World delayed-save evidence proves independent committed transfers/ticks, ordered same-owner operations, commit-before-acknowledgement and isolated rejection. Connected entry/movement/Chakra/drain passes; readiness count is published before entry acknowledgement.
- [x] Add certificate-verified private RPC TLS and destination overrides. Release LAN-interface checks reject wrong name/root/token and remote plaintext; persistent data/admin connections and uncertain writes pass. This does not prove a second-machine deployment.
- [x] Add ordinary-map channels, schema-7 owner/capacity reservations, authenticated admission and same-map handoff, remote dependency profiles and per-host process ownership. A two-root LAN/TLS run passes with the real BGFX channel and retained party presence; it uses one physical machine. Special map-event closures retain a conservative shared fence.
- [x] Complete the bounded Release load measurement: 32/128/256 actual native clients, 1,993 durable saves, final-stage 239.2 committed saves/s, p95 save latency 78 ms, eight successful reconnects and zero unexpected disconnects. Record 221 ms tick spikes, 16 database lock waits totaling 63 ms, sampled queues and memory. [Measurement and limits](docs/evidence/scaling-capacity-20261101.json).

The six requested implementation tasks and bounded measurement are complete. The earlier measurement used an isolated MariaDB fixture. The subsequent deployment step activates dedicated MariaDB 11.8.9 in `_server_final`, preserving its SQLite file and migration backups. No thousand-player or thousand-TPS capacity is claimed. [Evidence](docs/evidence/scaling-components-20261101.json), [design and remaining gates](docs/SCALING.md).

## Project XLSX runtime data and clean deployment - 1 November 2026

- [x] Use only project XLSX inputs, with compatible workbook selection and no data-family selector.
- [x] Preserve the current MainUI, IntroUI and loading bindings; correct four unavailable Mandara resource bindings from the deployed BGFX catalog.
- [x] Add native server-settings, FX-PC and scroll-quest exporters. Capture settings/FX writers from original C++; verify scroll layouts against both supplied server versions.
- [x] Generate C++ character, combat, AI, item/skill/monster, NPC, portal, quest, refinement and event datasets from the owned XLSX files.
- [x] Regenerate native hit timings and projectile bindings using generated catalogs and packed TAB assets.
- [x] Report missing IDs, NPC/item/skill references, assets and source formula errors; reject consumed Excel errors and preserve unused source diagnostics.
- [x] Add paired signed data releases, stopped-worker application with retained previous rules, and matching external client support data.
- [x] Finish the bounded Release login/loading/combat/NPC check, including an edited XLSX price enforced by the live server.
- [x] Stage the clean `_server_final` runtime with Release executables, runtime DLLs, required data and current persistent databases; exclude source code and build scripts.
- [x] Ship the complete SQLite/MariaDB schema and registration/backup/admin/inspection/guarded-wipe queries in `_server_final/sql`. Migrate accounts to schema 6 with `userLevel DEFAULT 0`; only value 1 is an admin.
- [x] Check account defaults, exact role enforcement, live demotion, v5 migration and SQLite SQL examples; start/stop the deployed Release workers with preserved accounts. MariaDB SQL is supplied but was not runtime-tested in this check.

Evidence: [project data release](docs/evidence/project-data-release-20261101.json) and [SQL/deployment](docs/evidence/sql-schema-20261101.json). See [project data workflow](docs/PROJECT_DATA.md) and [database/website contract](sql/README.md). These tasks do not change the remaining full-MMO parity gates.

# Native C++ server implementation progress

## Native data tools and owned workbook - 1 November 2026

- [x] Add a Server Manager Tools page and native generators for client/server TPA, ClientRes, HTMessage and NPC TXLs.
- [x] Create the editable Global baseline at `bin/XLSXData/TantraParam.xlsx`, preserving all twelve worksheets and original values/headers. Use 돋움 (Dotum) in every project-owned XLSX file.
- [x] Read XLSX or SpreadsheetML XML directly in C++; default both TPA generators to the owned workbook.
- [x] Include the other five Global XML sources as separate Dotum workbooks; default ClientRes, HTMessage and NPC generators to the local copies and include all owned workbooks in Release packages. Server settings, FX-PC and scroll-quest exporters are included in the project-data continuation below.
- [x] Add grouped buttons in the Tools page's right pane for individual converters, workbook editing, connections and database checks; each converter opens with its workbook selected.
- [x] Convert all 14 Global legacy XLS sources to Dotum XLSX data, preserving formulas and the separate Kathana3 XLS variant; verify values/fonts and native Mandara TXL consumption. Original Shambala broken-reference formulas remain documented.
- [x] Keep generated outputs detached, record source hashes/warnings, and sign HTMessage with matching public connection files.
- [x] Add the detached server-list generator and Explorer clipboard copy; keep active client/server settings untouched.
- [x] Verify every source cell, XLSX/XML client-TPA byte equality, actual BGFX TPA/ClientRes/NPC readers and the native tools dialog; stage Release Manager.

Evidence: [native data tools](docs/evidence/native-data-tools.json). The original-server TPA writer does not update the C++ runtime rule datasets. Full-game parity remains a separate gate.


## Secure native connections - completed 1 November 2026

- [x] Preserve HTMessage.txl URLs/world names and native serverlist.bin layout;
  add signed IP/DNS and port configuration using the existing files.
- [x] Default ZFLauncher startup uses the verified online profile; the actual
  Start-Offline.cmd still opens an isolated offline SQLite profile.
- [x] Add the existing Server Manager's connection editor/exporter, external key
  and certificate paths, backups, profile version/expiry and signed publication.
- [x] HTTPS credential POST and TLS roster/world connections; SQL schema 5 stores
  hashes of expiring grants and one-use account/character/destination tickets.
- [x] Source-owned handoffs issue fresh destination tickets. Preserve C++ game
  authority and keep database/administrative listeners on loopback.
- [x] Focused Release authority, signature/TLS and real BGFX-channel integration
  checks pass. Native editor capture and ordinary/offline startup checks pass.

See [connection details and evidence](docs/SECURE_CONNECTIONS.md). This completes
this connection goal; the earlier full-MMO/gameplay roadmap gates remain separate.



## 1 November 2026: worker order and per-row lifecycle controls

- [x] Display SQLDMN first, then CHATSRV/DBSRV/ITMSRV/MSGSRV and zones by world/ID,
  matching Start Server's existing sequence.
- [x] Add native Start/Stop/Restart buttons to the left of each worker row, bound
  to its key rather than the currently selected document. Reuse the controller.
- [x] Disable unavailable/disabled/external and pending operations, plus SQLDMN
  Stop/Restart while owned dependents exist. Keep graceful restart/ownership checks.
- [x] Pool visible controls; follow scrolling, filtering, column sizing and DPI.
  Migrate the previous seven-column widths to the new eight-column layout.
- [x] Release manager/service/zone build and isolated Win32 layout capture pass:
  15 rows in startup order, 33 visible native controls with expected enablement,
  old column preferences preserved. Capture inspected. No workers/accounts started
  or copied for the UI fixture. Existing lifecycle controller behaviour was reused;
  this check does not claim a new live worker start/stop/restart session.

No BGFX game rebuild, Debug build or broad regression was needed. The six-part
online completion below remains complete; full MMO acceptance remains open.

## Completed six-part online completion batch (31 October)

- [x] 1. One short live two-client Release graphical session: combat, projectiles,
  party, trade and cash delivery; fix visible issues found.
- [x] 2. Native item icons/tooltips, drag items into trade, explicit confirmations
  and invitation feedback in the connected social windows.
- [x] 3. Source death penalties, resurrection conditions and persistent results.
- [x] 4. Reconnect/restart presence/party recovery, interrupted-trade cancellation
  and pending-cash reconciliation.
- [x] 5. Online altar refining, then source-backed quest services with server authority.
- [x] 6. Cross-zone portal handoff, destination ownership, persistence and party presence.

All six requirements in this batch are checked (100%). This does not close the
full MMO or complete original-game parity. Tantra-B remains168/254 tasks (66%),
with5/10 gates; C08's benchmark, full C09 and all ten per-map acceptances stay open.
Missing authored assets remain recorded and skipped.

### Source recovery completion

The source recovery implementation is complete for this six-part batch.
Native window224 uses the original images and English labels, preserves zero-ID
input and sends types0/2/3/4. MainUI passes1,274 CPU checks; four D3D11 component
captures pass. Castle authority checks cover west220, north228 and saved recovery,
living replay and exact reopened state. Arena authority checks cover the20,000
fee, insufficient-money fallback,20% HP/TP, fixed268,732 destination and fee replay.

Native Zone16.ini funding,100,000,000 start threshold, local-hour/battle/progress
gates and Global events66-73/150 are connected. The900-slot four-second scheduler
runs source notices, entrants, field flags, teleports, summons, winner and prize.
Native200-slot entrant storage is bounded despite the source300-entry IsFull
constant. The source no-winner Award behaviour is retained. Character fee/HP/TP
and position share one revision; global funding uses the native INI persistence,
not a cross-store SQL transaction. Shared fixed recovery cells retain each actor.

Two real network channels now drive original D3D11 HUDs through actual SDL clicks:
arena type2 saves money30,000/position268,732; castle type4 saves money50,000 and a
north-gate position582,305. Both recover positive HP and close the death window;
stopped SQL records and arena funding20,000 match. These are connected HUD-only
checks with controlled native NPC generators, not competitive 3D scene acceptance.
The original Zone17 client scene has an invalid material texture name in
J01_S_GOD_Sgate_01.tmb group7; it is recorded without extracting/replacing assets.
The HUD fixture's unused experience range is unset; its NaN readout is not full
HUD visual acceptance. Original scene/gameplay acceptance remains separate.

Resolved integration failures: early visual combat packets no longer reject a
valid status-only client while its scene is loading; native status still applies.
Correct the focused fixture's reserved NPC handle and low-HP/low-defence setup.
The final connected run passes. Release only; no broad FX regression or Debug build.

### Checked components and current delivery

- Two real `ZFLauncher.exe` processes connected to isolated C++ service/Zone01
  processes and rendered Mandara through D3D11. Both received normal combat and
  skill 3306 projectile/hit events; the projectile submitted native effect geometry.
  Party admission/HP, SDL cursor-carried item icons, exact-instance item exchange,
  two-click review/confirmation and one cash purchase/delivery passed. Screenshots
  were inspected, including the spectator after the recipient correction.
- Native trade icons/tooltips were also inspected in the controlled six-window
  render. Those fixture captures are distinguished from the live session above.
- Live MSGSRV process restart, new-session party/presence rebinding and party chat
  pass. ITMSRV retains a pending debit across process restart without a second debit.
- A focused two-client TCP reconnect check passes automatic delivery of a seeded
  interrupted cash order, before any `/cashrecover` request. Peer and owner reconnect
  preserve party membership; the item remains single and the balance unchanged.
  Disconnect cancels an uncommitted trade without moving money. The stopped ledger
  has no pending order. This check uses client channels rather than graphical input.
- Native DecPrana/DecBP, fatal HP/loss persistence, resurrection-item refund and
  single consumption, potion cooldown and saved-zone ownership checks pass.
  Saved-position resurrection now passes the real online UI and stopped-database
  check. Present-position selection also passes actual SDL input. Native reserved
  slot 70 persists refundable death pranas; recovery clears the value in its commit.
  A focused Release follow-up passes ten recovery-policy cases, including the
  low-level saved-book fallback, Mandara-family recovery and Kruma god-statue
  destinations. The later arena/castle authority and connected HUD checks above
  complete the recovery requirement. Full PvP/siege and per-map graphics remain open.
- The server altar quote/commit and tutorial/task transaction checks pass, including
  costs/rewards/flags, understock rejection, replay protection and reopened data.
  BGFX receives authoritative skill/quest flags and native NPC conditions. Live
  altar cancellation/commit and tutorial dialogue/turn-in now pass, including stopped
  database results. Source quest summons now enter the shared population with
  native class/clan, duplicate prevention, lifetime and non-generator cleanup.
  Global EventList/TaskList callbacks are loaded with matching provenance; class-change
  event56 dispatches skill41347 through its native statue. Quest map summons/removal
  and nested events are connected. Yut quest lookup uses registered winnings and the
  source-disabled betting packets remain disabled; no active casino is claimed.
- The Zone01 -> Zone02 -> Zone01 authority check passes fee-once, cached replay,
  destination claim and prior-owner fencing. Cross-map party/HP/chat survive SQL
  handoff. Two real graphical clients now pass the paid outbound/free return route
  through separate Zone01/Zone02 processes, remote party HP/presence and two-way
  party chat. Stopped SQLite confirms the single fare and both claimed handoffs.
- Current Release launcher, TantraZone and TantraService executables are staged in
  `_client_bgfx` and `bin`, with matching SHA256 hashes. Test profiles, cash credits,
  logs and captures remain outside the client. This is a checked development build;
  the complete MMO and full release acceptance remain open.

### Completed competitive recovery checklist

- [x] Restore native death window224, English labels/images, selected row,
  money gate and request types0/2/3/4. CPU/GPU component checks pass.
- [x] Connect private Zone17 west/north/saved recovery to native portals220/228
  and native HP/TP recovery; living replay and exact persisted reopen pass.
- [x] Implement paid arena recovery:20,000 rupiah, insufficient-money saved
  fallback,20% recovery and the source final position override268,732.
- [x] Read native Data/Zone16.ini arena funding. Add fees only outside an active
  arena; start at100,000,000 only when progress=false, battle=0 and local hour
  is below2 or above10. TNArena::Start initializes the prize/entries and event66.
- [x] Complete event66 closure and native entrant removal/winner/prize flow.
  Matching Global events66-73/150 use actions10010,1000,1010,1011,1090,2090,
  20110,20190,20300,20180,20210,101 and110. Scheduler:900 four-second slots.
  StartSurvival scans x285..<345,z677..<736 and skips GM; source entry storage
  has200 slots despite its separate300-entry IsFull limit. Preserve bounds.
- [x] Check connected competitive SDL confirmation, then audit all six
  requirements and publish the final docs/roadmap/source to main.

Runtime enable/admission still targets ordinary Zone01-10; no default
competitive profile is enabled. Full siege/PvP acceptance remains in C09.
All six batch requirements are checked. Wider Tantra-B remains66%; the full
server plan is unfinished. The retracted legacy-launcher request is excluded.

### Client corrections found during integration

- Restore the original current/saved-position resurrection window and zero-ID button
  dispatch. Permit resurrection-book inventory input while dead; clear dead movement.
- Avoid empty refinement quotes and stale re-quotes while a commit is pending.
- Death level-down remainders no longer produce a false earned-pranas chat line.
- Portal arrival rectangles are not treated as physical TML click locations;
  native client triangle/range selection and server route/action checks are retained.

- Decode remote face/head, level and class from their original appearance offsets.
- Idle keyboard polling preserves click routes; attacks re-route when a monster
  moves away from its previous position. Explicit cancellation clears the intent.
- Read server-learned skill bytes for the UI, and apply authoritative skill/quest
  flags from owner snapshots without resetting movement.
- Missing item catalog/icons are recorded and skipped instead of stopping rendering.
  Item 4364 is recorded as missing in the selected client catalog; nothing is extracted.
- Damage flashes, hit colors and monster-impact recipients follow the actual target.
  Personal combat chat excludes other players' combat; remote attack sounds use
  their actor position.

Evidence: [active batch checkpoint](docs/evidence/online-six-part-20261031.json).
The ordinary resurrection/altar/tutorial UI and cross-zone sessions are checked.
The death chat correction passes its focused regression. The six-part batch is
complete; wider MMO and map acceptance is explicitly outside this completion.

Updated: 2026-10-31. **The complete server plan is not implemented.**
Latest completed batch: periodic/AoE/projectile skills, six social windows and
original country billing adapters with local ledger. Release artifacts are staged;
see the dated continuation and evidence below.

The user resumed this existing C++ project for the BGFX manager/network
connection and MariaDB backend. The 25 October pause is historical;
[its checkpoint](PAUSED_GOAL_PROGRESS.md) retains the earlier evidence.
Rust implementation status does not count as C++ implementation evidence.

## BGFX / MariaDB continuation

### 31 October: inventory, ordinary NPC services and chat controls

- [x] Connect packing/stacking, splits and explicit partial transfers, including
  warehouse transfers, using server item records/maxima and revision-fenced saves.
- [x] Decode peer equipment updates and preserve visible item/refine/dye fields.
- [x] Add server-supplied town NPC catalog positions/goods, native conversation
  scripts, merchant buy/sell, repair, warehouse currency/items and save confirmations.
- [x] Display server rejection/system feedback. Close NPC conversations on movement
  or loss of interaction range; closing clears selection.
- [x] Enforce the selected source chat-filter table, preserve its native EOF handling
  and GM exemptions; persist whisper blocking through `/PreventWhisper ON|OFF`.
- [x] Focused Release checks: native inventory/NPC rules and NPC persistence authority;
  two-client merchant/repair/peer-equipment, warehouse and save-point scenarios.
  All three scenarios also check stack/partial operations and chat preferences/filtering.
- [x] Connect native PC HP/TP recovery on the source's 32-quarter-tick schedule.
  Keep sitting's strict eight-second threshold, Karma/effect gates and native caps;
  save changes before publishing owner/nearby status. Party recipients remain pending.
- [x] Connected continuation: authoritative normal/direct/periodic/area/projectile
  casts, ordinary death/rewards/respawn and MSGSRV/CHATSRV/ITMSRV handlers.
  See the 31 October continuation below for checks and remaining full-parity gates.

Evidence: [transaction/chat batch](docs/evidence/transactions-chat-20261031.json).
Graphical UI/visual acceptance and MariaDB-specific verification of this batch
remain pending. No Debug or broad FX regression matrix was run.

### S01/S02 shared-service continuation

29 October follow-up:

- [x] DBSRV transient whisper routing via authenticated local control API. SQLDMN
  validates source sessions and current zone generations; destination sessions are
  bound to deliveries, preventing stale messages from reaching a reconnect.
- [x] Bounded mailboxes, 10-second delivery expiry, destination result/acknowledgement
  and native rejection flag. Zones pull messages on the authority thread.
- [x] Focused two-zone authority test covers forged/stale identities, offline
  recipients, timeout, rejection and duplicate acknowledgements; live two-client
  BGFX relay check passes in Zone01.
- [x] First S03 slice: authoritative native MOB/cargo item snapshots and whole-item
  bag/equipment moves. The round trip preserves item serial/count/durability/refines
  and confirms no optimistic client mutation.
- [ ] Separate graphical map processes, MariaDB chat-specific verification and
  remaining S04–S06 remain pending. Filter/preferences and ordinary S03 services
  were connected in the 31 October batch above.

Evidence: [relay and inventory checks](docs/evidence/relay-inventory-20261029.json).

- [x] Trace ownership from the original zone/client: nearby/party chat belongs to
  zones, remote whispers route through DBSRV, guild/alliance uses MSGSRV, separate
  rooms use CHATSRV and ItemServer handles cash-item requests.
- [x] Add authenticated nearby chat and same-zone whispers over native normalized
  packets, bounded queues/rate/text sizes and server-derived sender identity.
- [x] Connect BGFX chat input, incoming history, whisper replies and acknowledgement
  handling. Preserve offline chat; clear received deliveries on disconnect.
- [x] Release server/client builds and one isolated two-client integration check:
  mutual visibility, shared NPCs, nearby chat, private delivery and acknowledgement;
  no offline client databases opened.
- [x] Connect normalized MSGSRV party/presence/guild routing, CHATSRV rooms and
  ITMSRV local cash delivery. Original encrypted socket compatibility remains open.
- [ ] Finish the remaining S03–S06 gates. This continuation does not complete the whole plan.

See [contracts and limitations](docs/SHARED_SERVICE_CONTRACTS.md) and
[chat evidence](docs/evidence/shared-chat-20261029.json).

### G01–G05 manager implementation, 29 October

- [x] Guided storage/login/service/zone TOML forms and source-supported native INI
  fields; preserve Advanced editing, comments/unknown keys, hash and stopped locks.
- [x] Local/Private LAN presets, actual roster/admin/player endpoint separation,
  preflight and background database/schema operations.
- [x] Worker/readiness states; real login/zone admission drain with 30-second grace,
  exact owned-job force stop and optional bounded crash restart (default off).
- [x] Paged account search/registration; SQLite and native MariaDB backup/restore,
  manifests, ownership/checksum guards, recovery copy and restored-session fencing.
- [x] Zone metrics/provenance, bounded redacted filtered logs, diagnostics export,
  isolated client preview/launch with tracked handles and Release packaging.
- [x] Focused evidence: configuration/manifest/redaction guards; SQLite restore;
  existing-player retention/new-peer refusal during drain; 15 MariaDB checks
  including exact MOB/cargo restore; two native BGFX transport clients sharing NPCs;
  96-DPI GUI capture, guided Apply/diagnostics export and a 153-file checksummed package.
- [ ] Cross-monitor interactive DPI/layout acceptance and full graphical online
  gameplay remain unverified. Automated native transport clients are not graphical clients.

Run instructions and recovery limits: [manager guide](docs/SERVER_MANAGER_GUIDE.md).
Evidence summary: [manager checks](docs/evidence/manager-g01-g05-20261029.json).

The following checklist records the earlier BGFX/MariaDB foundation:

- [x] Extend the existing C++ Win32 manager.
- [x] Add the MariaDB schema and optional native C++ SQLDMN backend, sharing
  existing account, ownership, character and cargo authority.
- [x] Pass 11 focused MariaDB checks: native creation/login, duplicate sessions,
  atomic cargo/item transfer, stale revisions and fresh-connection persistence.
  Existing SQLite credentials also pass.
- [x] Add Database settings and a BGFX Client launch action.
- [x] Add native DBSRV/zone transport and a shared-world replica path to BGFX.
- [x] Verify the two-client BGFX route through MariaDB, using the private IPv4
  interface, mutual PC visibility and matching shared NPC identities/HP.
- [x] Stage the Release server tools and BGFX launcher; capture the Win32
  settings page. See the evidence summary linked in the BGFX/MariaDB document.
- [x] Add configurable private LAN game listeners while keeping admin/SQL RPC local.
- [ ] Complete public transport, graphical online acceptance and remaining gameplay.
- [ ] Complete M0-M6; partial entry is not a finished MMO.

See [BGFX and MariaDB scope](docs/BGFX_MARIADB.md).
This continuation uses Release builds and focused checks, without a Debug or FX
regression matrix.

## M0 - inventory and contracts

- [x] Create the complete C++/Win32 plan, progress checklist and source-path README.
- [x] Record original/Rust/reference roots and unresolved shared-service boundaries.
- [x] Acquire pinned JSON/TOML/Boost sources and copy only the required SQLite source and icon.
- [ ] Complete the native branch/packet/service contract inventory for the full server.
- [ ] Copy and verify the gameplay regression fixtures against the owned C++ core.

## M1 - centralized Win32 management foundation

- [x] Build all three Windows x64 executables in Debug and Release; core checks pass in both configurations.
- [x] Verify dynamic zone discovery, profile validation and identity/endpoint conflict checks. The CPU suite imports/discovers twelve profiles, rejects duplicates/wildcard conflicts and preserves source hashes.
- [x] Import and structurally validate Zone01-Zone10 with per-zone folders, provenance and localhost endpoints. The dataset-only CLI reports ten zones/five service profiles and game_ready=false; no zone listener started.
- [x] Verify preservation of native settings/comments and recorded owned-copy repairs. CPU checks preserve unknown INI text; Zone08 retains its original WorldSettings beside the recorded leading-character repair.
- [x] Verify bounded authenticated administration, instance ownership and operational SQLite history. One isolated SQLDMN administration process rejects wrong world/token requests and records one clean run.
- [x] Verify exact-process ownership and graceful shutdown for one SQLDMN administration process; reject unowned shutdown requests.
- [ ] Verify complete zone/shared-service dependency startup, restart and failure/drain recovery.
- [x] Implement and render the centralized Win32 dashboard with ten zones/five service rows, command bar, profile/native-settings tabs and log editor. One GUI process opens/closes without starting workers; capture retained.
- [x] Implement dynamic Add Zone, filtering, process actions, stopped-only zone/shared-service profile editing and bounded logs; CPU guards pass. Service edits preserve comments/unknown keys and reject identity changes, live-worker writes and endpoint conflicts.
- [ ] Exercise all GUI actions, failure paths and document editing interactively.
- [x] Implement Common Controls v6/Per-Monitor V2 layout, native fonts, keyboard navigation, saved placement/filter/columns and bounded background snapshots; native GUI capture passes at 96 DPI.
- [ ] Verify mixed-monitor DPI changes, keyboard workflows and saved-state restoration through full GUI acceptance.
- [x] Verify supplied/copied/embedded icon payload and the manager's window icon configuration.
- [x] Build/package Release executables with PowerShell and retain non-interactive BAT flags and GUI launcher. Native headless service lifecycle passes.

## M2 - persistence, authentication and ownership

- [x] Implement the C++ schema-4 persistence library: accounts, three character slots, native snapshots, revisions, deletion backups and atomic cargo/item/money conservation. Six CPU suites pass; worker/RPC integration is tracked separately below.
- [x] Implement native password/web proofs, salted Argon2id and insert-only provisioning APIs. An independent Rust Argon2 fixture and nine native character codec cases pass; no Rust runtime is required.
- [x] Connect and verify the authoritative SQLDMN worker and bounded token-protected TCP RPC, with independent administration capacity. One isolated worker provisions/authenticates, creates a character and preserves it after clean shutdown; game_ready remains false.
- [x] Verify the password-stdin provisioning CLI and activate the packaged SQLDMN storage profile. Isolated CLI checks reject duplicate accounts, preserve comments and start no listeners.
- [x] Implement and verify selected-Philippines web credential/status routes and normalized native login/roster/create/delete in DBSRV. One isolated SQLDMN/DBSRV pair passes fragmentation, name-filter notice, duplicate ownership, reconnect and ordered shutdown. Stock-client wire compatibility remains outside this gate.
- [x] Implement and CPU-check lease expiry, duplicate-owner rejection, stale revisions and zone/character ownership transactions. Native endpoint reconnect acceptance remains open.
- [x] Implement durable handoff reservation, idempotent claim/cancel and reopen/timeout recovery in the persistence library. Cross-zone gameplay acceptance remains open.
- [x] Implement consistent owner-controlled SQLite backups with staged publication and no overwrite; CPU and SQL RPC checks pass.
- [x] Implement bounded account listing and Win32 Accounts/Database pages, native-credential creation dialog and backup action. Data loading and resource checks pass; visual/input acceptance is tracked separately.
- [x] Implement and CPU-check offline restore from this SQLDMN's owned backup folder, with a pre-restore copy, schema/integrity guards, stopped-instance enforcement and invalidation of sessions/zone owners/pending handoffs.
- [x] Exercise the restore CLI in an isolated profile: source backup preserved, pre-restore copy verified and restored sessions invalidated.
- [x] Add the Database restore control, owned-backup picker, explicit confirmation and background stopped-service tool. The helper and Database page rendering pass; interactive picker/confirmation acceptance remains below.
- [x] Verify the live Database page and restore-control rendering with an isolated service pair; no game or zone process started.
- [ ] Complete account-creation dialog, backup button and restore picker/confirmation GUI acceptance.
- [ ] Verify the complete persistence/protocol/ownership route.

## M3 - connected Mandara

- [x] Reuse the engine-independent C++ status/probability core directly, without a Rust ABI. Debug/Release CPU checks match 24 recorded status cases across eight tribes, ordered packet events, Chakra/skill changes and effect expiry; generated native probability comparisons pass (664,211 comparisons). Live zone integration is still pending.
- [x] Implement and Debug-check native IDX/TCM loading, FIRST spawn/recovery and movement guards: 25 recorded spawn cases, 96 speed cases, packed-data failures, blocked cells and actor obstruction.
- [x] Implement and Debug-check PC/NPC appearance and bounded grid delivery against 31 appearance packets and 28 recorded visibility routes, including native border/spiral ordering and slow-peer fencing.
- [x] Implement and Debug-check the single-owner world authority: authentication/selection ownership, CHAR_INIT, calculated status, durable spawn/Chakra/movement, PC visibility, correction, reconnect and failed-save fencing. This CPU route uses isolated SQLite and launches no zone/client process.
- [ ] Verify the bounded native TCP zone worker and SQLDMN/DBSRV dependency lifecycle in one isolated Zone01 route; keep graphical OGRE acceptance separate.
  The first isolated C++ route reached login/CHAR_INIT, then its movement assertion consumed an older initialization UI update. CPU replay reproduces this probe error and verifies the corrected stream handling. The corrected TCP probe is built but has not been relaunched; approval is pending under the no-automatic-retry rule.
- [ ] Connect OGRE online selection -> CHAR_INIT -> Mandara without changing offline saves.
- [ ] Implement PC visibility/appearance, movement, obstruction, correction and reconnect.
- [ ] Implement inventory/equipment, merchants, repair, warehouse and save points.
- [x] Connect source-backed ordinary inventory/equipment moves and native packing/splitting packets to the C++ authority. CPU checks cover occupied-slot rejection, native hand/tribe rules, preserved sitting stance/effects, exact UI flags, status/visual delivery before ACK and failed-save fencing. Connected GUI acceptance remains open.
- [x] Connect account cargo item and Rupiah deposit/withdrawal with native codecs and atomic SQLDMN character/cargo revision/conservation checks. CPU authority checks cover packing, persisted balances, rejected moves and failed cargo commits. Warehouse NPC/UI and fresh TCP acceptance remain open.
- [x] Connect ordinary source-backed merchant buy/sell, repair and save-point packets with one coherent authored NPC/item/portal profile. CPU checks cover native stock/range/serial rules, sale UI-before-credit, repair ACK-before-UI, saved cells surviving refresh, and failed-commit fencing. Cash/limited shops, client dialogue and fresh TCP acceptance remain open.
- [x] Add atomic SQLDMN service commits for one declared sale or durability increase, with both revisions and guards against unrelated item changes, incorrect money deltas and cargo-money changes. CPU authority checks reject five malformed/stale transactions without changing durable state.
- [ ] Verify one isolated connected gameplay/persistence acceptance route.

## M4 - authoritative gameplay

- [x] Add a guarded C++ NPC rule/session component with pinned shared-table lifetime. Release CPU checks match 46 recorded initialization cases, native skills/decks/inspection bytes and RNG; invalid player handles are rejected. It consumes the full 92-column authored Monster export, not the older 48-column gameplay subset. Generation is now connected below; a fresh worker route and full world AI remain open.
- [x] Implement native generator parsing, handle reservations, spatial placement and route preparation. CPU comparisons cover 508 generators, 1,021 route cases and 3,404 pre-Pop cases, retaining native parser quirks, candidate ordering and failed-placement RNG draws.
- [x] Connect initial generation to the zone's coalesced quarter-second timer and shared actor occupancy/visibility. CPU comparisons reproduce 1,702 spawns over 256 callbacks, group links, deck bytes and global RNG for native startup and separately propagated influence; delayed callbacks create no catch-up burst or duplicates.
- [x] Implement native Think/Speak dispatch and verify 18,062 recorded cases, ordered callbacks, text bytes, cast/action locks and RNG. Mandara's empty Pop events are wired before publication. Full world reactions, combat and periodic AI remain pending; unsupported nonempty Pop actions require an actual resolver.
- [x] Implement native NPC detection, direct-source terrain routing and segment/standing control. Release component checks match 4,573 detection, 2,880 route and 1,613 movement-state cases, ordered callbacks and source tables. Undefined edge reads, loops and phase-out accesses are bounded.
- [x] Bind prepared motion state to generated NPCs and connect detection/standing APIs to their retained native aggression/movement decks. CPU ownership checks preserve control, RNG and template coordinates; initial-generation comparisons remain unchanged. Full periodic world AI remains open below.
- [x] Compile native attacker memory, reciprocal combat acquisition and guard/help/link group response with checked handles, arithmetic and callback lifetimes. Five focused CPU scenarios cover source timing, party attribution, immediate AI effects and undefined-input rejection. Generation prepares matching threat identities/group links for all 1,702 NPCs in both comparison modes without changing RNG. Periodic integration remains open below.
- [x] Connect native world speech/group callbacks, retained AI cast/lock/RNG state, live PC mode/FSM ownership and standing-step packet/occupancy publication. CPU checks cover 200 authored speech events, eight moving Mandara NPCs after native waits, a recorded three-member group variant (normal Mandara groups are all zero), preserved PC stance/MOB bytes and required event resolvers. Full periodic ProcessMonster and combat remain open below.
- [x] Connect the ordinary periodic Mandara peace phase after generation: eight-slice timing, native recovery/expiry/status/conditions, strict activation, live detection, ordered Think/reciprocal acquisition and standing actions. CPU checks cover NPC-to-NPC and NPC-to-PC changes, duplicate/delayed ticks, stun and failure fencing. Full battle, special modes and death/respawn remain unfinished; full AI/game readiness stays false.
- [ ] Integrate native generation, detection, movement and ordered AI callbacks.
- [x] Connect ordinary timed flee/roam and native return/warp behavior, source path builders/tables, shared RNG and React 30 to the retained NPC/world owners. CPU checks cover native partial paths, immunity, callbacks, walk/run packets, blockage, stun, idle return timing and destination warp delivery. Combat-driven roam transitions, summon lifecycle and connected acceptance remain open.
- [ ] Implement combat/flee/roam, monster skills, rewards, loot and death/respawn.
- [x] Compile native battle decisions, complete target ranking, pursuit/hit-position functions and skill-pattern selection; bind retained target decks, calculated PC combat state and explicit world pursuit/selection APIs. CPU checks cover target locks/filters, obstruction, native decisions, pending/patterned preparation, deck composition and pursuit delivery. The timed Battle loop, conditions, skill execution, damage/death and connected combat remain unfinished.
- [ ] Implement active skills, costs, preparation/cooldowns and periodic effects.
- [x] Stage native combat correction/judge/RvR/armor inputs and compile original loader/mitigation/shield functions. Bind rolled NPC damage to native Sleep/ManaShield removal, actual-loss credit, HP/time/dead FSM and actor ownership. CPU component/authority checks pass; full casting/PC durability, link/party routing, OnKilled/rewards/respawn and timed combat remain unfinished.
- [ ] Implement XP/leveling, consumables, native death penalties and persistence.
- [x] Compile native DealDamage/PlayDice and connect shared-stream channel rolls, percentage/armor scaling, source gap clamping and actual-loss/durability ordering to NPC damage authority. CPU checks cover exact RNG/channel order, fixed/zero ranges, overkill, retained caster RNG and dead-state delivery. Full casting/hit decisions, PC durability, rewards/respawn and timed Battle remain open.
- [x] Connect native PC receive damage to live actor facts and SQLite character revisions: source Sleep/ManaShield removal, mitigation, PvP two-fifths scaling, zero-loss timestamp semantics and compiled HP/party/dead-FSM tail. CPU checks verify authored NPC-to-PC damage, status refresh, lethal HP persistence, reopened roster data and failed-save fencing. Full casting, PC durability, shared-party/link routing, OnKilled/death penalties and connected acceptance remain open.
- [x] Compile native UpdateEquipDur/get_ArmorType and connect World::deal_damage PC reception/wear through one SQLite character revision before ordered publication. CPU checks cover 14 armor-selection boundaries, hardness/sentinels, strict-negative gear recomputation, native item frames, shared dice/wear RNG, authored NPC-to-PC rolls, reopened gear and failure of the combined commit. Empty-slot undefined notifications are suppressed explicitly. Full casting/hit decisions, shared-party/link services, death/rewards/respawn and connected acceptance remain unfinished.
- [ ] Implement quests, advanced NPC services, religion/class and refinement/combination.
- [ ] Verify native arithmetic/RNG and connected gameplay acceptance.

## M5 - shared services, social systems and travel

- [ ] Implement source-backed MSGSRV, CHATSRV and ITMSRV responsibilities.
- [ ] Implement chat, parties/invitations, trading and guilds with disconnect recovery.
- [ ] Implement transport/portals, remaining resurrection and cross-zone ownership.
- [ ] Validate matching gameplay data/routing for all ten zones.
- [ ] Implement applicable PvP, arena/siege and events.
- [ ] Verify multiplayer ownership and item/money/reward conservation.

## M6 - operational/fidelity/release acceptance

- [ ] Implement restart/backoff, degraded states, crash dumps/recovery and backup recovery.
- [ ] Measure tick/queue/network/database/memory behavior before capacity claims.
- [ ] Verify larger catalogs, all GUI actions, resource lifetime and prolonged operation.
- [ ] Close remaining client INTRO/collision/environment/loading acceptance.
- [ ] Package/verify the complete Release x64 distribution and dependency licenses.
- [ ] Complete the full plan with requirement-by-requirement evidence.

## Current boundary

Management and [SQLDMN persistence](docs/SQLDMN_PERSISTENCE.md) have focused checks.
The C++ store/RPC implements authoritative accounts, native character snapshots,
cargo, leases and ownership transactions. Win32 Accounts/Database load live SQL
data. [DBSRV login and character transport](docs/NATIVE_LOGIN.md) passes an isolated
service route. Connected zone gameplay and other shared roles remain unfinished;
`game_ready=false`. Original source/client/Rust implementations
are unchanged. Opening the manager starts no workers.

[Native world components](docs/NATIVE_WORLD_ENTRY.md) now have Debug/Release CPU
evidence and a packaged TCP worker. One isolated TCP attempt reached CHAR_INIT;
its later stale-UI probe assertion is reproduced and corrected in CPU replay.
The corrected TCP attempt awaits approval, and no worker/client remains running.
The [evidence record](docs/evidence/native-world.json) preserves this boundary.

[Native population and AI components](docs/NATIVE_POPULATION_AI.md) now implement
initial generation in the C++ zone world. The CPU authority route includes NPC
timer publication and shutdown cleanup. This does not complete combat AI,
NPC services, connected client acceptance or the full server plan.

[Native attacker memory and group response](docs/NATIVE_NPC_THREAT.md) now compile
nine original functions and bind generated NPC identities/group links. Source
timing, party credit, immediate AI effects, callback lifetimes and guarded native
undefined cases have CPU checks. [World action/control connections](docs/NATIVE_NPC_WORLD_ACTIONS.md)
now maintain live PC mode/FSM ownership and publish native speech/standing moves.
The [ordinary periodic peace phase](docs/NATIVE_NPC_PEACE_PHASE.md) is now connected
to World::tick. [Flee/roam and return](docs/NATIVE_NPC_FLEE_ROAM.md) now run in the
same noncombat timer loop. Full battle, special-mode/lifecycle services and connected acceptance
remain required before full AI/game readiness can be enabled.

[Battle targeting, pursuit and skill selection](docs/NATIVE_NPC_BATTLE.md) now have
compiled source components and explicit live-world APIs. Player publication binds
calculated combat factors; the timed Battle caller and actual casting/damage/death
services remain unfinished and disabled.

[Native combat tables and NPC damage](docs/NATIVE_DAMAGE.md) now have passing
component/authority checks, with source mitigation, effect removal, actual-loss
credit and HP/dead-state updates. The complete casting, PC durability,
death/reward/respawn and timed combat path remains open.

[Native DealDamage/dice composition](docs/NATIVE_DAMAGE_ROLL.md) now connects
shared rolls, percentage/armor scaling and actual HP-loss reporting to that NPC
receive path. Full casting, PC durability and lifecycle gates
remain required before combat readiness can be enabled.

[Player receive damage and persistence](docs/NATIVE_PLAYER_DAMAGE.md) now bind the
native tail to the live C++ owner and SQLite revisions. Failed saves discard the
tentative session before publication; native zero-loss PvP semantics are retained.
This completes the internal raw-receive/persistence component, while full casting,
PC durability, shared-party/link routing and death/reward/respawn remain unfinished.

[Native equipment wear and world damage composition](docs/NATIVE_EQUIPMENT_DURABILITY.md)
now connect PC reception, original durability rules and one combined HP/equipment
commit. This closes the ordinary receive/wear component; full casting, native hit
packets, shared-party/link services, death/rewards/respawn and timed Battle remain open.

## 2026-10-31 connected combat and shared-service continuation

This section supersedes earlier statements that active casting and all three shared
workers are entirely unimplemented. It describes the C++/BGFX normalized protocol;
original encrypted service/client socket compatibility is not asserted.

- [x] Retained native normal/direct-skill casting, costs, cooldowns, hit decks,
  authored TAB impact markers, actual HP-loss damage, durability and target generations.
- [x] Monster death once, contribution credit, pranas/leveling, ground drops,
  authoritative pickup, reserved-handle respawn and same-zone saved-point resurrection.
- [x] Native recipient affection dispatch with shared source RNG/resistance decks;
  ordinary timed buffs/debuffs, party support and HP/TP recovery recipients.
- [x] MSGSRV presence, invitations, leader/leave rules, party and native guild chat.
  Party membership feeds the zone reward distribution, support eligibility and BGFX
  member/HP roster. CHATSRV implements bounded passworded rooms and member chat.
- [x] Guild registry persists in SQLDMN: native creation fee, same-god admission,
  invitations, master removal, leave, empty-guild disband, roster and announcements.
  The initial management route admits/removes online players in the same zone.
- [x] Player trade: two independent offers, at most eight exact item records each,
  native quest-item restrictions, Rupiah bounds, explicit offer version confirmation,
  changed-offer invalidation, proximity/death/disconnect/timeout cancellation.
  SQLDMN commits both native inventories atomically with conservation/CAS checks
  and a durable receipt. Equipment and non-trade fields cannot change in that commit.
- [x] ITMSRV durable cash wallet/order ledger, authored iCash prices, debit -> SQLDMN
  inventory receipt -> acknowledgement, duplicate suppression and pending-order
  reconciliation after reconnect. Character identity, not an expired session token,
  owns new purchase deliveries. No external payment-provider implementation is claimed.
- [x] BGFX network requests and responses for these operations; ordinary cash NPC
  purchases use the existing merchant interface, with chat commands also available.

### Periodic skills, social windows and local billing (31 October)

- [x] Source-compiled periodic HP damage for PC and NPC recipients, native lanes,
  shields, whole-second effect timing, expiry, pinned caster identity and credited
  deaths. Periodic notifications update HP without replaying cast or hit FX.
- [x] Server-authoritative area recipients and source caster-area exceptions;
  normal, piercing and homing flights use native speeds and fixed 30 Hz steps.
  Authored TAB release/hit markers, costs and cooldowns remain server-owned;
  target session/generation checks reject stale contacts.
- [x] Export native TXL flight/follow bindings alongside animation timings. Record
  and skip missing content: 17 active skill bindings and 21 animation clips.
- [x] Six native-asset BGFX windows: Players, Party, Guild, Trade, Rooms and Cash.
  Connect paging, text entry, selections, membership actions, version-confirmed
  offers, passworded rooms and receipt-fenced purchases to live service handlers.
- [x] Original General, Hanbit and Philippines cash frame adapters, source country
  quote rules, minimum prices, discounts and bundle conversion against the local
  ITMSRV ledger. Schema 2 stores immutable quote context for retries/recovery.
- [x] Release checks: 14 periodic lane/timer cases, 258 native affection-recipient
  cases, 24 status fixtures across eight tribes, cash/trade/guild transactions,
  authoritative skills 3303/3306/3028 and a two-client TCP service round trip.
- [x] D3D11 renders all six social windows with captured TCP state. The projectile
  renderer passes 30 positive damage cases, 18 rendered cases and six lifecycle
  checks; three unresolved FX are recorded and skipped.
- [x] Stage matching Release server binaries in `bin` and the launcher in
  `../_client_bgfx`. Support data, profiles and logs remain outside the client.

Evidence: [periodic/social/billing batch](docs/evidence/periodic-social-billing-20261031.json).
The graphical checks replay captured social state and exercise the existing native
projectile renderer; full interactive two-client gameplay visual acceptance is open.

Remaining full-parity work: linked/special world effects and additional skill/world
policies, native death penalties, alliance/rank/stronghold guild policy, offline
member administration, cross-zone party/travel/rewards and full original social
window/drag-slot/tooltip parity. Stock encrypted transport and external payment
provider integration are not implemented. The user selected original adapters with
a local ledger; a live provider is outside this batch. Full `game_ready` and
`npc_combat_ready` remain false. Local `cash_shop_ready`/`cash_delivery_ready` are
true only with a loaded catalog and available SQLDMN dependency.

### Connected commands

These English BGFX convenience commands invoke source-owned responsibilities over
normalized extensions; they are not claimed to be original stock slash commands.
Slot numbers are one-based. The other player's full offer must be reviewed before
confirming its displayed offer number.

| Command | Example |
| --- | --- |
| Party invite / accept / leave / kick | `/partyinvite BgfxPeer`, `/partyaccept`, `/partyleave`, `/partykick BgfxPeer` |
| Party/guild messages and presence | `/party Ready`, `/guild Hello`, `/online` |
| Open trade | `/trade BgfxPeer` (or `/trade` with a player selected) |
| Replace your trade offer | `/tradeoffer 100 3 5` offers 100 Rupiah and bag slots 3 and 5 |
| Confirm current other offer / cancel | `/tradeconfirm 2`, `/tradecancel` |
| Guild lifecycle | `/guildcreate MandaraGuard`, `/guildinvite BgfxPeer`, `/guildaccept`, `/guildleave`, `/guildkick BgfxPeer`, `/guilddisband` |
| Guild information | `/guildroster`, `/guildannouncement Welcome to Mandara` |
| Cash balance / purchase / interrupted delivery | `/cash`, `/cashbuy 4364 1`, `/cashrecover` |

No test cash is credited to production accounts. Operator credits remain stopped-only
and require a unique order ID. Receipt records must be retained with database backups.
## 6 November 2026: native quest notification offers

Remember server-issued quest offers per normalized NPC, including kill and
cross-NPC notifications without a clicked-NPC header. Consume accepted offers
after durable success and retain the existing entry/range/revision/nonce/trade
checks. The focused authority check passes unsolicited rejection, once-only
native rewards, replay/stale rejection and exact saved reopening; the matching
client component activates and renders Shambala's native quest21 NPC menu.
Deploy matching Release binaries with all11 native worlds ready. Full selected
quest journeys remain open. Evidence:
`_remake_bgfx/docs/evidence/quest-notifications-20261106.json`.

## 6 November 2026: original empty-generator maps

Match CNPCGenerator::ReadNPCGenerator when NPCGener.txt has no '#' sections,
including Marana31/32's original portal-only files. Pass the focused parser
check and matching client population/resource preflights. Deploy matching
Release binaries during zero-player maintenance; all11 existing native worlds
and the admin stub return ready. Native datasets, workbooks, accounts and zone
admission remain unchanged. Preserve the corrected-check evidence and remaining
map asset gaps in `_remake_bgfx/docs/evidence/original-map-assets-20261106.json`.
