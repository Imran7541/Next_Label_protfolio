import { spawn } from 'node:child_process';
import fs from 'node:fs';

const chrome = spawn('google-chrome', [
  '--headless=new',
  '--remote-debugging-port=9225',
  '--disable-gpu',
  '--no-sandbox',
  '--disable-dev-shm-usage',
  '--window-size=390,844',
  'http://127.0.0.1:3002/?tier=low'
]);

await new Promise(r => setTimeout(r, 1500));

try {
  const listRes = await fetch('http://127.0.0.1:9225/json');
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
  await send('Runtime.evaluate', { expression: 'document.querySelector(\'[data-enter="silent"]\')?.click()' });
  await new Promise(r => setTimeout(r, 350));

  // Click BN
  await send('Runtime.evaluate', { expression: 'document.querySelector(\'[data-enter-lang="bn"]\')?.click()' });
  console.log('Waiting for BN hero reveal...');
  await new Promise(r => setTimeout(r, 5000));

  const takeShot = async (name) => {
    const shot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`/home/emran/.gemini/antigravity/brain/7884e4d9-ab56-440e-bc71-500841f2c34f/${name}.png`, Buffer.from(shot.data, 'base64'));
    console.log(`Captured ${name}.png`);
  };

  await takeShot('mobile_bn_hero');

  // Navigate to About
  await send('Runtime.evaluate', { expression: 'document.querySelector(\'a[data-go="about"]\')?.click()' });
  await new Promise(r => setTimeout(r, 2200));
  await takeShot('mobile_bn_about');

  ws.close();
} finally {
  chrome.kill('SIGTERM');
}
