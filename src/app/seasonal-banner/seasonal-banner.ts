import { Component, OnInit } from '@angular/core';
import { NgIf } from '@angular/common';
import { EventService } from '../services/event.service';
import { Campaign, activeCampaign } from './campaigns';

@Component({
  selector: 'app-seasonal-banner',
  imports: [NgIf],
  templateUrl: './seasonal-banner.html',
  styleUrl: './seasonal-banner.css',
  // Which banner shows depends on today's date, so decide in the browser
  // instead of reusing the build-time HTML.
  host: { ngSkipHydration: 'true' },
})
export class SeasonalBanner implements OnInit {
  campaign: Campaign | null = null;
  message = '';

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.campaign = activeCampaign();
    if (this.campaign) {
      const events = this.eventService.getImpactStats().eventsHeld;
      this.message = this.campaign.message.replace('{events}', String(events));
    }
  }
}
