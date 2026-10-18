import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { NgFor, NgIf, DatePipe, TitleCasePipe } from '@angular/common';
import {
  EVENT_DURATION_MINUTES,
  EVENT_TIME_ZONE,
  EventItem,
  EventService,
  eventImagePath,
} from '../services/event.service';
import { SeoService } from '../services/seo.service';
import { eventsStructuredData } from './event-structured-data';

@Component({
  selector: 'app-events',
  imports: [NgFor, NgIf, DatePipe, TitleCasePipe],
  templateUrl: './events.html',
  styleUrl: './events.css',
  standalone: true,
  providers: [DatePipe],
  // Upcoming events depend on today's date, so render fresh in the browser instead of
  // reusing the build-time HTML (which could list events that have since passed).
  host: { ngSkipHydration: 'true' },
})
export class Events implements OnInit, OnDestroy {
  events: EventItem[] = [];

  upcomingEvents: EventItem[] = [];
  pastEvents: EventItem[] = [];
  pastYears: number[] = [];
  selectedYear: number | null = null;

  protected readonly eventImagePath = eventImagePath;

  constructor(private eventService: EventService, private seo: SeoService) {}

  ngOnInit() {
    this.events = this.eventService.getEvents();

    const now = new Date();

    // Split into upcoming and past
    this.upcomingEvents = this.eventService.getUpcomingEvents();
    this.seo.setJsonLd(EVENTS_JSON_LD_ID, eventsStructuredData(this.upcomingEvents));

    this.pastEvents = this.events.filter(
      e => new Date(e.date) < now
    ).sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    // Extract unique years from past events
    this.pastYears = Array.from(
      new Set(this.pastEvents.map(e => new Date(e.date).getFullYear()))
    ).sort((a, b) => b - a); // newest first

    // Default selected year
    this.selectedYear = this.pastYears[0] ?? null;
  }

  ngOnDestroy() {
    this.seo.setJsonLd(EVENTS_JSON_LD_ID, null);
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

  // ---------- Add to calendar ----------

  calendarOpenId: number | null = null;

  toggleCalendar(id: number, clickEvent: MouseEvent) {
    clickEvent.stopPropagation();
    this.calendarOpenId = this.calendarOpenId === id ? null : id;
  }

  @HostListener('document:click')
  @HostListener('document:keydown.escape')
  closeCalendar() {
    this.calendarOpenId = null;
  }

  googleCalendarUrl(event: EventItem) {
    const { start, end } = this.calendarTimes(event);
    const params = new URLSearchParams({
      action: 'TEMPLATE',
      text: this.calendarTitle(event),
      dates: `${start}/${end}`,
      ctz: EVENT_TIME_ZONE,
      location: event.location,
      details: this.calendarDetails(event),
    });
    return `https://calendar.google.com/calendar/render?${params}`;
  }

  downloadIcs(event: EventItem) {
    const { start, end } = this.calendarTimes(event);
    const escape = (text: string) =>
      text.replace(/\\/g, '\\\\').replace(/([,;])/g, '\\$1').replace(/\n/g, '\\n');

    const ics = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//Sporting2Impact//Events//EN',
      'BEGIN:VEVENT',
      `UID:event-${event.id}@sporting2impact.org`,
      `DTSTAMP:${new Date().toISOString().replace(/[-:]/g, '').split('.')[0]}Z`,
      `DTSTART;TZID=${EVENT_TIME_ZONE}:${start}`,
      `DTEND;TZID=${EVENT_TIME_ZONE}:${end}`,
      `SUMMARY:${escape(this.calendarTitle(event))}`,
      `LOCATION:${escape(event.location)}`,
      `DESCRIPTION:${escape(this.calendarDetails(event))}`,
      'END:VEVENT',
      'END:VCALENDAR',
    ].join('\r\n');

    const url = URL.createObjectURL(new Blob([ics], { type: 'text/calendar;charset=utf-8' }));
    const link = document.createElement('a');
    link.href = url;
    link.download = `${this.calendarTitle(event).replace(/[^a-z0-9]+/gi, '-')}.ics`;
    link.click();
    URL.revokeObjectURL(url);
    this.calendarOpenId = null;
  }

  private calendarTitle(event: EventItem) {
    return event.subtitle ? `${event.title} – ${event.subtitle}` : event.title;
  }

  private calendarDetails(event: EventItem) {
    const lines = ['Hosted by Sporting2Impact.'];
    if (event.registrationLink) lines.push(`Register: ${event.registrationLink}`);
    lines.push('More events: https://sporting2impact.org/events');
    return lines.join('\n');
  }

  // Event dates are Maryland local time ("2026-10-04T16:00"); format them as
  // floating calendar times and pair with EVENT_TIME_ZONE so DST is handled by the calendar app.
  private calendarTimes(event: EventItem) {
    const [y, mo, d, h, mi] = event.date.split(/[-T:]/).map(Number);
    const start = new Date(Date.UTC(y, mo - 1, d, h, mi));
    const end = new Date(start.getTime() + EVENT_DURATION_MINUTES * 60_000);
    const format = (dt: Date) => dt.toISOString().replace(/[-:]/g, '').split('.')[0];
    return { start: format(start), end: format(end) };
  }
}

const EVENTS_JSON_LD_ID = 'events-structured-data';
