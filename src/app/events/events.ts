import { Component } from '@angular/core';
import { NgFor, NgIf, DatePipe, NgClass, TitleCasePipe } from '@angular/common';
import { EventService } from '../services/event.service';
import { EventItem } from '../services/event.service';

@Component({
  selector: 'app-events',
  imports: [NgFor, NgIf, DatePipe, NgClass, TitleCasePipe],
  templateUrl: './events.html',
  styleUrl: './events.css',
  standalone: true,
  providers: [DatePipe],

})
export class Events {
  events : EventItem[] = [];
  constructor(private eventService: EventService) {}

  ngOnInit() {
    this.events = this.eventService.getEvents();
  }
}
