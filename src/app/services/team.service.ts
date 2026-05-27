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
    { name: "Elizabeth Higgins (Lizzy)", image: "team/instructors/lizzy.png", role: "Professor and Coordinator of Dance at Howard Community College", social_media: { instagram: "" } },
    { name: "Carleen Bowie", image: "team/instructors/carleen.png", role: "Certified Pilates Instructor", social_media: { instagram: "" } },
    { name: "Pon Thirunathan (Ramya)", image: "team/instructors/ramya.png", role: "Certified Yoga Instructor", social_media: { instagram: "" } },
    { name: "Githanjali Stalin", image: "team/instructors/githanjali.png", role: "Certified Zumba Instructor", social_media: { instagram: "https://www.instagram.com/groovithaa?igsh=YW84bHJvOXg5eXQw&utm_source=qr/" } },
    { name: "Sruthi Thippireddy", image: "team/instructors/sruthi.png", role: "Certified BollyX Instructor", social_media: { instagram: "" } },
    { name: "Cindy Cheung", image: "team/instructors/cindy.png", role: "Certified Zumba Instructor", social_media: { instagram: "" } },
    
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
    {
      name: "Kaushik Malladi",
      school: "Marriotts Ridge High School",
      grade: "10",
      duration: "2025-Current",
      image: "team/member.png",
      role: "Asst. Outreach Coordinator"
    },
    {
      name: "Dhruvi Settipalle",
      school: "Mt. Hebron High School",
      grade: "9",
      duration: "2026-Current",
      image: "team/member.png",
      role: "Asst. Social Media Coordinator"
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
