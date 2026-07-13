import assert from 'node:assert/strict';
import { spawn } from 'node:child_process';
import test from 'node:test';

const serverEntry = new URL('./index.js', import.meta.url);

function runServer(env, waitForOutput = null) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [serverEntry.pathname], {
      env: { ...process.env, PORT: '4199', ...env },
      stdio: ['ignore', 'pipe', 'pipe'],
    });
    let output = '';
    const collect = (chunk) => {
      output += chunk.toString();
      if (waitForOutput && output.includes(waitForOutput)) child.kill('SIGTERM');
    };
    child.stdout.on('data', collect);
    child.stderr.on('data', collect);
    child.on('error', reject);
    child.on('exit', (code, signal) => resolve({ code, signal, output }));
    setTimeout(() => child.kill('SIGTERM'), 3000).unref();
  });
}

test('backend fails closed when ADMIN_API_KEY is missing or blank', async () => {
  const result = await runServer({ ADMIN_API_KEY: '' });
  assert.notEqual(result.code, 0);
  assert.match(result.output, /ADMIN_API_KEY is required/);
});

test('backend starts without logging the configured administrator key', async () => {
  const canary = 'security-test-canary-never-log';
  const result = await runServer({ ADMIN_API_KEY: canary }, 'Administrator key configured');
  assert.match(result.output, /Administrator key configured/);
  assert.doesNotMatch(result.output, new RegExp(canary));
});
