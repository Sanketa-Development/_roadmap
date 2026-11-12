export const routes = ['overview', 'tasks', 'skills', 'items', 'worlds', 'updates'];
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
  if (payload.skills) {
    const skills = payload.skills.groups?.flatMap(group => group.skills);
    if (!skills || payload.skills.total !== skills.length || payload.skills.implemented !== skills.filter(skill => skill.implemented).length || new Set(skills.map(skill => skill.id)).size !== skills.length) throw new Error('Skill counts do not match the catalog');
    for (const skill of skills) if (!Number.isSafeInteger(skill.id) || !skill.name || !['implemented', 'partial', 'unconfirmed'].includes(skill.status) || skill.implemented !== (skill.status === 'implemented')) throw new Error('Invalid skill implementation record');
    for (const skill of skills) if (skill.icon && (!/^data:image\/png;base64,[A-Za-z0-9+/]+=*$/.test(skill.icon.src) || !['K2', 'K3', 'Global'].includes(skill.icon.source))) throw new Error('Invalid skill icon');
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
  return payload;
}
