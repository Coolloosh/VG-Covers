import React from 'react';
import { Link } from 'react-router-dom';

const featuredVideos = [
  {
    title: 'Covers Compilation',
    youtubeId: 'V0RsQIPDY_s',
  },
  {
    title: '2025 Highlights',
    youtubeId: 'EdUC0yPVeqI',
  },
];

export default function FeaturedLiveVideos() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <section className="bg-black py-20 px-6 max-w-7xl mx-auto text-white">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
        <div>
          <h2 className="text-4xl font-extrabold text-purple-400 tracking-wide uppercase">
            Featured Videos
          </h2>
        </div>

        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            to="/gallery/videos"
            className={`inline-block border border-purple-500 text-purple-200 font-bold px-6 py-3 rounded-full text-center transition ${
              !isMobile ? 'hover:bg-purple-600 hover:text-white' : ''
            }`}
          >
            More Videos
          </Link>
          <Link
            to="/booking"
            className={`inline-block bg-green-500 text-black font-bold px-6 py-3 rounded-full text-center transition ${
              !isMobile ? 'hover:bg-green-400 hover:scale-105' : ''
            }`}
          >
            Book Now
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {featuredVideos.map((video) => (
          <article
            key={video.youtubeId}
            className="border border-purple-800 rounded-2xl bg-zinc-950/80 overflow-hidden shadow-[0_0_30px_rgba(128,0,128,0.2)]"
          >
            <div className="aspect-video bg-zinc-900">
              <iframe
                src={`https://www.youtube.com/embed/${video.youtubeId}`}
                title={video.title}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
            <div className="p-5 bg-black/70">
              <h3 className="text-green-400 text-lg sm:text-xl font-extrabold uppercase tracking-wide">
                {video.title}
              </h3>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
