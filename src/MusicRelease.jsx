// MusicRelease.jsx
import React from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { originalReleases } from './musicData';



export default function MusicRelease() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { releaseId } = useParams();
  const release = originalReleases.find((r) => r.id === releaseId);

  if (!release) return <div className="text-white p-6">Release not found.</div>;

  return (
    <main className="min-h-screen bg-black text-white font-sans pt-0 px-4 pb-5">
      {/* HERO */}
      <section className="relative h-[55vh] w-full overflow-hidden flex items-center justify-center text-center rounded-b-xl shadow-inner mb-16">
        <img
          src={release.cover}
          alt="Hero"
          className="absolute inset-0 w-full h-full object-cover brightness-50 blur-sm scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
        <div className="relative z-10 px-6 max-w-2xl mx-auto">
        <a
  href={release.spotifyUrl}
  target="_blank"
  rel="noopener noreferrer"
  className={`text-5xl md:text-6xl font-extrabold text-purple-200 drop-shadow-[0_0_30px_rgba(192,132,252,0.6)] transition duration-200 ${
    !isMobile ? 'hover:text-green-400' : ''
  }`}
>
  {release.title}
</a>
          <p className="text-purple-300 text-xl tracking-wide italic mt-2">Single • Released 2025</p>
        </div>
      </section>
  
      {/* MAIN CONTENT */}
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 px-4">
        {/* LYRICS */}
        <section>
  <h2 className="text-2xl font-bold text-green-400 mb-6 text-center lg:text-left tracking-wide uppercase">
    Lyrics
  </h2>
  <div className="bg-gradient-to-br from-zinc-900 via-black to-zinc-900 border border-purple-800 p-6 rounded-2xl shadow-inner shadow-purple-700/30 text-base leading-loose text-purple-100 font-mono">
    <pre className="whitespace-pre-wrap tracking-wide">
      {release.lyrics}
    </pre>
  </div>
</section>
  
        {/* VIDEO SECTION */}
        <section>
          <div className="space-y-12">
            {/* Official Video */}
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-4 text-center lg:text-left">Music Video</h2>
              <div className="aspect-video rounded-2xl overflow-hidden border border-purple-800 shadow-xl">
                <iframe
                  src={`https://www.youtube.com/embed/${release.youtubeId}`}
                  title="YouTube video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
            </div>
  
            {/* Live Video Embed */}
            <div>
              <h2 className="text-2xl font-bold text-green-400 mb-4 text-center lg:text-left">Live Video</h2>
              <div className="aspect-video rounded-2xl overflow-hidden border border-purple-800 shadow-xl">
                <iframe
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ" // replace with real live performance
                  title="Live Performance"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full"
                ></iframe>
              </div>
              
            </div>
            <div className="text-center mt-12">
            <Link
  to="/music"
  className={`inline-block text-purple-400 text-lg font-semibold tracking-wide transition duration-200 ${
    !isMobile ? 'hover:text-green-400 hover:underline' : ''
  }`}
>
  Back to Music Catalog
</Link>
</div>
          </div>
        </section>
        
      </div>
      <footer className="bg-black pt-12 text-center text-sm text-gray-500">
        <p>© 2025 Vanylla Godzylla. All rights reserved.</p>
        <p>
  Follow us: 
  <a
    href="https://instagram.com/vanylla.godzylla"
    className="hover:text-pink-400 ml-1"
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
