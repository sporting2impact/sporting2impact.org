import { Component } from '@angular/core';
import { NgFor, NgIf, DatePipe } from '@angular/common';
import { RouterLink } from '@angular/router';
import { EventService, EventItem } from '../services/event.service';

@Component({
  standalone: true,
  selector: 'app-home',
  imports: [NgFor, NgIf, DatePipe, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export class Home {
  upcomingEvents: EventItem[] = [];

  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.upcomingEvents = this.eventService.getUpcomingEvents();
  }
}
