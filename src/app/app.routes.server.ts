import { RenderMode, ServerRoute } from '@angular/ssr';

// Every page is pre-rendered to static HTML at build time (GitHub Pages has no
// server), so search engines and link previews get real content.
export const serverRoutes: ServerRoute[] = [{ path: '**', renderMode: RenderMode.Prerender }];
