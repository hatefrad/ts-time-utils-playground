import fs from 'node:fs/promises';
import path from 'node:path';
import { spawnSync } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import ts from 'typescript';

export const EXAMPLE_HEADER = `import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
process.chdir(path.resolve(__dirname, '..'));
`;

export async function loadCategoriesFromSource(repoRoot, sourcePath) {
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

export function getExampleTempPath(tempDir, category, example, index) {
  const safeTitle = example.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  return path.join(tempDir, `${category.slug}-${index + 1}-${safeTitle}.ts`);
}

export async function writeExampleFiles(tempDir, categories, buildExampleFile) {
  const filePaths = [];

  await fs.rm(tempDir, { recursive: true, force: true });
  await fs.mkdir(tempDir, { recursive: true });

  for (const category of categories) {
    for (let i = 0; i < category.examples.length; i += 1) {
      const example = category.examples[i];
      const filePath = getExampleTempPath(tempDir, category, example, i);
      await fs.writeFile(filePath, buildExampleFile(example), 'utf8');
      filePaths.push({ category, example, filePath });
    }
  }

  return filePaths;
}

export function runExampleFile(filePath, repoRoot) {
  const source = ts.sys.readFile(filePath, 'utf8');
  const { outputText } = ts.transpileModule(source, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2020,
    },
    fileName: filePath,
  });

  const jsPath = filePath.replace(/\.ts$/, '.mjs');
  ts.sys.writeFile(jsPath, outputText);

  return spawnSync(
    process.execPath,
    [jsPath],
    {
      cwd: repoRoot,
      encoding: 'utf8',
    }
  );
}
