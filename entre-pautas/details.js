let trigger;
const dialog = () => document.getElementById('details');
export function openDetails(title, paragraphs, opener, closeLabel = 'Voltar à pergunta') {
  trigger = opener;
  document.getElementById('dialog-title').textContent = title;
  const body = document.getElementById('dialog-body');
  body.replaceChildren(...paragraphs.map(text => { const p = document.createElement('p'); p.textContent = text; return p; }));
  document.getElementById('close-details').textContent = closeLabel;
  dialog().showModal();
}
export function initDetails() {
  document.getElementById('close-details').addEventListener('click', () => dialog().close());
  dialog().addEventListener('close', () => trigger?.focus());
}
