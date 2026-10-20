import { CANONICAL_URL } from './candidates.js';
export function shareFile(blob) { return new File([blob],'entre-pautas.png',{type:'image/png'}); }
export function canShareFile(file,nav=navigator) {
  try{return Boolean(nav.share && nav.canShare?.({files:[file]}));}catch{return false;}
}
export async function nativeShare(file,text,nav=navigator) {
  if(!nav.share) return 'unsupported';
  try {
    await nav.share(canShareFile(file,nav) ? {files:[file],title:'entre pautas',text} : {title:'entre pautas',text:'Compare propostas com fontes públicas.',url:CANONICAL_URL});
    return 'shared';
  } catch(error) { if(error.name==='AbortError') return 'cancelled';throw error; }
}
export async function copyText(text,nav=navigator) {
  if(!nav.clipboard?.writeText) return false;
  try {await nav.clipboard.writeText(text);return true;}catch{return false;}
}
