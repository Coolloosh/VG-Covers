// VanyllaGodzyllaSite.jsx — Hide mobile scrollbars + prevent horizontal drag on swipe
import React, { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MerchTeaser from './MerchTeaser';
import FeaturedLiveVideos from './FeaturedLiveVideos';
import { useCart } from './CartContext';

export default function VanyllaGodzyllaSite() {
  const { cart, updateCartItem, updateCartSize, getTotal } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [showVigPrompt, setShowVigPrompt] = useState(false);
  const [bookingInquiry, setBookingInquiry] = useState({
    name: '',
    email: '',
    location: '',
    estimatedDate: '',
    message: '',
  });

  useEffect(() => {
    const hasSeen = localStorage.getItem('vigPrompt');
    if (!hasSeen) {
      setTimeout(() => setShowVigPrompt(true), 10000);
      localStorage.setItem('vigPrompt', 'true');
    }
  }, []);

  const heroImages = [
    { desktop: "/HeroImg1.jpeg", mobile: "/gal11.webp" },
    { desktop: "/HeroImg2.png", mobile: "/gal10.webp" },
    { desktop: "/HeroImg3.png", mobile: "/gal4.jpg" },
    { desktop: "/HeroImg4.png", mobile: "/gal5.webp" },
  ];

  const [heroIndex, setHeroIndex] = useState(0);
  const touchStartX = useRef(null);
  const touchStartY = useRef(null);

  const prevHero = () =>
    setHeroIndex((prev) => (prev - 1 + heroImages.length) % heroImages.length);
  const nextHero = () =>
    setHeroIndex((prev) => (prev + 1) % heroImages.length);

  useEffect(() => {
    const timer = setInterval(() => setHeroIndex(i => (i + 1) % heroImages.length), 12000);
    return () => clearInterval(timer);
  }, []);

  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e) => {
    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    const deltaY = e.changedTouches[0].clientY - touchStartY.current;

    // Prevent page scrolling when horizontal swipe is detected
    if (Math.abs(deltaX) > Math.abs(deltaY) && Math.abs(deltaX) > 50) {
      e.preventDefault();
      deltaX > 0 ? prevHero() : nextHero();
    }
    touchStartX.current = null;
    touchStartY.current = null;
  };

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

  const handleInquiryChange = (e) => {
    setBookingInquiry({ ...bookingInquiry, [e.target.name]: e.target.value });
  };

  const handleInquirySubmit = (e) => {
    e.preventDefault();

    const body = [
      'VG Covers booking inquiry',
      '',
      `Name: ${bookingInquiry.name}`,
      `Email: ${bookingInquiry.email}`,
      `Location: ${bookingInquiry.location || 'Not provided'}`,
      `Estimated date: ${bookingInquiry.estimatedDate || 'Not decided yet'}`,
      '',
      'Message:',
      bookingInquiry.message,
    ].join('\n');

    const mailto = `mailto:gary@starleigh.com?cc=vanyllagodzylla@gmail.com&subject=${encodeURIComponent('VG Covers Booking Inquiry')}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  return (
    <main className="min-h-screen bg-black text-white font-sans overflow-x-hidden touch-pan-y">
      <section
        id="home"
        className="relative h-[100vh] sm:h-screen flex flex-col justify-center items-center text-center overflow-hidden pt-24 pb-16"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <picture>
          <source media="(max-width: 768px)" srcSet={heroImages[heroIndex].mobile} />
          <img
            src={heroImages[heroIndex].desktop}
            alt="Hero"
            className="absolute inset-0 w-full h-full object-cover scale-105 transition-opacity duration-1000"
          />
        </picture>

        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />

        <button
          onClick={prevHero}
          className="hidden sm:block absolute left-4 sm:left-10 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:text-green-400 transition"
          aria-label="Previous Slide"
        >
          ‹
        </button>

        <button
          onClick={nextHero}
          className="hidden sm:block absolute right-4 sm:right-10 top-1/2 transform -translate-y-1/2 text-white text-4xl z-20 hover:text-green-400 transition"
          aria-label="Next Slide"
        >
          ›
        </button>

        <div className="relative z-10 px-6 max-w-3xl mx-auto text-purple-200 text-center">
          <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl font-extrabold mb-6 leading-tight tracking-wide drop-shadow-[0_0_40px_rgba(255,255,255,.4)] ">
            Vanylla Godzylla
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-purple-300 mb-10 tracking-wide">
            Delaware's Hottest Rock Band
          </p>
        </div>
      </section>

      <section className="sm:pt-0 pt-16">
        <FeaturedLiveVideos />
        <MerchTeaser />
        <section className="bg-black py-16 px-6 max-w-7xl mx-auto border-t border-purple-800/40">
          <h2 className="text-4xl font-extrabold text-purple-400 tracking-wide uppercase mb-10">
            Contact Us
          </h2>
          <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-10 items-stretch">
            <div className="flex h-full flex-col items-center justify-center gap-7 rounded-2xl border border-purple-900/40 bg-zinc-950/30 px-6 py-8">
              <img
                src="/VG-Logo.png"
                alt="Vanylla Godzylla"
                className="w-full max-w-[170px] sm:max-w-[210px]"
              />
              <img
                src="/Starleigh-Logo.png"
                alt="Starleigh Entertainment"
                className="w-full max-w-[210px] sm:max-w-[260px]"
              />
              <div className="flex justify-center gap-6 text-2xl">
                <a href="https://www.instagram.com/vanylla.godzylla/" target="_blank" rel="noreferrer" className="text-purple-200 hover:text-green-400 transition" aria-label="Instagram">
                  <i className="fa-brands fa-instagram"></i>
                </a>
                <a href="https://www.tiktok.com/@vanyllagodzylla" target="_blank" rel="noreferrer" className="text-purple-200 hover:text-green-400 transition" aria-label="TikTok">
                  <i className="fa-brands fa-tiktok"></i>
                </a>
                <a href="https://www.youtube.com/@vanyllagodzylla1282" target="_blank" rel="noreferrer" className="text-purple-200 hover:text-green-400 transition" aria-label="YouTube">
                  <i className="fa-brands fa-youtube"></i>
                </a>
                <a href="https://www.facebook.com/people/Vanylla-Godzylla/61569538812755/" target="_blank" rel="noreferrer" className="text-purple-200 hover:text-green-400 transition" aria-label="Facebook">
                  <i className="fa-brands fa-facebook-f"></i>
                </a>
              </div>
            </div>

            <form onSubmit={handleInquirySubmit} className="rounded-2xl border border-purple-800 bg-zinc-950/80 p-5 sm:p-6 shadow-[0_0_30px_rgba(128,0,128,0.2)]">
              <div className="mb-5 rounded-xl border border-purple-800/70 bg-black/40 px-4 py-4">
                <p className="text-green-400 font-extrabold uppercase tracking-wide text-sm mb-2">
                  Booking Contact
                </p>
                <p className="text-white text-xl font-bold">Gary Hutson</p>
                <div className="mt-2 flex flex-col sm:flex-row sm:flex-wrap gap-2 sm:gap-5 text-purple-200">
                  <a href="mailto:gary@starleigh.com" className="hover:text-green-400 transition">
                    gary@starleigh.com
                  </a>
                  <a href="tel:4109602108" className="hover:text-green-400 transition">
                    410-960-2108
                  </a>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  name="name"
                  value={bookingInquiry.name}
                  onChange={handleInquiryChange}
                  placeholder="Your Name"
                  required
                  className="w-full bg-zinc-900 text-white placeholder-purple-300 border border-purple-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="email"
                  name="email"
                  value={bookingInquiry.email}
                  onChange={handleInquiryChange}
                  placeholder="Your Email"
                  required
                  className="w-full bg-zinc-900 text-white placeholder-purple-300 border border-purple-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  name="location"
                  value={bookingInquiry.location}
                  onChange={handleInquiryChange}
                  placeholder="Location"
                  className="w-full sm:col-span-2 bg-zinc-900 text-white placeholder-purple-300 border border-purple-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <input
                  type="text"
                  name="estimatedDate"
                  value={bookingInquiry.estimatedDate}
                  onChange={handleInquiryChange}
                  placeholder="Estimated Date (or general timeframe)"
                  className="w-full sm:col-span-2 bg-zinc-900 text-white placeholder-purple-300 border border-purple-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <textarea
                  name="message"
                  value={bookingInquiry.message}
                  onChange={handleInquiryChange}
                  placeholder="Message / set time / buyer notes"
                  rows="5"
                  required
                  className="w-full sm:col-span-2 bg-zinc-900 text-white placeholder-purple-300 border border-purple-700 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
                ></textarea>
              </div>
              <button
                type="submit"
                className={`mt-5 w-full bg-green-500 text-black font-bold px-7 py-3 rounded-full shadow-md transition ${
                  !isMobile ? 'hover:bg-green-400 hover:scale-[1.02]' : ''
                }`}
              >
                Send Message
              </button>
            </form>
          </div>
        </section>
      </section>

      {showVigPrompt && (
        <div className="fixed bottom-6 left-6 bg-purple-700 text-white p-4 rounded-xl shadow-lg z-50 max-w-xs animate-fade-in">
          <p className="text-sm mb-3">Want early access to merch & exclusive content?</p>
          <Link
            to="/fanclub"
            className="inline-block bg-green-500 hover:bg-green-400 text-black px-4 py-2 rounded-full font-bold shadow"
          >
            Become a V.I.G.
          </Link>
          <button
            onClick={() => setShowVigPrompt(false)}
            className="absolute top-2 right-3 text-white text-xl font-bold"
          >×</button>
        </div>
      )}

      <footer className="bg-black py-6 mt-20 text-center text-sm text-gray-500">
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
