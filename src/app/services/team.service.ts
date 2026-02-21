import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  founders = [
    { name: "Alex Johnson", image: "team/founder.png" },
    { name: "Priya Patel", image: "team/founder.png" },
    { name: "Vamsi", image: "team/founder.png" },
  ];

  boardOfDirectors = [
    {
      name: "Emily Chen",
      school: "River Hill High School",
      grade: "11",
      duration: "2023–2025",
      image: "team/member.png"
    },
    {
      name: "Michael Rodriguez",
      school: "Wilde Lake High School",
      grade: "10",
      duration: "2024–2026",
      image: "team/member.png"
    },
    {
      name: "Sophia Nguyen",
      school: "Howard High School",
      grade: "12",
      duration: "2022–2024",
      image: "team/member.png"
    },
    {
      name: "Daniel Kim",
      school: "Centennial High School",
      grade: "9",
      duration: "2024–2027",
      image: "team/member.png"
    }
  ];

  getFounders() {
    return this.founders;
  }

  getBoardOfDirectors() {
    return this.boardOfDirectors;
  }
}
