import { TestBed } from '@angular/core/testing';

import { EventService } from './event.service';

describe('EventService', () => {
  it('numbers events 1, 2, 3... from the oldest date to the newest', () => {
    // The id is also the add-to-calendar UID, so it must be unique. A new
    // event takes the next number after the highest id.
    const events = [...TestBed.inject(EventService).getEvents()].sort((a, b) =>
      a.date.localeCompare(b.date),
    );
    const outOfOrder = events
      .map((e, i) => ({ expected: i + 1, id: e.id, date: e.date, title: e.title }))
      .filter(e => e.id !== e.expected);
    expect(outOfOrder).toEqual([]);
  });

  it('writes every date as "YYYY-MM-DDTHH:MM"', () => {
    // A typo such as "2026-11-014T12:00" makes the event silently vanish from the site.
    const badDates = TestBed.inject(EventService)
      .getEvents()
      .filter(e => !/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}$/.test(e.date) || isNaN(Date.parse(e.date)))
      .map(e => ({ id: e.id, title: e.title, date: e.date }));
    expect(badDates).toEqual([]);
  });

  it('only uses full https:// addresses as registration links', () => {
    // Attendance counts belong in "attendees"; a number here would show a
    // broken Register button.
    const badLinks = TestBed.inject(EventService)
      .getEvents()
      .filter(e => e.registrationLink && !e.registrationLink.startsWith('https://'))
      .map(e => ({ id: e.id, title: e.title, registrationLink: e.registrationLink }));
    expect(badLinks).toEqual([]);
  });
});
