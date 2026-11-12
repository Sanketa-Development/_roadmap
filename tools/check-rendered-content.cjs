// Execute production roadmap.mjs against the existing style of minimal CPU DOM.
// Layout is a separate browser check. No test password is stored in this file.
const assert = require('node:assert/strict'), fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const { pathToFileURL } = require('node:url');
class Node {
  constructor(tag = 'div') { this.tagName = tag; this.children = []; this.attrs = {}; this.events = {}; this.dataset = {}; this.style = {}; this.hidden = false; this.value = ''; this.checked = false; this.disabled = false; this.className = ''; this._text = ''; this.open = false; this.classList = { add: value => this.className += ' ' + value, remove: value => this.className = this.className.split(' ').filter(x => x !== value).join(' ') }; }
  append(...nodes) { this.children.push(...nodes); }
  replaceChildren(...nodes) { this.children = nodes; this._text = ''; }
  set textContent(text) { this._text = String(text); this.children = []; }
  get textContent() { return this._text + this.children.map(node => node.textContent).join(''); }
  setAttribute(name, value) { this.attrs[name] = String(value); if (name.startsWith('data-')) this.dataset[name.slice(5)] = String(value); }
  removeAttribute(name) { delete this.attrs[name]; }
  addEventListener(event, handler) { this.events[event] = handler; }
  async fire(event) { return this.events[event]?.({ preventDefault() {} }); }
  querySelectorAll(selector) { const result = []; const match = node => selector.startsWith('.') ? node.className.split(' ').includes(selector.slice(1)) : selector.startsWith('#') ? node.id === selector.slice(1) : selector.startsWith('[') ? node.attrs[selector.slice(1, -1)] !== undefined : node.tagName === selector; const walk = node => { for (const child of node.children) { if (match(child)) result.push(child); walk(child); } }; walk(this); return result; }
  focus() {} select() {} close() { this.open = false; } showModal() { this.open = true; }
}
(async () => {
  const root = path.resolve(__dirname, '..');
  const { readPassword } = await import(pathToFileURL(path.join(__dirname, 'seal-roadmap.mjs')));
  const { unseal } = await import(pathToFileURL(path.join(root, 'assets/crypto.mjs')));
  const model = await import(pathToFileURL(path.join(root, 'assets/model.mjs')));
  const password = await readPassword(), envelope = JSON.parse(fs.readFileSync(path.join(root, 'assets/roadmap.enc.json')));
  assert(password, 'Supply the password through the hidden prompt or stdin');
  const data = await unseal(envelope, password), saved = new Map();
  const localStorage = { getItem: key => saved.get(key) ?? null, setItem: (key, value) => saved.set(key, value), removeItem: key => saved.delete(key) };
  const code = fs.readFileSync(path.join(root, 'assets/roadmap.mjs'), 'utf8').replace(/^import .*;\r?$/gm, '');
  function start() {
    const body = new Node('body'), handlers = {}, location = { hash: '' };
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    for (const match of html.matchAll(/<([a-z][a-z0-9]*)\b([^>]*\bid="([^"]+)"[^>]*)>/g)) {
      const node = new Node(match[1]); node.id = match[3]; node.className = /class="([^"]+)"/.exec(match[2])?.[1] || ''; node.hidden = /\bhidden\b/.test(match[2]); body.append(node);
    }
    const document = { body, title: '', createElement: tag => new Node(tag), querySelectorAll: selector => body.querySelectorAll(selector), querySelector: selector => body.querySelectorAll(selector)[0] };
    const window = { addEventListener: (event, fn) => handlers[event] = fn, scrollTo() {} };
    const context = { document, window, location, URLSearchParams, localStorage, crypto: require('node:crypto').webcrypto, fetch: async () => ({ ok: true, json: async () => envelope }), unseal, ...model, TypeError };
    vm.createContext(context); vm.runInContext(code, context);
    return { document, location, window, get: id => document.querySelector('#' + id), route: hash => { location.hash = hash; handlers.hashchange(); } };
  }
  const app = start();
  assert(app.get('workspace').hidden && !app.get('access').hidden, 'First visit is locked');
  assert(!app.get('remember').checked && !app.get('password').value, 'Remember starts off');
  if (process.argv.includes('--items')) {
    assert.equal(app.get('view-items').textContent, '', 'Item content stays unavailable until unlock');
    app.get('password').value = password;await app.get('access-form').fire('submit');app.route('#items');
    assert.equal(model.route('#items'), 'items');assert(!app.get('view-items').hidden && app.get('view-skills').hidden);
    const page = app.get('view-items'), catalog = data.items, flat = group => group.items.concat(group.children.flatMap(flat));
    const weapons = catalog.groups.find(group => group.id === 'weapons'), raw = flat(weapons), byId = new Map(raw.map(item => [item.id, item]));
    const sorted = rows => rows.map(item => item.id).sort((a, b) => a - b);
    const ids = () => page.querySelectorAll('.item-row').map(row => Number(row.dataset.item));
    const facet = (key, value) => page.querySelectorAll('.item-filter-toggle').find(node => node.dataset.filter === key && node.dataset.value === value);
    const tab = id => page.querySelectorAll('.item-tab').find(node => node.dataset.category === id);
    assert.equal(page.querySelectorAll('.item-tab').length, catalog.groups.length);
    assert.deepEqual(ids(), sorted(raw), 'Weapons initially shows every item, globally sorted by numeric ID');
    await facet('types', 'weapons-swords').fire('click');
    const swords = flat(weapons.children.find(group => group.id === 'weapons-swords'));
    assert.deepEqual(ids(), sorted(swords));
    await facet('types', 'weapons-axes').fire('click');
    const axes = flat(weapons.children.find(group => group.id === 'weapons-axes'));
    assert.deepEqual(ids(), sorted(swords.concat(axes)), 'Multiple weapon types form a union and retain numeric order');
    await facet('tribes', 'Naga').fire('click');
    assert(ids().length > 0 && ids().every(id => !byId.get(id).tribes.length || byId.get(id).tribes.includes('Naga')));
    assert(ids().includes(4001) && ids().includes(4026), 'Subtype and tribe filters combine');
    await facet('tribes', 'Deva').fire('click');
    assert(ids().includes(4001), 'Multiple tribe selections use OR, not AND');
    await facet('grips', 'One-handed').fire('click');
    const allowed = new Set(weapons.children.flatMap(group => group.children.filter(child => child.title === 'One-handed').flatMap(flat)).map(item => item.id));
    assert(ids().length > 0 && ids().every(id => allowed.has(id)), 'Handedness narrows the selected types and tribes');
    await app.get('item-reset').fire('click');assert.deepEqual(ids(), sorted(raw));
    assert.equal(facet('types', '').attrs['aria-pressed'], 'true');assert.equal(facet('tribes', '').attrs['aria-pressed'], 'true');
    await tab('defence').fire('click');
    const defence = catalog.groups.find(group => group.id === 'defence');assert.deepEqual(ids(), sorted(flat(defence)));
    assert(tab('defence').textContent.includes('Defense'));assert(!facet('grips', 'One-handed'), 'Category-specific filters reset on tab change');
    await tab('consumables').fire('click');await facet('tribes', 'Naga').fire('click');
    const consumables = flat(catalog.groups.find(group => group.id === 'consumables'));
    const shown = new Set(ids());assert(consumables.some(item => !item.tribes.length));
    assert(consumables.filter(item => !item.tribes.length).every(item => shown.has(item.id)), 'Unrestricted items match every selected tribe');
    await app.get('item-reset').fire('click');await tab('weapons').fire('click');
    const search = app.get('item-search');search.value = '4001';await search.fire('input');
    assert.deepEqual(ids(), [4001]);assert(page.textContent.includes('Old Sword'));
    search.value = 'no-match-zqjx-976123';await search.fire('input');assert.equal(ids().length, 0);
    await app.get('item-reset').fire('click');assert.deepEqual(ids(), sorted(raw));
    tab('weapons').events.keydown({key:'ArrowRight', preventDefault() {}});
    assert.equal(tab('defence').attrs['aria-selected'], 'true');assert.deepEqual(ids(), sorted(flat(defence)));
    const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
    assert(html.indexOf('data-route="items"') > html.indexOf('data-route="skills"'));
    await app.get('lock').fire('click');assert.equal(page.textContent, '', 'Lock clears the item catalog');
    console.log(JSON.stringify({result:'passed', route:'items', items:catalog.total, tabs:catalog.groups.length, ascendingIds:true, multiTypeAndTribeFilters:true, handedness:true, unrestrictedItems:true, resetAndSearch:true, keyboardTabs:true, clearedOnLock:true}));return;
  }
  if (process.argv.includes('--skills')) {
    assert.equal(app.get('view-skills').textContent, '', 'Skill content stays unavailable until unlock');
    app.get('password').value = password;await app.get('access-form').fire('submit');
    assert(!app.get('workspace').hidden, 'Encrypted skill catalog unlocks');app.route('#skills');
    assert.equal(model.route('#skills'), 'skills');assert(!app.get('view-skills').hidden && app.get('view-overview').hidden);
    const skills = data.skills.groups.flatMap(group => group.skills), rows = app.get('view-skills').querySelectorAll('.skill-row');
    assert.equal(rows.length, data.skills.total);assert.equal(app.get('view-skills').querySelectorAll('.skill-group').length, data.skills.groups.length);
    for (const [index, skill] of skills.entries()) {
      const row = rows[index], checkbox = row.querySelectorAll('input')[0];
      assert(checkbox && checkbox.type === 'checkbox' && checkbox.disabled && checkbox.checked === skill.implemented, 'Checkbox reflects the recorded implementation');
      assert(row.textContent.includes('ID : ' + skill.id) && row.textContent.includes('Name : ' + skill.name), 'English name and ID remain paired');
      const icon = row.querySelectorAll('.skill-icon')[0];
      assert(icon && row.children.indexOf(icon) < row.children.findIndex(node => node.className === 'skill-copy'), 'Icon sits to the left of the skill text');
      if (skill.icon) assert(icon.tagName === 'img' && icon.src === skill.icon.src && icon.alt.includes(skill.name), 'Original icon is bound to the matching skill');
      assert(row.textContent.includes(skill.implementationNote), 'Partial/unconfirmed scope remains visible');
    }
    assert.equal(rows.filter(row => row.querySelectorAll('input')[0].checked).length, data.skills.implemented);
    for (const group of data.skills.groups) assert(app.get('view-skills').textContent.includes(group.title));
    const filters = app.get('view-skills').querySelectorAll('.skill-filters')[0];
    const shown = () => app.get('view-skills').querySelectorAll('.skill-row');
    await filters.querySelectorAll('button').find(node => node.textContent === 'Done').fire('click');
    assert.equal(shown().length, data.skills.implemented);assert(shown().every(row => row.querySelectorAll('input')[0].checked));
    assert(app.get('skill-count').textContent.startsWith(String(data.skills.implemented)));
    await filters.querySelectorAll('button').find(node => node.textContent === 'Not done').fire('click');
    assert.equal(shown().length, data.skills.total - data.skills.implemented);assert(shown().every(row => !row.querySelectorAll('input')[0].checked));
    await filters.querySelectorAll('button').find(node => node.textContent === 'All').fire('click');assert.equal(shown().length, data.skills.total);
    await app.get('lock').fire('click');assert(!app.get('view-skills').textContent && app.get('workspace').hidden, 'Lock clears decrypted skills');
    console.log(JSON.stringify({result:'passed', route:'skills', groups:data.skills.groups.length, skills:skills.length, checked:data.skills.implemented, icons:skills.filter(skill => skill.icon).length, readonlyCheckboxes:true, englishNamesAndMetadata:true, clearedOnLock:true}));return;
  }
  app.get('password').value = password + '!'; app.get('remember').checked = true; await app.get('access-form').fire('submit');
  assert(app.get('workspace').hidden && app.get('access-error').textContent && !saved.size, 'Wrong password stays locked and is not remembered');
  app.get('password').value = password; await app.get('access-form').fire('submit');
  assert(!app.get('workspace').hidden && app.get('access').hidden && !app.get('access-error').textContent, 'Correct password unlocks and clears the error');
  assert(saved.size === 1 && [...saved.values()][0] === password, 'Only successful password is remembered');
  assert.equal(app.document.querySelectorAll('.checkpoint').length, data.project.groups.length);
  const percent = group => `${model.checklistPercent(group)}%`;
  const stats = app.document.querySelectorAll('.stat');
  assert(stats[0].textContent.includes(percent(data.project)) && stats[0].textContent.includes(`${data.project.done} of ${data.project.total}`), 'Overall percentage retains its checklist denominator');
  const cards = app.document.querySelectorAll('.phase-percentage');
  assert.deepEqual(cards.map(node => node.textContent), data.project.groups.map(percent), 'Each phase shows its own checklist percentage');
  assert.equal(model.checklistPercent({ done: 0, total: 0 }), 0);
  app.route('#tasks');
  const parents = () => app.get('task-list').querySelectorAll('.task').filter(node => !node.className.split(' ').includes('nested'));
  assert.equal(parents().length, data.project.total);
  assert(app.get('task-list').querySelectorAll('.group-count').every((node, index) => node.textContent.startsWith(percent(data.project.groups[index]))), 'Task-board headers show the phase percentage');
  const search = app.document.querySelectorAll('.search')[0]; search.value = 'no-match-zqjx-976123'; await search.fire('input'); assert.equal(parents().length, 0);
  search.value = ''; await search.fire('input');
  const filters = app.document.querySelectorAll('.filters')[0]; await filters.querySelectorAll('button').find(node => node.textContent === 'Open').fire('click'); assert.equal(parents().length, data.project.total - data.project.done);
  await filters.querySelectorAll('button').find(node => node.textContent === 'Checked').fire('click'); assert.equal(parents().length, data.project.done);
  const expand = app.document.querySelectorAll('.expand-actions')[0]; await expand.querySelectorAll('button')[0].fire('click'); assert(app.document.querySelectorAll('.task-group').every(node => node.open)); await expand.querySelectorAll('button')[1].fire('click'); assert(app.document.querySelectorAll('.task-group').every(node => !node.open));
  app.route('#worlds'); assert.equal(app.document.querySelectorAll('.world-card').length, data.zones.length);
  app.route('#updates'); assert.equal(app.document.querySelectorAll('.update').length, data.project.changes.length);
  await app.document.querySelectorAll('.source-links')[0].querySelectorAll('button')[0].fire('click'); assert(app.get('source-dialog').open && app.get('source-text').textContent, 'Source document opens only after unlock');
  await app.get('lock').fire('click'); assert(app.get('workspace').hidden && !app.get('source-text').textContent && !app.get('view-tasks').textContent, 'Lock removes decrypted content');
  const returned = start(); assert(returned.get('workspace').hidden && returned.get('remember').checked && returned.get('password').value === password, 'Return visit is locked with the last successful password prefilled');
  await returned.get('access-form').fire('submit'); assert(!returned.get('workspace').hidden, 'Enter is still required and unlocks the remembered password');
  returned.get('remember').checked = false; await returned.get('remember').fire('change'); assert(!saved.size, 'Turning remember off immediately forgets the password');
  const forgotten = start(); assert(!forgotten.get('password').value && !forgotten.get('remember').checked && forgotten.get('workspace').hidden, 'Forgotten value is not prefilled after a new visit');
  console.log(JSON.stringify({ result: 'passed', productionRenderer: true, wrongAndCorrectPassword: true, rememberPrefillRequiresEnter: true, forget: true, decryptedContentRemovedOnLock: true, checkpoints: data.project.groups.length, tasks: data.project.total, searchFiltersExpandCollapse: true, worldsAndUpdates: true, sourceViewer: true, browserLayout: 'separate_check' }));
})().catch(error => { console.error(error.stack); process.exitCode = 1; });
