import { Component } from '@angular/core';
import { DatePipe, NgFor, NgIf } from '@angular/common';
import { SeasonalBanner } from '../seasonal-banner/seasonal-banner';
import { CAMPAIGNS, YEARLY_BANNERS, bannerDates, marylandDate } from '../seasonal-banner/campaigns';

/**
 * Local-only page (/banner-preview, dev server only) showing every banner with
 * the dates it appears, so wording and colors can be checked without waiting
 * for each date. Not included in production builds.
 */
@Component({
  selector: 'app-banner-preview',
  imports: [NgFor, NgIf, DatePipe, SeasonalBanner],
  template: `
    <section class="preview">
      <h1>Banner preview</h1>
      <p>Every banner, with the days it shows. Only on the local preview; not part of the public site.</p>
      <div *ngFor="let row of rows" class="row">
        <p class="label">
          <strong>{{ row.id }}</strong> ·
          <span *ngFor="let d of row.dates; let last = last">
            {{ d.start | date:'MMM d, y':'UTC' }} – {{ d.end | date:'MMM d, y':'UTC' }}<span *ngIf="!last">; </span>
          </span>
        </p>
        <app-seasonal-banner [previewId]="row.id"></app-seasonal-banner>
      </div>
    </section>
  `,
  styles: [`
    .preview { padding: 1.5rem 1rem; }
    .row { margin-bottom: 1.25rem; }
    .label { margin: 0 0 0.35rem; color: #374151; font-size: 0.9rem; }
  `],
})
export class BannerPreview {
  private year = Number(marylandDate().slice(0, 4));

  rows = [
    ...CAMPAIGNS.map(c => ({ id: c.id, dates: [bannerDates(c, this.year)] })),
    ...YEARLY_BANNERS.map(b => ({
      id: b.id,
      dates: [bannerDates(b, this.year), bannerDates(b, this.year + 1)],
    })),
  ];
}
