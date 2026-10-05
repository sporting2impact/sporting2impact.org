import { EVENT_DURATION_MINUTES, EVENT_TIME_ZONE, EventItem, eventImagePath } from '../services/event.service';
import { SITE_URL } from '../services/seo.service';

/**
 * schema.org Event markup so upcoming events can appear in Google's event
 * search results. Only include events that are also shown on the page.
 */
export function eventsStructuredData(events: EventItem[]) {
  if (events.length === 0) return null;

  return {
    '@context': 'https://schema.org',
    '@graph': events.map(event => {
      const online = event.location.trim().toLowerCase() === 'online';
      const image = eventImagePath(event.type);
      const start = localDate(event.date);
      const end = new Date(start.getTime() + EVENT_DURATION_MINUTES * 60_000);

      return {
        '@type': 'Event',
        name: event.subtitle ? `${event.title} – ${event.subtitle}` : event.title,
        startDate: toZonedIso(start),
        endDate: toZonedIso(end),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: online
          ? 'https://schema.org/OnlineEventAttendanceMode'
          : 'https://schema.org/OfflineEventAttendanceMode',
        location: online
          ? { '@type': 'VirtualLocation', url: event.registrationLink || `${SITE_URL}/events` }
          : { '@type': 'Place', name: event.location, address: event.location },
        ...(image && { image: [`${SITE_URL}${image}`] }),
        description: `${event.title} hosted by Sporting2Impact, a Maryland 501(c)(3) nonprofit.`,
        url: event.registrationLink || `${SITE_URL}/events`,
        organizer: { '@id': `${SITE_URL}/#organization`, '@type': 'NGO', name: 'Sporting2Impact', url: `${SITE_URL}/` },
      };
    }),
  };
}

// Wall-clock fields of "2026-10-04T16:00", held in a Date's UTC slots.
function localDate(date: string) {
  const [y, mo, d, h, mi] = date.split(/[-T:]/).map(Number);
  return new Date(Date.UTC(y, mo - 1, d, h, mi));
}

// "2026-10-04T16:00:00-04:00": local time plus EVENT_TIME_ZONE's UTC offset on that date.
function toZonedIso(local: Date) {
  const offset =
    new Intl.DateTimeFormat('en-US', { timeZone: EVENT_TIME_ZONE, timeZoneName: 'longOffset' })
      .formatToParts(local)
      .find(part => part.type === 'timeZoneName')
      ?.value.replace('GMT', '') || '+00:00';
  return `${local.toISOString().slice(0, 19)}${offset}`;
}
