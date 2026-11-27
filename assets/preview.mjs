import { unseal } from './crypto.mjs';

const issueTypes = ['Animation', 'Direction', 'Height', 'Sound', 'Other'];
const mediaDirectory = new URL('./preview/', import.meta.url);
const encoder = new TextEncoder();

export async function loadSkillPreview(password) {
  const response = await fetch(new URL('index.enc.json', mediaDirectory), {cache: 'no-store'});
  if (!response.ok) throw new Error('Preview index unavailable');
  const index = await unseal(await response.json(), password);
  if (index.version !== 1 || !Array.isArray(index.clips) || !index.clips.length ||
      index.clips.some(clip => !/^3\d{3}$/.test(clip.id))) throw new Error('Invalid preview index');
  const bytes = Uint8Array.from(atob(index.mediaKey), character => character.charCodeAt(0));
  const key = await crypto.subtle.importKey('raw', bytes, 'AES-GCM', false, ['decrypt']);
  return {clips: index.clips, wearables: Array.isArray(index.wearables) ? index.wearables : [],
    k2Dialogs: Array.isArray(index.k2Dialogs) ? index.k2Dialogs : [], key, revision: index.revision};
}

async function loadPreviewMedia(data, id, extension, type, signal) {
  const path = new URL(`${id}.${extension}.enc`, mediaDirectory);
  path.searchParams.set('v', data.revision);
  const response = await fetch(path, {signal});
  if (!response.ok) throw new Error('Preview media unavailable');
  const bytes = new Uint8Array(await response.arrayBuffer());
  const decoded = await crypto.subtle.decrypt({name: 'AES-GCM', iv: bytes.subarray(0, 12),
    additionalData: encoder.encode(id)}, data.key, bytes.subarray(12));
  return new Blob([decoded], {type});
}

function loadRecording(data, id, signal) {
  return loadPreviewMedia(data, id, 'mp4', 'video/mp4', signal);
}

function createPlayback(data) {
  let playing;
  function stop() {
    if (!playing) return;
    const {request, player, play, url} = playing;
    playing = undefined;
    request.abort();
    player.pause(); player.removeAttribute('src'); player.load(); player.hidden = true;
    if (url) URL.revokeObjectURL(url);
    play.textContent = 'Play'; play.hidden = false; play.disabled = false;
  }
  async function start(clip, player, play, status) {
    stop();
    const request = new AbortController();
    const playback = {request, player, play}; playing = playback;
    play.textContent = 'Loading…'; play.disabled = true; status.textContent = '';
    try {
      const media = await loadRecording(data, clip.id, request.signal);
      if (playing !== playback) return;
      playback.url = URL.createObjectURL(media);
      player.src = playback.url; player.hidden = false; play.hidden = true;
      await player.play().catch(() => {});
    } catch {
      if (playing !== playback) return;
      stop(); status.textContent = 'The recording could not load. Try playing it again.';
    }
  }
  return {start, stop};
}

function renderWearables(panel, data, el, button) {
  const sets = data?.wearables ?? [];
  const heading = el('div', 'page-intro');
  heading.append(el('h2', '', 'Wearables'));
  panel.append(heading);
  if (!sets.length) {
    panel.append(el('p', 'empty-state', 'No wearable previews are available yet.'));
    return {};
  }

  const entries = new Map();
  let enabled = false, motion = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const load = entry => {
    if (entry.request || !entry.players.length) return;
    const request = new AbortController();
    entry.request = request;
    for (const {id, player, status} of entry.players) {
      status.hidden = true;
      loadRecording(data, id, request.signal).then(media => {
        if (entry.request !== request) return;
        player.src = URL.createObjectURL(media);
        return player.play();
      }).catch(() => { if (entry.request === request) status.hidden = false; });
    }
  };
  const unload = entry => {
    if (!entry.request) return;
    entry.request.abort(); entry.request = undefined;
    for (const {player, status} of entry.players) {
      player.pause();
      if (player.src.startsWith('blob:')) URL.revokeObjectURL(player.src);
      player.removeAttribute('src'); player.load(); status.hidden = true;
    }
  };
  const observer = new IntersectionObserver(changes => {
    for (const change of changes) {
      const entry = entries.get(change.target);
      if (enabled && motion && change.isIntersecting && !change.target.hidden) load(entry);
      else unload(entry);
    }
  }, {threshold: .15});
  const observe = () => { if (enabled && motion) for (const row of entries.keys()) if (!row.hidden) observer.observe(row); };
  const release = () => { observer.disconnect(); for (const entry of entries.values()) unload(entry); };
  const toggle = button(motion ? 'Pause motion' : 'Play motion', () => {
    motion = !motion;
    toggle.textContent = motion ? 'Pause motion' : 'Play motion';
    if (motion) observe();
    else release();
  }, 'text-link');
  heading.append(toggle);

  if (sets.length > 1) {
    const search = el('input', 'search wearable-search');
    search.type = 'search'; search.placeholder = 'Find a set or item'; search.setAttribute('aria-label', 'Find a wearable set or item');
    const count = el('p', 'muted skill-result-count', `${sets.length} sets`); count.setAttribute('role', 'status');
    search.addEventListener('input', () => {
      const query = search.value.trim().toLowerCase();
      let shown = 0;
      for (const [row, entry] of entries) {
        row.hidden = !entry.searchText.includes(query);
        if (row.hidden) { observer.unobserve(row); unload(entry); }
        else ++shown;
      }
      observe(); count.textContent = `${shown} of ${sets.length} sets`;
    });
    panel.append(search, count);
  }

  for (const set of sets) {
    const row = el('section', 'wearable-set');
    const players = [];
    entries.set(row, {players, searchText: [set.name, ...set.items.flatMap(item => [item.name, item.id])].join(' ').toLowerCase()});
    const info = el('div', 'wearable-info');
    const eligible = set.tribes.filter(tribe => tribe.restriction !== 'Tribe restricted').length;
    info.append(el('h3', '', set.name), el('p', 'muted', `${set.items.length} pieces · ${eligible} ${eligible === 1 ? 'tribe' : 'tribes'}`));
    const items = el('ul');
    for (const item of set.items) {
      const entry = el('li');
      entry.append(el('strong', '', item.name), el('span', 'muted', `ID ${item.id} · Lv. ${item.level}`));
      items.append(entry);
    }
    info.append(items);
    row.append(info);

    const lineup = el('div', 'wearable-lineup');
    lineup.setAttribute('role', 'region'); lineup.setAttribute('aria-label', `${set.name} tribe previews`);
    lineup.tabIndex = 0;
    for (const tribe of set.tribes) {
      const card = el('figure', 'wearable-tribe');
      if (!tribe.id) {
        card.append(el('div', 'wearable-placeholder muted', tribe.restriction), el('figcaption', '', tribe.name));
        lineup.append(card); continue;
      }
      const player = el('video');
      player.loop = true; player.muted = true; player.playsInline = true; player.preload = 'none';
      player.poster = `data:image/jpeg;base64,${tribe.poster}`;
      player.setAttribute('aria-label', `${tribe.name} wearing ${set.name} in idle animation`);
      const status = el('span', 'muted', 'Playback unavailable'); status.hidden = true;
      players.push({id: tribe.id, player, status});
      card.append(player, el('figcaption', '', tribe.name), status);
      lineup.append(card);
    }
    row.append(lineup);
    panel.append(row);
  }
  return {
    start() { if (!enabled) { enabled = true; observe(); } },
    stop() { enabled = false; release(); }
  };
}

function renderK2Dialogs(panel, data, el, button) {
  const dialogs = data?.k2Dialogs ?? [];
  const reservedCount = dialogs.filter(dialog => dialog.status === 'reserved').length;
  const intro = el('div', 'page-intro');
  intro.append(el('h2', '', 'K2 UI'), el('p', '', 'Browse the authored Main, Intro, and Loading dialogs. Previews show the original artwork and default controls. In-game values are supplied at runtime.'));
  panel.append(intro);
  if (!dialogs.length) {
    panel.append(el('p', 'empty-state', 'The K2 dialog catalog is unavailable.'));
    return {};
  }

  const groups = {main: 'Main UI', intro: 'Intro UI', load: 'Loading UI'};
  const gallery = el('div', 'k2-gallery');
  const sidebar = el('div', 'k2-browser');
  const filters = el('div', 'k2-filters');
  const search = el('input');
  search.type = 'search';
  search.placeholder = 'Search name or dialog ID';
  search.setAttribute('aria-label', search.placeholder);
  const family = el('select');
  family.setAttribute('aria-label', 'Dialog group');
  const families = [['', 'All UI dialogs'], ...Object.entries(groups)];
  if (reservedCount) families.push(['reserved', `Reserved IDs (${reservedCount})`]);
  for (const [id, label] of families) {
    const option = el('option', '', label);
    option.value = id;
    family.append(option);
  }
  const count = el('p', 'muted');
  const list = el('ul', 'k2-dialog-list');
  filters.append(search, family);
  sidebar.append(filters, count, list);

  const viewer = el('figure', 'k2-viewer');
  const caption = el('figcaption');
  const title = el('h3');
  const meta = el('p', 'muted');
  const image = el('img');
  image.hidden = true;
  const canvas = el('div', 'k2-canvas');
  const status = el('p', 'muted');
  status.setAttribute('role', 'status');
  caption.append(title, meta);
  canvas.append(image, status);
  viewer.append(caption, canvas);
  gallery.append(sidebar, viewer);
  panel.append(gallery);

  let selected = dialogs.find(dialog => dialog.id === 'k2-main-1007') ?? dialogs[0];
  let request, url;
  let active = false;
  function release() {
    request?.abort();
    request = undefined;
    image.hidden = true;
    image.removeAttribute('src');
    if (url) URL.revokeObjectURL(url);
    url = undefined;
  }
  async function show() {
    release();
    title.textContent = selected?.title ?? 'No matching dialogs';
    meta.textContent = selected ? `${groups[selected.group]} · ${selected.number} · ${selected.name} · ${selected.source}` : '';
    if (!selected) {
      status.textContent = 'Try a different name, ID, or group.';
      return;
    }
    if (selected.status !== 'art') {
      status.textContent = selected.status === 'reserved'
        ? 'Reserved dialog ID. The source layout declares no visible controls.'
        : 'The source layout contains no standalone artwork for this dialog.';
      return;
    }
    if (!active) {
      status.textContent = '';
      return;
    }
    const load = new AbortController();
    request = load;
    status.textContent = 'Loading preview…';
    try {
      const picture = await loadPreviewMedia(data, selected.id, 'webp', 'image/webp', load.signal);
      if (request !== load) return;
      url = URL.createObjectURL(picture);
      image.alt = `${selected.title} · K2 dialog ${selected.number}`;
      image.src = url;
      await image.decode();
      if (request !== load) return;
      image.hidden = false;
      status.textContent = selected.missing ? 'Some authored artwork is missing from the K2 packs.' : '';
    } catch {
      if (request === load) status.textContent = 'The dialog preview could not be loaded.';
    }
  }

  const rows = dialogs.map(dialog => {
    const row = el('li');
    const select = button(dialog.title, () => {
      if (selected === dialog) return;
      selected = dialog;
      updateSelection();
      show();
    });
    select.append(el('small', 'muted', `${groups[dialog.group]} · ${dialog.number}`));
    row.append(select);
    list.append(row);
    return {dialog, row, select};
  });
  function updateSelection() {
    for (const {dialog, select} of rows) select.setAttribute('aria-pressed', String(dialog === selected));
  }
  function filter() {
    const query = search.value.trim().toLowerCase();
    const onlyReserved = family.value === 'reserved';
    let first = null;
    let matches = 0;
    for (const {dialog, row} of rows) {
      row.hidden = (dialog.status === 'reserved') !== onlyReserved ||
        Boolean(!onlyReserved && family.value && dialog.group !== family.value) ||
        !`${dialog.number} ${dialog.title} ${dialog.name}`.toLowerCase().includes(query);
      if (row.hidden) continue;
      first ??= dialog;
      matches++;
    }
    count.textContent = onlyReserved ? `${matches} of ${reservedCount} reserved IDs` :
      `${matches} of ${dialogs.length - reservedCount} dialogs`;
    if (!rows.some(({dialog, row}) => dialog === selected && !row.hidden)) selected = first;
    updateSelection();
    show();
  }
  search.addEventListener('input', filter);
  family.addEventListener('change', filter);
  filter();
  return {
    start() { if (!active) { active = true; show(); } },
    stop() { active = false; release(); }
  };
}

export function renderPreviewSections(page, data, el, button) {
  const categories = [['skills', 'Skills'], ['wearables', 'Wearables'], ['weapons', 'Weapons'],
    ['fashions', 'Fashions'], ['mounts', 'Mounts'], ['k2-ui', 'K2 UI']];
  const navigation = el('nav', 'item-tabs preview-categories');
  navigation.setAttribute('aria-label', 'Preview categories');
  page.append(navigation);
  const sections = new Map();
  for (const [id, label] of categories) {
    const link = el('a', 'item-tab', label);
    link.href = `#preview?category=${id}`;
    const panel = el('section', 'preview-section'); panel.hidden = true;
    navigation.append(link); page.append(panel);
    sections.set(id, {link, panel});
    if (id !== 'skills' && id !== 'wearables' && id !== 'k2-ui')
      panel.append(el('h2', 'preview-empty-heading', label), el('p', 'empty-state', 'No recordings are available in this category yet.'));
  }
  const stopSkills = renderSkillPreview(sections.get('skills').panel, data, el, button);
  const wearables = renderWearables(sections.get('wearables').panel, data, el, button);
  const k2 = renderK2Dialogs(sections.get('k2-ui').panel, data, el, button);
  return {
    select(hash) {
      const requested = new URLSearchParams(hash.split('?')[1]).get('category');
      const category = sections.has(requested) ? requested : 'skills';
      for (const [id, {link, panel}] of sections) {
        panel.hidden = id !== category;
        if (id === category) link.setAttribute('aria-current', 'page');
        else link.removeAttribute('aria-current');
      }
      if (category !== 'skills') stopSkills?.();
      if (category === 'wearables') wearables.start?.();
      else wearables.stop?.();
      if (category === 'k2-ui') k2.start?.();
      else k2.stop?.();
    },
    stop() { stopSkills?.(); wearables.stop?.(); k2.stop?.(); }
  };
}

export function createSkillRecordingDialog(page, data, el, button) {
  if (!data) return;
  const clips = new Map(data.clips.map(clip => [clip.id, clip]));
  const {start, stop} = createPlayback(data);
  const dialog = el('dialog', 'skill-recording');
  const header = el('div', 'source-header');
  const title = el('h2'); title.id = 'skill-recording-title';
  dialog.setAttribute('aria-labelledby', title.id);
  const close = () => { stop(); if (dialog.open) dialog.close(); };
  header.append(title, button('Close', close));
  const meta = el('p', 'muted');
  const media = el('div', 'preview-media');
  const picture = el('img'); picture.alt = '';
  const player = el('video'); player.controls = true; player.playsInline = true; player.preload = 'none'; player.hidden = true;
  const status = el('p', 'muted'); status.setAttribute('role', 'status');
  let clip;
  const play = button('Play', () => start(clip, player, play, status), 'primary-link');
  media.append(picture, play, player);
  dialog.append(header, meta, media, status);
  dialog.addEventListener('close', stop);
  page.append(dialog);
  return {
    close,
    control(id) {
      const recording = clips.get(String(id));
      if (!recording) return;
      return button('Watch recording', () => {
        clip = recording;
        title.textContent = clip.name;
        meta.textContent = `Rank ${clip.rank} · ${clip.jobs} · ${clip.weapon} · ${clip.seconds}s${clip.audio ? '' : ' · No audible sample captured'}`;
        picture.src = player.poster = `data:image/jpeg;base64,${clip.poster}`;
        player.setAttribute('aria-label', `${clip.name} recording`);
        dialog.showModal();
        start(clip, player, play, status);
      }, 'text-link skill-recording-link');
    }
  };
}

export function renderSkillPreview(page, data, el, button) {
  const intro = el('div', 'page-intro');
  intro.append(el('h2', '', 'Skill recordings'), el('p', 'muted', 'Review equipped cast animations, effects, and audio. Flag an issue or add a timestamped note, then download your report.'));
  page.append(intro);
  if (!data) {
    page.append(el('p', 'empty-state', 'Skill recordings are currently unavailable.'));
    return;
  }

  const groups = new Map();
  for (const clip of data.clips) {
    if (!groups.has(clip.tribes)) groups.set(clip.tribes, []);
    groups.get(clip.tribes).push(clip);
  }
  const tabs = el('div', 'item-tabs');
  tabs.setAttribute('role', 'tablist');
  tabs.setAttribute('aria-label', 'Tribe pairs');
  const form = el('div', 'preview-review');
  const generalLabel = el('label', '', 'General notes'); generalLabel.htmlFor = 'preview-general';
  const general = el('textarea'); general.id = 'preview-general'; general.rows = 2;
  const reportStatus = el('span', 'muted'); reportStatus.setAttribute('aria-live', 'polite');
  const entries = [];
  const report = button('Download report', () => {
    const reviewed = entries.filter(({checks, notes}) => checks.some(input => input.checked) || notes.value.trim());
    const lines = ['# Sanketa skill preview review', '', `${reviewed.length} skills flagged or annotated.`];
    if (general.value.trim()) lines.push('', '## General notes', '', general.value.trim());
    for (const {clip, checks, notes} of reviewed) {
      lines.push('', `## ${clip.name} (${clip.id})`, '', `- ${clip.tribes} · ${clip.jobs} · ${clip.weapon}`);
      const issues = checks.filter(input => input.checked).map(input => input.value);
      if (issues.length) lines.push(`- Issues: ${issues.join(', ')}`);
      if (notes.value.trim()) lines.push(`- Notes: ${notes.value.trim().replace(/\n/g, '\n  ')}`);
    }
    const url = URL.createObjectURL(new Blob([lines.join('\n') + '\n'], {type: 'text/markdown;charset=utf-8'}));
    const anchor = el('a'); anchor.href = url; anchor.download = 'Sanketa-Skill-Preview-Report.md';
    anchor.click(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    reportStatus.textContent = `${reviewed.length} skills in the downloaded report.`;
  }, 'primary-link');
  form.append(generalLabel, general, report, reportStatus);
  page.append(form, tabs);

  const {start, stop} = createPlayback(data);

  const panels = [];
  function selectTab(index) {
    stop();
    for (const [i, {tab, panel}] of panels.entries()) {
      const selected = i === index;
      panel.hidden = !selected;
      tab.setAttribute('aria-selected', String(selected));
      tab.tabIndex = selected ? 0 : -1;
    }
  }
  for (const [tribes, clips] of groups) {
    const index = panels.length, tabId = `preview-tab-${index}`, panelId = `preview-panel-${index}`;
    const tab = button(tribes.replace('-', ' / '), () => selectTab(index), 'item-tab');
    tab.id = tabId; tab.setAttribute('role', 'tab'); tab.setAttribute('aria-controls', panelId);
    tab.addEventListener('keydown', event => {
      const moves = {ArrowLeft: -1, ArrowRight: 1, Home: -index, End: groups.size - index - 1};
      if (!Object.hasOwn(moves, event.key)) return;
      event.preventDefault();
      const next = (index + moves[event.key] + groups.size) % groups.size;
      selectTab(next); panels[next].tab.focus();
    });
    const panel = el('div', 'preview-grid');
    panel.id = panelId; panel.setAttribute('role', 'tabpanel'); panel.setAttribute('aria-labelledby', tabId);
    panels.push({tab, panel}); tabs.append(tab); page.append(panel);
    for (const clip of clips) {
      const card = el('article', 'preview-card'); card.dataset.skill = clip.id;
      const title = el('header');
      title.append(el('h3', '', clip.name), el('span', 'muted', `${clip.id} · Rank ${clip.rank}`));
      const stage = el('div', 'preview-media');
      const poster = `data:image/jpeg;base64,${clip.poster}`;
      const picture = el('img'); picture.src = poster; picture.alt = ''; picture.loading = 'lazy';
      const player = el('video'); player.controls = true; player.playsInline = true; player.preload = 'none';
      player.poster = poster; player.hidden = true; player.setAttribute('aria-label', `${clip.name} recording`);
      const status = el('p', 'muted'); status.setAttribute('role', 'status');
      const play = button('Play', () => start(clip, player, play, status), 'primary-link');
      play.setAttribute('aria-label', `Play ${clip.name}`);
      stage.append(picture, play, player);
      const meta = el('div', 'preview-details');
      meta.append(el('p', '', `${clip.jobs} · ${clip.weapon}`),
        el('p', 'muted', `${clip.seconds}s · ${clip.audio ? 'Audio captured' : 'No audible sample captured'}`),
        el('p', 'muted', clip.motion ? `Animation · ${clip.motion}` : 'No native cast motion captured'));
      if (clip.observations) {
        const details = el('details', 'preview-observations');
        details.append(el('summary', '', 'Capture notes'), el('p', 'muted', clip.observations)); meta.append(details);
      }
      const checklist = el('div', 'preview-issues');
      checklist.setAttribute('role', 'group'); checklist.setAttribute('aria-label', `Issues for ${clip.name}`);
      const checks = issueTypes.map(issue => {
        const label = el('label'), input = el('input'); input.type = 'checkbox'; input.value = issue;
        label.append(input, ` ${issue}`); checklist.append(label); return input;
      });
      const notesLabel = el('label', 'preview-notes', 'Notes');
      const notes = el('textarea'); notes.rows = 2; notes.placeholder = 'Describe the issue and include a timestamp';
      notesLabel.append(notes); entries.push({clip, checks, notes});
      card.append(title, stage, status, meta, checklist, notesLabel); panel.append(card);
    }
  }
  selectTab(0);
  return stop;
}
