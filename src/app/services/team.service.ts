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

  instructors = [
    { name: "Carleen Bowie", image: "team/instructors/carleen.png", role: "Certified Pilates Instructor", social_media: { instagram: "" } },
    { name: "Ramya", image: "team/instructors/ramya.png", role: "Certified Yoga Instructor", social_media: { instagram: "" } },
    { name: "Githanjali Stalin", image: "team/instructors/githanjali.png", role: "Certified Zumba Instructor", social_media: { instagram: "https://www.instagram.com/groovithaa?igsh=YW84bHJvOXg5eXQw&utm_source=qr/" } },
    { name: "Sruthi Thippireddy (Joining Soon)", image: "team/founder.png", role: "Certified BollyX Instructor", social_media: { instagram: "" } },
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
      school: "Marriotts Ridge High School",
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
    },
    {
      name: "Mouniksai Kodali",
      school: "Marriotts Ridge High School",
      grade: "11",
      duration: "2025-Current",
      image: "team/member.png",
      role: "Youth Programs Coordinator"
    },
  ];

  getFounders() {
    return this.founders;
  }

  getBoardOfDirectors() {
    return this.boardOfDirectors;
  }

  getInstructors() {
    return this.instructors;
  }
}
