import { Injectable } from '@angular/core';

export interface EventItem {
  id: number;  
  title: string;
  subtitle: string;
  date: string;   // or Date
  registrationLink: string;
  location: string;
  type: string;
  attendees: number | null;  // actual turnout (registrations + walk-ins), filled in after the event
}

// Event dates are entered as Maryland local time, e.g. "2026-10-04T16:00".
export const EVENT_TIME_ZONE = 'America/New_York';
export const EVENT_DURATION_MINUTES = 60;

// Image files in public/assets/events/ are lowercase, and the live server is
// case-sensitive, so map each event type to its file explicitly.
const EVENT_IMAGES: Record<string, string> = {
  bollyx: 'bollyx',
  chess: 'chess',
  dance: 'dance',
  health: 'health',
  pilates: 'pilates',
  walk: 'walking',
  walking: 'walking',
  yoga: 'yoga',
  zumba: 'zumba',
};

/** Path of the event type's card image, or null if there isn't one. */
export function eventImagePath(type: string): string | null {
  const file = EVENT_IMAGES[type.trim().toLowerCase()];
  return file ? `/assets/events/${file}.png` : null;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events: EventItem[] = [
       
        {
            "id": 50,
            "title": "Wellness Walk",
            "subtitle": "Centennial Park Lake Trail",
            "date": "2026-10-04T16:00",
            "location": "Centennial Park, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "walking",
            "attendees": 16
        },
        {
            "id": 49,
            "title": "Zumba Session at BGE (Corporate Session)",
            "subtitle": "BGE",
            "date": "2026-09-03T13:30",
            "location": "BGE, Lord Baltimore Office, Maryland",
            "registrationLink": "",
            "type": "Zumba",
            "attendees": null
        },
        {
            "id": 48,
            "title": "Wellness Walk",
            "subtitle": "Grist Mill Trail",
            "date": "2026-08-23T17:00",
            "location": "Ellicott City, Maryland",
            "registrationLink": "",
            "type": "walking",
            "attendees": 21
        },
        {
            "id": 47,
            "title": "Free Pilates Session By Carlen",
            "subtitle": "",
            "date": "2026-08-22T10:00",
            "location": "Ellicott/Patapsco Room, Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session-aug",
            "type": "pilates",
            "attendees": 6
        },
        {
            "id": 46,
            "title": "Wellness Walk",
            "subtitle": "Trolley Line # 9 Trail",
            "date": "2026-08-16T08:00",
            "location": "Old Ellicott City (Parking Lot A), Maryland",
            "registrationLink": "",
            "type": "walking",
            "attendees": 19
        },
        {
            "id": 45,
            "title": "Free Yoga Session",
            "subtitle": "",
            "date": "2026-07-25T14:00",
            "location": "Avalon Room, Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session-july",
            "type": "yoga",
            "attendees": 6
        },
        {
            "id": 44,
            "title": "Summer Chess Camp 2 by Suchay",
            "subtitle": "",
            "date": "2026-07-20T15:00",
            "location": "Online",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/summer-chess-camp-2-beginners",
            "type": "chess",
            "attendees": 10
        },
        {
            "id": 43,
            "title": "Free Pilates Session By Carlen",
            "subtitle": "",
            "date": "2026-07-19T14:00",
            "location": "Avalon Room, Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session-july",
            "type": "pilates",
            "attendees": 9
        },
        {
            "id": 42,
            "title": "Summer Chess Camp by Suchay",
            "subtitle": "",
            "date": "2026-07-13T15:00",
            "location": "Online",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/summer-chess-camp",
            "type": "chess",
            "attendees": 10
        },
        {
            "id": 41,
            "title": "Free Zumba Session",
            "subtitle": "",
            "date": "2026-07-11T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-july-11th",
            "type": "zumba",
            "attendees": 14
        },
        {
            "id": 40,
            "title": "Free Zumba Session",
            "subtitle": "",
            "date": "2026-07-05T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-july",
            "type": "zumba",
            "attendees": 12
        },
        {
            "id": 39,
            "title": "Learn Basics of Chess with Suchay",
            "subtitle": "",
            "date": "2026-06-27T10:00",
            "location": "Ellicott Room, Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess",
            "attendees": 14
        },    
        {
            "id": 38,
            "title": "Weight & Wellness Management",
            "subtitle": "Dr. Muhammad Asif Aziz, MD, MPH, DABOM",
            "date": "2026-06-21T14:00",
            "location": "Ellicott Room, Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "health",
            "attendees": 60
        },
        {
            "id": 37,
            "title": "Free BollyX Session",
            "subtitle": "",
            "date": "2026-06-20T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-bollyx-session-june",
            "type": "bollyx",
            "attendees": 16
        },
        {
            "id": 36,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-06-14T14:00",
            "location": "Avalon Room, Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session-june",
            "type": "pilates",
            "attendees": 10
        },
        {
            "id": 35,
            "title": "Wellness Walk",
            "subtitle": "Trolley Line # 9 Trail",
            "date": "2026-06-13T08:00",
            "location": "Old Ellicott City (Parking Lot A), Maryland",
            "registrationLink": "",
            "type": "walking",
            "attendees": 28
        },
        {
            "id": 34,
            "title": "Learn Basics of Chess with Suchay",
            "subtitle": "",
            "date": "2026-06-07T14:00",
            "location": "Ellicott Room, Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess",
            "attendees": 26
        },
        {
            "id": 33,
            "title": "Wellness Walk",
            "subtitle": "Grist Mill Trail",
            "date": "2026-06-07T08:00",
            "location": "Ellicott City, Maryland",
            "registrationLink": "https://forms.gle/v3rJV1PVdUoPEJnf6",
            "type": "walking",
            "attendees": 26
        },
        {
            "id": 32,
            "title": "Free Zumba Session",
            "subtitle": "",
            "date": "2026-06-06T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-june",
            "type": "zumba",
            "attendees": 20
        },
        {
            "id": 31,
            "title": "Mental Health Awareness Walk",
            "subtitle": "Centennial Park Lake Trail",
            "date": "2026-05-31T17:00",
            "location": "Centennial Park, Ellicott City, Maryland",
            "registrationLink": "https://forms.gle/e8dHNvHb1T5QkHqv7",
            "type": "walking",
            "attendees": 27
        },
        {
            "id": 30,
            "title": "Free Yoga Session",
            "subtitle": "",
            "date": "2026-05-30T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session-may",
            "type": "yoga",
            "attendees": 11
        },
        {
            "id": 29,
            "title": "Wellness Walk",
            "subtitle": "Centennial Park Lake Trail",
            "date": "2026-05-24T17:00",
            "location": "Centennial Park, Ellicott City, Maryland",
            "registrationLink": "https://forms.gle/e8dHNvHb1T5QkHqv7",
            "type": "walking",
            "attendees": 21
        },
        {
            "id": 28,
            "title": "Free BollyX Session",
            "subtitle": "",
            "date": "2026-05-23T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-bollyx-session-may",
            "type": "bollyx",
            "attendees": 19
        },
        {
            "id": 27,
            "title": "Wellness Walk",
            "subtitle": "Grist Mill Trail",
            "date": "2026-05-17T08:00",
            "location": "Ellicott City, Maryland",
            "registrationLink": "https://forms.gle/v3rJV1PVdUoPEJnf6",
            "type": "walking",
            "attendees": 19
        },
        {
            "id": 26,
            "title": "Wellness Walk",
            "subtitle": "Trolley Line # 9 Trail",
            "date": "2026-05-10T08:00",
            "location": "Old Ellicott City (Parking Lot A), Maryland",
            "registrationLink": "",
            "type": "walking",
            "attendees": 23
        },
        {
            "id": 25,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-05-09T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session-may-2",
            "type": "pilates",
            "attendees": 12
        },
        {
            "id": 24,
            "title": "Free Zumba Session",
            "subtitle": "",
            "date": "2026-05-03T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-may-2",
            "type": "zumba",
            "attendees": 20
        },
        {
            "id": 23,
            "title": "Food Drive",
            "subtitle": "",
            "date": "2026-04-28T17:00",
            "location": "Driveway, 4308 ROLLING BROOK WAY,Ellicott City, MD 21043",
            "registrationLink": "",
            "type": "Food Drive",
            "attendees": null
        },
        {
            "id": 22,
            "title": "Free Zumba Session",
            "subtitle": "",
            "date": "2026-04-25T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-apr",
            "type": "zumba",
            "attendees": 17
        },
        {
            "id": 21,
            "title": "Chess Meetup",
            "subtitle": "",
            "date": "2026-04-25T10:00",
            "location": "Miller Branch Library, Ellicott Room, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess",
            "attendees": 30
        },
        {
            "id": 20,
            "title": "Food Drive",
            "subtitle": "",
            "date": "2026-04-24T17:00",
            "location": "Driveway, 4308 ROLLING BROOK WAY,Ellicott City, MD 21043",
            "registrationLink": "",
            "type": "Food Drive",
            "attendees": null
        },
        {
            "id": 19,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-04-19T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session-april",
            "type": "pilates",
            "attendees": 11
        },
        {
            "id": 18,
            "title": "Learn Basics of Chess with Suchay",
            "subtitle": "",
            "date": "2026-04-18T10:00",
            "location": "Miller Branch Library, Avalon Room, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess",
            "attendees": 30
        },
        {
            "id": 17,
            "title": "Free Yoga Session",
            "subtitle": "",
            "date": "2026-04-12T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session-18th-apr-saturday",
            "type": "yoga",
            "attendees": 15
        },
        {
            "id": 17,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-03-07T10:00",
            "location": "Urbana Library, Frederick, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session--03072026",
            "type": "pilates",
            "attendees": 9
        },
        {
            "id": 16,
            "title": "Free Yoga Session",
            "subtitle": "",
            "date": "2026-03-08T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session--03082026",
            "type": "yoga",
            "attendees": 16
        },

        {
            "id": 15,
            "title": "Chess Meetup",
            "subtitle": "",
            "date": "2026-03-15T14:00",
            "location": "Miller Branch Library, Ellicott Room, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess",
            "attendees": 28
        },
        {
            "id": 14,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-03-22T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session--03222026",
            "type": "pilates",
            "attendees": 20
        },
        {
            "id": 13,
            "title": "Free Zumba Session",
            "subtitle": "",
            "date": "2026-03-29T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-29th-mar-sunday",
            "type": "zumba",
            "attendees": 25
        },
        {
            "id": 12,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-02-15T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session",
            "type": "pilates",
            "attendees": 16
        },
        {
            "id": 11,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-01-17T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session",
            "type": "pilates",
            "attendees": 15
        },
        {
            "id": 10,
            "title": "Free Yoga Session",
            "subtitle": "",
            "date": "2026-01-10T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session",
            "type": "yoga",
            "attendees": 12
        },
        {
            "id": 9,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2025-12-20T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates",
            "attendees": null
        },
        {
            "id": 8,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2025-11-02T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates",
            "attendees": null
        },
        {
            "id": 7,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2025-10-19T15:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates",
            "attendees": null
        },
        {
            "id": 6,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2025-08-30T10:30",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates",
            "attendees": null
        },
        {
            "id": 5,
            "title": "Physical Health Awareness Walk",
            "subtitle": "",
            "date": "2025-09-07T08:00",
            "location": "Grist Mill Trail, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk",
            "attendees": null
        },
        {
            "id": 4,
            "title": "Physical Health Awareness Walk",
            "subtitle": "",
            "date": "2025-08-16T07:30",
            "location": "Trail, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk",
            "attendees": null
        },
        {
            "id": 3,
            "title": "Physical Health Awareness Walk",
            "subtitle": "",
            "date": "2025-08-09T05:00",
            "location": "Centennial Park West, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk",
            "attendees": null
        },
        {
            "id": 2,
            "title": "Physical Health Awareness Walk",
            "subtitle": "",
            "date": "2025-08-02T08:00",
            "location": "Patapsco Valley Quarry Trail, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk",
            "attendees": null
        },
        {
            "id": 1,
            "title": "Physical Health Awareness Walk",
            "subtitle": "",
            "date": "2025-07-26T07:00",
            "location": "Patapsco State Park, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk",
            "attendees": null
        }
];

    
  getEvents() {
    return this.events;
  }

 getUpcomingEvents() {
  // Current time in EST
  const now = new Date();
  const nowEST = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

  // 4 weeks from now in EST
  const fourWeeksEST = new Date(nowEST);
  fourWeeksEST.setDate(nowEST.getDate() + 28);

  return this.events
    .map(e => {
      // Convert event date to EST (including time)
      const eventDateEST = new Date(
        new Date(e.date).toLocaleString("en-US", { timeZone: "America/New_York" })
      );
      return { ...e, eventDateEST };
    })
    .filter(
      (e: { eventDateEST: Date }) => e.eventDateEST >= nowEST && e.eventDateEST <= fourWeeksEST                               
    )
    .sort(
      (a: { eventDateEST: Date }, b: { eventDateEST: Date }) =>
        a.eventDateEST.getTime() - b.eventDateEST.getTime()
    )
}

}
