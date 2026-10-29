import { spawn } from 'node:child_process';
import fs from 'node:fs';

const ARTIFACT_DIR = '/home/emran/.gemini/antigravity/brain/7884e4d9-ab56-440e-bc71-500841f2c34f';

async function capture() {
  const chrome = spawn('google-chrome', [
    '--headless=new',
    '--remote-debugging-port=9224',
    '--disable-gpu',
    '--no-sandbox',
    '--disable-dev-shm-usage',
    '--window-size=1920,1080',
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

    console.log('Waiting for loader ready...');
    for (let i = 0; i < 40; i++) {
      const evalRes = await send('Runtime.evaluate', {
        expression: 'document.querySelector("[data-loader]")?.hasAttribute("data-ready") || false',
        returnByValue: true
      });
      if (evalRes?.value) break;
      await new Promise(r => setTimeout(r, 500));
    }

    // Dismiss loader: Click silent then EN
    await send('Runtime.evaluate', {
      expression: 'document.querySelector(\'[data-enter="silent"]\')?.click()',
      returnByValue: true
    });
    await new Promise(r => setTimeout(r, 400));

    await send('Runtime.evaluate', {
      expression: 'document.querySelector(\'[data-enter-lang="en"]\')?.click()',
      returnByValue: true
    });
    await new Promise(r => setTimeout(r, 3500));

    // Navigate to Contact section
    await send('Runtime.evaluate', {
      expression: 'document.querySelector(\'a[data-go="contact"]\')?.click()',
      returnByValue: true
    });
    await new Promise(r => setTimeout(r, 3800));

    // Capture Desktop
    const desktopShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${ARTIFACT_DIR}/contact_desktop.png`, Buffer.from(desktopShot.data, 'base64'));
    console.log('Saved contact_desktop.png');

    // Switch to Mobile
    await send('Emulation.setDeviceMetricsOverride', {
      width: 390,
      height: 844,
      deviceScaleFactor: 2,
      mobile: true
    });
    await send('Emulation.setTouchEmulationEnabled', { enabled: true });
    await new Promise(r => setTimeout(r, 2000));

    const mobileShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${ARTIFACT_DIR}/contact_mobile.png`, Buffer.from(mobileShot.data, 'base64'));
    console.log('Saved contact_mobile.png');

    // Switch language to Bengali using window.setPortfolioLanguage
    await send('Runtime.evaluate', {
      expression: 'window.setPortfolioLanguage("bn")',
      returnByValue: true
    });
    await new Promise(r => setTimeout(r, 2000));

    const mobileBnShot = await send('Page.captureScreenshot', { format: 'png' });
    fs.writeFileSync(`${ARTIFACT_DIR}/contact_mobile_bn.png`, Buffer.from(mobileBnShot.data, 'base64'));
    console.log('Saved contact_mobile_bn.png');

    ws.close();
  } finally {
    chrome.kill('SIGTERM');
  }
}

capture().catch(err => {
  console.error('Capture failed:', err);
  process.exit(1);
});
