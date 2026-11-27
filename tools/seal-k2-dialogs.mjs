import { randomBytes } from 'node:crypto';
import { readFile, writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';
import { seal, unseal } from '../assets/crypto.mjs';
import { readPassword } from './seal-roadmap.mjs';

if (!process.argv[2]) throw new Error('Pass the capture folder containing K2-DIALOGS.json and media/.');
const root = resolve(process.argv[2]);
const {dialogs} = JSON.parse(await readFile(resolve(root, 'K2-DIALOGS.json'), 'utf8'));
const output = new URL('../assets/preview/', import.meta.url);
const indexPath = new URL('index.enc.json', output);
const password = await readPassword();
if (!password) throw new Error('The roadmap password is required.');
const index = await unseal(JSON.parse(await readFile(indexPath, 'utf8')), password);
const key = await crypto.subtle.importKey('raw', Buffer.from(index.mediaKey, 'base64'),
  'AES-GCM', false, ['encrypt', 'decrypt']);
const seen = new Set();
const files = new Map();
for (const dialog of dialogs) {
  const {id, group, number, status, title} = dialog;
  if (!/^k2-(main|intro|load)-\d+$/.test(id) || id !== `k2-${group}-${number}` ||
      !Number.isInteger(number) || seen.has(id) || !title || !['art', 'reserved', 'runtime'].includes(status))
    throw new Error(`Invalid K2 dialog ${id}.`);
  seen.add(id);
  if (status !== 'art') continue;
  const picture = await readFile(resolve(root, 'media', `${id}.webp`));
  if (picture.toString('ascii', 0, 4) !== 'RIFF' || picture.toString('ascii', 8, 12) !== 'WEBP')
    throw new Error(`Invalid K2 image ${id}.`);
  const iv = randomBytes(12);
  const parameters = {name: 'AES-GCM', iv, additionalData: Buffer.from(id)};
  const body = await crypto.subtle.encrypt(parameters, key, picture);
  const verified = await crypto.subtle.decrypt(parameters, key, body);
  if (!picture.equals(Buffer.from(verified))) throw new Error(`K2 image verification failed for ${id}.`);
  files.set(id, Buffer.concat([iv, Buffer.from(body)]));
}
if (!files.size) throw new Error('No K2 artwork to seal.');
const updated = {...index, k2Dialogs: dialogs, revision: randomBytes(8).toString('hex')};
const envelope = await seal(updated, password);
if ((await unseal(envelope, password)).revision !== updated.revision)
  throw new Error('The encrypted K2 catalog did not verify.');
for (const [id, encrypted] of files) await writeFile(new URL(`${id}.webp.enc`, output), encrypted);
await writeFile(indexPath, JSON.stringify(envelope) + '\n');
console.log(`Sealed ${files.size} K2 previews for ${seen.size} dialog entries.`);
