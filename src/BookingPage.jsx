import React, { useState, useEffect } from 'react';
import PageHero from './PageHero';

export default function BookingPage() {
  const [showViewer, setShowViewer] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    venueName: '',
    eventDate: '',
    location: '',
    message: '',
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formError, setFormError] = useState(null);
  const [fadeOut, setFadeOut] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://formspree.io/f/mkgjylvv', {
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

  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;


  return (
       <main className="min-h-screen bg-black text-white font-sans">
                <PageHero
                              image="/booking3.webp"
                              title="Booking"
                              subtitle={<span className="text-purple-400 text-xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">Delaware's Hottest Rock Band</span>}
                            /* subtitle={<span className="text-green-400 text-xl md:text-2xl italic tracking-wide opacity-80">Whisper into the chaos...</span>}*/
                              gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
                              titleColor="purple"
                              titleFont="font-sans font-extrabold tracking-normal"
                              imageClass="object-[68%_center] sm:object-center brightness-50 scale-85 transition duration-[2000ms]"
                             /* titleFont="font-bebas"*/
                            />
    <div className="min-h-screen bg-black text-white py-12 px-6">
   

      <div className="max-w-4xl mx-auto">
        <div className="relative z-10 text-center px-6"></div>

     

        <div className="mb-12">
          <h2 className="text-2xl font-semibold text-green-400 mb-4">EPK</h2>
          <p className="mb-4 text-purple-200">Interested in booking us? View the EPK here, then send the details for your date below and we'll be in touch shortly!</p>
          <button
  onClick={() => setShowViewer(!showViewer)}
  className={`inline-block bg-purple-600 text-white font-bold px-6 py-3 rounded-full shadow-md mb-4 mr-4 transition ${
    !isMobile ? 'hover:bg-purple-500' : ''
  }`}
>
  {showViewer ? 'Hide EPK' : 'View EPK'}
</button>

          {showViewer && (
            <div className="w-full aspect-[4/3] border border-purple-700 rounded-lg overflow-hidden mb-4">
              <iframe
                src="/VGCEPK.pdf"
                className="w-full h-full"
                frameBorder="0"
                title="EPK"
              ></iframe>
            </div>
          )}

<a
  href="/VGCEPK.pdf"
  download
  className={`inline-block bg-green-500 text-black font-bold px-6 py-3 rounded-full shadow-md mt-4 transition ${
    !isMobile ? 'hover:bg-green-400' : ''
  }`}
>
  Download EPK (PDF)
</a>
        </div>

        <section className="overflow-hidden rounded-2xl border border-purple-900/80 bg-zinc-950/80 shadow-[0_0_40px_rgba(126,34,206,0.14)]">
          <div className="flex items-center gap-4 border-b border-purple-900/70 bg-zinc-950 px-5 py-5 sm:px-7">
              <div className="flex h-14 w-14 shrink-0 items-center justify-center overflow-hidden rounded-lg bg-black">
                <img
                  src="/Starleigh-Logo.png"
                  alt="Starleigh Entertainment"
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="min-w-0 flex-1">
                <p className="mb-1 text-xs font-extrabold uppercase tracking-[0.2em] text-green-400">
                  Booking managed by
                </p>
                <p className="font-bold text-white">Gary Hutson</p>
                <p className="text-xs uppercase tracking-wider text-purple-300">Starleigh Entertainment</p>
              </div>
              <div className="hidden shrink-0 flex-col items-end gap-1 text-sm sm:flex">
                  <a href="mailto:gary@starleigh.com" className="text-purple-100 transition hover:text-green-400">
                    gary@starleigh.com
                  </a>
                  <a href="tel:4109602108" className="text-purple-100 transition hover:text-green-400">
                    410-960-2108
                  </a>
              </div>
          </div>

          <div className="px-5 py-6 sm:px-7 sm:py-7">
          <div className="mb-5 flex flex-col gap-1 text-sm sm:hidden">
            <a href="mailto:gary@starleigh.com" className="text-purple-100 transition hover:text-green-400">
              gary@starleigh.com
            </a>
            <a href="tel:4109602108" className="text-purple-100 transition hover:text-green-400">
              410-960-2108
            </a>
          </div>
          {formSubmitted && (
            <p className={`rounded-xl border border-green-800 bg-green-950/30 p-4 text-green-400 font-semibold transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
              Thanks! Your message has been sent.
            </p>
          )}

          {formError && (
            <p className={`rounded-xl border border-red-800 bg-red-950/30 p-4 text-red-400 font-semibold transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
              ⚠️ {formError}
            </p>
          )}

          {!formSubmitted && (
            <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <input type="text" name="_gotcha" className="hidden" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500"
              />
             
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder="Location"
                className="w-full rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:col-span-2"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Message / set time / buyer notes"
                rows="4"
                required
                className="w-full resize-none rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500 sm:col-span-2"
              />
              <button
  type="submit"
  className={`rounded-full bg-green-500 px-7 py-3 font-bold text-black transition sm:col-span-2 sm:justify-self-start ${
    !isMobile ? 'hover:bg-green-400 hover:shadow-[0_0_20px_rgba(74,222,128,0.2)]' : ''
  }`}
>
  Send Booking Inquiry
</button>
            </form>
          )}
          </div>
        </section>
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
