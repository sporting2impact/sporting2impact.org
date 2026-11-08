// Site-wide announcement strip shown under the menu (Maryland time).
//
// - YEARLY_BANNERS repeat every year from a date rule, e.g. "4th Thursday of
//   November". Each shows from `daysBefore` days before the date through
//   `daysAfter` days after it.
// - CAMPAIGNS are one-off date ranges for a specific year (a goal, a special
//   appeal). An active campaign always wins over the yearly banners.

export const DONATE_URL = 'https://www.zeffy.com/en-US/donation-form/donate-to-keep-community-healthy';

export type BannerTheme = 'autumn' | 'giving' | 'patriotic' | 'remembrance' | 'celebrate' | 'health' | 'heart';

export interface BannerContent {
  theme: BannerTheme;
  icon: string;  // '' for solemn days
  // {events} is replaced with the number of community events held so far;
  // **text** is shown in bold.
  message: string;
  link?: { label: string; url: string };  // "/page" or "https://..."
}

export interface Campaign extends BannerContent {
  id: string;
  start: string;  // first day shown, "YYYY-MM-DD"
  end: string;    // last day shown, "YYYY-MM-DD"
}

export interface YearlyBanner extends BannerContent {
  id: string;
  date: (year: number) => string;  // "YYYY-MM-DD"
  daysBefore: number;
  daysAfter?: number;
}

export const CAMPAIGNS: Campaign[] = [
  {
    id: 'thanksgiving-2026',
    start: '2026-11-16',
    end: '2026-11-26',  // Thanksgiving Day
    theme: 'autumn',
    icon: '🍂',
    message:
      'Happy Thanksgiving from Sporting2Impact! Thank you to everyone who has walked, danced ' +
      'and played with us: **{events} community events** and counting.',
  },
  {
    id: 'givingtuesday-2026',
    start: '2026-11-27',  // the day after Thanksgiving
    end: '2026-12-01',    // GivingTuesday
    theme: 'giving',
    icon: '💙',
    message:
      'This GivingTuesday, December 1, help us raise **$2,000** to keep community fitness ' +
      'accessible to everyone across Maryland.',
    link: { label: 'Donate now', url: DONATE_URL },
  },
];

const EVENTS = { label: 'See upcoming events', url: '/events' };

export const YEARLY_BANNERS: YearlyBanner[] = [
  // --- Holidays ---
  {
    id: 'new-year', date: y => fixed(y, 1, 1), daysBefore: 3, daysAfter: 2,
    theme: 'celebrate', icon: '🎉',
    message: 'Happy New Year from Sporting2Impact! Start the year moving with us.',
    link: EVENTS,
  },
  {
    id: 'mlk-day', date: y => nthWeekday(y, 1, MON, 3), daysBefore: 3,
    theme: 'remembrance', icon: '',
    message: "Honoring Dr. Martin Luther King Jr.'s legacy of service. Make it a day of service in your community.",
    link: { label: 'Volunteer with us', url: '/joinus' },
  },
  {
    id: 'memorial-day', date: y => nthWeekday(y, 5, MON, -1), daysBefore: 2,
    theme: 'remembrance', icon: '',
    message: 'This Memorial Day, we remember those who gave their lives in service to our country.',
  },
  {
    id: 'independence-day', date: y => fixed(y, 7, 4), daysBefore: 3,
    theme: 'patriotic', icon: '🎆',
    message: 'Happy 4th of July from Sporting2Impact! Stay active, hydrated and safe.',
  },
  {
    id: 'labor-day', date: y => nthWeekday(y, 9, MON, 1), daysBefore: 3,
    theme: 'celebrate', icon: '',
    message: 'Happy Labor Day! Thank you to the workers who keep our communities strong.',
  },
  {
    id: 'veterans-day', date: y => fixed(y, 11, 11), daysBefore: 3,
    theme: 'remembrance', icon: '',
    message: 'This Veterans Day, we honor and thank all who have served.',
  },
  {
    id: 'thanksgiving', date: y => thanksgiving(y), daysBefore: 6,
    theme: 'autumn', icon: '🍂',
    message:
      'Happy Thanksgiving from Sporting2Impact! Thank you to everyone who has walked, danced ' +
      'and played with us: **{events} community events** and counting.',
  },
  {
    id: 'givingtuesday', date: y => givingTuesday(y), daysBefore: 4,  // from the day after Thanksgiving
    theme: 'giving', icon: '💙',
    message: 'This GivingTuesday, help keep community fitness accessible to everyone across Maryland.',
    link: { label: 'Donate now', url: DONATE_URL },
  },

  // --- Fitness and health observances ---
  {
    id: 'wear-red-day', date: y => nthWeekday(y, 2, FRI, 1), daysBefore: 1,  // American Heart Month
    theme: 'heart', icon: '❤️',
    message: 'February is American Heart Month. Wear red and keep your heart moving with us.',
    link: EVENTS,
  },
  {
    id: 'nutrition-month', date: y => fixed(y, 3, 1), daysBefore: 0, daysAfter: 6,
    theme: 'health', icon: '🥗',
    message: 'March is National Nutrition Month. Healthy eating and regular movement go hand in hand.',
  },
  {
    id: 'walking-day', date: y => nthWeekday(y, 4, WED, 1), daysBefore: 1,
    theme: 'health', icon: '👟',
    message: 'Happy National Walking Day! Lace up and join one of our Wellness Walks.',
    link: EVENTS,
  },
  {
    id: 'world-health-day', date: y => fixed(y, 4, 7), daysBefore: 1,
    theme: 'health', icon: '🌍',
    message: 'Happy World Health Day! Small steps every day add up to a healthier community.',
  },
  {
    id: 'fitness-sports-month', date: y => fixed(y, 5, 1), daysBefore: 0, daysAfter: 6,
    theme: 'health', icon: '💪',
    message: 'May is National Physical Fitness and Sports Month. Find an activity you love at our community events.',
    link: EVENTS,
  },
  {
    id: 'mental-health-month', date: y => fixed(y, 5, 10), daysBefore: 0, daysAfter: 6,
    theme: 'health', icon: '💚',
    message: 'May is Mental Health Awareness Month. Moving together is good for body and mind.',
  },
  {
    id: 'senior-fitness-day', date: y => nthWeekday(y, 5, WED, -1), daysBefore: 1,
    theme: 'health', icon: '',
    message: 'Happy National Senior Health & Fitness Day! Staying active is for every age.',
    link: EVENTS,
  },
  {
    id: 'global-running-day', date: y => nthWeekday(y, 6, WED, 1), daysBefore: 1,
    theme: 'health', icon: '🏃',
    message: 'Happy Global Running Day! Every step counts, whether you run, walk or dance.',
  },
  {
    id: 'womens-fitness-day', date: y => nthWeekday(y, 9, WED, -1), daysBefore: 1,
    theme: 'health', icon: '',  // listed before World Heart Day: wins when both fall on the same day
    message: "Happy National Women's Health & Fitness Day! Celebrating every woman staying active in our community.",
    link: EVENTS,
  },
  {
    id: 'world-heart-day', date: y => fixed(y, 9, 29), daysBefore: 1,
    theme: 'heart', icon: '❤️',
    message: 'Happy World Heart Day! Staying active is one of the best things you can do for your heart.',
  },
  {
    id: 'world-mental-health-day', date: y => fixed(y, 10, 10), daysBefore: 1,
    theme: 'health', icon: '💚',
    message: 'It\'s World Mental Health Day. Getting outside and moving with others can lift your mood.',
  },
  {
    id: 'world-diabetes-day', date: y => fixed(y, 11, 14), daysBefore: 1,
    theme: 'health', icon: '💙',
    message: 'It\'s World Diabetes Day. Staying active is part of a healthy lifestyle.',
  },
];

/** Today's date in Maryland as "YYYY-MM-DD". */
export function marylandDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(now);
}

/**
 * The banner to show today: an active one-off campaign, otherwise the yearly
 * banner whose date is closest to today (earlier in the list wins a tie).
 */
export function activeBanner(now = new Date()): (BannerContent & { id: string }) | null {
  const today = marylandDate(now);
  const campaign = CAMPAIGNS.find(c => c.start <= today && today <= c.end);
  if (campaign) return campaign;

  const todayDay = dayNumber(today);
  const year = Number(today.slice(0, 4));
  let best: { banner: YearlyBanner; distance: number } | null = null;
  for (const banner of YEARLY_BANNERS) {
    // Check neighbouring years too, e.g. the New Year banner in late December.
    for (const y of [year - 1, year, year + 1]) {
      const offset = todayDay - dayNumber(banner.date(y));  // negative = before the date
      if (offset < -banner.daysBefore || offset > (banner.daysAfter ?? 0)) continue;
      if (!best || Math.abs(offset) < best.distance) best = { banner, distance: Math.abs(offset) };
    }
  }
  return best?.banner ?? null;
}

/** Every banner, one-off campaigns first, for the local preview page. */
export function allBanners(): (BannerContent & { id: string })[] {
  return [...CAMPAIGNS, ...YEARLY_BANNERS];
}

export function findBanner(id: string) {
  return allBanners().find(b => b.id === id) ?? null;
}

/** First and last day a banner shows in a given year (one-off campaigns ignore the year). */
export function bannerDates(banner: Campaign | YearlyBanner, year: number) {
  if ('start' in banner) return { start: banner.start, end: banner.end };
  const date = banner.date(year);
  return { start: addDays(date, -banner.daysBefore), end: addDays(date, banner.daysAfter ?? 0) };
}

// --- Date helpers (all dates are plain "YYYY-MM-DD" calendar days) ---

const MON = 1, WED = 3, THU = 4, FRI = 5;

function iso(date: Date) {
  return date.toISOString().slice(0, 10);
}

function fixed(year: number, month: number, day: number) {
  return iso(new Date(Date.UTC(year, month - 1, day)));
}

/** nth weekday (0 = Sunday) of a month; n = -1 means the last one. */
export function nthWeekday(year: number, month: number, weekday: number, n: number) {
  if (n > 0) {
    const first = new Date(Date.UTC(year, month - 1, 1)).getUTCDay();
    return fixed(year, month, 1 + ((weekday - first + 7) % 7) + (n - 1) * 7);
  }
  const lastDay = new Date(Date.UTC(year, month, 0));
  return fixed(year, month, lastDay.getUTCDate() - ((lastDay.getUTCDay() - weekday + 7) % 7));
}

export function thanksgiving(year: number) {
  return nthWeekday(year, 11, THU, 4);  // 4th Thursday of November
}

export function givingTuesday(year: number) {
  return addDays(thanksgiving(year), 5);  // the Tuesday after Thanksgiving
}

function addDays(date: string, days: number) {
  return iso(new Date(Date.parse(date) + days * 86_400_000));
}

function dayNumber(date: string) {
  return Math.round(Date.parse(date) / 86_400_000);
}
