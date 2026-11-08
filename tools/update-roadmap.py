"""Refresh the static Tantra roadmap from checked source-plan tasks. No network/build/runtime."""
import argparse, hashlib, json, re, shutil
from pathlib import Path
ROOT=Path(__file__).resolve().parents[1]
DOCS=ROOT

def text(path):
    value=path.read_bytes().decode('utf-8',errors='surrogateescape')
    return re.sub(r'[\udc80-\udcff]',lambda m:m[0].encode('utf-8',errors='surrogateescape').decode('cp1252',errors='replace'),value)
def plain(value):
    value=re.sub(r'\[([^]]+)\]\([^)]+\)',r'\1',value)
    return re.sub(r'\s+',' ',value.replace('**','').replace('`','')).strip(' —-')
def coverage(done,total):
    return (200*done+total)//(2*total) if total else 0
def phases(path,bgfx=False):
    groups=[];group=None;task=None;notes=False;seen=set()
    for raw in text(path).splitlines():
        line=raw.strip()
        heading=re.match(r'### (C\d\d) (.+)',line) if bgfx else re.match(r'## Phase (\d+)\s*[—–\-\ufffd]\s*(.+)',line)
        if heading:
            code=heading[1] if bgfx else 'P'+heading[1].zfill(2)
            group={'id':code,'title':plain(heading[2]),'tasks':[],'gate':None};groups.append(group);task=None;notes=False;continue
        if line.startswith('## '):group=None;task=None;notes=False
        if not group:continue
        found=re.match(r'^(\s*)- \[([xX ])\] \*\*([^*]+)\*\*\s*[—–\-\ufffd]?\s*(.*)',raw)
        if found and not found[1]:
            identifier=found[3]
            if identifier in seen:raise ValueError('Duplicate task ID: '+identifier)
            seen.add(identifier)
            task={'id':identifier,'done':found[2].lower()=='x','text':plain(found[4]),'children':[]}
            if identifier.endswith('GATE'):group['gate']=task
            else:group['tasks'].append(task)
            notes=True;continue
        child=re.match(r'^\s+- \[([xX ])\]\s*(.+)',raw)
        if child and task:
            task['children'].append({'done':child[1].lower()=='x','text':plain(child[2])});notes=False;continue
        if not line:notes=False
        elif notes and task and raw.startswith(' ') and not line.startswith(('|','<','#','- ')):
            task['text']+=' '+plain(line)
    for group in groups:
        group['done']=sum(task['done'] for task in group['tasks']);group['total']=len(group['tasks'])
        group['percent']=coverage(group['done'],group['total'])
    if len(groups)!=(10 if bgfx else 14):raise ValueError('Unexpected plan grouping')
    return groups

def build(bgfx_root=None):
    if bgfx_root:
        names=['README.md','IMPLEMENTATION_PLAN.md','PROGRESS.md','docs/NATIVE_COMMANDS.md','docs/PARITY_BACKLOG.md','docs/PROJECT_LAYOUT.md']
        names += [str(path.relative_to(bgfx_root)).replace('\\','/') for path in (bgfx_root/'docs/evidence').glob('*.json')]
        for name in names:
            target=ROOT/'reference/bgfx'/name;target.parent.mkdir(parents=True,exist_ok=True);shutil.copy2(bgfx_root/name,target)
    inputs={'ogre_plan':ROOT/'reference/ogre/IMPLEMENTATION_PLAN.md','ogre_progress':ROOT/'reference/ogre/PROGRESS.md','bgfx_plan':ROOT/'reference/bgfx/IMPLEMENTATION_PLAN.md','bgfx_progress':ROOT/'reference/bgfx/PROGRESS.md'}
    inputs.update(bgfx_commands=ROOT/'reference/bgfx/docs/NATIVE_COMMANDS.md',bgfx_parity=ROOT/'reference/bgfx/docs/PARITY_BACKLOG.md',bgfx_layout=ROOT/'reference/bgfx/docs/PROJECT_LAYOUT.md')
    ogre=phases(inputs['ogre_plan']);bgfx=phases(inputs['bgfx_plan'],True)
    projects=[{
        'id':'tantra-o','name':'Tantra-O','engine':'OGRE 14.6.1 · Direct3D11 · SDL3','launcher':'HTLauncher.exe',
        'stage':'Playable offline foundations','lead':'Rebuilding Tantra Online with its original world, assets and gameplay rules.',
        'description':'The OGRE remake reaches Mandara with the native INTRO, MainUI, offline authority and ordinary services. Full gameplay, online integration and release acceptance remain open.',
        'plan':'reference/ogre/IMPLEMENTATION_PLAN.md','progress':'reference/ogre/PROGRESS.md','groups':ogre,
        'foundations':['Windows x64 launcher, SDL3 input and original HPK resources','Offline login, character lifecycle and Mandara CHAR_INIT','MainUI, calculated status, Chakra, skill learning and quick slots','Warehouse/save-point transactions and SQLite persistence checked','Native command emotes, skill tooltips and animation-impact damage implemented'],
        'next':['After launch authorization, run the prepared saved-field route once and review framing/audio','Finish item phases, advanced skills, monster AI and combat progression','Complete quests, travel and real C++ server multiplayer','Accept environment fidelity, loading performance and every zone'],
        'changes':[{'date':'2026-10-26','title':'Focused saved-roster route prepared','text':'Saved-field SDL route, framing/movement traces and persisted-state auditor are implemented and CPU-checked. Both clients are rebuilt; the broader goal is paused and launch authorization remains unanswered. No new runtime acceptance is claimed.'},{'date':'2026-10-26','title':'Accepted item-use feedback','text':'Original use sound 33010 now follows durable ordinary, timed and repeat consumption. Feedback/SQLite and packed-WAV checks pass; source item model FX remains disabled and audible/game acceptance remains open.'},{'date':'2026-10-26','title':'Repeat-use consumable stat buffs','text':'Supported repeat items now use source 59-second toggles, remaining-count FX and exact-key depletion/cancellation. Five focused CPU checks and both staged clients pass; rendered and mixed item-phase acceptance remains open.'},{'date':'2026-10-26','title':'Ordinary timed consumable buffs','text':'Ten authored stat-buff records now use native replacement, expiry and durable consumption. Five focused CPU checks and both packages pass; in-game, repeat-use and mixed-phase item acceptance remain open.'},{'date':'2026-10-26','title':'Native item quick-slot lifecycle','text':'Exact inventory keys and native linked-list replacement now follow accepted moves, swaps, stack consumption and removal. Three focused CPU checks and both staged clients pass; rendered and specialized item-result acceptance remains open.'},{'date':'2026-10-26','title':'Native ground-item feedback','text':'Accepted pickup/drop replies now drive original item/Rupiah messages, source history colour and accepted-drop sound IDs. CPU checks pass; rendered and audible acceptance remains open.'},{'date':'2026-10-26','title':'Ground items and pickup stacking','text':'Manual drop confirmation and native partial pickup now save before ground-state changes. Focused CPU/SQLite rejection checks and both staged clients pass; rendered, ownership and decay acceptance remain open.'},{'date':'2026-10-26','title':'Ordinary item cooldowns','text':'Accepted authority deadlines now drive native FX and silent blocking on both quick bars. Three focused CPU checks and both staged packages pass; in-game and continuous-item acceptance remain open.'},{'date':'2026-10-26','title':'Native skill tooltips','text':'Localized requirements, five effect lanes and current/next-level descriptions. CPU checks cover 1,303 profiles; rendered acceptance remains open.'},{'date':'2026-10-26','title':'Commands and emotes','text':'Original command bindings and icons, five common actions and three native emotes. Rebuilt clients are staged; in-game acceptance remains pending.'},{'date':'2026-10-26','title':'Mandara service acceptance','text':'One offline attempt completed warehouse/save services and persistence checks. Its FX parsing failures were corrected; corrected-build diagnostics and camera acceptance remain open.'}]
    },{
        'id':'tantra-b','name':'Sanketa','engine':'bgfx / DX11, DX12, OpenGL, Vulkan / SDL3','launcher':'Tantra.exe -> ZFLauncher.exe',
        'stage':'Connected native C++ MMO; full parity remains open','lead':'Global Tantra: original-source gameplay with explicit feature and release gates.',
        'description':'Native C++ online and offline authorities, K3/K2 UI and four rendering APIs have scoped acceptance. Closed foundations and enabled zones do not establish full original-game parity or public beta readiness.',
        'plan':'reference/bgfx/IMPLEMENTATION_PLAN.md','progress':'reference/bgfx/PROGRESS.md','groups':bgfx,
        'foundations':['C++20 x64 client and native C++ MMO services, MariaDB/SQLite and signed transport','Original native HPK resources, animation/FX and distinct K3/K2 UI/intro scenes','Ordinary inventory, NPC services, combat and selected quest/zone slices','Connected chat, party, guild roles, trade, local cash ledger and persistence','DX11 default plus DX12/OpenGL/Vulkan; saved launcher and in-game settings','Native-pose batching/culling without animation LOD; strict admin monster browser/spawn tools','Canonical project XLSX/Data Tools, zone import and server-side gameplay policies'],
        'next':['Complete original function/handler coverage and remaining skill/rank/monster families','Finish remaining quests/services, alliances, personal-store settlement and competitive events','Accept each claimed native zone within01-34; resolve missing or conflicting source data','Implement seven-language selection and finish full UI/environment/FX/audio parity','Close versioned customization contracts and public package/PC/host/capacity gates'],
        'changes':[{'date':'2026-11-09','title':'Sanketa workspace and private submodules','text':'Histories and pending work migrate into Sanketa-Development. One Release build batch and focused startup/export/offline/signed-LAN checks pass. Every repository has a README and parent HANDOFF.md records continuation. Existing database data stays in place; gameplay parity and separate-PC acceptance remain open.'},{'date':'2026-11-08','title':'Searchable native monster browser','text':'Administration lists1143 native data entries, name/ID search, paging and click selection. Editable amounts, owned cleanup, strict account role and exact ASHESHDEV routing remain enforced. Focused SDL and authority evidence is scoped.'},{'date':'2026-11-08','title':'Four rendering APIs and K2/K3','text':'Saved launcher/in-game DX11, DX12, OpenGL and Vulkan selection with separate shaders; restart to switch APIs. Isolated K2 SYS/HPK/intro resources retain K3 defaults. Focused checks on this PC do not certify every GPU or dialog.'},{'date':'2026-11-08','title':'Native-pose batching, cleanup and parity backlog','text':'100-monster component submissions reduce101->2 without animation LOD. Clean client layout and source publication exclude local dumps, archives and profiles. Explicit original-game parity, customization and release work stays open.'},{'date':'2026-11-07','title':'Offerings, Nara28 and editable rules','text':'Selected native contribution and quest chains, persisted results, vending zone/level policy and Kruma teleport-item restrictions have scoped authority/client evidence. These selected flows do not complete all original content.'}]
    }]
    for project in projects:
        project['done']=sum(group['done'] for group in project['groups']);project['total']=sum(group['total'] for group in project['groups'])
        project['percent']=coverage(project['done'],project['total'])
        project['accepted']=sum(bool(group['gate'] and group['gate']['done']) for group in project['groups'])
    data={'reviewed':'2026-11-09','method':'Checked named top-level tasks / named top-level tasks. Nested subtasks and acceptance gates are displayed but excluded from the percentage. Different project checklists are not a cross-renderer comparison or release-readiness estimate.','projects':projects,
        'zones':[{'zone':f'Zone{i:02}','map':40000+i,'name':name,'accepted':False} for i,name in enumerate(['Mandara1st','Mandara2nd','MandaraCave','MandaraCave2nd','MandaraCave3rd','MandaraCave4th','Jina1st','Jina2nd','Jina3rd','NewKruma / Jina4th'],1)],
        'sources':{key:{'path':str(path.relative_to(DOCS)).replace('\\','/'),'sha256':hashlib.sha256(path.read_bytes()).hexdigest()} for key,path in inputs.items()},
        'reference':{'repository':'https://github.com/AsheshDevelopment/zGenesis','file_sha':'d72de49e3bf103e8ebceeb0d1ec2b2a537575364','adapted':'Static hash navigation, dark editorial layout, progress bars, task accordions and changelog structure. No GENESIS product content or password digest is reused.'}}
    data['native_scope']={'minimum':1,'maximum':34,'full_parity':False,'extended_status':'reference/bgfx/docs/PARITY_BACKLOG.md'}
    for zone in data['zones']:zone['baselineAccepted']=int(zone['zone'][4:]) in range(1,10)
    (ROOT/'assets/roadmap-data.js').write_text('/* Generated by tools/update-roadmap.py; do not edit task status here. */\nwindow.TANTRA_ROADMAP = '+json.dumps(data,ensure_ascii=False,indent=2)+';\n',encoding='utf-8')
    (ROOT/'snapshot.json').write_text(json.dumps({'reviewed':data['reviewed'],'method':data['method'],'sources':data['sources'],'reference':data['reference'],'projects':[{key:project[key] for key in ('id','done','total','percent','accepted')} for project in projects]},indent=2)+'\n',encoding='utf-8')
    print(json.dumps([{'project':p['name'],'tasks':f"{p['done']}/{p['total']}",'coverage':p['percent'],'gates':f"{p['accepted']}/{len(p['groups'])}"} for p in projects]))
if __name__=='__main__':
    parser=argparse.ArgumentParser(description=__doc__);parser.add_argument('--bgfx-root',type=Path);args=parser.parse_args();build(args.bgfx_root)
