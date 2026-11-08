import { Component, Input, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';
import { BannerContent, activeBanner, findBanner } from './campaigns';

@Component({
  selector: 'app-seasonal-banner',
  imports: [NgFor, NgIf, RouterLink],
  templateUrl: './seasonal-banner.html',
  styleUrl: './seasonal-banner.css',
  // Which banner shows depends on today's date, so decide in the browser
  // instead of reusing the build-time HTML.
  host: { ngSkipHydration: 'true' },
})
export class SeasonalBanner implements OnInit {
  /** Show this banner regardless of date (used by the local preview page). */
  @Input() previewId: string | null = null;

  banner: BannerContent | null = null;
  /** The message split into plain and **bold** parts. */
  parts: { text: string; bold: boolean }[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.banner = this.previewId ? findBanner(this.previewId) : activeBanner();
    if (this.banner) {
      const events = String(this.eventService.getImpactStats().eventsHeld);
      this.parts = this.banner.message
        .replace('{events}', events)
        .split('**')
        .map((text, i) => ({ text, bold: i % 2 === 1 }))
        .filter(part => part.text);
    }
  }

  isInternal(url: string) {
    return url.startsWith('/');
  }
}
