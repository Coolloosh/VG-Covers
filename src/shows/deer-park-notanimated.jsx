import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import HeroImg1 from './HeroImg1.jpeg';
import DP from './deerpark.png';

export default function DeerParkShow() {
  const [mode, setMode] = useState('photos');
  const [lightboxIndex, setLightboxIndex] = useState(null);
  const [flyerOpen, setFlyerOpen] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(6);
  const [visibleVideoCount, setVisibleVideoCount] = useState(3);
  const touchStartX = useRef(null);

  const heroImages = [
    HeroImg1,
    '/photos/deerpark3.jpg',
    '/photos/deerpark3.jpg'
  ];

  const photos = [
    '/photos/deerpark1.jpg',
    '/photos/deerpark2.jpg',
    '/photos/deerpark3.jpg',
    '/photos/deerpark4.jpg',
    '/photos/deerpark5.jpg'
  ];

  const videos = [
    'lU-Ttx8YxcU',
    'jt5VT5a-Cqw',
    'H0Xzyqsf83I',
    '4QrozbzBDZw',
    'n7u4uDErGx4'
  ];

  const setlist = [
    { title: "Intro / Feedback" },
    { title: "Mutant Parade", link: "https://open.spotify.com/track/xxx1" },
    { title: "Glitter Bomb", link: "https://open.spotify.com/track/xxx2" },
    { title: "Lizard Queen" },
    { title: "Fangs Out", link: "https://open.spotify.com/track/xxx3" },
    { title: "Chaos Reigns" },
    { title: "Encore: Cherry Pit Vortex", link: "https://open.spotify.com/track/xxx4" }
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setHeroIndex((i) => (i + 1) % heroImages.length);
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  const openLightbox = (i) => setLightboxIndex(i);
  const closeLightbox = () => setLightboxIndex(null);
  const nextLightbox = () => setLightboxIndex((lightboxIndex + 1) % photos.length);
  const prevLightbox = () => setLightboxIndex((lightboxIndex - 1 + photos.length) % photos.length);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (!touchStartX.current) return;
    const diffX = touchStartX.current - e.changedTouches[0].clientX;
    if (diffX > 50) setHeroIndex((prev) => (prev + 1) % heroImages.length);
    else if (diffX < -50) setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
    touchStartX.current = null;
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;


  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden">
      <section className="relative h-[75vh] w-full overflow-hidden flex items-center justify-center" onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
        <motion.img
          key={heroIndex}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          src={heroImages[heroIndex]}
          alt="Hero Shot"
          className="absolute inset-0 w-full h-full object-cover blur-sm brightness-75 transition-all duration-1000"
        />
        <div className="relative z-10 text-center px-6">
          <h1 className="text-5xl md:text-6xl font-extrabold text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.7)] mb-4">Deer Park – March 7</h1>
          <h2 className="text-2xl text-purple-300 font-semibold drop-shadow-lg">Newark, DE</h2>
        </div>
      </section>

      <section className="max-w-7xl mx-auto py-24 px-6">
        <motion.div initial={{ opacity: 0, y: 100 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.9 }} className="flex flex-col lg:flex-row gap-10 items-center justify-center">
          <div className="w-full lg:w-1/2">
          <img
  src={DP}
  alt="Show Flyer"
  onClick={() => setFlyerOpen(true)}
  className={`w-full h-auto rounded-3xl shadow-2xl border-2 border-purple-700 object-contain cursor-pointer transform transition-transform duration-300 ${
    !isMobile ? 'hover:scale-105' : ''
  }`}
/>
          </div>
          <div className="w-full lg:w-1/2 flex flex-col justify-center items-start text-left">
            <h3 className="text-4xl font-extrabold text-green-400 mb-6 drop-shadow-lg">Setlist</h3>
            <ul className="list-disc pl-6 space-y-3 text-purple-200 text-lg leading-relaxed">
              {setlist.map((song, i) => (
                <li key={i}>
                  {song.link ? (
                    <a href={song.link} target="_blank" rel="noopener noreferrer" className="hover:underline text-green-300">{song.title}</a>
                  ) : (
                    song.title
                  )}
                </li>
              ))}
            </ul>
          </div>
        </motion.div>
      </section>

      {flyerOpen && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center px-4">
          <button onClick={() => setFlyerOpen(false)} className="absolute top-6 right-6 text-white text-4xl">×</button>
          <img src={DP} alt="Show Flyer Fullscreen" className="max-h-[90vh] max-w-[95vw] rounded-xl border border-purple-700 shadow-2xl" />
        </div>
      )}
      <section className="max-w-6xl mx-auto px-6 pb-20">
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }} className="flex justify-center mb-16">
          <div className="flex bg-gray-900 border border-purple-800 rounded-full shadow-inner overflow-hidden">
            <button
              onClick={() => setMode('photos')}
              className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-l-full ${
                mode === 'photos'
                  ? 'bg-purple-700 text-green-300 shadow-inner'
                  : 'text-purple-400 hover:bg-purple-800'
              }`}
            >
              Photos
            </button>
            <button
              onClick={() => setMode('videos')}
              className={`px-6 py-2 text-sm font-bold uppercase tracking-wider transition-all duration-300 rounded-r-full ${
                mode === 'videos'
                  ? 'bg-purple-700 text-green-300 shadow-inner'
                  : 'text-purple-400 hover:bg-purple-800'
              }`}
            >
              Videos
            </button>
          </div>
        </motion.div>

        {mode === 'photos' ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {photos.slice(0, visibleCount).map((src, i) => (
                <motion.img
                key={i}
                src={src}
                alt={`Deer Park Photo ${i + 1}`}
                onClick={() => openLightbox(i)}
                whileHover={isMobile ? {} : { scale: 1.05 }}
                className="w-full h-64 object-cover rounded-xl border border-purple-700 shadow-md cursor-pointer transition-transform"
              />
              ))}
            </div>
            {visibleCount < photos.length && (
              <div className="text-center mt-8">
                <button onClick={() => setVisibleCount((v) => v + 15)} className="px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-full text-white font-bold shadow-md">
                  Load More Photos
                </button>
              </div>
            )}
          </>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
              {videos.slice(0, visibleVideoCount).map((id, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: i * 0.1 }}
                  viewport={{ once: true }}
                >
                  <iframe
                    src={`https://www.youtube.com/embed/${id}`}
                    title={`Deer Park Video ${i + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full aspect-video rounded-xl border border-purple-700 shadow-md"
                  ></iframe>
                </motion.div>
              ))}
            </div>
            {visibleVideoCount < videos.length && (
              <div className="text-center mt-8">
                <button onClick={() => setVisibleVideoCount((v) => v + 9)} className="px-6 py-3 bg-purple-700 hover:bg-purple-600 rounded-full text-white font-bold shadow-md">
                  Load More Videos
                </button>
              </div>
            )}
          </>
        )}
      </section>

      {lightboxIndex !== null && (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-center px-4">
          <button onClick={closeLightbox} className="absolute top-6 right-6 text-white text-4xl">×</button>
          <button onClick={prevLightbox} className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white text-4xl px-4 hover:text-purple-400">‹</button>
          <img src={photos[lightboxIndex]} alt="Fullscreen" className="max-h-[80vh] max-w-[90vw] rounded-lg border border-purple-700 shadow-xl" />
          <button onClick={nextLightbox} className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white text-4xl px-4 hover:text-purple-400">›</button>
        </div>
      )}

     <div className="text-center pb-10">
     <Link
  to="/past-shows"
  className={`text-purple-400 px-6 font-bold text-lg transition ${
    !isMobile ? 'hover:underline' : ''
  }`}
>
  ← View Previous Shows
</Link>
             </div>

             <footer className="bg-black py-6 text-center text-sm text-gray-500">
        <p>© 2025 Vanylla Godzylla. All rights reserved.</p>
        <p>
  Follow us: 
  <a
    href="https://instagram.com/vanylla.godzylla"
    className="text-pink-400 ml-1"
  >
    Instagram
  </a> • 
  <a
    href="#"
    className={`ml-1 transition ${
      !isMobile ? 'hover:text-blue-400' : ''
    }`}
  >
    Facebook
  </a> • 
  <a
    href="https://www.youtube.com/channel/UCchLYJg5lYEbyljhsc61gtg"
    className={`ml-1 transition ${
      !isMobile ? 'hover:text-red-500' : ''
    }`}
  >
    YouTube
  </a>
</p>
      </footer>
    </main>
  );
}
