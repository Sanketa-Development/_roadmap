export const routes = ['overview', 'tasks', 'skills', 'worlds', 'updates'];
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
  return payload;
}
