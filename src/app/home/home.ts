import { Component } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { Router } from '@angular/router';
import { EventService, EventItem } from '../services/event.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  upcomingEvents: EventItem[] = [];

  constructor(private eventService: EventService, private router: Router) {}

  ngOnInit() {
    this.upcomingEvents = this.eventService.getUpcomingEvents();
    console.log('Upcoming events:', this.upcomingEvents);
  }

  navigateToEvents() {
    this.router.navigate(['/events']);
  }
}
