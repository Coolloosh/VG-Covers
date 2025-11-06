import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';
import { shows } from './Showsdata';

export default function PastShowsPage() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const { groupedByYear } = useMemo(() => {
    const today = new Date();
    const past = shows
      .map(s => ({ ...s, _d: new Date(s.isoDate || s.date) }))
      .filter(s => !isNaN(s._d) && s._d < new Date(today.getFullYear(), today.getMonth(), today.getDate()))
      .sort((a, b) => b._d - a._d);

    const grouped = past.reduce((acc, s) => {
      const y = String(s._d.getFullYear());
      (acc[y] ||= []).push(s);
      return acc;
    }, {});
    return { groupedByYear: grouped };
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

        {Object.keys(groupedByYear).length === 0 && (
          <p className="text-center text-purple-200">No archive yet — more to come.</p>
        )}

        <div className="space-y-10">
          {Object.entries(groupedByYear).map(([year, items]) => (
            <section key={year}>
              <h2 className="text-xl font-semibold text-green-400 mb-4">{year}</h2>
              <ul className="divide-y divide-purple-900/40 rounded-xl border border-purple-800/40 overflow-hidden bg-gradient-to-b from-black/40 to-zinc-950/40">
                {items.map(s => {
                  const dateLabel = new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric' }).format(s._d);
                  const hasMedia = !!s.gallerySlug;
                  return (
                    <li key={s.slug} className="p-4 sm:p-5 hover:bg-zinc-900/40 transition">
                      <div className="flex items-start gap-3">
                        {/* optional tiny thumb if poster exists */}
                        {s.poster && (
                          <img
                            src={s.poster}
                            alt=""
                            className="hidden sm:block w-14 h-14 rounded-md object-cover border border-purple-800/50"
                          />
                        )}

                        <div className="flex-1 min-w-0">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="text-green-400 font-bold w-16">{dateLabel}</span>
                            <p className="text-white font-semibold truncate">
                              {s.location}{s.city ? `, ${s.city}` : ''}
                            </p>
                            {hasMedia && (
                              <span className="ml-auto inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border bg-zinc-800 text-zinc-200 border-zinc-700">
                                Photos/Video
                              </span>
                            )}
                          </div>
                          {s.time && <p className="text-sm text-purple-300">{s.time}</p>}
                          {s.notes && <p className="text-sm text-purple-300">{s.notes}</p>}

                          {hasMedia ? (
                            <Link
                              to={`/shows/${s.slug}`}
                              className="inline-block mt-2 text-sm font-semibold text-purple-300 hover:text-purple-200 underline"
                            >
                              View recap →
                            </Link>
                          ) : null}
                        </div>
                      </div>
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
