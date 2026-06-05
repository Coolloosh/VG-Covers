import { useEffect, useMemo, useState } from 'react';

export function useGoogleCalendarShows() {
  const [shows, setShows] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const controller = new AbortController();

    async function loadShows() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/calendar-shows', { signal: controller.signal });
        const payload = await response.json();

        if (!response.ok) {
          throw new Error(payload.error || 'Could not load Google Calendar events.');
        }

        const normalized = (payload.shows || [])
          .map(show => ({ ...show, date: new Date(show.date) }))
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
  }, []);

  return useMemo(() => ({ shows, loading, error }), [shows, loading, error]);
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
