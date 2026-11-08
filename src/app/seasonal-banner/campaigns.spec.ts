import { CAMPAIGNS, activeCampaign } from './campaigns';

describe('Seasonal banner schedule', () => {
  // Times are UTC; Maryland is 5 hours behind in late November.
  const shown = (utc: string) => activeCampaign(new Date(utc))?.id ?? 'none';

  it('shows nothing before Nov 16 and after Dec 1 (Maryland time)', () => {
    expect(shown('2026-11-16T04:59:00Z')).toBe('none');  // Nov 15, 11:59 PM
    expect(shown('2026-12-02T05:00:00Z')).toBe('none');  // Dec 2, midnight
  });

  it('shows Thanksgiving through Thanksgiving Day', () => {
    expect(shown('2026-11-16T05:00:00Z')).toBe('thanksgiving-2026');  // Nov 16, midnight
    expect(shown('2026-11-27T04:59:00Z')).toBe('thanksgiving-2026');  // Nov 26, 11:59 PM
  });

  it('switches to GivingTuesday the day after Thanksgiving through Dec 1', () => {
    expect(shown('2026-11-27T05:00:00Z')).toBe('givingtuesday-2026');  // Nov 27, midnight
    expect(shown('2026-12-02T04:59:00Z')).toBe('givingtuesday-2026');  // Dec 1, 11:59 PM
  });

  it('has valid, non-overlapping dates', () => {
    const iso = /^\d{4}-\d{2}-\d{2}$/;
    const sorted = [...CAMPAIGNS].sort((a, b) => a.start.localeCompare(b.start));
    for (const [i, c] of sorted.entries()) {
      expect(iso.test(c.start) && iso.test(c.end)).toBe(true);
      expect(c.start <= c.end).toBe(true);
      if (i > 0) expect(sorted[i - 1].end < c.start).toBe(true);
    }
  });
});
