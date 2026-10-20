// src/pages/CancelPage.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';

export default function CancelPage() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  return (
<div className="relative w-full min-h-screen bg-black text-white flex flex-col justify-center items-center text-center overflow-hidden">
<PageHero
                                    image="/cancel2.webp"
                                   
                                  /* subtitle={<span className="text-green-400 text-xl md:text-2xl italic tracking-wide opacity-80">Whisper into the chaos...</span>}*/
                                    gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
                                    titleColor="purple"
                                    imageClass="object-middle brightness-50 scale-85 transition duration-[2000ms]"
       
                                   /* titleFont="font-bebas"*/
                                  />
          {/* Content */}
    

  {/* Centered Overlay Content */}
  <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
    <h1 className="text-4xl sm:text-5xl font-extrabold text-red-400 drop-shadow-[0_0_15px_rgba(255,0,0,0.6)] mb-4">
      Checkout Canceled
    </h1>
    <p className="text-lg text-purple-200 mb-8 max-w-xl">
      Looks like you didn’t finish your order. No worries — you can head back to the shop anytime.
    </p>
    <Link
  to="/merch"
  className={`inline-block px-6 py-3 rounded-full border border-purple-400 text-white font-bold backdrop-blur-md transition ${
    !isMobile ? 'hover:bg-purple-700/40 hover:scale-105' : ''
  }`}
>
  Return to Shop
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
    </div>
    
  );
  
}
