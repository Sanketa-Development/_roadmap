const encoder = new TextEncoder();
const aad = encoder.encode('Sanketa roadmap payload v1');
export const iterations = 600000;

function base64(bytes) {
  let text = '';
  for (let i = 0; i < bytes.length; i += 8192) text += String.fromCharCode(...bytes.subarray(i, i + 8192));
  return btoa(text);
}
function bytes(text) { return Uint8Array.from(atob(text), character => character.charCodeAt(0)); }
async function key(password, salt) {
  const material = await crypto.subtle.importKey('raw', encoder.encode(password), 'PBKDF2', false, ['deriveKey']);
  return crypto.subtle.deriveKey({ name: 'PBKDF2', salt, iterations, hash: 'SHA-256' }, material, { name: 'AES-GCM', length: 256 }, false, ['encrypt', 'decrypt']);
}
export async function seal(payload, password) {
  if (!password) throw new Error('A password is required');
  const salt = crypto.getRandomValues(new Uint8Array(16)), iv = crypto.getRandomValues(new Uint8Array(12));
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv, additionalData: aad }, await key(password, salt), encoder.encode(JSON.stringify(payload)));
  return { version: 1, kdf: 'PBKDF2-SHA256', iterations, salt: base64(salt), iv: base64(iv), ciphertext: base64(new Uint8Array(ciphertext)) };
}
export async function unseal(envelope, password) {
  if (envelope.version !== 1 || envelope.kdf !== 'PBKDF2-SHA256' || envelope.iterations !== iterations) throw new Error('Unsupported encrypted roadmap');
  const salt = bytes(envelope.salt), iv = bytes(envelope.iv);
  if (salt.length !== 16 || iv.length !== 12) throw new Error('Invalid encrypted roadmap');
  const plain = await crypto.subtle.decrypt({ name: 'AES-GCM', iv, additionalData: aad }, await key(password, salt), bytes(envelope.ciphertext));
  return JSON.parse(new TextDecoder('utf-8', { fatal: true }).decode(plain));
}
