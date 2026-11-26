import { Injectable } from '@angular/core';

export type NewsTag = 'Upcoming Event' | 'Event Highlight' | 'New Program' | 'Team' | 'Partnership' | 'Thank You';

/** A paragraph, a paragraph with a bold opening phrase, or a list of "Term: description" items. */
export type NewsBlock =
  | string
  | { lead: string; text: string }
  | { list: { term: string; text: string }[] };

export interface NewsPost {
  id: number;  // next number after the highest; newest post has the highest id
  slug: string;  // short, lowercase, hyphenated; used in the link /news#slug
  date: string;  // publish date, "YYYY-MM-DD"
  tag: NewsTag;
  title: string;
  summary: string;  // one or two sentences, shown on the home page
  body: NewsBlock[];
  link?: { label: string; url: string };  // "/events", "https://...", or "mailto:..."
  images?: { src: string; alt: string; logo?: boolean }[];  // only photos everyone in them agreed to; logo: true shows a logo/banner at a modest size
}

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  // Newest first. Before posting about a named person or partner, get their OK.
  private posts: NewsPost[] = [
    {
      id: 7,
      slug: 'thanksgiving-thank-you-2026',
      date: '2026-11-26',
      tag: 'Thank You',
      title: 'Happy Thanksgiving: thank you to our volunteer instructors and donors',
      summary: 'This Thanksgiving, we\'re grateful for our volunteer instructors, our Youth Advisor Board, and the donors and partners who support our community.',
      body: [
        'This Thanksgiving, we\'re grateful for the people who make Sporting2Impact possible.',
        { lead: 'To our instructors:', text: 'every yoga, Pilates, Zumba and BollyX session we offer is led by volunteers ' +
          'who generously give their time, energy and expertise, so that fitness stays open to everyone in our community. ' +
          'Thank you for showing up, week after week, and for making our community healthier and happier.' },
        { lead: 'To our Youth Advisor Board:', text: 'thank you for the energy, ideas and hard work you bring, from ' +
          'outreach and social media to planning and running our events. You help shape what Sporting2Impact becomes.' },
        { lead: 'To our donors:', text: 'thank you for believing in what we do. Every donation, large or small, helps us ' +
          'keep bringing people together through movement across Maryland.' },
        { lead: 'To our partners and community:', text: 'thank you to The Hub in Catonsville, Loch Raven Badminton Club, ' +
          'and everyone who has joined us at an event, for being part of this community. We couldn\'t do it without you!' },
        'Happy Thanksgiving from all of us at Sporting2Impact. 💙',
      ],
      link: { label: 'Meet our instructors', url: '/team' },
      images: [
        { src: '/assets/news/2026-thanksgiving.jpg', alt: 'Happy Thanksgiving! Thank you to our volunteer instructors, donors, partners and community. Sporting2Impact logo with autumn leaves.' },
      ],
    },
    {
      id: 6,
      slug: 'junior-badminton-tournament-dec-5',
      date: '2026-11-18',
      tag: 'Upcoming Event',
      title: 'Junior Badminton Tournament on December 5, with Loch Raven Badminton Club',
      summary: 'Sporting2Impact and Loch Raven Badminton Club are hosting a Junior Badminton Tournament on Saturday, December 5 in Parkville.',
      body: [
        'Calling all junior badminton players! Sporting2Impact has teamed up with Loch Raven Badminton Club (LRBC) ' +
          'to host a Junior Badminton Tournament on Saturday, December 5, starting at 8:30 AM. ' +
          'Badminton is the newest addition to our activities, and this weekend of tournaments is our first!',
        { list: [
          { term: 'When', text: 'Saturday, December 5, 8:30 AM to 7:30 PM' },
          { term: 'Where', text: 'NERCC, 7501 Oakleigh Rd, Parkville, MD 21234' },
          { term: 'Register by', text: 'Tuesday, December 1 at 11:59 PM' },
        ] },
        'Sign up using the link below.',
      ],
      link: { label: 'Register for the Junior Tournament', url: 'https://form.jotform.com/263135599431159' },
      images: [
        { src: '/assets/news/badminton-lrbc-sporting2impact.jpg', alt: 'Loch Raven Badminton Club and Sporting2Impact logos side by side', logo: true },
      ],
    },
    {
      id: 5,
      slug: 'adult-badminton-tournament-dec-6',
      date: '2026-11-18',
      tag: 'Upcoming Event',
      title: 'Adult Friendly Badminton Tournament on December 6, with Loch Raven Badminton Club',
      summary: 'Grab a racket! Our Adult Friendly Badminton Tournament with Loch Raven Badminton Club is on Sunday, December 6 in Parkville.',
      body: [
        'The day after the juniors take the court, it\'s the adults\' turn! Sporting2Impact and Loch Raven Badminton Club (LRBC) ' +
          'are hosting an Adult Friendly Badminton Tournament on Sunday, December 6, starting at 8:30 AM.',
        { list: [
          { term: 'When', text: 'Sunday, December 6, 8:30 AM to 7:30 PM' },
          { term: 'Where', text: 'NERCC, 7501 Oakleigh Rd, Parkville, MD 21234' },
          { term: 'Register by', text: 'Tuesday, December 1 at 11:59 PM' },
        ] },
        'Sign up using the link below.',
      ],
      link: { label: 'Register for the Adult Tournament', url: 'https://form.jotform.com/263195784308164' },
      images: [
        { src: '/assets/news/badminton-lrbc-sporting2impact.jpg', alt: 'Loch Raven Badminton Club and Sporting2Impact logos side by side', logo: true },
      ],
    },
    {
      id: 4,
      slug: 'nov-14-zumba-the-hub',
      date: '2026-11-15',
      tag: 'Event Highlight',
      title: '11 dancers bring the energy to Zumba at The Hub',
      summary: '11 participants joined our free Zumba session at The Hub in Catonsville on November 14.',
      body: [
        'On Saturday, November 14, 11 participants danced through a free Zumba session at The Hub in Catonsville. ' +
          'Thank you to everyone who came out, and to The Hub for hosting us!',
        'Our Zumba sessions are free and open to all ages and fitness levels. Watch our events page for the next one.',
      ],
      link: { label: 'See upcoming events', url: '/events' },
      images: [
        { src: '/assets/news/2026-11-14-zumba-the-hub.jpg', alt: 'Zumba participants posing together in front of the neon-lit wall at The Hub in Catonsville' },
      ],
    },
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
