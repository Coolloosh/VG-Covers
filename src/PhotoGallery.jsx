import React, { useEffect, useMemo, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight, Maximize2, Shuffle, X } from 'lucide-react';
import { useLocation } from 'react-router-dom';
import PageHero from './PageHero';
import { showData } from './videoData';

const SAMPLE_SIZE = 200;

const allPhotos = Object.entries(showData).reduce((pool, [slug, show]) => {
  if (!Array.isArray(show.photos)) return pool;

  show.photos.forEach((src) => {
    if (typeof src !== 'string' || !src.trim() || pool.has(src)) return;

    pool.set(src, {
      src,
      slug,
      title: show.title || 'Vanylla Godzylla Live',
      date: show.date || '',
      location: show.location || '',
    });
  });

  return pool;
}, new Map());

const photoPool = Array.from(allPhotos.values());

function getRandomPhotos() {
  const shuffled = [...photoPool];

  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[i]];
  }

  return shuffled.slice(0, Math.min(SAMPLE_SIZE, shuffled.length));
}

export default function PhotoGallery() {
  const location = useLocation();
  const [shuffleVersion, setShuffleVersion] = useState(0);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(null);

  const photos = useMemo(getRandomPhotos, [location.key, shuffleVersion]);
  const activePhoto = lightboxIndex === null ? null : photos[lightboxIndex];

  const closeLightbox = () => setLightboxIndex(null);
  const showPrevious = () => {
    setLightboxIndex((current) => (current - 1 + photos.length) % photos.length);
  };
  const showNext = () => {
    setLightboxIndex((current) => (current + 1) % photos.length);
  };

  const reshuffle = () => {
    closeLightbox();
    setShuffleVersion((version) => version + 1);
  };

  const handleTouchStart = (event) => {
    touchStartX.current = event.touches[0].clientX;
  };

  const handleTouchEnd = (event) => {
    if (touchStartX.current === null) return;

    const distance = touchStartX.current - event.changedTouches[0].clientX;
    if (distance > 50) showNext();
    if (distance < -50) showPrevious();
    touchStartX.current = null;
  };

  useEffect(() => {
    if (lightboxIndex === null) return undefined;

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox();
      if (event.key === 'ArrowLeft') showPrevious();
      if (event.key === 'ArrowRight') showNext();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [lightboxIndex, photos.length]);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <PageHero
        image="/photos3.webp"
        title="Live Photos"
        subtitle={<span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">A different night every time</span>}
        gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
        imageClass="object-[65%_center] sm:object-center brightness-50 scale-85 transition duration-[2000ms]"
        titleColor="purple"
        titleFont="font-sans font-extrabold tracking-normal"
      />

      <section className="max-w-[1600px] mx-auto px-3 sm:px-6 py-14 sm:py-20">
        <div className="max-w-3xl mx-auto text-center mb-10 sm:mb-14">
          <p className="text-green-400 text-sm font-bold uppercase tracking-[0.28em] mb-3">
            Randomly selected from {photoPool.length.toLocaleString()} photos
          </p>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-purple-200">
            200 moments from the stage
          </h1>
          <p className="mt-4 text-purple-300/80 text-base sm:text-lg">
            Every visit pulls a fresh mix from every uploaded show. Select any photo to open the carousel.
          </p>
          <button
            type="button"
            onClick={reshuffle}
            className="mt-7 inline-flex items-center gap-2 rounded-full border border-purple-500/70 bg-purple-950/60 px-6 py-3 font-bold text-purple-100 transition hover:border-green-400 hover:text-green-300 hover:shadow-[0_0_25px_rgba(74,222,128,0.2)]"
          >
            <Shuffle size={18} />
            Shuffle the gallery
          </button>
        </div>

        <div className="columns-2 gap-3 sm:columns-3 sm:gap-5 lg:columns-4 xl:columns-5">
          {photos.map((photo, index) => (
            <button
              type="button"
              key={photo.src}
              onClick={() => setLightboxIndex(index)}
              className="group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-lg border border-purple-900/70 bg-zinc-950 text-left shadow-lg transition sm:mb-5 hover:-translate-y-1 hover:border-purple-500 hover:shadow-purple-900/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400"
              aria-label={`Open photo ${index + 1} from ${photo.title}`}
            >
              <img
                src={photo.src}
                alt={`${photo.title}${photo.location ? ` in ${photo.location}` : ''}`}
                loading={index < 10 ? 'eager' : 'lazy'}
                className="h-auto w-full object-cover transition duration-500 group-hover:scale-[1.03] group-hover:brightness-75"
              />
              <span className="absolute inset-x-0 bottom-0 hidden bg-gradient-to-t from-black via-black/75 to-transparent px-4 pb-4 pt-14 sm:block sm:translate-y-3 sm:opacity-0 sm:transition sm:duration-300 sm:group-hover:translate-y-0 sm:group-hover:opacity-100">
                <span className="flex items-end justify-between gap-3">
                  <span>
                    <span className="block text-sm font-bold text-white">{photo.title}</span>
                    {(photo.date || photo.location) && (
                      <span className="mt-1 block text-xs text-purple-200">
                        {[photo.date, photo.location].filter(Boolean).join(' · ')}
                      </span>
                    )}
                  </span>
                  <Maximize2 size={17} className="shrink-0 text-green-400" />
                </span>
              </span>
            </button>
          ))}
        </div>
      </section>

      <footer className="border-t border-purple-950 bg-black py-8 text-center text-sm text-gray-500">
        <p>© 2025 Vanylla Godzylla. All rights reserved.</p>
      </footer>

      {activePhoto && (
        <div
          className="fixed inset-0 z-[1000] flex items-center justify-center bg-black/95 px-3 py-16 backdrop-blur-md sm:px-16"
          role="dialog"
          aria-modal="true"
          aria-label="Photo carousel"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          onClick={closeLightbox}
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 z-10 rounded-full border border-white/20 bg-black/60 p-3 text-white transition hover:border-green-400 hover:text-green-400 sm:right-7 sm:top-7"
            aria-label="Close photo carousel"
          >
            <X size={24} />
          </button>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showPrevious();
            }}
            className="absolute bottom-5 left-[calc(50%-4.5rem)] z-10 rounded-full border border-white/20 bg-black/70 p-3 text-white transition hover:border-green-400 hover:text-green-400 sm:bottom-auto sm:left-5 sm:top-1/2 sm:-translate-y-1/2"
            aria-label="Previous photo"
          >
            <ChevronLeft size={30} />
          </button>

          <figure
            className="flex max-h-full max-w-full flex-col items-center"
            onClick={(event) => event.stopPropagation()}
          >
            <img
              src={activePhoto.src}
              alt={`${activePhoto.title}${activePhoto.location ? ` in ${activePhoto.location}` : ''}`}
              className="max-h-[75vh] max-w-full rounded-lg object-contain shadow-[0_0_45px_rgba(126,34,206,0.25)]"
            />
            <figcaption className="mt-4 text-center">
              <p className="font-bold text-white">{activePhoto.title}</p>
              {(activePhoto.date || activePhoto.location) && (
                <p className="mt-1 text-sm text-purple-300">
                  {[activePhoto.date, activePhoto.location].filter(Boolean).join(' · ')}
                </p>
              )}
              <p className="mt-2 text-xs font-semibold uppercase tracking-[0.2em] text-gray-500">
                {lightboxIndex + 1} / {photos.length}
              </p>
            </figcaption>
          </figure>

          <button
            type="button"
            onClick={(event) => {
              event.stopPropagation();
              showNext();
            }}
            className="absolute bottom-5 right-[calc(50%-4.5rem)] z-10 rounded-full border border-white/20 bg-black/70 p-3 text-white transition hover:border-green-400 hover:text-green-400 sm:bottom-auto sm:right-5 sm:top-1/2 sm:-translate-y-1/2"
            aria-label="Next photo"
          >
            <ChevronRight size={30} />
          </button>
        </div>
      )}
    </main>
  );
}
