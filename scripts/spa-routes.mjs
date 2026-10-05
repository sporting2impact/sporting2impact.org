// Angular pre-renders each route to <route>/index.html. On GitHub Pages that
// makes /team answer with a 301 redirect to /team/, which doesn't match the
// URLs in public/sitemap.xml. Flattening each one to <route>.html lets GitHub
// Pages serve /team directly with a 200 (it resolves extensionless URLs to
// .html files), so Google indexes the canonical URL.
import { existsSync, readdirSync, renameSync, rmdirSync } from 'node:fs';
import { join } from 'node:path';

const outDir = 'dist/sporting2impact.org/browser';

for (const entry of readdirSync(outDir, { withFileTypes: true })) {
  if (!entry.isDirectory()) continue;

  const dir = join(outDir, entry.name);
  const files = readdirSync(dir);
  // Only pre-rendered route folders (a lone index.html); leave asset folders alone.
  if (files.length !== 1 || files[0] !== 'index.html') continue;

  const target = join(outDir, `${entry.name}.html`);
  if (existsSync(target)) throw new Error(`${target} already exists`);

  renameSync(join(dir, 'index.html'), target);
  rmdirSync(dir);
  console.log(`Flattened ${entry.name}/index.html -> ${entry.name}.html`);
}
