import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';
import { upcomingShows } from './Showsdata.js';

export default function UpcomingShowsPage() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  // Normalize, filter to future, sort asc, and group by Month YYYY
  const grouped = useMemo(() => {
    const today = new Date();
    const fmtMonth = new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' });
    const fmtDate = new Intl.DateTimeFormat('en-US', { weekday: 'short', month: 'short', day: 'numeric' });

    const parsed = upcomingShows
      .map(s => {
        // Prefer an ISO field if you add one; fall back to the date string.
        const d = s.isoDate ? new Date(s.isoDate) : new Date(s.date);
        return { ...s, _date: d, _dateLabel: fmtDate.format(d), _monthLabel: fmtMonth.format(d) };
      })
      .filter(s => !isNaN(s._date) && s._date >= new Date(today.getFullYear(), today.getMonth(), today.getDate()))
      .sort((a, b) => a._date - b._date);

    // Group by month label
    return parsed.reduce((acc, s) => {
      acc[s._monthLabel] = acc[s._monthLabel] || [];
      acc[s._monthLabel].push(s);
      return acc;
    }, {});
  }, []);

  const chip = (text, color = 'bg-zinc-800 text-zinc-200 border-zinc-700') => (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border ${color}`}>
      {text}
    </span>
  );

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <PageHero
        image="/shows4.webp"
        title="Future Shows"
        subtitle={
          <span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">
            where we're going...
          </span>
        }
        gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
        titleColor="purple"
        titleFont="font-sans font-extrabold tracking-normal"
        imageClass="object-center brightness-40 scale-105 transition duration-[2000ms]"
      />

      <div className="min-h-screen px-6 py-12 max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-300 mb-8 text-center">All Upcoming Shows</h1>

        {/* Month groups */}
        <div className="space-y-10">
          {Object.keys(grouped).length === 0 && (
            <p className="text-center text-purple-200">More dates announced soon — stay tuned!</p>
          )}

          {Object.entries(grouped).map(([month, shows]) => (
            <section key={month}>
              <h2 className="text-xl font-semibold text-green-400 mb-4">{month}</h2>

              <ul className="divide-y divide-purple-900/40 rounded-xl border border-purple-800/40 overflow-hidden bg-gradient-to-b from-black/40 to-zinc-950/40">
                {shows.map(show => {
                  const isSold = !!show.soldOut;
                  const hasTix = !!show.ticketLink && !isSold;
                  const isPrivate = /private/i.test(show.notes || '') || show.private;
                  const age21 = /21\+/.test(show.notes || '') || show.age === '21+';

                  return (
                    <li key={show.slug} className="p-4 sm:p-5 hover:bg-zinc-900/40 transition">
                      <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4">
                        {/* Left: date */}
                        <div className="sm:w-40 shrink-0">
                          <p className="text-green-400 font-bold">{show._dateLabel}</p>
                          {age21 && <div className="mt-2 sm:hidden">{chip('21+', 'bg-zinc-800 text-zinc-200 border-zinc-700')}</div>}
                        </div>

                        {/* Middle: venue & notes (row grows) */}
                        <div className="flex-1 min-w-0">
                          <p className="text-white font-semibold truncate">
                            {show.location}{show.city ? `, ${show.city}` : ''}
                          </p>
                          {show.time && <p className="text-sm text-purple-300">{show.time}</p>}
                          {show.notes && <p className="text-sm text-purple-300">{show.notes}</p>}
                          {/* Optional address line if provided */}
                          {show.address && <p className="text-xs text-purple-400 mt-1">{show.address}</p>}
                        </div>

                        {/* Right: actions */}
                        <div className="flex items-center gap-2 sm:gap-3 sm:self-auto">
                          {isPrivate && chip('Private Event')}
                          {isSold && chip('Sold Out', 'bg-red-500/20 text-red-300 border-red-500/40')}
                          {!isSold && !hasTix && (show.free || /free/i.test(show.notes || ''))
                            ? chip('Free Entry', 'bg-green-500/15 text-green-300 border-green-500/30')
                            : null}
                          {!isSold && !hasTix && show.ticketNote && chip(show.ticketNote)}
                          {age21 && <div className="hidden sm:block">{chip('21+')}</div>}

                          {hasTix && (
                            <a
                              href={show.ticketLink}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold bg-green-500 text-black hover:bg-green-400 transition"
                            >
                              Tickets
                            </a>
                          )}

                          {/* Optional detail link if you keep show pages */}
                          {show.slug && (
                            <Link
                              to={`/shows/${show.slug}`}
                              className="inline-flex items-center px-3 py-1.5 rounded-full text-sm font-semibold border border-purple-600 text-purple-200 hover:bg-purple-700/30 transition"
                            >
                              Details
                            </Link>
                          )}
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
            </section>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link to="/past-shows" className="text-purple-400 font-bold text-lg hover:underline">
            View Past Shows
          </Link>
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
