import React from 'react';
import { Link } from 'react-router-dom';
import { formatShowDate, formatShowTime, useGoogleCalendarShows } from './googleCalendarShows';

export default function UpcomingShows() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { shows, loading, error, missingConfig } = useGoogleCalendarShows();
  const featuredShows = shows.slice(0, 3);

  if (missingConfig) return null;

  return (
    <section id="shows" className="bg-black py-20 px-6 max-w-7xl mx-auto text-white">
      <div className="flex justify-between items-end mb-10">
        <h2 className="text-4xl font-extrabold text-purple-400 tracking-wide uppercase">Shows</h2>
        <Link to="/shows" className="text-green-400 text-sm font-semibold tracking-wide transition ml-4 hover:underline">
          More Dates →
        </Link>
      </div>

      {loading && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {[0, 1, 2].map(item => (
            <div key={item} className="h-80 rounded-2xl border border-purple-900/50 bg-zinc-950/80 animate-pulse" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-xl border border-purple-900/60 bg-zinc-950/80 p-6 text-center text-purple-200">
          Upcoming dates are loading weirdly right now. Check back soon.
        </div>
      )}

      {!loading && !error && featuredShows.length === 0 && (
        <p className="text-center text-purple-200">More dates announced soon.</p>
      )}

      {!loading && !error && featuredShows.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {featuredShows.map((show) => {
            const day = new Intl.DateTimeFormat('en-US', { day: '2-digit' }).format(show.date);
            const month = new Intl.DateTimeFormat('en-US', { month: 'short' }).format(show.date);

            return (
              <article
                key={show.id}
                className={`relative min-h-[24rem] rounded-2xl border border-purple-800 bg-gradient-to-br from-zinc-950 via-black to-purple-950/40 p-6 shadow-[0_0_30px_rgba(128,0,128,0.3)] transition overflow-hidden ${
                  !isMobile ? 'hover:shadow-purple-600/60 hover:scale-[1.02]' : ''
                }`}
              >
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(34,197,94,0.22),transparent_42%)]" />
                <div className="relative z-10 h-full flex flex-col">
                  <div className="w-24 rounded-lg border border-purple-800 bg-black/70 px-4 py-3 text-center">
                    <p className="text-green-400 text-sm font-extrabold uppercase">{month}</p>
                    <p className="text-white text-4xl font-black leading-none mt-1">{day}</p>
                  </div>

                  <div className="mt-auto pt-10">
                    <h3 className="text-white text-2xl font-extrabold uppercase tracking-wide leading-tight">
                      {show.title}
                    </h3>
                    <p className="text-purple-200 mt-3">
                      {formatShowDate(show)}
                      {formatShowTime(show) ? ` • ${formatShowTime(show)}` : ''}
                    </p>
                    {show.location && <p className="text-purple-300 text-sm mt-2">{show.location}</p>}
                    <Link
                      to="/shows"
                      className="inline-block mt-5 text-green-400 text-sm font-bold uppercase tracking-wide hover:text-green-300"
                    >
                      Details →
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
