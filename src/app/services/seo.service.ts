import { DOCUMENT, Injectable, inject } from '@angular/core';
import { Meta } from '@angular/platform-browser';
import { ActivatedRouteSnapshot, NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

export const SITE_URL = 'https://sporting2impact.org';
const SITE_NAME = 'Sporting2Impact';
const DEFAULT_IMAGE = `${SITE_URL}/Sporting2Impact.png`;
const DEFAULT_DESCRIPTION =
  'Sporting2Impact is a Maryland 501(c)(3) nonprofit bringing people together through ' +
  'inclusive fitness, wellness, and sports events in Howard County.';

/**
 * Keeps the page's description, canonical URL and social-sharing (Open Graph /
 * Twitter) tags in sync with the current route. Page titles come from the
 * `title` on each route; descriptions come from `data.description`.
 */
@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly meta = inject(Meta);
  private readonly document = inject(DOCUMENT);
  private readonly router = inject(Router);

  init() {
    this.router.events
      .pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(() => this.updateTags());
  }

  /** Adds, replaces, or (with null) removes a JSON-LD structured data block in <head>. */
  setJsonLd(id: string, data: object | null) {
    let script = this.document.getElementById(id);
    if (!data) {
      script?.remove();
      return;
    }
    if (!script) {
      script = this.document.createElement('script');
      script.id = id;
      script.setAttribute('type', 'application/ld+json');
      this.document.head.appendChild(script);
    }
    // Escape "<" so event text can never close the script tag early.
    script.textContent = JSON.stringify(data).replace(/</g, '\\u003c');
  }

  private updateTags() {
    let route: ActivatedRouteSnapshot = this.router.routerState.snapshot.root;
    while (route.firstChild) route = route.firstChild;

    const title = route.title ?? SITE_NAME;
    const description: string = route.data['description'] ?? DEFAULT_DESCRIPTION;
    const path = this.router.url.split(/[?#]/)[0];
    const url = path === '/' ? `${SITE_URL}/` : `${SITE_URL}${path}`;

    this.meta.updateTag({ name: 'description', content: description });
    this.meta.updateTag({ property: 'og:title', content: title });
    this.meta.updateTag({ property: 'og:description', content: description });
    this.meta.updateTag({ property: 'og:url', content: url });
    this.meta.updateTag({ property: 'og:image', content: DEFAULT_IMAGE });
    this.meta.updateTag({ name: 'twitter:title', content: title });
    this.meta.updateTag({ name: 'twitter:description', content: description });

    let canonical = this.document.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = this.document.createElement('link');
      canonical.rel = 'canonical';
      this.document.head.appendChild(canonical);
    }
    canonical.href = url;
  }
}
