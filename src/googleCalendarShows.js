import { useEffect, useMemo, useState } from 'react';

const CALENDAR_ID = import.meta.env.VITE_GOOGLE_CALENDAR_ID;
const API_KEY = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
const MAX_RESULTS = 24;

function decodeHtml(value = '') {
  if (typeof document === 'undefined') return value;
  const textarea = document.createElement('textarea');
  textarea.innerHTML = value;
  return textarea.value;
}

function stripHtml(value = '') {
  return decodeHtml(value.replace(/<br\s*\/?>/gi, '\n').replace(/<[^>]*>/g, ' ')).replace(/\s+\n/g, '\n').trim();
}

function parseGoogleDate(start = {}) {
  if (start.dateTime) {
    return { date: new Date(start.dateTime), allDay: false };
  }

  if (start.date) {
    const [year, month, day] = start.date.split('-').map(Number);
    return { date: new Date(year, month - 1, day), allDay: true };
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

export function normalizeCalendarEvent(event) {
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

export function useGoogleCalendarShows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(Boolean(CALENDAR_ID && API_KEY));
  const [error, setError] = useState(null);
  const missingConfig = !CALENDAR_ID || !API_KEY;

  useEffect(() => {
    if (missingConfig) return;

    const controller = new AbortController();
    const params = new URLSearchParams({
      key: API_KEY,
      timeMin: new Date().toISOString(),
      singleEvents: 'true',
      orderBy: 'startTime',
      maxResults: String(MAX_RESULTS),
    });

    async function loadShows() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(CALENDAR_ID)}/events?${params.toString()}`,
          { signal: controller.signal }
        );

        const payload = await response.json();
        if (!response.ok) {
          throw new Error(payload.error?.message || 'Could not load Google Calendar events.');
        }

        const normalized = (payload.items || [])
          .filter(event => event.status !== 'cancelled')
          .map(normalizeCalendarEvent)
          .filter(show => show.date instanceof Date && !Number.isNaN(show.date.getTime()));

        setShows(normalized);
      } catch (err) {
        if (err.name !== 'AbortError') {
          setError(err.message || 'Could not load Google Calendar events.');
        }
      } finally {
        setLoading(false);
      }
    }

    loadShows();
    return () => controller.abort();
  }, [missingConfig]);

  return useMemo(() => ({ shows, loading, error, missingConfig }), [shows, loading, error, missingConfig]);
}

export function formatShowDate(show, options = {}) {
  if (!show?.date) return '';
  return new Intl.DateTimeFormat('en-US', {
    weekday: options.weekday || 'short',
    month: 'short',
    day: 'numeric',
    year: options.year || undefined,
  }).format(show.date);
}

export function formatShowTime(show) {
  if (!show?.date || show.allDay) return show.allDay ? 'All day' : '';
  return new Intl.DateTimeFormat('en-US', {
    hour: 'numeric',
    minute: '2-digit',
  }).format(show.date);
}

export function formatMonth(show) {
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(show.date);
}
