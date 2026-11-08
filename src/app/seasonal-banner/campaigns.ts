// Site-wide announcement strip shown under the menu between two dates
// (inclusive, Maryland time). To run a future campaign, add an entry here.

export const DONATE_URL = 'https://www.zeffy.com/en-US/donation-form/donate-to-keep-community-healthy';

export interface Campaign {
  id: string;
  start: string;  // first day shown, "YYYY-MM-DD"
  end: string;    // last day shown, "YYYY-MM-DD"
  theme: 'autumn' | 'giving';
  icon: string;
  // {events} is replaced with the number of community events held so far.
  message: string;
  link?: { label: string; url: string };
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
      'and played with us: {events} community events and counting.',
  },
  {
    id: 'givingtuesday-2026',
    start: '2026-11-27',  // the day after Thanksgiving
    end: '2026-12-01',    // GivingTuesday
    theme: 'giving',
    icon: '💙',
    message:
      'This GivingTuesday, December 1, help us raise $2,000 to keep community fitness ' +
      'accessible to everyone across Maryland.',
    link: { label: 'Donate now', url: DONATE_URL },
  },
];

/** Today's date in Maryland as "YYYY-MM-DD". */
export function marylandDate(now = new Date()) {
  return new Intl.DateTimeFormat('en-CA', { timeZone: 'America/New_York' }).format(now);
}

export function activeCampaign(now = new Date(), campaigns = CAMPAIGNS) {
  const today = marylandDate(now);
  return campaigns.find(c => c.start <= today && today <= c.end) ?? null;
}
