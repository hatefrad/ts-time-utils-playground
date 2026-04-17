import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import os from 'node:os';
import path from 'node:path';

import { EXAMPLE_HEADER, runExampleFile } from './lib/example-runner.mjs';

const repoRoot = path.resolve(import.meta.dirname, '..');

test('runExampleFile succeeds for a valid runnable snippet', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ts-time-utils-example-runner-'));
  const filePath = path.join(tempDir, 'ok.ts');

  try {
    await fs.writeFile(
      filePath,
      `${EXAMPLE_HEADER}
console.log('example ok');
export {};
`,
      'utf8'
    );

    const result = runExampleFile(filePath, repoRoot);
    assert.equal(result.status, 0);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});

test('runExampleFile reports failures for throwing snippets', async () => {
  const tempDir = await fs.mkdtemp(path.join(os.tmpdir(), 'ts-time-utils-example-runner-'));
  const filePath = path.join(tempDir, 'throws.ts');

  try {
    await fs.writeFile(
      filePath,
      `${EXAMPLE_HEADER}
throw new Error('boom');
`,
      'utf8'
    );

    const result = runExampleFile(filePath, repoRoot);
    assert.notEqual(result.status, 0);
    assert.match(result.stderr, /boom/);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
});
