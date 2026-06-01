import React, { useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';
import { coverReleases, coverCategories } from './musicData.js';

export default function MusicCatalog() {
  const [activeCategory, setActiveCategory] = useState('all');
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const songsByCategory = useMemo(() => {
    if (activeCategory === 'all') return coverReleases;

    return coverReleases.filter((song) =>
      song.categories?.includes(activeCategory)
    );
  }, [activeCategory]);

  const activeCategoryData =
    coverCategories.find((category) => category.id === activeCategory) ||
    coverCategories[0];

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <PageHero
        image="/booking1.webp"
        title="VG Covers"
        subtitle={
          <span className="text-purple-400 text-xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">
            Sets built for packed rooms 
          </span>
        }
        gradientClass="bg-gradient-to-b from-transparent via-black/10 to-black"
        imageClass="object-[75%_bottom] sm:object-bottom brightness-50 scale-85 transition duration-[2000ms]"
        titleColor="purple"
        titleFont="font-sans font-extrabold tracking-normal"
      />

      <div className="bg-black text-white py-12 px-6">
        <section className="max-w-6xl mx-auto">
          <div className="text-center mb-10">
          
            <h2 className="text-3xl md:text-5xl font-extrabold text-purple-400 mb-4">
                            Cover Catalog
            </h2>
           
            
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 xl:grid-cols-6 gap-3 mb-12">
            {coverCategories.map((category) => {
              const isActive = activeCategory === category.id;
              const count =
                category.id === 'all'
                  ? coverReleases.length
                  : coverReleases.filter((song) =>
                      song.categories?.includes(category.id)
                    ).length;

              return (
                <button
                  key={category.id}
                  type="button"
                  onClick={() => setActiveCategory(category.id)}
                  className={`rounded-2xl border px-4 py-4 text-left transition duration-300 ${
                    isActive
                      ? 'border-purple-400 bg-zinc-900 shadow-[0_0_25px_rgba(168,85,247,0.2)]'
                      : 'border-purple-800/70 bg-zinc-950 hover:bg-zinc-900 hover:border-purple-500'
                  }`}
                >
                  <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">
                    Category
                  </div>
                  <div className="text-base font-bold text-white leading-tight mb-2">
                    {category.label}
                  </div>
                  <div className="text-sm text-green-300">{count} songs</div>
                </button>
              );
            })}
          </div>

          <div className="rounded-[2rem] border border-purple-800/70 bg-zinc-950/80 p-6 sm:p-8 shadow-[0_0_40px_rgba(88,28,135,0.12)]">
            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-4 mb-8">
              <div>
                <p className="text-green-300 uppercase tracking-[0.28em] text-xs sm:text-sm mb-3">
                  {activeCategoryData.label}
                </p>
                <h3 className="text-2xl md:text-4xl font-extrabold text-purple-300 mb-3">
                  {activeCategoryData.heading}
                </h3>
                <p className="text-zinc-300 max-w-3xl text-sm sm:text-base leading-relaxed">
                  {activeCategoryData.description}
                </p>
              </div>

              <div className="text-left lg:text-right">
                <div className="text-xs uppercase tracking-[0.2em] text-zinc-500 mb-2">
                  Collection Size
                </div>
                <div className="text-3xl font-extrabold text-green-300">
                  {songsByCategory.length}
                </div>
                <div className="text-zinc-400 text-sm">
                  {activeCategory === 'all' ? 'songs listed' : 'songs in this section'}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {songsByCategory.map((cover) => {
                const hasPerformance = Boolean(cover.youtubeId);
                const content = (
                  <>
                    <span className="leading-tight">{cover.title}</span>
                    <span className="flex flex-col sm:items-end gap-2 text-sm text-purple-300 italic sm:text-right">
                      <span>by {cover.originalArtist}</span>
                    </span>
                  </>
                );

                return (
                  <div
                    key={cover.id}
                    className={`border border-purple-700 rounded-2xl px-5 py-4 transition duration-300 ${
                      hasPerformance
                        ? 'hover:bg-zinc-900'
                        : 'opacity-80 cursor-default'
                    }`}
                  >
                    {hasPerformance ? (
                      <Link
                        to={`/music/covers/${cover.id}`}
                        className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-green-300 font-semibold text-lg"
                      >
                        {content}
                      </Link>
                    ) : (
                      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 text-green-300 font-semibold text-lg">
                        {content}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>

      <footer className="bg-black py-6 text-center text-sm text-gray-500">
        <p>© 2025 Vanylla Godzylla. All rights reserved.</p>
        <p>
          Follow us:
          <a
            href="https://instagram.com/vanylla.godzylla"
            className="hover:text-pink-400 ml-1"
          >
            Instagram
          </a>{' '}
          •
          <a
            href="#"
            className={`ml-1 transition ${!isMobile ? 'hover:text-blue-400' : ''}`}
          >
            Facebook
          </a>{' '}
          •
          <a
            href="https://www.youtube.com/@vanyllagodzylla1282"
            className={`ml-1 transition ${!isMobile ? 'hover:text-red-500' : ''}`}
          >
            YouTube
          </a>
        </p>
      </footer>
    </main>
  );
}
