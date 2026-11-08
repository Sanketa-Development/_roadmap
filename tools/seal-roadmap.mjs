import { readFile, writeFile, mkdir } from 'node:fs/promises';
import { resolve, dirname, relative, isAbsolute, sep } from 'node:path';
import { fileURLToPath } from 'node:url';
import { seal } from '../assets/crypto.mjs';
import { validate } from '../assets/model.mjs';

// Passwords are read only from stdin; never put one in an argument or repository file.
export async function readPassword() {
  if (!process.stdin.isTTY) { let input = ''; for await (const chunk of process.stdin) input += chunk; return input.replace(/\r?\n$/, ''); }
  process.stderr.write('Roadmap password: ');
  process.stdin.setRawMode(true); process.stdin.resume(); process.stdin.setEncoding('utf8');
  return new Promise((done, reject) => {
    let value = '';
    const finish = () => { process.stdin.setRawMode(false); process.stdin.pause(); process.stdin.removeListener('data', listener); process.stderr.write('\n'); };
    const listener = text => {
      for (const character of text) {
        if (character === '\u0003') { finish(); reject(new Error('Cancelled')); return; }
        if (character === '\r' || character === '\n') { finish(); done(value); return; }
        if (character === '\u007f' || character === '\b') value = value.slice(0, -1); else value += character;
      }
    }; process.stdin.on('data', listener);
  });
}
if (process.argv[1] && resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
  const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
  const source = resolve(process.argv[2] || resolve(root, '../_docs/roadmap/source.json'));
  const within = relative(root, source);
  if (!isAbsolute(within) && within.split(sep)[0] !== '..') throw new Error('Keep plaintext source outside the public repository');
  const password = await readPassword();
  const payload = validate(JSON.parse(await readFile(source, 'utf8')));
  await mkdir(resolve(root, 'assets'), { recursive: true });
  const output = resolve(root, 'assets/roadmap.enc.json');
  await writeFile(output, JSON.stringify(await seal(payload, password)) + '\n');
  console.log(JSON.stringify({ encrypted: true, project: payload.project.name, checkpoints: payload.project.groups.length, output }));
}
