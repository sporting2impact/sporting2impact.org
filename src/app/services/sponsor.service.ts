import { Injectable } from '@angular/core';

export interface Sponsor {
  name: string;  // the name the sponsor asked us to use
  description: string;  // what they support, e.g. "Venue partner for ..."
  url?: string;  // their website
  // Only a logo the sponsor provided or approved, used as-is (no cropping or
  // recoloring). Without one, the name is shown as a styled card.
  logo?: { src: string; alt: string };
}

@Injectable({
  providedIn: 'root'
})
export class SponsorService {

  // List only sponsors who have agreed to be named publicly.
  private sponsors: Sponsor[] = [
    {
      name: 'The Hub',
      description: 'Catonsville: venue partner for our Fitness dance sessions',
      url: 'https://hubktv.peblla.com/',
    },
  ];

  getSponsors() {
    return this.sponsors;
  }
}
