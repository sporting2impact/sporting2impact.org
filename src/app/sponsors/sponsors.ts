import { Component, Input } from '@angular/core';
import { NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { Sponsor, SponsorService } from '../services/sponsor.service';

/** With this many sponsors or more, the row scrolls; with fewer it stays still. */
const SCROLL_FROM = 4;

@Component({
  selector: 'app-sponsors',
  imports: [NgFor, NgIf, NgTemplateOutlet],
  templateUrl: './sponsors.html',
  styleUrl: './sponsors.css',
})
export class Sponsors {
  @Input() heading = 'Our Sponsors';
  @Input() intro = '';

  sponsors: Sponsor[];
  scrolling: boolean;
  /** Seconds for one full loop, so the speed stays the same as sponsors are added. */
  loopSeconds: number;

  constructor(sponsorService: SponsorService) {
    this.sponsors = sponsorService.getSponsors();
    this.scrolling = this.sponsors.length >= SCROLL_FROM;
    this.loopSeconds = this.sponsors.length * 5;
  }
}
