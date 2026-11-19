import { Component, signal } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService, EventItem } from '../services/event.service';
import { NewsPost, NewsService } from '../services/news.service';
import { Sponsors } from '../sponsors/sponsors';

/** A photo in the home page carousel. Only use photos everyone in them agreed to. */
interface Slide {
  src: string;
  alt: string;      // describes the photo for screen readers
  caption: string;  // shown on the photo
}

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [NgFor, NgIf, DatePipe, RouterLink, Sponsors],
  templateUrl: './home.html',
  styleUrl: './home.css',
  // Upcoming events depend on today's date, so render fresh in the browser instead of
  // reusing the build-time HTML (which could list events that have since passed).
  host: { ngSkipHydration: 'true' },
})
export class Home {
  upcomingEvents: EventItem[] = [];
  latestNews: NewsPost[] = [];
  stats!: ReturnType<EventService['getImpactStats']>;

  // Click-through only: the carousel never advances on its own.
  readonly slides: Slide[] = [
    { src: '/assets/home/zumba.jpg', alt: 'Smiling Zumba participants posing with peace signs in front of a neon-lit wall at The Hub in Catonsville', caption: 'Free Zumba at The Hub, Catonsville' },
    { src: '/assets/home/yoga.jpg', alt: 'Community members holding yoga poses on mats in a bright studio', caption: 'Community yoga' },
    { src: '/assets/home/pilates.jpg', alt: 'A room full of participants stretching on Pilates mats', caption: 'Pilates for all levels' },
    { src: '/assets/home/chess.jpg', alt: 'Kids and adults playing chess at a Sporting2Impact chess event', caption: 'Chess tournament' },
    { src: '/assets/home/walk.jpg', alt: 'A creek and stone wall along a wooded trail on a wellness walk', caption: 'Wellness walks on local trails' },
    { src: '/assets/home/jacket-donation.jpg', alt: 'Boxes of donated winter jackets with Sporting2Impact "Donate your jackets here" signs', caption: 'Winter jacket donation drive' },
  ];
  readonly current = signal(0);

  constructor(private eventService: EventService, private newsService: NewsService) {}

  ngOnInit() {
    this.upcomingEvents = this.eventService.getUpcomingEvents();
    this.latestNews = this.newsService.getLatest(3);
    this.stats = this.eventService.getImpactStats();
  }

  prev() {
    this.current.update(i => (i - 1 + this.slides.length) % this.slides.length);
  }

  next() {
    this.current.update(i => (i + 1) % this.slides.length);
  }

  goTo(i: number) {
    this.current.set(i);
  }
}
