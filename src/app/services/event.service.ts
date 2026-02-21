import { Injectable } from '@angular/core';

export interface EventItem {
  title: string;
  date: string;   // or Date
  description: string;
  location: string;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events: EventItem[] = [
     { 
        title: 'Community Meetup',
        date: '2026-02-20T17:47', // 2026-02-20T17:47 format
        location: 'City, State',
        description: 'Details...',
        type: 'yoga'
    },
    { 
        title: 'Community Meetup 2',
        date: '2026-02-27',
        location: 'City, State',
        description: 'Details...' ,
        type: 'pilates'
    },
    { 
        title: 'Charity Run',
        date: '2026-03-07',
        location: 'City, State',
        description: 'Details...',
        type: 'chess'
     },
     { 
        title: 'Charity Run',
        date: '2026-03-14',
        location: 'City, State',
        description: 'Details...',
        type: 'dance'
     }
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
  twoWeeksEST.setDate(nowEST.getDate() + 14);

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
