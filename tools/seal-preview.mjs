import { randomBytes } from 'node:crypto';
import { mkdir, readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { seal, unseal } from '../assets/crypto.mjs';
import { readPassword } from './seal-roadmap.mjs';

if (!process.argv[2]) throw new Error('Pass the skill review folder containing capture-results.tsv, videos/, and posters/');
const reviewFolder = resolve(process.argv[2]);
const [header, ...lines] = (await readFile(resolve(reviewFolder, 'capture-results.tsv'), 'utf8')).trimEnd().split(/\r?\n/);
const columns = header.split('\t');
const rows = lines.map(line => {
  const cells = line.split('\t');
  return Object.fromEntries(columns.map((name, i) => [name, cells[i] || '']));
});
const ids = new Set();
for (const row of rows) {
  if (!/^3\d{3}$/.test(row.id) || !row.name || !row.tribes || !row.jobs || !row.weapon ||
      !Number.isInteger(Number(row.frames)) || Number(row.frames) <= 0 || !Number.isFinite(Number(row.peak)) ||
      ids.has(row.id)) throw new Error(`Invalid capture row for ${row.id || 'unknown skill'}`);
  ids.add(row.id);
}
if (!ids.size) throw new Error('No recordings in the capture results');

const password = await readPassword();
if (!password) throw new Error('The roadmap password is required');
const output = new URL('../assets/preview/', import.meta.url);
const indexPath = new URL('index.enc.json', output);
const previousEnvelope = await readFile(indexPath, 'utf8').catch(error => {
  if (error.code !== 'ENOENT') throw error;
});
const previous = previousEnvelope ? await unseal(JSON.parse(previousEnvelope), password) : {};
const keyBytes = previous.mediaKey ? Buffer.from(previous.mediaKey, 'base64') : randomBytes(32);
const key = await crypto.subtle.importKey('raw', keyBytes, 'AES-GCM', false, ['encrypt']);
const encoder = new TextEncoder();
await mkdir(output, {recursive: true});
const clips = [];
for (const row of rows) {
  const [mp4, poster] = await Promise.all([
    readFile(resolve(reviewFolder, 'videos', `${row.id}.mp4`)),
    readFile(resolve(reviewFolder, 'posters', `${row.id}.jpg`))
  ]);
  const iv = randomBytes(12);
  const sealed = await crypto.subtle.encrypt({name: 'AES-GCM', iv, additionalData: encoder.encode(row.id)}, key, mp4);
  await writeFile(new URL(`${row.id}.mp4.enc`, output), Buffer.concat([iv, Buffer.from(sealed)]));
  clips.push({id: row.id, name: row.name, tribes: row.tribes, jobs: row.jobs, weapon: row.weapon,
    rank: Number(row.rank), seconds: (Number(row.frames) / 20).toFixed(1), audio: Number(row.peak) >= .001,
    motion: row.animated_phases.trim().split(/\s+/).join(', '), observations: row.observations,
    poster: poster.toString('base64')});
}
const index = {...previous, version: 1, revision: randomBytes(8).toString('hex'), mediaKey: keyBytes.toString('base64'), clips};
await writeFile(indexPath, JSON.stringify(await seal(index, password)) + '\n');
console.log(`Sealed ${clips.length} skill recordings for Preview.`);
