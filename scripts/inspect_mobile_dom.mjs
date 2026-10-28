import { spawn } from 'node:child_process';

const chrome = spawn('google-chrome', [
  '--headless=new',
  '--remote-debugging-port=9224',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  '--window-size=390,844',
  'http://127.0.0.1:3002/?tier=low'
]);

await new Promise(r => setTimeout(r, 1500));

try {
  const listRes = await fetch('http://127.0.0.1:9224/json');
  const tabs = await listRes.json();
  const pageTab = tabs.find(t => t.type === 'page');
  if (!pageTab) throw new Error('No page tab found');

  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);
  await new Promise((res, rej) => {
    ws.onopen = res;
    ws.onerror = rej;
  });

  let id = 1;
  const send = (method, params = {}) => new Promise((res, rej) => {
    const curId = id++;
    const handler = (evt) => {
      const msg = JSON.parse(evt.data);
      if (msg.id === curId) {
        ws.removeEventListener('message', handler);
        if (msg.error) rej(msg.error);
        else res(msg.result);
      }
    };
    ws.addEventListener('message', handler);
    ws.send(JSON.stringify({ id: curId, method, params }));
  });

  await send('Runtime.enable');
  await send('Page.enable');
  await send('Emulation.setDeviceMetricsOverride', {
    width: 390,
    height: 844,
    deviceScaleFactor: 2,
    mobile: true
  });
  await send('Emulation.setTouchEmulationEnabled', { enabled: true });

  for (let i = 0; i < 40; i++) {
    const evalRes = await send('Runtime.evaluate', {
      expression: 'document.querySelector("[data-loader]")?.hasAttribute("data-ready") || false',
      returnByValue: true
    });
    if (evalRes?.result?.value === true) break;
    await new Promise(r => setTimeout(r, 200));
  }

  // Click silent
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(\'[data-enter="silent"]\')?.click()',
    returnByValue: true
  });
  await new Promise(r => setTimeout(r, 350));

  // Click EN
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(\'[data-enter-lang="en"]\')?.click()',
    returnByValue: true
  });
  await new Promise(r => setTimeout(r, 2000));

  const inspect = async (section, selector) => {
    const res = await send('Runtime.evaluate', {
      expression: `(() => {
        const el = document.querySelector('${selector}');
        if (!el) return { found: false };
        const rect = el.getBoundingClientRect();
        const cs = window.getComputedStyle(el);
        return {
          found: true,
          rect: { top: rect.top, bottom: rect.bottom, left: rect.left, right: rect.right, width: rect.width, height: rect.height },
          display: cs.display,
          visibility: cs.visibility,
          opacity: cs.opacity,
          transform: cs.transform
        };
      })()`,
      returnByValue: true
    });
    console.log(`[${section}] ${selector}:`, JSON.stringify(res.result.value));
  };

  console.log('--- HERO STATE ---');
  await inspect('hero', '.panel--hero');
  await inspect('hero', '.tagline');
  await inspect('hero', '.sound');
  await inspect('hero', '.motion-toggle');
  await inspect('hero', '.hud');

  // Go to about
  await send('Runtime.evaluate', { expression: 'document.querySelector(\'a[data-go="about"]\')?.click()' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('--- ABOUT STATE ---');
  await inspect('about', '.panel--about');
  await inspect('about', '.about__portrait');
  await inspect('about', '.about__text');

  // Go to services
  await send('Runtime.evaluate', { expression: 'document.querySelector(\'a[data-go="services"]\')?.click()' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('--- SERVICES STATE ---');
  await inspect('services', '.panel--services');
  await inspect('services', '.services');
  await inspect('services', '.service:first-child');
  await inspect('services', '.service:last-child');

  // Go to works
  await send('Runtime.evaluate', { expression: 'document.querySelector(\'a[data-go="works:0"]\')?.click()' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('--- WORKS STATE ---');
  await inspect('works', '.panel--works');
  await inspect('works', '.works__name');
  await inspect('works', '.works__list');

  // Go to contact
  await send('Runtime.evaluate', { expression: 'document.querySelector(\'a[data-go="contact"]\')?.click()' });
  await new Promise(r => setTimeout(r, 1500));
  console.log('--- CONTACT STATE ---');
  await inspect('contact', '.panel--contact');
  await inspect('contact', '.form');

  ws.close();
} finally {
  chrome.kill('SIGTERM');
}
