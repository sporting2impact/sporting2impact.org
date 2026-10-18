import { Component } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService, EventItem } from '../services/event.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [NgFor, NgIf, DatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
  // Upcoming events depend on today's date, so render fresh in the browser instead of
  // reusing the build-time HTML (which could list events that have since passed).
  host: { ngSkipHydration: 'true' },
})
export class Home {
  upcomingEvents: EventItem[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.upcomingEvents = this.eventService.getUpcomingEvents();
  }
}
