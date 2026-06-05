const CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;
const API_KEY = process.env.GOOGLE_CALENDAR_API_KEY;
const MAX_RESULTS = 24;

function stripHtml(value = '') {
  return value
    .replace(/<br\s*\/?>/gi, '\n')
    .replace(/<[^>]*>/g, ' ')
    .replace(/\s+\n/g, '\n')
    .replace(/&amp;/g, '&')
    .replace(/&nbsp;/g, ' ')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .trim();
}

function parseGoogleDate(start = {}) {
  if (start.dateTime) {
    return { date: start.dateTime, allDay: false };
  }

  if (start.date) {
    return { date: `${start.date}T00:00:00`, allDay: true };
  }

  return { date: null, allDay: false };
}

function findFirstUrl(text = '') {
  return text.match(/https?:\/\/[^\s)]+/i)?.[0] || '';
}

function cleanNotes(text = '') {
  return text
    .replace(/https?:\/\/[^\s)]+/gi, '')
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean)
    .slice(0, 3)
    .join(' • ');
}

function slugify(value) {
  return value
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
    .slice(0, 80);
}

function normalizeCalendarEvent(event) {
  const { date, allDay } = parseGoogleDate(event.start);
  const description = stripHtml(event.description || '');
  const ticketLink = findFirstUrl(description);
  const lowerDetails = `${event.summary || ''} ${description}`.toLowerCase();

  return {
    id: event.id,
    slug: slugify(`${event.summary || 'show'}-${event.id || ''}`),
    title: event.summary || 'VG Covers Show',
    location: event.location || '',
    date,
    allDay,
    notes: cleanNotes(description),
    ticketLink,
    calendarLink: event.htmlLink || '',
    private: /private/.test(lowerDetails),
    free: /free/.test(lowerDetails),
    soldOut: /sold\s*out/.test(lowerDetails),
    age21: /21\+/.test(lowerDetails),
    source: 'google-calendar',
  };
}

export default async function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  if (!CALENDAR_ID || !API_KEY) {
    return res.status(500).json({ error: 'Google Calendar is not configured.' });
  }

  const params = new URLSearchParams({
    key: API_KEY,
    timeMin: new Date().toISOString(),
    singleEvents: 'true',
    orderBy: 'startTime',
    maxResults: String(MAX_RESULTS),
  });

  try {
    const response = await fetch(
      `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params.toString()}`
    );
    const payload = await response.json();

    if (!response.ok) {
      return res.status(response.status).json({
        error: payload.error?.message || 'Could not load Google Calendar events.',
      });
    }

    const shows = (payload.items || [])
      .filter(event => event.status !== 'cancelled')
      .map(normalizeCalendarEvent)
      .filter(show => show.date);

    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=600');
    return res.status(200).json({ shows });
  } catch (err) {
    console.error('Google Calendar error:', err);
    return res.status(500).json({ error: 'Could not load Google Calendar events.' });
  }
}
