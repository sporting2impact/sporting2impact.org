import { Component, inject } from '@angular/core';
import { NgFor, NgIf } from '@angular/common';
import { SponsorService } from '../services/sponsor.service';

@Component({
  selector: 'app-footer',
  imports: [NgFor, NgIf],
  templateUrl: './footer.html',
  styleUrl: './footer.css',
})
export class Footer {
  protected readonly year = new Date().getFullYear();
  protected readonly sponsors = inject(SponsorService).getSponsors();
}
