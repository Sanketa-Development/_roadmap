import { randomBytes } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { seal, unseal } from '../assets/crypto.mjs';
import { readPassword } from './seal-roadmap.mjs';

if (!process.argv[2]) throw new Error('Pass the capture folder containing WEARABLES.json and media/.');
const root = resolve(process.argv[2]);
const capture = JSON.parse(await readFile(resolve(root, 'WEARABLES.json'), 'utf8'));
const output = new URL('../assets/preview/', import.meta.url);
const indexPath = new URL('index.enc.json', output);
const envelope = JSON.parse(await readFile(indexPath, 'utf8'));
const catalog = JSON.parse(await readFile(new URL('../roadmap.enc.json', output), 'utf8'));

let password;
for (let attempt = 0; attempt < 3 && !password; ++attempt) {
  const candidate = await readPassword();
  try { await unseal(catalog, candidate); password = candidate; }
  catch { console.error('That password did not unlock the roadmap. Try again.'); }
}
if (!password) throw new Error('The roadmap was not unlocked. No files changed.');
const index = await unseal(envelope, password);
const key = await crypto.subtle.importKey('raw', Buffer.from(index.mediaKey, 'base64'), 'AES-GCM', false, ['encrypt', 'decrypt']);
if (!capture.passed || !capture.name || !capture.items?.length || capture.tribes?.length !== 8)
  throw new Error('Expected eight verified recordings for a complete set.');

const set = {name: capture.name, items: capture.items, tribes: []};
const encrypted = new Map();
for (const {id, name} of capture.tribes) {
  if (!/^[a-z]+(?:-[a-z]+)+$/.test(id) || !name || encrypted.has(id)) throw new Error('Invalid wearable recording ID.');
  const [mp4, poster] = await Promise.all([
    readFile(resolve(root, 'media', `${id}.mp4`)), readFile(resolve(root, 'media', `${id}.jpg`))
  ]);
  const iv = randomBytes(12), additionalData = Buffer.from(id);
  const body = await crypto.subtle.encrypt({name: 'AES-GCM', iv, additionalData}, key, mp4);
  const verified = await crypto.subtle.decrypt({name: 'AES-GCM', iv, additionalData}, key, body);
  if (!mp4.equals(Buffer.from(verified))) throw new Error('Wearable recording verification failed.');
  encrypted.set(id, Buffer.concat([iv, Buffer.from(body)]));
  set.tribes.push({id, name, poster: poster.toString('base64')});
}
index.wearables = [...(index.wearables ?? []).filter(existing => existing.name !== set.name), set];
index.revision = randomBytes(8).toString('hex');
const sealedIndex = await seal(index, password);
if ((await unseal(sealedIndex, password)).revision !== index.revision) throw new Error('Wearable index did not verify.');
for (const [id, bytes] of encrypted) await writeFile(new URL(`${id}.mp4.enc`, output), bytes);
await writeFile(indexPath, JSON.stringify(sealedIndex) + '\n');
await writeFile(resolve(root, 'SEALED.ok'), 'Eight verified wearable previews sealed for the roadmap.\n');
console.log(`Sealed ${set.tribes.length} native previews for ${set.name}.`);
