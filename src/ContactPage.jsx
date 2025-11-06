// ContactPage.jsx
import React, { useState, useEffect } from 'react';
import PageHero from './PageHero';

export default function ContactPage() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);

  const handleContactChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/xrbonlqd', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (result.ok || result.success) {
        setFormSubmitted(true);
        setFadeOut(false);
      } else {
        throw new Error(result.error || 'Submission failed');
      }
    } catch (err) {
      console.error(err);
      setFormError('There was a problem sending your message.');
      setFadeOut(false);
    }
  };

  useEffect(() => {
    if (formSubmitted || formError) {
      const fadeTimer = setTimeout(() => setFadeOut(true), 4000);
      const clearTimer = setTimeout(() => {
        setFormSubmitted(false);
        setFormError(null);
        setFadeOut(false);
      }, 5000);
      return () => {
        clearTimeout(fadeTimer);
        clearTimeout(clearTimer);
      };
    }
  }, [formSubmitted, formError]);

  return (
    <main className="min-h-screen bg-black text-white font-sans">
        <PageHero
        image="/contact3.webp"
        title="Contact Us"
        subtitle={<span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">Your next great night starts here.</span>}
      /* subtitle={<span className="text-green-400 text-xl md:text-2xl italic tracking-wide opacity-80">Whisper into the chaos...</span>}*/
        gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
        imageClass="object-top brightness-50 scale-105 transition duration-[2000ms]"

        titleColor="purple"
        titleFont="font-sans font-extrabold tracking-normal"
       /* titleFont="font-bebas"*/
      />

      {/*<PageHero
        image="/contact2.png"
        title="Contact Us"
        subtitle={<span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">whisper into the chaos...</span>}
      subtitle={<span className="text-green-400 text-xl md:text-2xl italic tracking-wide opacity-80">Whisper into the chaos...</span>}
        gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
        imageClass="object-center brightness-50 scale-105 transition duration-[2000ms]"

        titleColor="purple"
        titleFont="font-sans font-extrabold tracking-normal"
        titleFont="font-bebas"
      />*/}

      <section className="relative bg-black text-white py-12 px-6 min-h-screen">
        {/*<h2 className="text-5xl md:text-6xl font-extrabold text-green-400 text-center mb-6 tracking-wide drop-shadow-[0_0_35px_rgba(192,132,252,0.5)]">
          Contact & Booking
        </h2> */}
        
        <h1 className="text-4xl font-bold text-green-400 mb-6 text-center">Contact & Booking</h1>
        <p className="text-purple-300 text-center text-lg mb-2 max-w-xl mx-auto">
          For booking, press, or fan messages, drop us a line:
        </p>
        <p className="text-green-400 text-center mb-10">
          Email: <a className="hover:underline">bookvgcovers@gmail.com</a>
        </p>

        <div className="max-w-2xl mx-auto text-center">
          {formSubmitted && (
            <p className={`text-green-400 font-semibold mb-6 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
              Thanks! We'll get back to you within a day or two.
            </p>
          )}

          {formError && (
            <p className={`text-red-400 font-semibold mb-6 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
              ⚠️ {formError}
            </p>
          )}

          {!formSubmitted && (
            <form onSubmit={handleContactSubmit} className="space-y-4">
              <input type="text" name="_gotcha" className="hidden" />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleContactChange}
                placeholder="Your Name"
                required
                className="w-full bg-zinc-900 text-white placeholder-purple-400 border border-purple-600 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleContactChange}
                placeholder="Your Email"
                required
                className="w-full bg-zinc-900 text-white placeholder-purple-400 border border-purple-600 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleContactChange}
                placeholder="Your Message"
                rows="5"
                required
                className="w-full bg-zinc-900 text-white placeholder-purple-400 border border-purple-600 rounded-xl px-5 py-3 focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              ></textarea>
              <button
  type="submit"
  className={`bg-purple-600 text-white font-bold py-3 px-8 rounded-full shadow-md transition ${
    !isMobile ? 'hover:bg-purple-500 hover:scale-105 hover:shadow-purple-500/40' : ''
  }`}
>
  Send Message
</button>
            </form>
          )}
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
