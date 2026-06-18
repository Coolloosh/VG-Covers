import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { showData } from './videoData';
import PageHero from './PageHero';

export default function PhotoGalleryDetail() {
  const { slug } = useParams();
  const show = showData[slug];
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const [visibleCount, setVisibleCount] = useState(6);
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const touchStartX = useRef(null);
  const loadRef = useRef(null);

  const photos = show?.photos?.map(p => ({ src: p, caption: '' })) || [];

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 50) nextLightbox();
    else if (diffX < -50) prevLightbox();
    touchStartX.current = null;
  };

  const nextLightbox = () => {
    setLightboxIndex((i) => (i + 1) % photos.length);
  };

  const prevLightbox = () => {
    setLightboxIndex((i) => (i - 1 + photos.length) % photos.length);
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisibleCount((prev) => Math.min(prev + 6, photos.length));
        }
      },
      { threshold: 1.0 }
    );

    if (loadRef.current && visibleCount < photos.length) {
      observer.observe(loadRef.current);
    }

    return () => {
      if (loadRef.current) observer.unobserve(loadRef.current);
    };
  }, [visibleCount, photos.length]);

  if (!show) {
    return <div className="text-white text-center py-20">Show not found.</div>;
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <PageHero
        image={show.heroImages?.[0] || '/photos3.webp'}
        title={show.title}
        subtitle={<span className="text-purple-300 text-xl tracking-wide italic">{show.date} – {show.location}</span>}
      />

      <section className="max-w-6xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {photos.slice(0, visibleCount).map((img, i) => (
            <motion.div
              key={i}
              whileHover={isMobile ? {} : { scale: 1.03 }}
              className="w-full h-64 overflow-hidden rounded-xl border border-purple-900/70 bg-zinc-950 shadow-md cursor-pointer transition-transform"
              onClick={() => setLightboxIndex(i)}
            >
              <img
                src={img.src}
                alt={`Gallery photo ${i + 1}`}
                loading="lazy"
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>

        <div ref={loadRef} className="h-12 mt-10 flex justify-center items-center text-purple-400 text-sm">
          {visibleCount < photos.length ? 'Loading more photos...' : 'All photos loaded'}
        </div>

        <div className="text-center pb-10">
          <Link
            to="/gallery/photos"
            className={`text-purple-400 px-6 font-bold text-lg transition ${!isMobile ? 'hover:underline hover:text-green-400' : ''}`}
          >
            Back to Gallery
          </Link>
        </div>

      </section>

      <footer className="bg-black py-6 text-center text-sm text-gray-500">
        <p>© 2025 Vanylla Godzylla. All rights reserved.</p>
        <p>
          Follow us:
          <a
            href="https://instagram.com/vanylla.godzylla"
            className="hover:text-pink-400 ml-1"
          >
            Instagram
          </a>{' '}•
          <a
            href="#"
            className={`ml-1 transition ${!isMobile ? 'hover:text-blue-400' : ''}`}
          >
            Facebook
          </a>{' '}•
          <a
            href="https://www.youtube.com/@vanyllagodzylla1282"
            className={`ml-1 transition ${!isMobile ? 'hover:text-red-500' : ''}`}
          >
            YouTube
          </a>
        </p>
      </footer>

      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center px-4"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button
            onClick={() => setLightboxIndex(null)}
            className="absolute top-6 right-6 text-white text-4xl"
          >
            ×
          </button>
          <button
            onClick={prevLightbox}
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl px-4"
          >
            ‹
          </button>
          <img
            src={photos[lightboxIndex].src}
            alt="Full View"
            className="max-h-[80vh] max-w-[90vw] rounded-xl shadow-xl"
          />
          <p className="mt-4 text-purple-300 text-center max-w-xl text-sm">{photos[lightboxIndex].caption}</p>
          <button
            onClick={nextLightbox}
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl px-4"
          >
            ›
          </button>
        </div>
      )}
    </main>
  );
}
