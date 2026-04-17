import fs from 'node:fs/promises';
import path from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import ts from 'typescript';

const repoRoot = path.resolve(import.meta.dirname, '..');
const sourcePath = path.join(repoRoot, 'src/data/examples.ts');

async function loadCategories() {
  const source = await fs.readFile(sourcePath, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: sourcePath,
  });

  const tempModule = path.join(repoRoot, '.example-validation-module.mjs');
  await fs.writeFile(tempModule, outputText, 'utf8');

  try {
    const moduleUrl = `${pathToFileURL(tempModule).href}?t=${Date.now()}`;
    const mod = await import(moduleUrl);
    return mod.categories;
  } finally {
    await fs.rm(tempModule, { force: true });
  }
}

function buildExampleFile(example) {
  return `${example.code}

export {};
`;
}

async function main() {
  const categories = await loadCategories();
  const tempDir = path.join(repoRoot, '.example-validation');
  const filePaths = [];

  try {
    await fs.rm(tempDir, { recursive: true, force: true });
    await fs.mkdir(tempDir, { recursive: true });

    for (const category of categories) {
      for (let i = 0; i < category.examples.length; i += 1) {
        const example = category.examples[i];
        const safeTitle = example.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
        const filePath = path.join(tempDir, `${category.slug}-${i + 1}-${safeTitle}.ts`);
        await fs.writeFile(filePath, buildExampleFile(example), 'utf8');
        filePaths.push(filePath);
      }
    }

    const result = spawnSync(
      path.join(repoRoot, 'node_modules/.bin/tsc'),
      [
        '--noEmit',
        '--target', 'ES2020',
        '--module', 'ESNext',
        '--moduleResolution', 'bundler',
        '--strictNullChecks',
        '--noImplicitAny', 'false',
        '--skipLibCheck',
        '--verbatimModuleSyntax',
        ...filePaths,
      ],
      {
        cwd: repoRoot,
        encoding: 'utf8',
      }
    );

    if (result.status !== 0) {
      process.stderr.write(result.stdout);
      process.stderr.write(result.stderr);
      process.exit(result.status ?? 1);
    }

    console.log(`Validated ${filePaths.length} examples.`);
  } finally {
    await fs.rm(tempDir, { recursive: true, force: true });
  }
}

await main();
