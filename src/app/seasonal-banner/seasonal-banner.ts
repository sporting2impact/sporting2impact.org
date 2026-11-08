import { Component, OnInit } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';
import { BannerContent, activeBanner } from './campaigns';

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
  banner: BannerContent | null = null;
  /** The message split into plain and **bold** parts. */
  parts: { text: string; bold: boolean }[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.banner = activeBanner();
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
