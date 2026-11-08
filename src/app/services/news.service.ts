import { Injectable } from '@angular/core';

export type NewsTag = 'Event Highlight' | 'New Program' | 'Team' | 'Partnership';

/** A paragraph, or a list of "Term: description" items. */
export type NewsBlock = string | { list: { term: string; text: string }[] };

export interface NewsPost {
  id: number;  // next number after the highest; newest post has the highest id
  slug: string;  // short, lowercase, hyphenated; used in the link /news#slug
  date: string;  // publish date, "YYYY-MM-DD"
  tag: NewsTag;
  title: string;
  summary: string;  // one or two sentences, shown on the home page
  body: NewsBlock[];
  link?: { label: string; url: string };  // "/events", "https://...", or "mailto:..."
  image?: { src: string; alt: string };  // only photos everyone in them agreed to
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // Newest first. Before posting about a named person or partner, get their OK.
  private posts: NewsPost[] = [
    {
      id: 3,
      slug: 'new-programs-mixed-fitness-throwball-soccer',
      date: '2026-11-08',
      tag: 'New Program',
      title: 'Coming soon: Mixed Fitness, Throwball and Soccer',
      summary: "We're growing! Three new programs are on the way.",
      body: [
        "We're growing! Sporting2Impact is working to add three new programs to our lineup:",
        {
          list: [
            { term: 'Mixed Fitness', text: 'varied workouts that combine strength, cardio and mobility.' },
            { term: 'Throwball', text: 'a fast-paced team net game, similar to volleyball, where the ball is caught and thrown over the net.' },
            { term: 'Soccer', text: 'friendly, inclusive games for building skills and teamwork.' },
          ],
        },
        'As with all our programs, the goal is to make sports and fitness accessible to everyone across Maryland. ' +
          "Interested in joining, coaching or volunteering? Email us and we'll keep you posted as sessions are scheduled.",
      ],
      link: { label: 'Email us', url: 'mailto:events@sporting2impact.org?subject=New%20programs' },
    },
    {
      id: 2,
      slug: 'nov-7-zumba-catonsville-and-trolley-line-walk',
      date: '2026-11-08',
      tag: 'Event Highlight',
      title: 'A double day of movement: Zumba in Catonsville and a walk in Old Ellicott City',
      summary: '10 participants danced at The Hub in Catonsville and 18 walkers took on the Trolley Line #9 Trail.',
      body: [
        'November 7 was a double day of movement. At noon, 10 participants danced through a free Zumba session ' +
          'at The Hub in Catonsville. That afternoon, 18 walkers joined our Wellness Walk on the Trolley Line #9 ' +
          'Trail in Old Ellicott City.',
        'Missed it? Our next free Zumba session at The Hub is Saturday, November 14 at 2:00 PM.',
      ],
      link: { label: 'Register for Nov 14 Zumba', url: 'https://www.zeffy.com/en-US/ticketing/free-zumba-session-nov--14' },
    },
    {
      id: 1,
      slug: 'halloween-walk-centennial-park',
      date: '2026-11-08',
      tag: 'Event Highlight',
      title: '17 walkers kick off November at our Halloween Walk',
      summary: '17 community members joined our Halloween Walk on the Centennial Park Lake Trail.',
      body: [
        'On Sunday, November 1, 17 community members joined us on the Centennial Park Lake Trail in Ellicott City ' +
          'for our Halloween Walk. It was a fun way to start the month moving together.',
        'Our Wellness Walks are free, open to all ages and fitness levels, and no registration is needed.',
      ],
      link: { label: 'See upcoming events', url: '/events' },
    },
  ];

  getPosts() {
    return [...this.posts].sort((a, b) => b.date.localeCompare(a.date) || b.id - a.id);
  }

  getLatest(count = 3) {
    return this.getPosts().slice(0, count);
  }
}
