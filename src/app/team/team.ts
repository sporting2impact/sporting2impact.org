import { Component } from '@angular/core';
import { TeamService } from '../services/team.service';
import {NgFor, NgIf} from '@angular/common';

@Component({
  selector: 'app-team',
  imports: [NgFor, NgIf],
  templateUrl: './team.html',
  styleUrl: './team.css',
})
export class Team {
  founders: any[] = [];
  boardOfDirectors: any[] = [];
  instructors: any[] = [];

  constructor(private teamService: TeamService) {}

  ngOnInit() {
    this.founders = this.teamService.getFounders();
    this.boardOfDirectors = this.teamService.getBoardOfDirectors();
    this.instructors = this.teamService.getInstructors();
  }


}
