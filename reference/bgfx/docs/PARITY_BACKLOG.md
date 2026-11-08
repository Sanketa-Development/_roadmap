# Global Tantra: remaining original-game parity and extension work

Reviewed 8 November 2026. **Full original-game parity is not complete.** The
closed C00-C08 gates and individual feature batches certify their documented
slices, not every original function, skill, map, UI panel or combination.
This is an evidence-backed continuation backlog, not a line-by-line certification
of the whole legacy codebase. No overall completion percentage is inferred.

## What is implemented and should be reused

- Source-based native formats, HPK access, animation/FX foundations and native
  character/stat/session rules; C++ online authority with MariaDB and offline
  SQLite authority kept separate.
- Ordinary inventory/stack/split/equipment, merchant/repair/warehouse/save point,
  represented combat/skills/death/rewards/recovery, chat, party, guild roles/marks,
  trade, local-ledger cash delivery, reconnect/recovery and selected portal/quests.
- Source story interpreter through55 and81/82, table-defined ordinary tasks,
  twelve-offer online personal-shop purchasing/settlement, timed self-consumables,
  selected priest/offerings/class trial flows, altar refinement, Nara26/27/28,
  Chaturanga contributions and configurable vending/Kruma item-use rules.
- K3 default UI and isolated K2 Intro/Main/Loading UI; original K2 intro scene,
  corrected quickbar, saved launcher/game settings and four rendering APIs:
  DX11 default, DX12, OpenGL and Vulkan. API changes require restart.
- Native-pose batching/culling without animation LOD. The100-monster fixture
  measures101->2 submissions; it does not establish live-game FPS or player capacity.
- Strict `userLevel == 1`, exact ASHESHDEV command routing, searchable admin
  commands and native-data monster browser, custom1-1000 spawn and owned cleanup.
- Data Tools, canonical project XLSX exports, signed native connection files,
  signed Patcher.dat updates, per-zone process configuration and zone import.

Read [progress](../PROGRESS.md), [feature scope](CLIENT_FEATURE_EXPANSION.md) and
[the full plan](../IMPLEMENTATION_PLAN.md) for source/evidence links. Completed
results are reused until a relevant code/data change invalidates them.

## Outstanding work

| Area | State and concrete next task |
| --- | --- |
| Original-function coverage | **Incomplete inventory/acceptance.** Finish a function/handler-to-remake matrix for the original client/zone/database services: source location, current handler, selected dataset, authority, implemented/unsupported status and scoped evidence. Do not infer completeness from the presence of a menu or parser entry. |
| Skills, animations and FX | **Partial coverage.** Close remaining K3 skill/effect/recipient families and all claimed ranks, weapon/tribe combinations, timing, area/projectile/periodic interactions, lifecycle/removal and presentation. Rank1 familiar3115/3331/3332 and Taras3121 are accepted slices, not all ranks or all skills. Keep missing bindings/assets explicit. |
| Combat, monster AI and progression | **Partial broad acceptance.** SummonOld casting/follow/orphan handling is now generic across authored NPC templates. Scoped death/refund rules pass and Chaturanga resurrection is excluded. Other CastOnly actions, pets/retainers and linked mechanics remain separate ports. Complete remaining monster/weapon/boss families, navigation/aggro/leash, special summons, source loot/party rewards, death penalties and resurrection paths across supported maps; verify original balance through ordinary progression rather than seeded high-stat fixtures. |
| Quests | **Source interpreter enabled; whole-catalogue journeys open.** Original story IDs0-6,11-55,81/82 and authored task IDs10001-15000 use the existing interpreter, retaining server row/NPC/prerequisite/offer checks. Quest29 and Bukdu46-to47 now have scoped source checks. Finish real dialogue/objective/party/repeat/persistence journeys and missing matching scripts/resources; an enabled interpreter does not accept every branch. |
| Advanced NPC/item services | **Partial.** Native online ordinary instant/cure/mana-shield and timed self-affection items are connected. Finish unsupported callbacks, the premium-reset contract, remaining item phases and transport/return-item paths and any unsupported refinement donation/GM modifiers. Priest/class-trial/refinement slices already work; do not list them as wholly missing. |
| Personal stores | **Ordinary lifecycle implemented; wider acceptance open.** Native imagery/original inventory button and `/shop` expose drag offers, stack count/price, viewing, confirmation and stop. Twelve-offer purchases save both inventories/Rupiah atomically with stale/replay/full-bag/funds/disconnect checks. Default Zone01/level30 remains server enforced. Premium expansion, exact stock layout and live two-player graphical acceptance remain open. |
| Social and competitive systems | **Ordinary party/guild/trade implemented.** Finish remaining alliances/friends/room workflows and full PvP/PK/Karma, duels, arena, castle/siege/war and event lifecycle acceptance. Native dispatcher/condition tests alone do not accept a full war or event. |
| Administrative commands | **Explicitly incomplete.** Current generated registry has203 deduplicated English entries,193 routed Help/Control entries;34 work offline and32 online.161 routed online entries remain unavailable. Examples include /ChangeCaste, /SetQuestEvent, cross-player/zone GM movement, quiz/robot/siege commands and original summon variants. Project FPS helpers do not implement those separate native commands. See [command reference](NATIVE_COMMANDS.md). |
| Zones and travel | **Mixed per-zone acceptance.** Finish each claimed native zone within01-34 using coherent NPCGener/GenerationArea/MapData and matching assets, source identity, environment, NPC/services/combat, portals, return and persistence. Profiles/import success do not prove content parity. Zone36 and later remain excluded. See the current deployment snapshot below. |
| Known map blockers | Zone14/16/17/22/25/34 remain disabled. Zone10 is enabled in configuration but has no native-world implementation selected. Zone19/33 do not have configured native profiles here; the source Zone33 folder/declared45 identity conflict must be resolved with matching evidence. Z25 needs its matching complete MapData.tcm. Wider Z20/21/24/26/28/31/32 scenes/services/encounters and competitive gates remain open despite enabled profiles. |
| UI, rendering, environment and audio | **Represented paths work; full parity open.** Finish remaining original panels/actions and matched views, unsupported FX semantics, map-specific water/weather/fog/day-night/foliage/lighting and actual audio behavior across maps and devices. K2 fixes cover named panels and intro flows; all dialogs/layouts/resolutions are not certified. New APIs and startup fallback passed focused checks on this PC, not a GPU/driver compatibility matrix; the friend laptop remains unverified. Z11 still records missing c1_jina6_TGA.dds/c2_jina6_TGA.dds. |
| Language selection | **Not implemented.** Add saved ENGLISH(default), MEXICO, KOREA, CHINESE, INDONESIA, TAIWAN and JAPANESE selection with complete matching messages, descriptions, encodings, fonts and fallback behavior. Current UI English/locale reading is not a seven-language switcher. |
| Cash/billing | **Local-ledger adapters implemented.** General/Hanbit/Philippines protocol adapters are not a live commercial billing connection. Live provider integration needs the provider contract/test endpoint and its own transaction reconciliation. |
| Full online/offline consistency | **Per-feature coverage exists.** Close remaining divergences with source-backed defaults; preserve the offline launcher and independent local saves. Features requiring other real players or commercial services need explicit offline limits, not fabricated transactions. |

## Extendability and customization

The baseline already supports configurable data without rebuilding ordinary
assets: editable project XLSX, client/server TPA/TXL export, native map folders,
per-zone TOML/INI, signed endpoint export, and GameplayPolicy.json. Global-derived
numeric workbook provenance, K3 skills/FX and current K3 UI contracts are distinct;
K2 resources remain isolated. Do not merge data families by filename alone.

- [ ] Finish versioned schemas and round-trip/bounds checks for every exposed
  extension point. Keep the server variant renamed to TantraParam.tpa on deployment.
- [ ] Extend remaining skill/NPC/quest/event behavior through small documented
  handlers and registries rather than scattered map-ID exceptions. An ordinary
  new zone should use Add Zone/import/preflight; a new special mechanic still
  needs its original service/handler implemented.
- [ ] Keep source-faithful defaults and optional overrides separate. Document
  every intentional gameplay deviation: custom policy, quickbar bindings, target
  HP privacy, launcher/options, UI skins and admin FPS tools are requested changes.
- [ ] Add one scoped source/authority/runtime check with each newly implemented
  behavior, reuse passed results and keep missing capabilities explicit.

Shadow cascades and similar modern enhancements may remain optional; they must
not be confused with an original gameplay requirement or silently change parity mode.

## Release/operations work still open

- [x] Generate the complete player/offline ZIP and signed patch1794133875
  after the current UI/API/admin and native-service changes. Keep sibling
  client/runtime folders; relocated90-frame startup passes with development
  fallbacks disabled. Server binaries are staged separately. This does not close
  separate-PC/public-host gates; Tantra.exe remains an installer bootstrap.
- [ ] Configure a reachable public hostname/IP, matching TLS identity and HTTPS
  patch hosting.172.16.90.12 is LAN only, not public Internet acceptance.
- [ ] Receive the separate clean Windows PC installation/patch/login/saved-return
  result. Only isolated installation on this PC is accepted so far.
- [ ] Resolve the documented63.119ms tick-p95 against the50ms target and establish
  a defensible simultaneous-player cap with sustained mixed gameplay. Two clients
  and100 rendered monsters do not establish thousands of concurrent players.
- [ ] Complete the remaining public-entry/abuse, crash/device recovery, monitoring
  and operator rollback acceptance, reusing already-passed scoped protections,
  backup/restore and patch rollback evidence.
- [ ] Freeze supported zones/skills, tester access, known issues and bug-report
  instructions against the exact release, then make an explicit beta decision.

## Configured primary zone profiles (deployment snapshot)

This table is configuration evidence from `_server_final/zones`, not a declaration
that each map's complete gameplay is accepted. Extra channels are omitted. Native
and player-facing names follow their source identity; do not replace Mandara1st
with NewMandara or enable an unsupported source folder by renaming it.

| Zone | Config state | Selected implementation |
| --- | --- | --- |
| 01 | Enabled | `cpp-native-world` |
| 02 | Enabled | `cpp-native-world` |
| 03 | Enabled | `cpp-native-world` |
| 04 | Enabled | `cpp-native-world` |
| 05 | Enabled | `cpp-native-world` |
| 06 | Enabled | `cpp-native-world` |
| 07 | Enabled | `cpp-native-world` |
| 08 | Enabled | `cpp-native-world` |
| 09 | Enabled | `cpp-native-world` |
| 10 | Enabled | `administration/default` |
| 11 | Enabled | `cpp-native-world` |
| 12 | Enabled | `cpp-native-world` |
| 13 | Enabled | `cpp-native-world` |
| 14 | Disabled | `cpp-native-world` |
| 15 | Enabled | `cpp-native-world` |
| 16 | Disabled | `cpp-native-world` |
| 17 | Disabled | `cpp-native-world` |
| 18 | Enabled | `cpp-native-world` |
| 20 | Enabled | `cpp-native-world` |
| 21 | Enabled | `cpp-native-world` |
| 22 | Disabled | `cpp-native-world` |
| 24 | Enabled | `cpp-native-world` |
| 25 | Disabled | `cpp-native-world` |
| 26 | Enabled | `cpp-native-world` |
| 28 | Enabled | `cpp-native-world` |
| 31 | Enabled | `cpp-native-world` |
| 32 | Enabled | `cpp-native-world` |
| 34 | Disabled | `cpp-native-world` |

For current local runtime state use Server Manager; workers and profiles can
change after this document. Historical source/evidence checkpoints remain intact.
