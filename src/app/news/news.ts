import { Component, OnDestroy, OnInit } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';
import { NewsBlock, NewsPost, NewsService } from '../services/news.service';
import { SeoService, SITE_URL } from '../services/seo.service';

@Component({
  selector: 'app-news',
  imports: [NgFor, NgIf, DatePipe, RouterLink],
  templateUrl: './news.html',
  styleUrl: './news.css',
  // The impact numbers depend on today's date, so render fresh in the browser
  // instead of reusing the build-time HTML.
  host: { ngSkipHydration: 'true' },
})
export class News implements OnInit, OnDestroy {
  posts: NewsPost[] = [];
  stats!: ReturnType<EventService['getImpactStats']>;

  constructor(
    private newsService: NewsService,
    private eventService: EventService,
    private seo: SeoService,
  ) {}

  ngOnInit() {
    this.posts = this.newsService.getPosts();
    this.stats = this.eventService.getImpactStats();
    this.seo.setJsonLd(NEWS_JSON_LD_ID, newsStructuredData(this.posts));
  }

  ngOnDestroy() {
    this.seo.setJsonLd(NEWS_JSON_LD_ID, null);
  }

  isList(block: NewsBlock): block is Exclude<NewsBlock, string> {
    return typeof block !== 'string';
  }

  isInternal(url: string) {
    return url.startsWith('/');
  }
}

const NEWS_JSON_LD_ID = 'news-structured-data';

function newsStructuredData(posts: NewsPost[]) {
  if (posts.length === 0) return null;
  const organization = { '@id': `${SITE_URL}/#organization`, '@type': 'NGO', name: 'Sporting2Impact', url: `${SITE_URL}/` };
  return {
    '@context': 'https://schema.org',
    '@graph': posts.map(post => ({
      '@type': 'NewsArticle',
      headline: post.title,
      description: post.summary,
      datePublished: post.date,
      url: `${SITE_URL}/news#${post.slug}`,
      ...(post.image && { image: [`${SITE_URL}${post.image.src}`] }),
      author: organization,
      publisher: organization,
    })),
  };
}
