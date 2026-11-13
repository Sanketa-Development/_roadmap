import { unseal } from './crypto.mjs';
import { route, filteredGroups, itemCategoryRows, filteredItemRows, validate, checklistPercent } from './model.mjs?v=20261113-queststeps';

const $ = selector => document.querySelector(selector);
const storageKey = 'sanketa.roadmap.remembered-password.v1';
const form = $('#access-form'), password = $('#password'), remember = $('#remember'), error = $('#access-error'), submit = $('#enter');
let payload, envelope, search = '', status = 'all', skillStatus = 'all', itemQuery = '';
let itemCategory = 'weapons', questCategory = 'tutorial';
const itemSelection = {types: new Set(), grips: new Set(), tribes: new Set()};
const itemTribes = ['Naga', 'Kimnara', 'Asura', 'Rakshasa', 'Yaksha', 'Gandharva', 'Deva', 'Garuda'];

function recall() {
  try { const saved = localStorage.getItem(storageKey); remember.checked = saved !== null; password.value = saved || ''; }
  catch { remember.checked = false; password.value = ''; }
}
function forget() { try { localStorage.removeItem(storageKey); } catch {} }
remember.addEventListener('change', () => { if (!remember.checked) forget(); });
recall();
form.addEventListener('submit', async event => {
  event.preventDefault();
  if (submit.disabled || !password.value) return;
  error.textContent = ''; submit.disabled = true; submit.textContent = 'Unlocking…';
  try {
    if (!crypto.subtle) throw new Error('secure-context');
    if (!envelope) {
      const response = await fetch('assets/roadmap.enc.json', { cache: 'no-store' });
      if (!response.ok) throw new Error('download');
      envelope = await response.json();
    }
    const opened = validate(await unseal(envelope, password.value));
    if (remember.checked) { try { localStorage.setItem(storageKey, password.value); } catch { remember.checked = false; } }
    else forget();
    payload = opened;
    $('#access').hidden = true; $('#workspace').hidden = false; document.body.classList.add('unlocked');
    build(); showPage(); $('#page-title').focus();
    password.value = '';
  } catch (cause) {
    error.textContent = cause.message === 'secure-context' ? 'Open this page over HTTPS to continue.' : cause.message === 'download' || cause instanceof TypeError ? 'The roadmap could not load. Check your connection and try again.' : 'That password didn’t unlock the roadmap. Try again.';
    password.focus(); password.select();
  } finally { submit.disabled = false; submit.textContent = 'Enter roadmap →'; }
});
$('#lock').addEventListener('click', () => {
  payload = null; envelope = null;
  document.querySelectorAll('.view').forEach(page => page.replaceChildren());
  $('#source-dialog').close(); $('#source-text').textContent = '';
  $('#workspace').hidden = true; $('#access').hidden = false; document.body.classList.remove('unlocked');
  document.title = 'Sanketa — Private roadmap'; error.textContent = ''; recall(); password.focus();
});

function el(tag, className = '', value) {
  const node = document.createElement(tag); if (className) node.className = className;
  if (value !== undefined) node.textContent = String(value); return node;
}
function link(text, href, className = '') { const node = el('a', className, text); node.href = href; return node; }
function button(text, action, className = '') { const node = el('button', className, text); node.type = 'button'; node.addEventListener('click', action); return node; }
function badge(text, recorded = false) { return el('span', `badge${recorded ? ' recorded' : ''}`, text); }
function progress(group) {
  const track = el('div', 'progress-track'), fill = el('span'); fill.style.width = `${checklistPercent(group)}%`;
  track.setAttribute('role', 'progressbar'); track.setAttribute('aria-label', `${group.title || group.name}: checked tasks`); track.setAttribute('aria-valuemin', '0'); track.setAttribute('aria-valuemax', String(group.total)); track.setAttribute('aria-valuenow', String(group.done)); track.setAttribute('aria-valuetext', `${checklistPercent(group)}% of top-level tasks checked (${group.done} of ${group.total})`); track.append(fill); return track;
}
function sourceButton(text, key) {
  return button(text + ' ↗', () => {
    const source = payload.documents[key]; if (!source) return;
    $('#source-title').textContent = source.title; $('#source-text').textContent = source.content; $('#source-dialog').showModal();
  }, 'text-link');
}
$('#close-source').addEventListener('click', () => $('#source-dialog').close());

function overview() {
  const page = $('#view-overview'), project = payload.project;
  const hero = el('section', 'hero'), copy = el('div', 'hero-copy');
  copy.append(el('span', 'eyebrow', 'THE DEVELOPMENT ROADMAP'), el('h2', '', 'A world worth\ncoming back to.'), el('p', 'hero-lead', project.description));
  const actions = el('div', 'hero-actions'); actions.append(link('Explore the tasks ↗', '#tasks', 'primary-link'), link('Latest updates', '#updates', 'quiet-link')); copy.append(actions); hero.append(copy, el('span', 'hero-caption', 'A CLASSIC MMORPG MODERNISED')); page.append(hero);
  const stats = el('section', 'stats');
  for (const [label, value, note] of [
    ['CHECKLIST PROGRESS', `${checklistPercent(project)}%`, `${project.done} of ${project.total} top-level tasks checked`],
    ['GATES RECORDED', `${project.accepted} / ${project.groups.length}`, 'Acceptance tracked separately'],
    ['NATIVE WORLD SCOPE', '01—34', 'Full content acceptance stays explicit']
  ]) { const card = el('div', 'stat'); card.append(el('span', 'eyebrow', label), el('strong', '', value), el('span', 'muted', note)); if (label === 'CHECKLIST PROGRESS') card.append(progress(project)); stats.append(card); } page.append(stats);
  const heading = el('div', 'section-heading'); heading.append(el('div', '', 'The next chapters'), link('View all tasks ↗', '#tasks', 'text-link')); page.append(heading);
  const cards = el('div', 'checkpoint-grid');
  for (const group of project.groups) {
    const card = link('', `#tasks?phase=${group.id}`, 'checkpoint');
    const top = el('div', 'card-top'); top.append(el('span', 'chapter-number', group.id), badge(group.gate?.done ? 'Gate recorded' : 'Gate open', group.gate?.done));
    card.append(top, el('h3', '', group.title), progress(group));
    const bottom = el('div', 'card-bottom'); bottom.append(el('span', '', `${group.done} of ${group.total} tasks checked`), el('strong', 'phase-percentage', `${checklistPercent(group)}%`)); card.append(bottom); cards.append(card);
  } page.append(cards);
  const sources = el('section', 'sources'); sources.append(el('div', '', 'How progress is counted'), el('p', 'muted', 'Percentages count checked top-level tasks divided by total top-level tasks, rounded to the nearest whole percent. Nested subtasks and acceptance gates are separate. This is checklist progress, not overall game completion.'));
  const links = el('div', 'source-links'); links.append(sourceButton('Implementation plan', 'plan'), sourceButton('Progress notes', 'progress'), sourceButton('Remaining work', 'parity')); sources.append(links); page.append(sources);
}
function taskNode(task, nested = false) {
  const row = el('div', `task${task.done ? ' checked' : ''}${nested ? ' nested' : ''}`), mark = el('span', 'task-mark', task.done ? '✓' : ''); mark.setAttribute('aria-label', task.done ? 'Checked' : 'Open');
  const copy = el('div', 'task-copy'); if (task.id) copy.append(el('span', 'task-id', task.id)); copy.append(el('p', '', task.text));
  row.append(mark, copy);
  if (!nested && task.children.length) { const children = el('div', 'task-children'); task.children.forEach(child => children.append(taskNode(child, true))); copy.append(children); }
  return row;
}
function renderTasks() {
  const project = payload.project, groups = filteredGroups(project, search, status), list = $('#task-list'); list.replaceChildren();
  const count = groups.reduce((sum, group) => sum + group.tasks.length, 0); $('#task-count').textContent = `${count} of ${project.total} tasks`;
  if (!count) { list.append(el('p', 'empty-state', 'No matching tasks. Try another word or status.')); return; }
  const selected = new URLSearchParams(location.hash.split('?')[1] || '').get('phase');
  for (const group of groups) {
    const section = el('details', 'task-group'); section.open = !!search || group.id === selected;
    const summary = el('summary'), heading = el('div', 'task-group-title'); heading.append(el('span', 'chapter-number', group.id), el('h3', '', group.title));
    summary.append(heading, el('span', 'group-count', `${checklistPercent(group)}% · ${group.done} / ${group.total}`)); section.append(summary);
    const content = el('div', 'task-group-content'); group.tasks.forEach(task => content.append(taskNode(task)));
    if (group.gate) { const gate = el('div', 'gate-note'); gate.append(badge(group.gate.done ? 'Gate recorded' : 'Gate open', group.gate.done), el('p', '', group.gate.text)); content.append(gate); }
    section.append(content); list.append(section);
  }
}
function tasks() {
  const page = $('#view-tasks'), intro = el('div', 'page-intro'); intro.append(el('span', 'eyebrow', 'THE IMPLEMENTATION CHECKLIST'), el('h2', '', 'Every step, in view.'), el('p', 'muted', `${checklistPercent(payload.project)}% of top-level tasks checked (${payload.project.done}/${payload.project.total}). Source checkboxes are read-only; acceptance gates remain separate.`)); page.append(intro);
  const tools = el('div', 'task-tools'), input = el('input', 'search'); input.type = 'search'; input.placeholder = 'Search systems, tasks, or checkpoint IDs'; input.setAttribute('aria-label', 'Search tasks'); input.value = search;
  input.addEventListener('input', () => { search = input.value; renderTasks(); });
  const filters = el('div', 'filters'); filters.setAttribute('aria-label', 'Task status');
  for (const [value, label] of [['all', 'All tasks'], ['open', 'Open'], ['done', 'Checked']]) {
    const control = button(label, () => { status = value; filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === control))); renderTasks(); }); control.setAttribute('aria-pressed', String(status === value)); filters.append(control);
  } tools.append(input, filters); page.append(tools);
  const meta = el('div', 'task-meta'), count = el('span', 'muted'); count.id = 'task-count';
  const expand = el('div', 'expand-actions'); expand.append(button('Expand all', () => document.querySelectorAll('.task-group').forEach(item => item.open = true), 'text-link'), button('Collapse all', () => document.querySelectorAll('.task-group').forEach(item => item.open = false), 'text-link')); meta.append(count, expand); page.append(meta);
  const list = el('div'); list.id = 'task-list'; page.append(list); renderTasks();
}
function skillRange(values, divisor = 1, suffix = '') {
  const [low, high] = values.map(value => Number((value / divisor).toFixed(3)));
  return `${low}${low === high ? '' : '–' + high}${suffix}`;
}
function skills() {
  const page = $('#view-skills'), catalog = payload.skills, intro = el('div', 'page-intro');
  intro.append(el('span', 'eyebrow', 'TRIBES & ABILITIES'), el('h2', '', 'Skills'), el('p', 'muted', catalog ? `${catalog.total} player skills, grouped by tribe pair. ${catalog.meaning}` : 'The skill catalog has not been published yet.'));
  page.append(intro);if (!catalog) return;
  const entries = catalog.groups.flatMap(group => group.skills), counts = el('div', 'skill-counts');
  counts.append(badge(`${catalog.implemented} complete`, true), badge(`${catalog.total - catalog.implemented} incomplete`), badge(`${entries.filter(skill => skill.mechanicsImplemented).length} mechanics implemented`));page.append(counts);
  const tools = el('div', 'task-tools'), filters = el('div', 'filters skill-filters');filters.setAttribute('aria-label', 'Skill status');
  for (const [value, label] of [['all', 'All'], ['done', 'Done'], ['open', 'Not done']]) {
    const control = button(label, () => {skillStatus = value;filters.querySelectorAll('button').forEach(item => item.setAttribute('aria-pressed', String(item === control)));renderSkills();});
    control.setAttribute('aria-pressed', String(skillStatus === value));filters.append(control);
  }
  tools.append(filters);page.append(tools);
  const count = el('p', 'muted skill-result-count');count.id = 'skill-count';count.setAttribute('role', 'status');count.setAttribute('aria-live', 'polite');
  const list = el('div');list.id = 'skills-list';page.append(count, list);renderSkills();
}
function renderSkills() {
  const catalog = payload.skills, list = $('#skills-list');list.replaceChildren();
  let visible = 0;
  for (const [index, original] of catalog.groups.entries()) {
    const matches = original.skills.filter(skill => skillStatus === 'all' || (skillStatus === 'done' ? skill.implemented : !skill.implemented));
    if (!matches.length) continue;
    visible += matches.length;const group = {...original, skills: matches};
    const section = el('details', 'task-group skill-group');section.open = true;
    const summary = el('summary'), title = el('div', 'task-group-title');title.append(el('span', 'chapter-number', String(index + 1).padStart(2, '0')), el('h3', '', group.title));
    summary.append(title, el('span', 'group-count', `${group.skills.length} shown · ${original.skills.filter(skill => skill.implemented).length} / ${original.skills.length} complete`));section.append(summary);
    const list = el('div', 'task-group-content');
    for (const skill of group.skills) {
      const row = el('article', `skill-row ${skill.status}`), checkbox = el('input', 'skill-checkbox');checkbox.type = 'checkbox';checkbox.checked = skill.implemented;checkbox.disabled = true;checkbox.setAttribute('aria-label', `${skill.id}: ${skill.name} — ${skill.status}`);
      const icon = el(skill.icon ? 'img' : 'span', 'skill-icon');
      if (skill.icon) {icon.src = skill.icon.src;icon.alt = `${skill.name} skill icon`;icon.width = 44;icon.height = 44;icon.loading = 'lazy';icon.decoding = 'async';}
      else {icon.textContent = '?';icon.setAttribute('aria-label', `${skill.name}: icon unavailable`);}
      const copy = el('div', 'skill-copy'), identifier = el('p', 'skill-id');identifier.append(el('span', 'skill-field', 'ID : '), el('strong', '', skill.id));
      const name = el('p', 'skill-name');name.append(el('span', 'skill-field', 'Name : '), el('strong', '', skill.name));copy.append(identifier, name);
      if (skill.description) copy.append(el('p', 'skill-description', skill.description));
      const meta = el('div', 'skill-meta'), info = (label, value) => meta.append(el('span', '', `${label}: ${value}`));
      info('Type', skill.kind);info('Tribes', skill.tribes.join(' / '));info('Required level by rank', skillRange(skill.requiredLevel));info('Max rank', skill.maxRank);
      if (skill.tpCost[1] > 0) info('TP cost', skillRange(skill.tpCost));if (skill.hpCost[1] > 0) info('HP cost', skillRange(skill.hpCost));
      if (skill.cooldownMs[1] > 0) info('Cooldown', skillRange(skill.cooldownMs, 1000, ' s'));if (skill.castMs[1] > 0) info('Cast time', skillRange(skill.castMs, 1000, ' s'));
      if (skill.classMask) info('Native class requirement', skill.classMask);
      if (skill.prerequisites.length) info('Requires', skill.prerequisites.map(item => `${item.id} (${item.name}), rank ${item.rank}`).join('; '));
      copy.append(meta);
      const parts = el('div', 'skill-presentation');
      for (const [key, caption] of [['animations', 'Weapon Type Based Animations Implemented'], ['fx', 'FX Implemented']]) {
        const progress = skill.presentation[key], done = ['implemented', 'not_required'].includes(progress.status);
        const label = el('label', `skill-part ${done ? 'complete' : 'pending'}`), check = el('input', 'skill-checkbox skill-subcheckbox'), text = el('span', '', caption);
        label.setAttribute('data-part', key);label.title = progress.note;
        check.type = 'checkbox';check.disabled = true;check.checked = done;check.setAttribute('aria-label', `${skill.name}: ${caption} — ${progress.status}`);
        if (progress.status === 'not_required') text.append(el('small', '', 'Not required for this passive'));
        else if (!done) text.append(el('small', '', progress.status === 'partial' ? 'Partially implemented' : 'Pending confirmation'));
        label.append(check, text);parts.append(label);
      }
      copy.append(parts);const note = el('p', 'skill-note');note.append(el('strong', '', `${skill.mechanicsImplemented ? 'Mechanics implemented' : skill.mechanicsStatus === 'partial' ? 'Mechanics partially implemented' : 'Mechanics not yet confirmed'}: `), el('span', '', skill.implementationNote));copy.append(note);
      row.append(checkbox, icon, copy);list.append(row);
    }
    section.append(list);$('#skills-list').append(section);
  }
  $('#skill-count').textContent = `${visible} of ${catalog.total} skills shown`;
  if (!visible) list.append(el('p', 'empty-state', 'No skills match this status.'));
}
function quests() {
  const page = $('#view-quests'), catalog = payload.quests, intro = el('div', 'page-intro');
  intro.append(el('span', 'eyebrow', 'STORIES & ADVENTURES'), el('h2', '', 'Quests'), el('p', 'muted', catalog ? `${catalog.total} quests, grouped by category. ${catalog.meaning}` : 'The quest catalog has not been published yet.'));
  page.append(intro);if (!catalog) return;
  const counts = el('div', 'skill-counts');counts.append(badge(`${catalog.implemented} implemented`, true), badge(`${catalog.total - catalog.implemented} not implemented or unconfirmed`));page.append(counts);
  const tabs = el('div', 'item-tabs quest-tabs');tabs.setAttribute('role', 'tablist');tabs.setAttribute('aria-label', 'Quest categories');
  catalog.groups.forEach((group, index) => {
    const tab = button('', () => selectQuestCategory(group.id), 'item-tab quest-tab');tab.id = `quest-tab-${group.id}`;
    tab.setAttribute('role', 'tab');tab.setAttribute('data-category', group.id);tab.setAttribute('aria-controls', 'quests-panel');
    tab.append(el('span', '', group.title), el('span', 'item-tab-count', group.total));
    tab.addEventListener('keydown', event => {
      const next = event.key === 'ArrowRight' ? (index + 1) % catalog.groups.length : event.key === 'ArrowLeft' ? (index + catalog.groups.length - 1) % catalog.groups.length : event.key === 'Home' ? 0 : event.key === 'End' ? catalog.groups.length - 1 : -1;
      if (next < 0) return;event.preventDefault();selectQuestCategory(catalog.groups[next].id);$(`#quest-tab-${catalog.groups[next].id}`).focus();
    });tabs.append(tab);
  });
  const panel = el('div', 'quest-panel');panel.id = 'quests-panel';panel.setAttribute('role', 'tabpanel');panel.setAttribute('tabindex', '0');page.append(tabs, panel);renderQuests();
}
function selectQuestCategory(id) {questCategory = id;renderQuests();}
function renderQuests() {
  const catalog = payload.quests, group = catalog.groups.find(group => group.id === questCategory) || catalog.groups[0], panel = $('#quests-panel');
  if (!group) return;questCategory = group.id;panel.replaceChildren();panel.setAttribute('aria-labelledby', `quest-tab-${group.id}`);
  document.querySelectorAll('.quest-tab').forEach(tab => {const selected = tab.dataset.category === questCategory;tab.setAttribute('aria-selected', String(selected));tab.setAttribute('tabindex', selected ? '0' : '-1');});
  const heading = el('div', 'quest-category-heading');heading.append(el('h3', '', group.title), el('p', 'muted skill-result-count', `${group.implemented} of ${group.total} implemented`));panel.append(heading);
  for (const quest of group.quests) {
      const row = el('details', `quest-row ${quest.status}`);row.setAttribute('data-quest', quest.key);
      const summary = el('summary', 'quest-summary');
      const checkbox = el('input', 'skill-checkbox quest-checkbox');checkbox.type = 'checkbox';checkbox.checked = quest.implemented;checkbox.disabled = true;
      const state = quest.implemented ? 'Implemented in Sanketa' : quest.status === 'not_implemented' ? 'Not implemented' : 'Not yet confirmed';
      checkbox.setAttribute('aria-label', `${quest.id}: ${quest.name} — ${state}`);
      const copy = el('div', 'quest-copy'), identifier = el('p', 'skill-id');identifier.append(el('span', 'skill-field', 'ID : '), el('strong', '', quest.id));
      const name = el('p', 'quest-name');name.append(el('strong', '', quest.name));copy.append(identifier, name);
      copy.append(el('p', 'muted quest-preview', `${quest.steps.length} ${quest.steps.length === 1 ? 'step' : 'steps'} · ${state}`));
      const arrow = el('span', 'quest-expand', '⌄');arrow.setAttribute('aria-hidden', 'true');summary.append(checkbox, copy, arrow);row.append(summary);
      const content = el('div', 'quest-details');
      if (quest.info.length) {const meta = el('div', 'skill-meta');quest.info.forEach(value => meta.append(el('span', '', value)));content.append(meta);}
      const note = el('p', 'skill-note');note.append(el('strong', 'quest-status', state), el('span', '', ` — ${quest.implementationNote}`));content.append(note);
      content.append(el('h4', 'quest-steps-title', 'Quest steps'));
      const steps = el('ol', 'quest-steps');
      quest.steps.forEach((step, index) => {
        const item = el('li', 'quest-step');item.setAttribute('data-stage', step.number);
        item.append(el('strong', 'quest-step-label', `Step ${index + 1}`), el('p', 'quest-step-text', step.text.replaceAll('>>', '\n').replace(/%[diu]/g, '[count]')));steps.append(item);
      });content.append(steps);
      if (quest.steps.some(step => /%[diu]/.test(step.text))) content.append(el('p', 'muted quest-counter-note', '[count] is filled from your progress in the game.'));
      row.append(content);panel.append(row);
  }
}
function itemCategoryTitle(group) {return group.id === 'defence' ? 'Defense' : group.title;}
function selectItemCategory(id) {
  if (itemCategory !== id) {itemCategory = id;itemSelection.types.clear();itemSelection.grips.clear();}
  renderItems();
}
function itemFacet(key, label, options) {
  const field = el('fieldset', 'item-facet'), controls = el('div', 'item-facet-options'), selected = itemSelection[key];
  field.append(el('legend', '', label), controls);
  const add = (value, title, index) => {
    const id = `item-filter-${key}-${index}`;
    const control = button(title, () => {
      if (!value) selected.clear();else if (selected.has(value)) selected.delete(value);else selected.add(value);
      renderItems();$('#' + id).focus();
    }, 'item-filter-toggle');
    control.id = id;control.setAttribute('data-filter', key);control.setAttribute('data-value', value);
    control.setAttribute('aria-pressed', String(value ? selected.has(value) : selected.size === 0));controls.append(control);
  };
  add('', 'All', 'all');options.forEach((option, index) => add(option.value, option.label, index));
  return field;
}
function renderItems() {
  const group = payload.items.groups.find(group => group.id === itemCategory), rows = itemCategoryRows(group);
  const list = $('#items-list'), filters = $('#item-filters');list.replaceChildren();filters.replaceChildren();
  $('#item-tabs').querySelectorAll('button').forEach(tab => {const active = tab.dataset.category === itemCategory;tab.setAttribute('aria-selected', String(active));tab.tabIndex = active ? 0 : -1;});
  $('#items-panel').setAttribute('aria-labelledby', `item-tab-${itemCategory}`);
  $('#item-search').placeholder = `Search ${itemCategoryTitle(group).toLowerCase()} by name or ID`;
  if (group.children.length) filters.append(itemFacet('types', group.id === 'weapons' ? 'Weapon types' : group.id === 'defence' ? 'Equipment slots' : 'Item subtypes', group.children.map(child => ({value: child.id, label: child.title}))));
  const grips = [...new Set(rows.map(item => item.grip).filter(Boolean))];
  if (grips.length) filters.append(itemFacet('grips', 'Handedness', grips.map(grip => ({value: grip, label: grip}))));
  filters.append(itemFacet('tribes', 'Tribes', itemTribes.map(tribe => ({value: tribe, label: tribe}))));
  const matches = filteredItemRows(rows, {query: itemQuery, types: [...itemSelection.types], grips: [...itemSelection.grips], tribes: [...itemSelection.tribes]});
  $('#item-count').textContent = `${matches.length} of ${rows.length} items in ${itemCategoryTitle(group)} · ID ascending`;
  for (const item of matches) {
    const row = el('article', 'item-row');row.setAttribute('data-item', item.id);
    row.append(el('p', 'skill-id', `ID : ${item.id}`), el('p', 'item-name', `Name : ${item.name}`));
    const meta = el('div', 'skill-meta');
    if (item.subtypeName) meta.append(el('span', '', `Type: ${item.subtypeName}`));
    if (item.grip) meta.append(el('span', '', `Handedness: ${item.grip}`));
    if (item.requiredLevel > 0) meta.append(el('span', '', `Required level: ${item.requiredLevel}`));
    if (item.maxStack > 1) meta.append(el('span', '', `Max stack: ${item.maxStack}`));
    if (item.price > 0) meta.append(el('span', '', `Base price: ${item.price.toLocaleString()} Rupiah`));
    meta.append(el('span', '', `Tribes: ${item.tribes.length ? item.tribes.join(' / ') : 'Unrestricted'}`));
    row.append(meta);list.append(row);
  }
  if (!matches.length) list.append(el('p', 'empty-state', 'No items match the selected filters.'));
}
function items() {
  const page = $('#view-items'), catalog = payload.items, intro = el('div', 'page-intro');
  intro.append(el('span', 'eyebrow', 'EQUIPMENT & SUPPLIES'), el('h2', '', 'Items'), el('p', 'muted', catalog ? `${catalog.total.toLocaleString()} items. Choose an item-type tab, then select any combination of filters. Items are always listed by ascending ID.` : 'The item catalog has not been published yet.'));page.append(intro);
  if (!catalog) return;
  if (!catalog.groups.some(group => group.id === itemCategory)) itemCategory = catalog.groups[0].id;
  const tabs = el('div', 'item-tabs');tabs.id = 'item-tabs';tabs.setAttribute('role', 'tablist');tabs.setAttribute('aria-label', 'Item types');
  catalog.groups.forEach((group, index) => {
    const tab = button('', () => selectItemCategory(group.id), 'item-tab');tab.id = `item-tab-${group.id}`;
    tab.setAttribute('role', 'tab');tab.setAttribute('data-category', group.id);tab.setAttribute('aria-controls', 'items-panel');
    tab.append(el('span', '', itemCategoryTitle(group)), el('span', 'item-tab-count', group.total));
    tab.addEventListener('keydown', event => {
      const next = event.key === 'ArrowRight' ? (index + 1) % catalog.groups.length : event.key === 'ArrowLeft' ? (index + catalog.groups.length - 1) % catalog.groups.length : event.key === 'Home' ? 0 : event.key === 'End' ? catalog.groups.length - 1 : -1;
      if (next < 0) return;event.preventDefault();selectItemCategory(catalog.groups[next].id);$(`#item-tab-${catalog.groups[next].id}`).focus();
    });tabs.append(tab);
  });
  const panel = el('div', 'items-panel');panel.id = 'items-panel';panel.setAttribute('role', 'tabpanel');page.append(tabs, panel);
  const tools = el('div', 'task-tools item-tools'), search = el('input', 'search');search.id = 'item-search';search.type = 'search';search.placeholder = 'Search items by name or ID';search.value = itemQuery;search.setAttribute('aria-label', 'Search items by name or ID');
  const reset = button('Reset filters', () => {itemQuery = '';search.value = '';Object.values(itemSelection).forEach(selected => selected.clear());renderItems();}, 'item-reset');reset.id = 'item-reset';
  search.addEventListener('input', () => {itemQuery = search.value;renderItems();});tools.append(search, reset);panel.append(tools);
  const filters = el('div', 'item-filters');filters.id = 'item-filters';panel.append(filters, el('p', 'muted item-filter-hint', 'Select one or more per filter; All clears that filter. Unrestricted items match every tribe.'));
  const count = el('p', 'muted skill-result-count');count.id = 'item-count';count.setAttribute('role', 'status');count.setAttribute('aria-live', 'polite');
  const list = el('div', 'item-list');list.id = 'items-list';panel.append(count, list);renderItems();
}
function worlds() {
  const page = $('#view-worlds'), intro = el('div', 'page-intro'); intro.append(el('span', 'eyebrow', 'THE WORLD OF SANKETA'), el('h2', '', 'Familiar places.\nNew foundations.'), el('p', 'muted', 'Native zone identities are preserved. Recorded entry and travel baselines are distinct from complete gameplay acceptance.')); page.append(intro);
  const grid = el('div', 'world-grid');
  for (const zone of payload.zones) {
    const card = el('article', 'world-card'); card.append(el('span', 'chapter-number', zone.zone.replace('Zone', 'ZONE ')), el('h3', '', zone.name), el('p', 'muted', `Native map ${zone.map}`), badge(zone.baselineAccepted ? 'Entry / travel recorded' : 'Entry / travel open', zone.baselineAccepted), el('p', 'world-limit', 'Full content acceptance · Open')); grid.append(card);
  } page.append(grid);
  const note = el('div', 'scope-note'); note.append(el('h3', '', 'Beyond the first ten zones'), el('p', 'muted', 'The native scope covers zones 01–34. Configuration and import results do not establish complete services, encounters, or competitive content.'), sourceButton('Review the remaining work', 'parity')); page.append(note);
}
function updates() {
  const page = $('#view-updates'), intro = el('div', 'page-intro'); intro.append(el('span', 'eyebrow', 'FROM THE DEVELOPMENT JOURNAL'), el('h2', '', 'Progress, as it happens.'), el('p', 'muted', 'Dated checkpoints retain the scope and limits of their recorded evidence.')); page.append(intro);
  const timeline = el('div', 'timeline');
  for (const change of payload.project.changes) { const entry = el('article', 'update'), date = el('time', '', change.date); date.dateTime = change.date; const copy = el('div'); copy.append(el('h3', '', change.title), el('p', 'muted', change.text)); entry.append(date, copy); timeline.append(entry); } page.append(timeline);
}
function build() {
  document.querySelectorAll('.view').forEach(page => page.replaceChildren());
  overview(); tasks(); skills(); items(); quests(); worlds(); updates();
  $('#review-date').textContent = `Source snapshot · ${payload.reviewed}`;
}
function showPage() {
  if (!payload) return;
  const current = route(location.hash);
  const titles = { overview: 'Roadmap overview', tasks: 'The task board', skills: 'Skills', items: 'Items', quests: 'Quests', worlds: 'Worlds & scope', updates: 'Development updates' };
  document.querySelectorAll('.view').forEach(page => page.hidden = page.id !== `view-${current}`);
  document.querySelectorAll('[data-route]').forEach(item => { if (item.dataset.route === current) item.setAttribute('aria-current', 'page'); else item.removeAttribute('aria-current'); });
  $('#review-date').textContent = current === 'skills' && payload.skills ? `Skill catalog · ${payload.skills.reviewed}` : current === 'items' && payload.items ? `Item catalog · ${payload.items.reviewed}` : current === 'quests' && payload.quests ? `Quest catalog · ${payload.quests.reviewed}` : `Source snapshot · ${payload.reviewed}`;
  $('#page-title').textContent = titles[current]; document.title = `${titles[current]} — Sanketa`;
  if (current === 'tasks') renderTasks(); window.scrollTo({ top: 0, behavior: 'instant' });
}
window.addEventListener('hashchange', showPage);
