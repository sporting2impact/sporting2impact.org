import { Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { Router } from '@angular/router';

interface UpcomingEvent {
  title: string;
  date: string;
  description: string;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrls: ['./home.css'],
  schemas: [NO_ERRORS_SCHEMA]
})
export class Home {
  upcomingEvents: UpcomingEvent[] = [
    { title: 'Community Meetup', date: 'Mar 10, 2026', description: 'Local community gathering and networking.' },
    { title: 'Charity Run', date: 'Apr 02, 2026', description: '5K run to support our cause.' },
    { title: 'Tech Workshop', date: 'May 15, 2026', description: 'Hands-on workshop on web development.' }
  ];

  constructor(private router: Router) {}

  goToEvents() {
    this.router.navigate(['/events']);
  }
}
