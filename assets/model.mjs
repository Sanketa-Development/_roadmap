export const routes = ['overview', 'tasks', 'worlds', 'updates'];
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
  return payload;
}
