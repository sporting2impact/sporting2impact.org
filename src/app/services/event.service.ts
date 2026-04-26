import { Injectable } from '@angular/core';

export interface EventItem {
  id: number;  
  title: string;
  date: string;   // or Date
  registrationLink: string;
  location: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events: EventItem[] = [
        {
            "id": 22,
            "title": "Free Zumba Session",
            "date": "2026-05-03T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-may-2",
            "type": "zumba"
        },
        {
            "id": 21,
            "title": "Free Zumba Session",
            "date": "2026-04-25T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-apr",
            "type": "zumba"
        },
        {
            "id": 20,
            "title": "Chess Meetup",
            "date": "2026-04-25T10:00",
            "location": "Miller Branch Library, Ellicott Room, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess"
        },
        {
            "id": 19,
            "title": "Free Pilates Session",
            "date": "2026-04-19T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session-april",
            "type": "pilates"
        },
        {
            "id": 18,
            "title": "Learn Basics of Chess with Suchay",
            "date": "2026-04-18T10:00",
            "location": "Miller Branch Library, Avalon Room, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess"
        },
        {
            "id": 17,
            "title": "Free Yoga Session",
            "date": "2026-04-12T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session-18th-apr-saturday",
            "type": "yoga"
        },
        {
            "id": 17,
            "title": "Free Pilates Session",
            "date": "2026-03-07T10:00",
            "location": "Urbana Library, Frederick, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session--03072026",
            "type": "pilates"
        },
        {
            "id": 16,
            "title": "Free Yoga Session",
            "date": "2026-03-08T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session--03082026",
            "type": "yoga"
        },

        {
            "id": 15,
            "title": "Chess Meetup",
            "date": "2026-03-15T14:00",
            "location": "Miller Branch Library, Ellicott Room, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess"
        },
        {
            "id": 14,
            "title": "Free Pilates Session",
            "date": "2026-03-22T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session--03222026",
            "type": "pilates"
        },
        {
            "id": 13,
            "title": "Free Zumba Session",
            "date": "2026-03-29T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-29th-mar-sunday",
            "type": "zumba"
        },
        {
            "id": 12,
            "title": "Free Pilates Session",
            "date": "2026-02-15T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session",
            "type": "pilates"
        },
        {
            "id": 11,
            "title": "Free Pilates Session",
            "date": "2026-01-17T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session",
            "type": "pilates"
        },
        {
            "id": 10,
            "title": "Free Yoga Session",
            "date": "2026-01-10T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session",
            "type": "yoga"
        },
        {
            "id": 9,
            "title": "Free Pilates Session",
            "date": "2025-12-20T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates"
        },
        {
            "id": 8,
            "title": "Free Pilates Session",
            "date": "2025-11-02T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates"
        },
        {
            "id": 7,
            "title": "Free Pilates Session",
            "date": "2025-10-19T15:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates"
        },
        {
            "id": 6,
            "title": "Free Pilates Session",
            "date": "2025-08-30T10:30",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates"
        },
        {
            "id": 5,
            "title": "Physical Health Awareness Walk",
            "date": "2025-09-07T08:00",
            "location": "Grist Mill Trail, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk"
        },
        {
            "id": 4,
            "title": "Physical Health Awareness Walk",
            "date": "2025-08-16T07:30",
            "location": "Trail, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk"
        },
        {
            "id": 3,
            "title": "Physical Health Awareness Walk",
            "date": "2025-08-09T05:00",
            "location": "Centennial Park West, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk"
        },
        {
            "id": 2,
            "title": "Physical Health Awareness Walk",
            "date": "2025-08-02T08:00",
            "location": "Patapsco Valley Quarry Trail, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk"
        },
        {
            "id": 1,
            "title": "Physical Health Awareness Walk",
            "date": "2025-07-26T07:00",
            "location": "Patapsco State Park, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk"
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
