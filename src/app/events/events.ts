import { Component } from '@angular/core';
import { NgFor, NgIf, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { EventService } from '../services/event.service';
import { EventItem } from '../services/event.service';

@Component({
  selector: 'app-events',
  imports: [NgFor, NgIf, DatePipe, NgClass, TitleCasePipe],
  templateUrl: './events.html',
  styleUrl: './events.css',
  standalone: true,
  providers: [DatePipe],
})
export class Events {
  events: EventItem[] = [];

  upcomingEvents: EventItem[] = [];
  pastEvents: EventItem[] = [];
  pastYears: number[] = [];
  selectedYear: number | null = null;

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.events = this.eventService.getEvents();

    const now = new Date();

    // Split into upcoming and past
    this.upcomingEvents = this.events.filter(
      e => new Date(e.date) >= now
    );

    this.pastEvents = this.events.filter(
      e => new Date(e.date) < now
    );

    // Extract unique years from past events
    this.pastYears = Array.from(
      new Set(this.pastEvents.map(e => new Date(e.date).getFullYear()))
    ).sort((a, b) => b - a); // newest first

    // Default selected year
    this.selectedYear = this.pastYears[0] ?? null;
  }

  getPastEventsCount(year: number) {
    return this.pastEvents.filter(
      e => new Date(e.date).getFullYear() === year
    ).length;
  }

  selectYear(year: number) {
    this.selectedYear = year;
  }

  getPastEventsByYear() {
    if (!this.selectedYear) return [];
    return this.pastEvents.filter(
      e => new Date(e.date).getFullYear() === this.selectedYear
    );
  }
}
