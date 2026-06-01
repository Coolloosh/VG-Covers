import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';
import { shows, upcomingShows } from './Showsdata';
import { showData } from './videoData';

function getShowDate(show) {
  const parsed = new Date(show.isoDate || show.date);
  return Number.isNaN(parsed.getTime()) ? null : parsed;
}

function normalizeShow(slug, show) {
  return {
    slug,
    title: show.title || show.location || 'Past Show',
    date: show.date || '',
    isoDate: show.isoDate || '',
    location: show.location || show.city || '',
    city: show.city || '',
    time: show.time || '',
    notes: show.notes || '',
    poster: show.poster || show.flyerImage || show.heroImages?.[0] || '',
    photoCount: show.photos?.length || 0,
    videoCount: show.videos?.length || 0,
  };
}

export default function PastShowsPage() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const { yearGroups } = useMemo(() => {
    const today = new Date();
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const merged = new Map();

    [...shows, ...upcomingShows].forEach((show) => {
      merged.set(show.slug, normalizeShow(show.slug, show));
    });

    Object.entries(showData).forEach(([slug, show]) => {
      const existing = merged.get(slug) || {};
      const galleryShow = normalizeShow(slug, show);
      merged.set(slug, {
        ...existing,
        ...galleryShow,
        location: existing.location || '',
        city: existing.city || show.location || '',
        time: existing.time || show.time || '',
        notes: existing.notes || show.notes || '',
      });
    });

    const past = Array.from(merged.values())
      .map(s => ({ ...s, _d: getShowDate(s) }))
      .filter(s => !s._d || s._d < todayStart)
      .sort((a, b) => {
        if (!a._d && !b._d) return a.title.localeCompare(b.title);
        if (!a._d) return 1;
        if (!b._d) return -1;
        return b._d - a._d;
      });

    const grouped = past.reduce((acc, s) => {
      const y = s._d ? String(s._d.getFullYear()) : 'Undated';
      (acc[y] ||= []).push(s);
      return acc;
    }, {});
    const groups = Object.entries(grouped).sort(([yearA], [yearB]) => {
      if (yearA === 'Undated') return 1;
      if (yearB === 'Undated') return -1;
      return Number(yearB) - Number(yearA);
    });

    return { yearGroups: groups };
  }, []);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <PageHero
        image="/pastshows.webp"
        title="Past Shows"
        subtitle={<span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">where we&apos;ve been...</span>}
        gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
        titleColor="purple"
        titleFont="font-sans font-extrabold tracking-normal"
      />

      <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-300 mb-8 text-center">Shows Archive</h1>

        {yearGroups.length === 0 && (
          <p className="text-center text-purple-200">No archive yet — more to come.</p>
        )}

        <div className="space-y-10">
          {yearGroups.map(([year, items]) => (
            <section key={year}>
              <h2 className="text-xl font-semibold text-green-400 mb-4">{year}</h2>
              <ul className="divide-y divide-purple-900/40 rounded-xl border border-purple-800/40 overflow-hidden bg-gradient-to-b from-black/40 to-zinc-950/40">
                {items.map(s => {
                  const dateLabel = s._d
                    ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(s._d)
                    : s.date || 'Date TBD';
                  const hasMedia = s.photoCount > 0 || s.videoCount > 0;
                  const mediaPath = s.photoCount > 0
                    ? `/gallery/photos/${s.slug}`
                    : `/gallery/videos/${s.slug}`;
                  const locationLabel = [s.location, s.city].filter(Boolean).join(' • ');
                  const itemContent = (
                    <div className="flex items-center gap-4">
                      {s.poster && (
                        <img
                          src={s.poster}
                          alt={`${s.title} flyer`}
                          className="w-20 h-20 sm:w-24 sm:h-24 rounded-md object-cover border border-purple-800/50 bg-zinc-900 shrink-0"
                        />
                      )}

                      <div className="flex-1 min-w-0">
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1">
                          <p className="text-white font-semibold text-lg">
                            {s.title}
                          </p>
                          <span className="text-green-400 font-bold">{dateLabel}</span>
                        </div>
                        {locationLabel && (
                          <p className="text-sm text-purple-300 mt-1">
                            {locationLabel}
                          </p>
                        )}
                      </div>
                    </div>
                  );

                  return (
                    <li key={s.slug} className={hasMedia ? 'transition hover:bg-zinc-900/40' : ''}>
                      {hasMedia ? (
                        <Link to={mediaPath} className="block p-4 sm:p-5">
                          {itemContent}
                        </Link>
                      ) : (
                        <div className="p-4 sm:p-5">
                          {itemContent}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>
      </div>

      <footer className="bg-black py-6 text-center text-sm text-gray-500">
        <p>© 2025 Vanylla Godzylla. All rights reserved.</p>
        <p>
          Follow us:
          <a href="https://instagram.com/vanylla.godzylla" className="hover:text-pink-400 ml-1">Instagram</a> •
          <a href="#" className={`ml-1 transition ${!isMobile ? 'hover:text-blue-400' : ''}`}>Facebook</a> •
          <a href="https://www.youtube.com/@vanyllagodzylla1282" className={`ml-1 transition ${!isMobile ? 'hover:text-red-500' : ''}`}>YouTube</a>
        </p>
      </footer>
    </main>
  );
}
