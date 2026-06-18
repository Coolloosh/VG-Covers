import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';

const spotlightVideos = [
  {
    title: 'Covers Compilation',
    youtubeId: 'V0RsQIPDY_s',
  },
  {
    title: '2025 Highlights',
    youtubeId: 'EdUC0yPVeqI',
  },
  
];

const essentialVideos = [
  {
    title: 'Freebird at Catherine Rooney’s, Wilmington DE',
    youtubeId: 'iIdQvCT309o',
    tag: 'Live Cover',
  },
  {
    title: 'Man In The Box at Station 142, West Chester PA',
    youtubeId: '384pigRMbMY',
    tag: 'Live Cover',
  },
  {
    title: 'One Last Breath at Conch Island, Rehobeth DE',
    youtubeId: 'jAlt6cLNZOs',
    tag: 'Live Cover',
  },
  {
    title: 'All The Small Things at Bayard House, Chesapeake City MD',
    youtubeId: '5xZ_bvhM6aY',
    tag: 'Live Cover',
  },
  {
    title: 'Sugar We’re Going Down at Catherine Rooney’s, Wilmington DE',
    youtubeId: 'GwPFubSra0c',
    tag: 'Live Cover',
  },
  {
    title: 'Zombie at Deer Park Tavern, Newark DE',
    youtubeId: '739nnEB2KyU',
    tag: 'Live Cover',
  },
];

export default function VideoGallery() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <PageHero
        image="/tryvids.webp"
        title="Live Videos"
        subtitle={
          <span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">
            Take a peek
          </span>
        }
        gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
        titleColor="purple"
        titleFont="font-sans font-extrabold tracking-normal"
        imageClass="object-[50%_85%] sm:object-bottom brightness-50 scale-85 transition duration-[2000ms]"
      />

      <section className="bg-black px-6 py-16 max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-5 mb-10">
          <div>
            <h1 className="text-4xl font-extrabold text-purple-400 tracking-wide uppercase">
              VG Clips
            </h1>
           
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <Link
              to="/music"
              className={`inline-block border border-purple-500 text-purple-200 font-bold px-6 py-3 rounded-full text-center transition ${
                !isMobile ? 'hover:bg-purple-600 hover:text-white' : ''
              }`}
            >
              Song List
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

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-14">
          {spotlightVideos.map((video) => (
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
                <h2 className="text-green-400 text-lg sm:text-xl font-extrabold uppercase tracking-wide">
                  {video.title}
                </h2>
              </div>
            </article>
          ))}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-7">
          {essentialVideos.map((video) => (
            <a
              key={`${video.title}-${video.youtubeId}`}
              href={`https://www.youtube.com/watch?v=${video.youtubeId}`}
              target="_blank"
              rel="noreferrer"
              className={`group bg-zinc-950 border border-purple-800 rounded-xl overflow-hidden shadow-[0_0_24px_rgba(128,0,128,0.16)] transition ${
                !isMobile ? 'hover:-translate-y-1 hover:shadow-purple-700/40' : ''
              }`}
            >
              <div className="relative aspect-video bg-zinc-900 overflow-hidden">
                <img
                  src={`https://img.youtube.com/vi/${video.youtubeId}/hqdefault.jpg`}
                  alt={`${video.title} thumbnail`}
                  className={`w-full h-full object-cover transition duration-300 ${
                    !isMobile ? 'group-hover:scale-105' : ''
                  }`}
                />
                <span className="absolute left-4 top-4 bg-black/80 border border-green-500/70 text-green-300 text-xs font-extrabold uppercase tracking-wide px-3 py-1 rounded-full">
                  {video.tag}
                </span>
                <span className="absolute inset-0 flex items-center justify-center">
                  <span className="bg-green-500 text-black font-extrabold rounded-full px-5 py-3 shadow-lg">
                    Watch
                  </span>
                </span>
              </div>
              <div className="p-5">
                <h3 className="text-purple-200 text-xl font-extrabold uppercase tracking-wide">
                  {video.title}
                </h3>
              </div>
            </a>
          ))}
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
