
              
              import React from 'react';
              import Timeline from "./components/Timeline.jsx";
              import PageHero from './PageHero.jsx';
              
              export default function BandPage() {
                const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;

                return (
                   <main className="min-h-screen bg-black text-white font-sans">
                     {/* Hero with centered "About Us" and subtitle */}
                     <section className="relative h-screen w-full">
                     <PageHero
  image={isMobile ? "/mobilebandhero.webp" : "/band.webp"}
  gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
  imageClass={isMobile 
    ? "object-cover object-center brightness-50 scale-65 transition duration-[2000ms]" 
    : "object-center brightness-50 scale-105 transition duration-[2000ms]"
  }
  minHeight={isMobile
    ? "min-h-[100vh]"
    : "min-h-[200vh]"
  }
  titleColor="purple"
  titleFont="font-sans font-extrabold tracking-normal"
/>
                     <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-200 drop-shadow-[0_0_40px_rgba(192,132,252,0.6)] mb-4 uppercase tracking-wide">
            ABOUT US
          </h1>
          <p className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] opacity-90">Pop, Punk, Alt & Rock Anthems Fit For Any Occasion</p>
        </div>
                    </section>
              
                    {/* Main content pushed slightly lower */}
                    <div className="mt-[200px] relative z-10 px-6 pt-20 pb-24">
                    <section className="max-w-4xl mx-auto mb-20">
                        <h2 className="text-4xl md:text-5xl font-bold text-purple-400 mb-6 text-center drop-shadow">
                          Tales Of the Beast
                        </h2>
                        <p className="text-lg text-purple-200 mb-4 leading-relaxed">
                        Vanylla Godzylla is the premier party rock band born out of the University of Delaware. Formed in the stomach of Main Street (El Diablo) and refined in its heart (Deer Park Tavern), we built our sound in sweaty basements and backyard blowouts where the walls shook and the crowd sang every word. Today, we bring that same electric energy to bars, weddings, and events across the East Coast — playing Pop, Punk, Alt, and Rock anthems fit for any occasion.

                        </p>
                       
                      </section>
              
                     <section className="text-center py-16">
                      <a
                        href="/booking"
                        className="inline-block bg-green-500 hover:bg-green-400 text-black font-bold px-8 py-4 rounded-full shadow-md transition hover:scale-105"
                      >
                        Book the Band →
                      </a>
                    </section>
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
            
              