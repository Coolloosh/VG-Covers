// CoverRelease.jsx (Refined to match music release styling)
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { coverReleases } from './musicData';

export default function CoverRelease() {
  const { coverId } = useParams();
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const cover = coverReleases.find((c) => c.id === coverId);

  if (!cover) return <div className="text-white p-6">Cover not found.</div>;
  if (!cover.youtubeId) {
    return (
      <main className="min-h-screen bg-black text-white font-sans flex flex-col items-center justify-center text-center px-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-purple-300 mb-4">
          Performance Not Linked
        </h1>
        <p className="text-zinc-300 max-w-xl mb-8">
          This cover is in the repertoire, but there is not a live performance video linked yet.
        </p>
        <Link
          to="/music"
          className={`inline-block text-purple-400 text-lg font-semibold tracking-wide transition duration-200 ${
            !isMobile ? 'hover:text-green-400 hover:underline' : ''
          }`}
        >
          ← Back to Cover Repertoire
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-black text-white font-sans pt-0 px-4 pb-5">
      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden flex items-center justify-center text-center rounded-b-xl shadow-inner mb-16">
        <img
          src="/shows4.JPG"
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-50 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="relative z-10 px-6 max-w-2xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-200 drop-shadow-[0_0_30px_rgba(192,132,252,0.6)] mb-2">
            {cover.title}
          </h1>
          <p className="text-purple-300 text-xl tracking-wide italic">Originally by {cover.originalArtist}</p>
        </div>
      </section>

      {/* VIDEO SECTION */}
      <div className="max-w-3xl mx-auto px-4">
        <section>
          <h2 className="text-2xl font-bold text-green-400 mb-4 text-center">Live Cover Video</h2>
          <div className="aspect-video rounded-2xl overflow-hidden border border-purple-800 shadow-xl">
            <iframe
              src={`https://www.youtube.com/embed/${cover.youtubeId}`}
              title="Cover Video"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="w-full h-full"
            ></iframe>
          </div>
          <div className="text-center mt-12">
            <Link
              to="/music"
              className={`inline-block text-purple-400 text-lg font-semibold tracking-wide transition duration-200 ${
                !isMobile ? 'hover:text-green-400 hover:underline' : ''
              }`}
            >
              ← Back to Cover Repertoire
            </Link>
          </div>
        </section>
      </div>

      <footer className="bg-black pt-12 text-center text-sm text-gray-500">
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
