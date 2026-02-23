import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TeamService {

  founders = [
    { name: "Siva Ch", image: "team/founder.png", role: "President & Treasurer" },
    { name: "Sridhar", image: "team/founder.png", role: "Vice President" },
    { name: "Vamsi", image: "team/founder.png", role: "Secretary" },
  ];

  boardOfDirectors = [
    {
      name: "Akshat",
      school: "Mt. Hebron High School",
      grade: "12",
      duration: "2025-Current",
      image: "team/member.png",
      role: "Outreach Coordinator"
    },  
    {
      name: "Tanya",
      school: "Mt. Hebron High School",
      grade: "12",
      duration: "2025-Current",
      image: "team/tanya.png",
      role: "Social Media Coordinator"

    },
    {
      name: "Suchay",
      school: "Mt. Hebron High School",
      grade: "9",
      duration: "2025-Current",
      image: "team/member.png",
      role: "Event Coordinator"
    }
  ];

  getFounders() {
    return this.founders;
  }

  getBoardOfDirectors() {
    return this.boardOfDirectors;
  }
}
