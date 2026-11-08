# Sanketa BGFX client

The product name is **Sanketa**. See the proposed
[workspace structure and migration plan](../../SANKETA_STRUCTURE_PLAN.md).
Current runtime filenames and compiled application branding have not been changed
by this documentation update.

Windows x64 C++20, SDL3, miniaudio and bgfx with **DirectX11(default), DirectX12,
OpenGL and Vulkan**. Active MMO authority is the C++ `_server_cpp` project.
Full original-game parity is still open; [remaining work](docs/PARITY_BACKLOG.md)
separates missing implementation, partial coverage and unverified combinations.

## Play and settings

- Start `_client_bgfx/Tantra.exe`: combined launcher, signed patching and normal
  online startup. ZFLauncher.exe is started through its launch gate.
- `_client_bgfx/Start-Offline.cmd` keeps the independent offline login, saved roster
  and world authority. It does not require the online services.
- Set Renderer and UI in Tantra.exe Options or in-game Esc > Advance. API changes
  require restart. Display resolution/window/aspect and supported quality settings
  apply live; K3 is default and K2 uses isolated native SYS/HPK/intro resources.
- Music/effects use miniaudio. Settings and saves use the configured external
  profile, not extra project folders inside the client.
- Online connection/patch metadata is signed and exported through Data Tools;
  normal client trust is embedded in HTMessage.txl/serverlist.bin and root Patcher.dat.
  The current endpoint172.16.90.12 is LAN-only. No player-facing Connection editor.

## Administration and FPS workloads

Only authenticated accounts with `userLevel == 1` can use administrator commands.
The exact receiver is ASHESHDEV; retired receiver codes are rejected. Type
`/erichgwapo` for the searchable Administration panel. The Monsters tab browses
native ID/name records with name/ID search, paging and click-to-select. Set
Amount1-1000 and Spawn on monster-enabled ground outside town; Clear My Monsters
removes owned test actors while preserving ordinary spawns. Top-left FPS is
already visible. Existing source-table/range validation still applies.

See [all command spellings, examples and availability](docs/NATIVE_COMMANDS.md).
Registered source-only commands are explicitly unavailable; the FPS helpers do
not turn every original GM command into a working operation.

## Build and data boundaries

From the parent checkout run `build-zflauncher.bat` for the one-click Release build
and staging workflow. Dependencies are pinned by dependencies.lock.json. Reuse
accepted results and follow the root AGENTS.md build/check limits.

Original source/assets and HPKs remain canonical. Project XLSX authoring and
client/server TPA/TXL exports belong to Data Tools; K3 skill/FX/UI requirements
remain explicit. The server export is installed as TantraParam.tpa on the server.
Read [source/client/server layout](docs/PROJECT_LAYOUT.md) before copying files.
Shipped shaders, shared client rules, dependency notices and optional installers live
in `_client_bgfx/runtime`. Offline simulation/zone inputs stay in the optional
`_remake_bgfx/offline-data` add-on. Development saves/settings remain under
`_remake_bgfx/userdata/zflauncher`; portable profiles use `%LOCALAPPDATA%/ZFLauncher`.

- [Implementation plan and bounded gates](IMPLEMENTATION_PLAN.md)
- [Current progress/evidence](PROGRESS.md)
- [Original-game parity and customization backlog](docs/PARITY_BACKLOG.md)
- [Clean layout and publication policy](docs/PROJECT_LAYOUT.md)
- [Feature/zone evidence and known content gaps](docs/CLIENT_FEATURE_EXPANSION.md)
- [C++ server and tools](../_server_cpp/README.md)
- [Connection/security guide](../_server_cpp/docs/SECURE_CONNECTIONS.md)

Current Release client and server workers are staged and patch 1794145414 includes
the current client-local runtime layout. Focused four-API, native-pose100-monster, UI/settings,
admin authority and browser checks are recorded. Those results do not certify
all original gameplay, every graphics driver, public connectivity or player capacity.
The current distribution ZIP is refreshed; separate-player-PC acceptance remains open.

For sharing, use `Global-Tantra-Client-20261108.zip` in
`C:/_GitHub/Tantra-Player-Packages`. Its `client` includes `runtime` and is the
complete online installation. Keep the optional sibling `offline-data` folder for
`client/Start-Offline.cmd`; online play does not need offline server data.
The package builder accepts `--online-only` to omit that add-on.
The source-based ordinary personal shop opens from the inventory shop button or
`/shop`; online purchases are server-authoritative. See the current progress and
parity backlog for premium/item/world-family limits.

Optional legacy DirectX setup is available in Tantra.exe > Options > DirectX setup,
or with `Tantra.exe --directx-setup` without contacting a game server. It requires
player confirmation, Microsoft signature verification, Windows administrator
approval and internet access. Core DirectX11/12 repair belongs to Windows Update.

The offline `ashesh` account is a local administrator (userLevel1), including new
portable profiles. Open its admin panel with `/erichgwapo` after entering the world.
Online permissions remain controlled by the server.

For development updates, build/stage with `build-zflauncher.bat`, then run
`publish-dev-updates.bat` from the parent checkout. Git must be signed in with
write access to Tantra-Development/_update. Its repository is the project-root
`_update` submodule; initialize it with `git submodule update --init -- _update`
after cloning the main project. The helper publishes signed changed
executables/runtime data and client tables; select another resource with
`--include resource/UI/MAINUI.hpk`. Existing testers use Tantra.exe to update
instead of downloading a fresh complete ZIP. Start-Offline.cmd remains independent
of the network; run Tantra.exe's File Check before offline play to fetch updates.
The game server address is unchanged. Bootstrap Tantra.exe updates still require
a fresh base install. Current GitHub publication awaits desktop Git authentication.
After a successful publication, existing testers can copy `_update` repository's
`bootstrap/Patcher.dat` into their client root once to select the development feed.
The repository root `Patcher.dat` is a release descriptor, not client configuration.
