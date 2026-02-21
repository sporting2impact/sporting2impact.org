import { Injectable } from '@angular/core';

export interface EventItem {
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
        title: 'Free Pilates Session',
        date: '2026-03-07T10:00',
        location: 'Urbana Library, Frederick, Maryland',
        registrationLink: 'https://www.zeffy.com/en-US/ticketing/free-pilates-session--03072026',
        type: 'pilates'
     }, 
    { 
        title: 'Free Yoga Session',
        date: '2026-03-08T14:00', // 2026-02-20T17:47 format
        location: 'Miller Branch Library, Ellicott City, Maryland',
        registrationLink: 'https://www.zeffy.com/en-US/ticketing/free-yoga-session--03082026',
        type: 'yoga'
    },
    
     { 
        title: 'Chess Meetup',
        date: '2026-03-14T14:00',
        location: 'Miller Branch Library, Avalon Room, Ellicott City, Maryland',
        registrationLink: '',
        type: 'chess'
     },
    { 
        title: 'Free Pilates Session',
        date: '2026-03-22T14:15',
        location: 'Miller Branch Library, Ellicott City, Maryland',
        registrationLink: 'https://www.zeffy.com/en-US/ticketing/free-pilates-session--03222026' ,
        type: 'pilates'
    },
    { 
        title: 'Free Pilates Session',
        date: '2026-02-15T14:15',
        location: 'Miller Branch Library, Ellicott City, Maryland',
        registrationLink: 'https://www.zeffy.com/en-US/ticketing/free-pilates-session' ,
        type: 'pilates'
    },
    { 
        title: 'Free Pilates Session',
        date: '2026-01-17T14:15',
        location: 'Miller Branch Library, Ellicott City, Maryland',
        registrationLink: 'https://www.zeffy.com/en-US/ticketing/free-pilates-session' ,
        type: 'pilates'
    },
    { 
        title: 'Free Yoga Session',
        date: '2026-01-10T14:00', // 2026-02-20T17:47 format
        location: 'Miller Branch Library, Ellicott City, Maryland',
        registrationLink: 'https://www.zeffy.com/en-US/ticketing/free-yoga-session',
        type: 'yoga'
    },
    
    //  { 
    //     title: 'BollyX Fitness',
    //     date: '2026-04-14T14:00',
    //     location: 'Ellicott City, Maryland',
    //     registrationLink: '',
    //     type: 'dance'
    //  },
     
    ];
    
  getEvents() {
    return this.events;
  }

 getUpcomingEvents() {
  // Current time in EST
  const now = new Date();
  const nowEST = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));

  // 2 weeks from now in EST
  const twoWeeksEST = new Date(nowEST);
  twoWeeksEST.setDate(nowEST.getDate() + 21);

  return this.events
    .map(e => {
      // Convert event date to EST (including time)
      const eventDateEST = new Date(
        new Date(e.date).toLocaleString("en-US", { timeZone: "America/New_York" })
      );
      return { ...e, eventDateEST };
    })
    .filter(e => e.eventDateEST >= nowEST && e.eventDateEST <= twoWeeksEST)
    .sort((a, b) => a.eventDateEST.getTime() - b.eventDateEST.getTime());
}



}
