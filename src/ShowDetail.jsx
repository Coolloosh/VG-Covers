
import { upcomingShows } from './Showsdata.js';
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import PageHero from './PageHero';

export default function ShowDetail() {
    const { slug } = useParams();
    const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
    const show = upcomingShows.find(s => s.slug === slug);
  
    if (!show) {
      return <div className="text-white p-10 text-center">Show not found.</div>;
    }
  
    return (
      <main className="min-h-screen bg-black text-white font-sans pt-0">
        <PageHero
          image={`/showposters/${show.poster}`}
          title={show.location}
          subtitle={<span className="text-green-400 text-xl">{show.date} – {show.city}</span>}
          gradientClass="bg-gradient-to-b from-black via-black/30 to-black"
          titleColor="purple"
          titleFont="font-sans font-extrabold tracking-normal"
          imageClass="object-center brightness-50 scale-105 transition duration-[2000ms]"
        />
  
        <div className="max-w-6xl mx-auto py-16 px-6 grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Event Info */}
          <div className="text-lg leading-relaxed">
            <h2 className="text-4xl font-extrabold text-purple-300 mb-6 tracking-wide">Event Info</h2>
            <p className="text-2xl text-white mb-4">
              <span className="font-bold text-green-400">Date:</span> {show.date}
            </p>
            <p className="text-2xl text-white mb-4">
              <span className="font-bold text-green-400">Location:</span> {show.location}, {show.city}
            </p>
            <p className="text-xl text-purple-300 italic mb-8">
              {show.notes}
            </p>
  
            {show.soldOut ? (
              <p className="text-red-500 font-bold text-xl mb-8">SOLD OUT</p>
            ) : show.ticketLink ? (
              <a
  href={show.ticketLink}
  target="_blank"
  rel="noopener noreferrer"
  className={`inline-block bg-green-500 text-black font-bold px-8 py-4 rounded-full shadow-md mb-8 text-lg transition ${
    !isMobile ? 'hover:bg-green-400' : ''
  }`}
>
  Get Tickets →
</a>
            ) : (!show.ticketLink && !show.soldOut) ? (
              <p className="text-yellow-400 italic text-base mb-8">{show.ticketNote || 'Tickets Unavailable'}</p>
            ) : null}
  
            
          </div>
  
          {/* Poster */}
          <div className="w-full max-h-[700px] overflow-hidden rounded-xl border border-purple-700 shadow-lg">
            <img
              src={`/showposters/${show.poster}`}
              alt={`${show.location} poster`}
              className="w-full h-auto object-contain"
            />
          </div>
          <Link
  to="/shows"
  className={`text-purple-400 text-lg font-semibold transition ${
    !isMobile ? 'hover:text-green-400 hover:underline' : 'block w-full text-center'
  }`}
>
  Back to Upcoming Shows
</Link>
            
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
  