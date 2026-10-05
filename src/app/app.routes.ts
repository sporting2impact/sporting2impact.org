import { Routes } from '@angular/router';
import { Joinus } from './joinus/joinus';
import { Events } from './events/events';
import { Home } from './home/home';
import { Team } from './team/team';

// `title` sets the browser tab / search result title; `data.description` feeds
// the meta description and social-sharing previews (see SeoService).
export const routes: Routes = [
  {
    path: '',
    component: Home,
    title: 'Sporting2Impact | Community Fitness & Wellness Events in Ellicott City, MD',
    data: {
      description:
        'Sporting2Impact is a Maryland 501(c)(3) nonprofit bringing people together through ' +
        'inclusive wellness walks, yoga, Pilates, Zumba, and sports events in Howard County.',
    },
  },
  { path: 'home', redirectTo: '', pathMatch: 'full' },
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
        'Zumba, chess, and more across Ellicott City and Howard County, Maryland.',
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
