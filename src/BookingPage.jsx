import React, { useState, useEffect } from 'react';
import PageHero from './PageHero';

export default function BookingPage() {
  const [showViewer, setShowViewer] = useState(false);
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
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
                              title="Booking & EPK"
                              subtitle={<span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">Supercharge your sales...</span>}
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
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Press Kit</h2>
          <p className="mb-4 text-purple-200">Need our bio, photos, press quotes, or tech info?</p>
          <button
  onClick={() => setShowViewer(!showViewer)}
  className={`inline-block bg-purple-600 text-white font-bold px-6 py-3 rounded-full shadow-md mb-4 mr-4 transition ${
    !isMobile ? 'hover:bg-purple-500' : ''
  }`}
>
  {showViewer ? 'Hide EPK' : 'View Our EPK'}
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

        <div>
          <h2 className="text-2xl font-semibold text-green-400 mb-4">Contact Us for Booking</h2>
          {formSubmitted && (
            <p className={`text-green-400 font-semibold mt-6 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
              Thanks! Your message has been sent.
            </p>
          )}

          {formError && (
            <p className={`text-red-400 font-semibold mt-6 transition-opacity duration-1000 ${fadeOut ? 'opacity-0' : 'opacity-100'}`}>
              ⚠️ {formError}
            </p>
          )}

          {!formSubmitted && (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="_gotcha" className="hidden" />

              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full p-3 rounded-md text-black"
              />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Your Email"
                required
                className="w-full p-3 rounded-md text-black"
              />
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Your Message"
                rows="4"
                required
                className="w-full p-3 rounded-md text-black"
              />
              <button
  type="submit"
  className={`bg-purple-600 px-6 py-3 rounded-md font-bold transition ${
    !isMobile ? 'hover:bg-purple-500' : ''
  }`}
>
  Send Message
</button>
            </form>
          )}
        </div>
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
