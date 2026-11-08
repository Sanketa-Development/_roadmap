// Source/encryption contracts only; the companion check executes the UI renderer.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const { pathToFileURL } = require('node:url');
const { execFileSync } = require('node:child_process');

(async () => {
  const root = path.resolve(__dirname, '..');
  const { readPassword } = await import(pathToFileURL(path.join(__dirname, 'seal-roadmap.mjs')));
  const { unseal } = await import(pathToFileURL(path.join(root, 'assets/crypto.mjs')));
  const { validate, filteredGroups, route } = await import(pathToFileURL(path.join(root, 'assets/model.mjs')));
  const password = await readPassword();
  assert(password, 'Supply the password at the hidden prompt or through stdin');
  const envelope = JSON.parse(fs.readFileSync(path.join(root, 'assets/roadmap.enc.json')));
  const data = validate(await unseal(envelope, password)), project = data.project;
  await assert.rejects(() => unseal(envelope, password + '!'), 'Wrong passwords must not decrypt');
  const tampered = { ...envelope }, buffer = Buffer.from(tampered.ciphertext, 'base64'); buffer[0] ^= 1; tampered.ciphertext = buffer.toString('base64');
  await assert.rejects(() => unseal(tampered, password), 'Modified content must fail authentication');
  assert.equal(project.id, 'sanketa'); assert.equal(project.name, 'Sanketa'); assert.equal(project.groups.length, 10);
  const tasks = project.groups.flatMap(group => group.tasks);
  assert.equal(new Set(tasks.map(task => task.id)).size, tasks.length);
  assert.equal(filteredGroups(project).flatMap(group => group.tasks).length, project.total);
  assert.equal(filteredGroups(project, '', 'open').flatMap(group => group.tasks).length, project.total - project.done);
  assert.equal(filteredGroups(project, '', 'done').flatMap(group => group.tasks).length, project.done);
  assert.equal(filteredGroups(project, 'no-match-zqjx-976123').length, 0);
  assert.equal(route(''), 'overview'); assert.equal(route('#unknown'), 'overview'); assert.equal(route('#tasks?phase=C01'), 'tasks');
  for (const group of project.groups) {
    assert.equal(group.total, group.tasks.length); assert.equal(group.done, group.tasks.filter(task => task.done).length);
  }
  for (const source of Object.values(data.documents)) {
    const file = path.resolve(root, '../_docs/roadmap', source.path), raw = fs.readFileSync(file);
    assert.equal(crypto.createHash('sha256').update(raw).digest('hex'), source.sha256, source.title);
    assert.equal(raw.toString('utf8'), source.content, source.title);
  }
  const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  for (const match of html.matchAll(/(?:src|href)="(assets\/[^"?]+)(?:\?[^\"]*)?"/g)) assert(fs.existsSync(path.join(root, match[1])), match[1]);
  for (const name of ['assets/roadmap-data.js', 'snapshot.json', 'reference']) assert(!fs.existsSync(path.join(root, name)), `Plaintext source must stay private: ${name}`);
  const files = execFileSync('git', ['-C', root, 'ls-files', '--cached', '--others', '--exclude-standard', '-z']).toString().split('\0');
  for (const name of new Set(files)) {
    if (!name || !fs.existsSync(path.join(root, name)) || !fs.statSync(path.join(root, name)).isFile()) continue;
    assert(!fs.readFileSync(path.join(root, name)).includes(Buffer.from(password)), `Password found in public file: ${name}`);
  }
  console.log(JSON.stringify({ result: 'passed', project: project.name, checked: project.done, tasks: project.total, gates: project.accepted, checkpoints: project.groups.length, encryptedPayload: true, wrongPasswordAndTamperingRejected: true, publicFilesContainNoPlaintextPassword: true, sourceDocumentsMatch: true }));
})().catch(error => { console.error(error.message); process.exitCode = 1; });
