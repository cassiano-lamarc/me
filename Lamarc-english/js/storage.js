import { config } from './config.js';
export const prefix = `lamarc-english:${config.bankVersion}:`;
const memory = new Map();
let onFailure = () => {};
export function storageNotice(callback) { onFailure = callback; }
function access(kind, action, key, value) {
  const full = prefix + key, memKey = kind + full;
  try {
    const store = globalThis[kind];
    if (action === 'read') {
      const raw = store.getItem(full);
      if (raw === null) return memory.get(memKey) ?? null;
      try { return JSON.parse(raw); } catch { store.removeItem(full); return null; }
    }
    if (action === 'write') { store.setItem(full, JSON.stringify(value)); memory.set(memKey,value); }
    if (action === 'remove') { store.removeItem(full); memory.delete(memKey); }
  } catch {
    onFailure('O armazenamento está indisponível. Seus dados serão mantidos apenas nesta página; histórico e retomada podem se perder ao sair.');
    if (action === 'read') return memory.get(memKey) ?? null;
    if (action === 'write') memory.set(memKey,value);
    if (action === 'remove') memory.delete(memKey);
  }
}
export const read = (key, kind='localStorage') => access(kind,'read',key);
export const write = (key, value, kind='localStorage') => access(kind,'write',key,value);
export const remove = (key, kind='localStorage') => access(kind,'remove',key);
export function clearData() {
  memory.clear();
  for (const kind of ['localStorage','sessionStorage']) try {
    const s=globalThis[kind];
    for (let i=s.length-1;i>=0;i--) { const key=s.key(i); if(key.startsWith('lamarc-english:')) s.removeItem(key); }
  } catch { onFailure('Não foi possível acessar o armazenamento; os dados em memória foram removidos.'); }
}
