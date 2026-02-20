import { Injectable } from '@angular/core';

export interface EventItem {
  title: string;
  date: string;   // or Date
  description: string;
}

@Injectable({
  providedIn: 'root'
})
export class EventService {

  private events: EventItem[] = [
     { 
        title: 'Community Meetup',
        date: '2026-02-20T21:00', // MUST be ISO format
        description: 'Details...' 
    },
    { 
        title: 'Community Meetup 2',
        date: '2026-02-27', // MUST be ISO format
        description: 'Details...' 
    },
    { 
        title: 'Charity Run',
        date: '2026-04-02',
        description: 'Details...'
     }
    ];
    
  getEvents() {
    return this.events;
  }

  getUpcomingEvents() {
    // Convert "now" to EST
    const now = new Date();
    const todayEST = new Date(now.toLocaleString("en-US", { timeZone: "America/New_York" }));
    todayEST.setHours(0, 0, 0, 0);

    // Calculate 2 weeks from today in EST
    const twoWeeksEST = new Date(todayEST);
    twoWeeksEST.setDate(todayEST.getDate() + 14);

    return this.events
        .filter(e => {
        // Convert event date to EST
        const eventDateEST = new Date(
            new Date(e.date).toLocaleString("en-US", { timeZone: "America/New_York" })
        );
        eventDateEST.setHours(0, 0, 0, 0);

        return eventDateEST >= todayEST && eventDateEST <= twoWeeksEST;
        })
        .sort((a, b) => {
        const aEST = new Date(new Date(a.date).toLocaleString("en-US", { timeZone: "America/New_York" }));
        const bEST = new Date(new Date(b.date).toLocaleString("en-US", { timeZone: "America/New_York" }));
        return aEST.getTime() - bEST.getTime();
        });
    }


}
