export const adConfig = { enabled: false, clientId: '', slots: { home: '', quizTop: '', result: '' }, approved: false, privacyReviewed: false, consentGranted: false };
const initialized = new WeakSet();
let scriptPromise;
function loadScript(config, doc, win) {
  if (!scriptPromise) scriptPromise = new Promise(resolve => {
    const script = doc.createElement('script');
    script.async = true;
    script.crossOrigin = 'anonymous';
    script.src = `https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${encodeURIComponent(config.clientId)}`;
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    win.adsbygoogle = win.adsbygoogle || [];
    doc.head.append(script);
  });
  return scriptPromise;
}
export async function initAd(name, container, config = adConfig, doc = document, win = window) {
  if (!config.enabled || !config.approved || !config.privacyReviewed || !config.consentGranted || !/^ca-pub-\d{16}$/.test(config.clientId) || !/^\d+$/.test(config.slots[name] || '') || initialized.has(container)) return;
  initialized.add(container);
  if (!await loadScript(config, doc, win)) return;
  const ins = doc.createElement('ins');
  ins.className = 'adsbygoogle'; ins.style.display = 'block';
  ins.dataset.adClient = config.clientId; ins.dataset.adSlot = config.slots[name];
  ins.dataset.adFormat = 'auto'; ins.dataset.fullWidthResponsive = 'true';
  container.querySelector('span')?.remove(); container.classList.add('active'); container.append(ins);
  try { (win.adsbygoogle = win.adsbygoogle || []).push({}); } catch { /* O questionário funciona sem preenchimento. */ }
}
export function showAd(screen) {
  for (const name of ['home','quizTop','result']) {
    const container = document.getElementById(`ad-${name}`);
    container.hidden = name !== screen;
    if (name === screen) void initAd(name, container);
  }
}
