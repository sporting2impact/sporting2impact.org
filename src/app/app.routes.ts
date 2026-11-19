import { Routes } from '@angular/router';
import { Joinus } from './joinus/joinus';
import { Events } from './events/events';
import { Home } from './home/home';
import { Team } from './team/team';
import { News } from './news/news';
import { About } from './about/about';

// `title` sets the browser tab / search result title; `data.description` feeds
// the meta description and social-sharing previews (see SeoService).
export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Sporting2Impact | Community Fitness & Wellness Events in Maryland',
    data: {
      description:
        'Sporting2Impact is a 501(c)(3) nonprofit bringing people together through ' +
        'inclusive wellness walks, yoga, Pilates, Zumba, and sports events across Maryland.',
    },
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
  {
    path: 'about',
    component: About,
    title: 'About Us | Sporting2Impact',
    data: {
      description:
        'Who we are and what we do: Sporting2Impact is a Maryland 501(c)(3) nonprofit making ' +
        'sports and fitness accessible, inclusive and community-driven.',
    },
  },
  {
    path: 'team',
    component: Team,
    title: 'Our Team | Sporting2Impact',
    data: {
      description:
        'Meet the founders, Youth Advisor Board, and instructors behind Sporting2Impact, ' +
        'a Maryland nonprofit making fitness and sports accessible to everyone.',
    },
  },
  {
    path: 'events',
    component: Events,
    title: 'Events | Sporting2Impact',
    data: {
      description:
        'Upcoming and past Sporting2Impact community events: wellness walks, yoga, Pilates, ' +
        'Zumba, chess, and more across Maryland.',
    },
  },
  {
    path: 'news',
    component: News,
    title: 'News & Highlights | Sporting2Impact',
    data: {
      description:
        'News, event highlights and new programs from Sporting2Impact, a 501(c)(3) nonprofit ' +
        'bringing community fitness and sports events to people across Maryland.',
    },
  },
  {
    path: 'joinus',
    component: Joinus,
    title: 'Get Involved: Donate, Volunteer & Sponsor | Sporting2Impact',
    data: {
      description:
        'Support a healthier community: donate (tax-deductible), volunteer, host an event, ' +
        'or sponsor Sporting2Impact, a Maryland 501(c)(3) nonprofit.',
    },
  },
  { path: '**', redirectTo: '' },
];
