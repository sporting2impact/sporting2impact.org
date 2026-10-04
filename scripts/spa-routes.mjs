// GitHub Pages only knows about index.html, so deep links like /joinus fall
// through to 404.html and are served with a 404 status, which keeps Google
// from indexing them. Copying index.html to <route>.html lets GitHub Pages
// serve /joinus with a 200 (it resolves extensionless URLs to .html files),
// and the Angular router takes over from there.
//
// Keep this list in sync with the routes in src/app/app.routes.ts and
// public/sitemap.xml.
import { copyFileSync } from 'node:fs';
import { join } from 'node:path';

const routes = ['team', 'events', 'joinus'];
const outDir = 'dist/sporting2impact.org/browser';

for (const route of routes) {
  copyFileSync(join(outDir, 'index.html'), join(outDir, `${route}.html`));
  console.log(`Created ${route}.html`);
}
