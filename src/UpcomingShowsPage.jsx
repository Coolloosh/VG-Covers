import React, { useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';

import { upcomingShows } from './Showsdata.js';

export default function UpcomingShowsPage() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
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

      <div className="min-h-screen px-6 py-12 max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-purple-300 mb-10 text-center">All Upcoming Shows</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {upcomingShows.map((show) => (
            <div
            key={show.slug}
            className={`bg-gray-900 rounded-2xl border border-purple-700 shadow-xl overflow-hidden transition ${
              !isMobile ? 'hover:shadow-purple-600 hover:-translate-y-1' : ''
            }`}
          >
              <Link to={`/shows/${show.slug}`} className="block">
                <div
                  className="h-60 bg-cover bg-center"
                  style={{ backgroundImage: `url(/showposters/${show.thumbnail || show.poster})` }}
                />
                <div className="p-4">
                  <h3 className="text-green-400 text-xl font-bold">{show.date}</h3>
                  <p className="text-white text-lg font-semibold mt-1">
                    {show.location}, {show.city}
                  </p>
                  <p className="text-sm text-purple-200 mt-2 italic">{show.notes}</p>
                </div>
              </Link>
              {show.ticketLink && !show.soldOut && (
                <div className="px-4 pb-4">
                  <a
                    href={show.ticketLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block text-sm font-semibold text-green-400 hover:underline"
                  >
                    Get Tickets →
                  </a>
                </div>
              )}
              {show.soldOut && (
                <p className="text-red-500 font-bold px-4 pb-4">SOLD OUT</p>
              )}
              {!show.ticketLink && !show.soldOut && (
    <p className="text-sm font-semibold text-yellow-400 px-4 pb-4">
      {show.ticketNote || 'Tickets Unavailable'}
    </p>
  )}
            </div>
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
    href="https://www.youtube.com/@vanyllagodzylla1282"
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
