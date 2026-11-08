import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService } from '../services/event.service';
import { BannerContent, activeBanner } from './campaigns';

@Component({
  selector: 'app-seasonal-banner',
  imports: [NgIf, RouterLink],
  templateUrl: './seasonal-banner.html',
  styleUrl: './seasonal-banner.css',
  // Which banner shows depends on today's date, so decide in the browser
  // instead of reusing the build-time HTML.
  host: { ngSkipHydration: 'true' },
})
export class SeasonalBanner implements OnInit {
  banner: BannerContent | null = null;
  message = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.banner = activeBanner();
    if (this.banner) {
      const events = this.eventService.getImpactStats().eventsHeld;
      this.message = this.banner.message.replace('{events}', String(events));
    }
  }

  isInternal(url: string) {
    return url.startsWith('/');
  }
}
