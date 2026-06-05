import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';
import {
  formatMonth,
  formatShowDate,
  formatShowTime,
  useGoogleCalendarShows,
} from './googleCalendarShows';

function Chip({ children, className = 'bg-zinc-800 text-zinc-200 border-zinc-700' }) {
  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-extrabold uppercase tracking-wide border ${className}`}>
      {children}
    </span>
  );
}

function ShowActions({ show, compact = false }) {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <div className={`flex flex-wrap gap-3 ${compact ? 'mt-4' : 'mt-5'}`}>
      {show.ticketLink && !show.soldOut && (
        <a
          href={show.ticketLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center bg-green-500 text-black font-bold px-5 py-2.5 rounded-full transition ${
            !isMobile ? 'hover:bg-green-400 hover:scale-[1.03]' : ''
          }`}
        >
          Tickets
        </a>
      )}
      {show.location && (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(show.location)}`}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center border border-purple-600 text-purple-200 font-bold px-5 py-2.5 rounded-full transition ${
            !isMobile ? 'hover:bg-purple-700/40 hover:text-white' : ''
          }`}
        >
          Map
        </a>
      )}
      {show.calendarLink && (
        <a
          href={show.calendarLink}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center justify-center border border-purple-800 text-purple-300 font-bold px-5 py-2.5 rounded-full transition ${
            !isMobile ? 'hover:bg-purple-900/50 hover:text-white' : ''
          }`}
        >
          Calendar
        </a>
      )}
    </div>
  );
}

function ShowBadges({ show }) {
  return (
    <div className="flex flex-wrap gap-2">
      {show.private && <Chip>Private</Chip>}
      {show.soldOut && <Chip className="bg-red-500/20 text-red-300 border-red-500/40">Sold Out</Chip>}
      {show.free && !show.soldOut && <Chip className="bg-green-500/15 text-green-300 border-green-500/30">Free</Chip>}
      {show.age21 && <Chip>21+</Chip>}
    </div>
  );
}

function NextShowFeature({ show }) {
  if (!show) return null;
  const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(show.date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(show.date);

  return (
    <section className="mb-14 overflow-hidden rounded-2xl border border-purple-700 bg-gradient-to-br from-zinc-950 via-black to-purple-950/40 shadow-[0_0_45px_rgba(128,0,128,0.25)]">
      <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="relative min-h-[18rem] flex items-center justify-center bg-purple-950/30 border-b lg:border-b-0 lg:border-r border-purple-800/60">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(34,197,94,0.22),transparent_48%)]" />
          <div className="relative text-center">
            <p className="text-green-400 text-sm font-extrabold uppercase tracking-[0.35em] mb-3">Next Show</p>
            <p className="text-8xl sm:text-9xl font-black text-white leading-none drop-shadow-[0_0_25px_rgba(34,197,94,0.3)]">
              {day}
            </p>
            <p className="text-3xl font-extrabold uppercase tracking-wide text-purple-200">{month}</p>
          </div>
        </div>

        <div className="p-6 sm:p-9">
          <ShowBadges show={show} />
          <h2 className="text-4xl sm:text-5xl font-extrabold text-purple-200 mt-5 leading-tight uppercase">
            {show.title}
          </h2>
          <div className="mt-5 space-y-2 text-lg text-purple-200">
            <p>
              <span className="text-green-400 font-bold">When:</span> {formatShowDate(show, { weekday: 'long', year: 'numeric' })}
              {formatShowTime(show) ? ` • ${formatShowTime(show)}` : ''}
            </p>
            {show.location && (
              <p>
                <span className="text-green-400 font-bold">Where:</span> {show.location}
              </p>
            )}
            {show.notes && <p className="text-purple-300 italic">{show.notes}</p>}
          </div>
          <ShowActions show={show} />
        </div>
      </div>
    </section>
  );
}

function ShowRow({ show }) {
  const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(show.date);
  const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(show.date);

  return (
    <article className="group rounded-xl border border-purple-800/50 bg-zinc-950/70 p-4 sm:p-5 transition hover:border-green-500/60 hover:bg-zinc-900/80">
      <div className="flex flex-col sm:flex-row gap-4 sm:items-start">
        <div className="w-24 shrink-0 rounded-lg border border-purple-800 bg-black/70 px-4 py-3 text-center">
          <p className="text-green-400 text-sm font-extrabold uppercase">{month}</p>
          <p className="text-white text-4xl font-black leading-none mt-1">{day}</p>
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-3">
            <div>
              <h3 className="text-2xl font-extrabold text-white uppercase tracking-wide">
                {show.title}
              </h3>
              <p className="text-purple-200 mt-1">
                {formatShowDate(show)}
                {formatShowTime(show) ? ` • ${formatShowTime(show)}` : ''}
              </p>
              {show.location && <p className="text-purple-300 text-sm mt-1">{show.location}</p>}
            </div>
            <ShowBadges show={show} />
          </div>
          {show.notes && <p className="text-sm text-purple-300 italic mt-3">{show.notes}</p>}
          <ShowActions show={show} compact />
        </div>
      </div>
    </article>
  );
}

export default function UpcomingShowsPage() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { shows, loading, error } = useGoogleCalendarShows();

  const grouped = useMemo(() => {
    return shows.reduce((acc, show) => {
      const month = formatMonth(show);
      acc[month] ||= [];
      acc[month].push(show);
      return acc;
    }, {});
  }, [shows]);

  const nextShow = shows[0];
  const remainingShows = shows.slice(1);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <PageHero
        image="/shows4.webp"
        title="Upcoming Shows"
        subtitle={
          <span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">
            synced from the VG calendar
          </span>
        }
        gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
        titleColor="purple"
        titleFont="font-sans font-extrabold tracking-normal"
        imageClass="object-center brightness-40 scale-105 transition duration-[2000ms]"
      />

      <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-10">
          <div>
            <h1 className="text-4xl font-bold text-purple-300">Shows</h1>
            <p className="text-purple-200 mt-2 max-w-2xl">
              Dates update automatically from our Google Calendar.
            </p>
          </div>
          <Link to="/past-shows" className="text-green-400 font-bold text-lg hover:underline">
            Past Shows
          </Link>
        </div>

        {loading && (
          <div className="grid gap-5">
            {[0, 1, 2].map(item => (
              <div key={item} className="h-32 rounded-xl border border-purple-900/50 bg-zinc-950/80 animate-pulse" />
            ))}
          </div>
        )}

        {error && (
          <div className="rounded-xl border border-red-500/40 bg-red-950/20 p-6 text-center text-red-200">
            We could not load upcoming shows right now. Please check back soon.
          </div>
        )}

        {!loading && !error && shows.length === 0 && (
          <p className="text-center text-purple-200">More dates announced soon. Check back shortly.</p>
        )}

        {!loading && !error && shows.length > 0 && (
          <>
            <NextShowFeature show={nextShow} />

            {remainingShows.length > 0 && (
              <div className="space-y-10">
                {Object.entries(grouped).map(([month, monthShows]) => {
                  const visibleShows = monthShows.filter(show => show.id !== nextShow.id);
                  if (!visibleShows.length) return null;

                  return (
                    <section key={month}>
                      <h2 className="text-xl font-semibold text-green-400 mb-4">{month}</h2>
                      <div className="space-y-4">
                        {visibleShows.map(show => (
                          <ShowRow key={show.id} show={show} />
                        ))}
                      </div>
                    </section>
                  );
                })}
              </div>
            )}
          </>
        )}
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
