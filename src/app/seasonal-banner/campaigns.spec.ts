import { CAMPAIGNS, YEARLY_BANNERS, activeBanner, givingTuesday, nthWeekday, thanksgiving } from './campaigns';

// Noon Eastern on a calendar day, to test which banner shows that day.
const on = (date: string) => activeBanner(new Date(`${date}T17:00:00Z`))?.id ?? 'none';

describe('Seasonal banners', () => {
  it('calculates moving holidays correctly (checked against the calendar)', () => {
    const expected: Record<number, Record<string, string>> = {
      2026: { mlk: '2026-01-19', memorial: '2026-05-25', labor: '2026-09-07', thanks: '2026-11-26', giving: '2026-12-01' },
      2027: { mlk: '2027-01-18', memorial: '2027-05-31', labor: '2027-09-06', thanks: '2027-11-25', giving: '2027-11-30' },
      2028: { mlk: '2028-01-17', memorial: '2028-05-29', labor: '2028-09-04', thanks: '2028-11-23', giving: '2028-11-28' },
    };
    for (const [year, days] of Object.entries(expected)) {
      const y = Number(year);
      expect(nthWeekday(y, 1, 1, 3)).toBe(days['mlk']);
      expect(nthWeekday(y, 5, 1, -1)).toBe(days['memorial']);
      expect(nthWeekday(y, 9, 1, 1)).toBe(days['labor']);
      expect(thanksgiving(y)).toBe(days['thanks']);
      expect(givingTuesday(y)).toBe(days['giving']);
    }
  });

  it('runs the 2026 Thanksgiving and GivingTuesday campaigns, switching at Maryland midnight', () => {
    const at = (utc: string) => activeBanner(new Date(utc))?.id ?? 'none';
    expect(at('2026-11-16T05:00:00Z')).toBe('thanksgiving-2026');   // Nov 16, 12:00 AM
    expect(at('2026-11-27T04:59:00Z')).toBe('thanksgiving-2026');   // Nov 26, 11:59 PM
    expect(at('2026-11-27T05:00:00Z')).toBe('givingtuesday-2026');  // Nov 27, 12:00 AM
    expect(at('2026-12-02T04:59:00Z')).toBe('givingtuesday-2026');  // Dec 1, 11:59 PM
    expect(at('2026-12-02T05:00:00Z')).toBe('none');                // Dec 2
  });

  it('shows yearly holidays in later years without any changes', () => {
    expect(on('2026-12-30')).toBe('new-year');           // 2027 New Year, from late December
    expect(on('2027-01-18')).toBe('mlk-day');
    expect(on('2027-05-31')).toBe('memorial-day');
    expect(on('2027-07-04')).toBe('independence-day');
    expect(on('2027-09-06')).toBe('labor-day');
    expect(on('2027-11-11')).toBe('veterans-day');
    expect(on('2027-11-25')).toBe('thanksgiving');
    expect(on('2027-11-26')).toBe('givingtuesday');      // the day after Thanksgiving
    expect(on('2027-11-30')).toBe('givingtuesday');
  });

  it('shows fitness and health days', () => {
    expect(on('2027-02-05')).toBe('wear-red-day');
    expect(on('2027-05-03')).toBe('fitness-sports-month');
    expect(on('2027-06-02')).toBe('global-running-day');
    expect(on('2027-10-10')).toBe('world-mental-health-day');
  });

  it('picks one banner when two days collide', () => {
    expect(on('2027-04-07')).toBe('walking-day');         // also World Health Day
    expect(on('2027-09-29')).toBe('womens-fitness-day');  // also World Heart Day
  });

  it('shows nothing on ordinary days', () => {
    expect(on('2027-03-20')).toBe('none');
    expect(on('2027-08-15')).toBe('none');
  });

  it('has valid, unique ids and non-overlapping one-off campaign dates', () => {
    const ids = [...CAMPAIGNS, ...YEARLY_BANNERS].map(b => b.id);
    expect(ids.filter((id, i) => ids.indexOf(id) !== i)).toEqual([]);
    const sorted = [...CAMPAIGNS].sort((a, b) => a.start.localeCompare(b.start));
    for (const [i, c] of sorted.entries()) {
      expect(/^\d{4}-\d{2}-\d{2}$/.test(c.start) && /^\d{4}-\d{2}-\d{2}$/.test(c.end)).toBe(true);
      expect(c.start <= c.end).toBe(true);
      if (i > 0) expect(sorted[i - 1].end < c.start).toBe(true);
    }
  });
});
