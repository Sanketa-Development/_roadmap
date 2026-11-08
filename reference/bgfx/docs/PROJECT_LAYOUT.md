# Sanketa source, client and server layout

The active workspace is `C:/_GitHub/Sanketa-Development`. Read the parent
`SANKETA_STRUCTURE_PLAN.md` and `HANDOFF.md` for migration/verification status.

| Path | Responsibility |
| --- | --- |
| `_client/source` | C++20/BGFX client and launcher source, shaders and tools. |
| `_client/clean` | Runnable client, native resources and `runtime/` assets. |
| `_client/offline-data` | Optional offline authority/zone inputs, outside the client. |
| `_server/source` | C++ services, zone worker, Manager and Data Tools. |
| `_server/clean` | Configured server deployment; private state stays ignored. |
| `shared` | Parent-owned connection/message/gameplay contracts. |
| `data/xlsx` | Parent-owned canonical project workbooks. |
| `_reference/tantra` | Private original source used by native generators. |
| `_docs` | Documentation/roadmap submodule. |
| `_update` | Private signed feed repository; active patching stays on LAN. |
| `build/client`, `build/server` | Ignored generated build trees. |
| `dist` | Ignored player packages. |

Client, server, references, docs and updates are separate submodules. Preserve
original HPKs, both UI skins, native filenames and required notices. Do not extract
HPKs to repopulate loose files or put source/server secrets in the player client.

Profiles/logs are external to the clean client. The original development saves
were preserved privately; portable profiles retain LOCALAPPDATA/ZFLauncher paths.
Server exports generate TantraParam_sv.tpa and install it as TantraParam.tpa.

MariaDB remains at 127.0.0.1:13306 using the existing private datadir at
`C:/_GitHub/TantraSrc/_server_final/database/data`. Do not remove that directory.
The code migration does not relocate or recreate the live database.

Staging and package ownership use the existing manifest tools. Reuse accepted
checks; do not repeat gameplay tours for a path-only migration.
