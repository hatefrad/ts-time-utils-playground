import fs from 'node:fs/promises';
import path from 'node:path';

import {
  EXAMPLE_HEADER,
  loadCategoriesFromSource,
  runExampleFile,
  writeExampleFiles,
} from './lib/example-runner.mjs';

const repoRoot = path.resolve(import.meta.dirname, '..');
const sourcePath = path.join(repoRoot, 'src/data/examples.ts');
const tempDir = path.join(repoRoot, '.example-runtime');

function buildExampleFile(example) {
  return `${EXAMPLE_HEADER}
${example.code}

export {};
`;
}

async function main() {
  const categories = await loadCategoriesFromSource(repoRoot, sourcePath);
  const files = await writeExampleFiles(tempDir, categories, buildExampleFile);

  try {
    for (const { category, example, filePath } of files) {
      const result = runExampleFile(filePath, repoRoot);
      if (result.status !== 0) {
        process.stderr.write(`Example failed: ${category.slug} / ${example.title}\n`);
        if (result.stdout) process.stderr.write(result.stdout);
        if (result.stderr) process.stderr.write(result.stderr);
        process.exit(result.status ?? 1);
      }
    }

    console.log(`Ran ${files.length} examples successfully.`);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

await main();
