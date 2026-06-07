import { Injectable } from '@angular/core';

export interface EventItem {
  id: number;  
  title: string;
  subtitle: string;
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
            "id": 38,
            "title": "Learn Basics of Chess with Suchay",
            "subtitle": "",
            "date": "2026-06-27T10:00",
            "location": "Ellicott Room, Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess"
        },    
        {
            "id": 37,
            "title": "Weight & Wellness Management",
            "subtitle": "Dr. Muhammad Asif Aziz, MD, MPH, DABOM",
            "date": "2026-06-21T14:00",
            "location": "Ellicott Room, Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "health"
        },
        {
            "id": 36,
            "title": "Free BollyX Session",
            "subtitle": "",
            "date": "2026-06-20T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-bollyx-session-june",
            "type": "bollyx"
        },
        {
            "id": 35,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-06-14T14:00",
            "location": "Avalon Room, Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session-june",
            "type": "pilates"
        },
        {
            "id": 34,
            "title": "Learn Basics of Chess with Suchay",
            "subtitle": "",
            "date": "2026-06-07T14:00",
            "location": "Ellicott Room, Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess"
        },
        {
            "id": 33,
            "title": "Wellness Walk",
            "subtitle": "Grist Mill Trail",
            "date": "2026-06-07T08:00",
            "location": "Ellicott City, Maryland",
            "registrationLink": "https://forms.gle/v3rJV1PVdUoPEJnf6",
            "type": "walking"
        },
        {
            "id": 32,
            "title": "Free Zumba Session",
            "subtitle": "",
            "date": "2026-06-06T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-june",
            "type": "zumba"
        },
        {
            "id": 31,
            "title": "Mental Health Awareness Walk",
            "subtitle": "Centennial Park Lake Trail",
            "date": "2026-05-31T17:00",
            "location": "Centennial Park, Ellicott City, Maryland",
            "registrationLink": "https://forms.gle/e8dHNvHb1T5QkHqv7",
            "type": "walking"
        },
        {
            "id": 30,
            "title": "Free Yoga Session",
            "subtitle": "",
            "date": "2026-05-30T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session-may",
            "type": "yoga"
        },
        {
            "id": 29,
            "title": "Wellness Walk",
            "subtitle": "Centennial Park Lake Trail",
            "date": "2026-05-24T17:00",
            "location": "Centennial Park, Ellicott City, Maryland",
            "registrationLink": "https://forms.gle/e8dHNvHb1T5QkHqv7",
            "type": "walking"
        },
        {
            "id": 28,
            "title": "Free BollyX Session",
            "subtitle": "",
            "date": "2026-05-23T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-bollyx-session-may",
            "type": "bollyx"
        },
        {
            "id": 27,
            "title": "Wellness Walk",
            "subtitle": "Grist Mill Trail",
            "date": "2026-05-17T08:00",
            "location": "Ellicott City, Maryland",
            "registrationLink": "https://forms.gle/v3rJV1PVdUoPEJnf6",
            "type": "walking"
        },
        {
            "id": 26,
            "title": "Wellness Walk",
            "subtitle": "Trolley Line # 9 Trail",
            "date": "2026-05-10T08:00",
            "location": "Old Ellicott City (Parking Lot A), Maryland",
            "registrationLink": "",
            "type": "walking"
        },
        {
            "id": 25,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-05-09T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session-may-2",
            "type": "pilates"
        },
        {
            "id": 24,
            "title": "Free Zumba Session",
            "subtitle": "",
            "date": "2026-05-03T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-may-2",
            "type": "zumba"
        },
        {
            "id": 23,
            "title": "Food Drive",
            "subtitle": "",
            "date": "2026-04-28T17:00",
            "location": "Driveway, 4308 ROLLING BROOK WAY,Ellicott City, MD 21043",
            "registrationLink": "",
            "type": "Food Drive"
        },
        {
            "id": 22,
            "title": "Free Zumba Session",
            "subtitle": "",
            "date": "2026-04-25T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-apr",
            "type": "zumba"
        },
        {
            "id": 21,
            "title": "Chess Meetup",
            "subtitle": "",
            "date": "2026-04-25T10:00",
            "location": "Miller Branch Library, Ellicott Room, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess"
        },
        {
            "id": 20,
            "title": "Food Drive",
            "subtitle": "",
            "date": "2026-04-24T17:00",
            "location": "Driveway, 4308 ROLLING BROOK WAY,Ellicott City, MD 21043",
            "registrationLink": "",
            "type": "Food Drive"
        },
        {
            "id": 19,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-04-19T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session-april",
            "type": "pilates"
        },
        {
            "id": 18,
            "title": "Learn Basics of Chess with Suchay",
            "subtitle": "",
            "date": "2026-04-18T10:00",
            "location": "Miller Branch Library, Avalon Room, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess"
        },
        {
            "id": 17,
            "title": "Free Yoga Session",
            "subtitle": "",
            "date": "2026-04-12T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session-18th-apr-saturday",
            "type": "yoga"
        },
        {
            "id": 17,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-03-07T10:00",
            "location": "Urbana Library, Frederick, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session--03072026",
            "type": "pilates"
        },
        {
            "id": 16,
            "title": "Free Yoga Session",
            "subtitle": "",
            "date": "2026-03-08T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session--03082026",
            "type": "yoga"
        },

        {
            "id": 15,
            "title": "Chess Meetup",
            "subtitle": "",
            "date": "2026-03-15T14:00",
            "location": "Miller Branch Library, Ellicott Room, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "chess"
        },
        {
            "id": 14,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-03-22T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session--03222026",
            "type": "pilates"
        },
        {
            "id": 13,
            "title": "Free Zumba Session",
            "subtitle": "",
            "date": "2026-03-29T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-zumba-session-29th-mar-sunday",
            "type": "zumba"
        },
        {
            "id": 12,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-02-15T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session",
            "type": "pilates"
        },
        {
            "id": 11,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2026-01-17T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-pilates-session",
            "type": "pilates"
        },
        {
            "id": 10,
            "title": "Free Yoga Session",
            "subtitle": "",
            "date": "2026-01-10T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "https://www.zeffy.com/en-US/ticketing/free-yoga-session",
            "type": "yoga"
        },
        {
            "id": 9,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2025-12-20T14:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates"
        },
        {
            "id": 8,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2025-11-02T14:15",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates"
        },
        {
            "id": 7,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2025-10-19T15:00",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates"
        },
        {
            "id": 6,
            "title": "Free Pilates Session",
            "subtitle": "",
            "date": "2025-08-30T10:30",
            "location": "Miller Branch Library, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Pilates"
        },
        {
            "id": 5,
            "title": "Physical Health Awareness Walk",
            "subtitle": "",
            "date": "2025-09-07T08:00",
            "location": "Grist Mill Trail, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk"
        },
        {
            "id": 4,
            "title": "Physical Health Awareness Walk",
            "subtitle": "",
            "date": "2025-08-16T07:30",
            "location": "Trail, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk"
        },
        {
            "id": 3,
            "title": "Physical Health Awareness Walk",
            "subtitle": "",
            "date": "2025-08-09T05:00",
            "location": "Centennial Park West, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk"
        },
        {
            "id": 2,
            "title": "Physical Health Awareness Walk",
            "subtitle": "",
            "date": "2025-08-02T08:00",
            "location": "Patapsco Valley Quarry Trail, Ellicott City, Maryland",
            "registrationLink": "",
            "type": "Walk"
        },
        {
            "id": 1,
            "title": "Physical Health Awareness Walk",
            "subtitle": "",
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
