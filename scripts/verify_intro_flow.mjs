import { spawn } from 'node:child_process';

const chrome = spawn('google-chrome', [
  '--headless=new',
  '--remote-debugging-port=9222',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  'http://127.0.0.1:3002/'
]);

await new Promise(r => setTimeout(r, 1500));

try {
  const listRes = await fetch('http://127.0.0.1:9222/json');
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

  // Wait for loader ready
  console.log('[CDP] Waiting for loader ready...');
  let ready = false;
  for (let i = 0; i < 30; i++) {
    const evalRes = await send('Runtime.evaluate', {
      expression: 'document.querySelector("[data-loader]")?.hasAttribute("data-ready") || false',
      returnByValue: true
    });
    if (evalRes?.result?.value === true) {
      ready = true;
      break;
    }
    await new Promise(r => setTimeout(r, 200));
  }
  console.log('[CDP] Loader ready state:', ready);

  // Check initial step
  const soundStepVisible = await send('Runtime.evaluate', {
    expression: 'getComputedStyle(document.querySelector(\'[data-loader-step="sound"]\')).display !== "none"',
    returnByValue: true
  });
  console.log('[CDP] Sound step visible initially:', soundStepVisible?.result?.value);

  // Click silent
  console.log('[CDP] Clicking [data-enter="silent"]...');
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(\'[data-enter="silent"]\')?.click()',
    returnByValue: true
  });

  // Wait for transition to lang step
  await new Promise(r => setTimeout(r, 400));
  const langStepVisible = await send('Runtime.evaluate', {
    expression: 'getComputedStyle(document.querySelector(\'[data-loader-step="lang"]\')).display !== "none"',
    returnByValue: true
  });
  console.log('[CDP] Lang step visible after sound choice:', langStepVisible?.result?.value);

  // Click BN
  console.log('[CDP] Clicking [data-enter-lang="bn"]...');
  await send('Runtime.evaluate', {
    expression: 'document.querySelector(\'[data-enter-lang="bn"]\')?.click()',
    returnByValue: true
  });

  // Wait for dissolve and language update
  await new Promise(r => setTimeout(r, 500));
  const checkState = await send('Runtime.evaluate', {
    expression: 'JSON.stringify({ lang: document.documentElement.lang, loaderDone: document.querySelector("[data-loader]")?.hasAttribute("data-done") || false, heroText: document.getElementById("hero-title")?.innerText || "" })',
    returnByValue: true
  });
  console.log('[CDP] Final State:', JSON.parse(checkState?.result?.value || '{}'));

  ws.close();
} finally {
  chrome.kill('SIGTERM');
}
