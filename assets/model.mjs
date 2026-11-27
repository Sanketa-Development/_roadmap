export const routes = ['overview', 'tasks', 'server', 'beta', 'skills', 'items', 'quests', 'worlds', 'updates', 'patch-notes', 'preview'];
export const patchNoteTypes = ['Patch', 'Implementation', 'Adjustment', 'Fix', 'Note'];
export function patchNoteRecords(project) {
  // Player notes are curated from published game releases. Never expose the
  // development journal as a fallback, including for older encrypted snapshots.
  return [...(project.patchNotes || [])].sort((a, b) => b.release - a.release);
}
export function checklistPercent({ done, total }) {
  return total ? Math.round(done / total * 100) : 0;
}
export function route(hash) {
  const name = String(hash || '').replace(/^#/, '').split('?')[0].toLowerCase();
  return routes.includes(name) ? name : 'overview';
}
export function filteredGroups(project, query = '', status = 'all') {
  const needle = query.trim().toLocaleLowerCase();
  return project.groups.map(group => ({ ...group, tasks: group.tasks.filter(task => {
    if (status === 'done' && !task.done || status === 'open' && task.done) return false;
    return !needle || [group.id, group.title, task.id, task.text, ...task.children.map(child => child.text)].join(' ').toLocaleLowerCase().includes(needle);
  }) })).filter(group => group.tasks.length);
}
export function filteredItemGroups(groups, query = '') {
  const needle = query.trim().toLocaleLowerCase(), numeric = /^\d+$/.test(needle);
  if (!needle) return groups;
  return groups.map(group => {
    const children = filteredItemGroups(group.children, needle);
    const items = group.items.filter(item => numeric ? String(item.id) === needle : item.name.toLocaleLowerCase().includes(needle));
    return {...group, children, items, total: items.length + children.reduce((sum, child) => sum + child.total, 0)};
  }).filter(group => group.total > 0);
}
export function itemCategoryRows(group) {
  const rows = [];
  const visit = (node, path) => {
    for (const item of node.items) rows.push({...item, subtype: path[0]?.id || '', subtypeName: path[0]?.title || '', grip: path[1]?.title || ''});
    for (const child of node.children) visit(child, [...path, child]);
  };
  visit(group, []);
  return rows.sort((a, b) => a.id - b.id);
}
export function filteredItemRows(rows, {query = '', types = [], grips = [], tribes = []} = {}) {
  const needle = query.trim().toLocaleLowerCase(), numeric = /^\d+$/.test(needle);
  return rows.filter(item =>
    (!needle || (numeric ? String(item.id) === needle : item.name.toLocaleLowerCase().includes(needle))) &&
    (!types.length || types.includes(item.subtype)) &&
    (!grips.length || grips.includes(item.grip)) &&
    (!tribes.length || !item.tribes.length || item.tribes.some(tribe => tribes.includes(tribe))));
}
export function validate(payload) {
  const project = payload.project;
  if (payload.version !== 1 || project?.id !== 'sanketa' || project.name !== 'Sanketa' || !Array.isArray(project.groups) || !payload.documents) throw new Error('Invalid Sanketa roadmap');
  const tasks = project.groups.flatMap(group => group.tasks);
  if (project.total !== tasks.length || project.done !== tasks.filter(task => task.done).length || project.accepted !== project.groups.filter(group => group.gate?.done).length) throw new Error('Roadmap counts do not match the source');
  if (project.server !== undefined) {
    const server = project.server;
    const present = value => typeof value === 'string' && value.trim().length > 0;
    if (!present(server?.lead) || !Array.isArray(server.phases) || !server.phases.length) throw new Error('Invalid server roadmap');
    const phaseIds = new Set(), taskIds = new Set();
    for (const phase of server.phases) {
      if (!/^SRV-\d{2}$/.test(phase.id) || phaseIds.has(phase.id) || !present(phase.title) || !Array.isArray(phase.tasks) || !phase.tasks.length) throw new Error('Invalid server phase');
      phaseIds.add(phase.id);
      for (const task of phase.tasks) {
        if (!/^SRV-\d{3}$/.test(task.id) || taskIds.has(task.id) || !present(task.text) || !present(task.verification) || typeof task.done !== 'boolean') throw new Error('Invalid server task');
        taskIds.add(task.id);
      }
    }
  }
  if (project.beta !== undefined) {
    const beta = project.beta;
    const present = value => typeof value === 'string' && value.trim().length > 0;
    const textList = values => Array.isArray(values) && values.length > 0 && values.every(present);
    if (!present(beta?.lead) || !present(beta.baseline) || !textList(beta.order) || !textList(beta.deferred) || !Array.isArray(beta.groups) || !beta.groups.length) throw new Error('Invalid beta checklist');
    const ids = new Set();
    for (const group of beta.groups) {
      if (!present(group.title) || !Array.isArray(group.jobs) || !group.jobs.length) throw new Error('Invalid beta checklist group');
      for (const job of group.jobs) {
        if (!/^B\d{2,}$/.test(job.id) || ids.has(job.id) || !['P0', 'P1'].includes(job.priority) || typeof job.done !== 'boolean' ||
          !present(job.title) || !present(job.acceptance) || !textList(job.references) || !Array.isArray(job.steps) || !job.steps.length ||
          job.steps.some(step => !present(step.text) || typeof step.done !== 'boolean') || (job.done && job.steps.some(step => !step.done))) throw new Error('Invalid beta release job');
        ids.add(job.id);
      }
    }
  }
  const notes = patchNoteRecords(project);
  if (new Set(notes.map(note => note.id)).size !== notes.length) throw new Error('Duplicate patch note ID');
  if (new Set(notes.map(note => note.release)).size !== notes.length) throw new Error('Duplicate patch note release');
  for (const note of notes) {
    if (!/^PN\d{2,}$/.test(note.id) || !Number.isSafeInteger(note.release) || note.release <= 0 || !/^[a-f0-9]{40}$/.test(note.updateCommit || '') || !note.title || !/^\d{4}-\d{2}-\d{2}$/.test(note.date) || !Array.isArray(note.entries) || !note.entries.length || note.entries.some(entry => !patchNoteTypes.includes(entry.type) || typeof entry.description !== 'string' || !entry.description.trim())) throw new Error('Invalid published game patch note');
  }
  if (payload.skills) {
    const skills = payload.skills.groups?.flatMap(group => group.skills);
    if (!skills || payload.skills.total !== skills.length || payload.skills.implemented !== skills.filter(skill => skill.implemented).length || new Set(skills.map(skill => skill.id)).size !== skills.length) throw new Error('Skill counts do not match the catalog');
    for (const skill of skills) if (!Number.isSafeInteger(skill.id) || !skill.name || !['implemented', 'partial', 'unconfirmed'].includes(skill.status) || skill.implemented !== (skill.status === 'implemented')) throw new Error('Invalid skill implementation record');
    for (const skill of skills) if (skill.icon && (!/^data:image\/png;base64,[A-Za-z0-9+/]+=*$/.test(skill.icon.src) || !['K2', 'K3', 'Global'].includes(skill.icon.source))) throw new Error('Invalid skill icon');
    for (const skill of skills) {
      const parts = skill.presentation;
      if (!parts || !['animations', 'fx'].every(key => parts[key] && ['implemented', 'partial', 'unconfirmed', 'not_required'].includes(parts[key].status))) throw new Error('Invalid skill presentation status');
      const complete = skill.mechanicsImplemented && ['animations', 'fx'].every(key => ['implemented', 'not_required'].includes(parts[key].status));
      if (skill.implemented !== Boolean(complete)) throw new Error('Skill main checkbox must include mechanics, animations and FX');
    }
  }
  if (payload.items) {
    const ids = [];
    const count = group => {
      if (!group.id || !group.title || !Array.isArray(group.children) || !Array.isArray(group.items)) throw new Error('Invalid item category');
      for (const item of group.items) {
        if (!Number.isSafeInteger(item.id) || !item.name || !Array.isArray(item.tribes) || !Number.isInteger(item.requiredLevel) || !Number.isInteger(item.maxStack) || !Number.isInteger(item.price)) throw new Error('Invalid item entry');
        ids.push(item.id);
      }
      const total = group.items.length + group.children.reduce((sum, child) => sum + count(child), 0);
      if (total !== group.total) throw new Error('Item category counts do not match');
      return total;
    };
    if (!Array.isArray(payload.items.groups) || payload.items.groups.reduce((sum, group) => sum + count(group), 0) !== payload.items.total || new Set(ids).size !== ids.length) throw new Error('Item catalog is incomplete or duplicated');
  }
  if (payload.quests) {
    const catalog = payload.quests, keys = new Set();
    if (!Array.isArray(catalog.groups)) throw new Error('Invalid quest categories');
    for (const group of catalog.groups) {
      if (!group.id || !group.title || !Array.isArray(group.quests) || group.total !== group.quests.length || group.implemented !== group.quests.filter(quest => quest.implemented).length) throw new Error('Quest category counts do not match');
      for (const quest of group.quests) {
        if (!quest.key || keys.has(quest.key) || !Number.isSafeInteger(quest.id) || !quest.name || !Array.isArray(quest.info) || !['implemented', 'not_implemented', 'unconfirmed'].includes(quest.status) || quest.implemented !== (quest.status === 'implemented')) throw new Error('Invalid quest implementation record');
        if (!Array.isArray(quest.steps) || !quest.steps.length || quest.steps.some(step => !Number.isSafeInteger(step.number) || step.number < 0 || typeof step.text !== 'string' || !step.text.trim())) throw new Error('Missing native quest step description');
        keys.add(quest.key);
      }
    }
    if (catalog.total !== keys.size || catalog.implemented !== catalog.groups.reduce((sum, group) => sum + group.implemented, 0)) throw new Error('Quest catalog counts do not match');
  }
  return payload;
}
