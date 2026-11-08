import { Injectable } from '@angular/core';

export interface Sponsor {
  name: string;  // the name the sponsor asked us to use
  description: string;  // what they support, e.g. "Venue partner for ..."
  url?: string;  // their website
  // The sponsor's logo (official, or a version matching the name they asked us
  // to use), shown on a dark background. Without one, the name is shown as a
  // styled card.
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
      // "the Hub" line of their official logo (gold, transparent background),
      // cropped from hubktv.peblla.com because they asked to be named just "The Hub"
      logo: { src: '/assets/sponsors/the-hub.png', alt: 'The Hub' },
    },
  ];

  getSponsors() {
    return this.sponsors;
  }
}
