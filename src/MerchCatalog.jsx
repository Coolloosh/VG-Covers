import React from 'react';
import { Link } from 'react-router-dom';
import PageHero from './PageHero';

const merchItems = [
  { id: "SkullShirt", name: "VG Skull Tee", price: 2500, image: "/SkullShirt.webp", badge: "New" },
  { id: "OGShirt", name: "OG Tee", price: 2500, image: "/OGShirt.png", badge: "Hot" },
  { id: "stickerpack", name: "Sticker Pack", price: 1000, image: "/stickerpack.webp" },
  { id: "poster", name: "Show Poster Medley", price: 500, image: "/posters.webp", badge: "Limited" },
];

export default function MerchCatalog() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  return (
    <main className="min-h-screen bg-black text-white font-sans">
      <section className="relative h-screen w-full">
        <PageHero
          image="/merch6.webp"
          gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
          imageClass="object-[55%_top] sm:object-top brightness-50 scale-85 transition duration-[2000ms]"

          minHeight="min-h-[160vh]"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center z-10 px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold text-purple-200 drop-shadow-[0_0_40px_rgba(192,132,252,0.6)] mb-4 uppercase tracking-wide">
            MERCH
          </h1>
          <p className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] opacity-90">buy...</p>
        </div>
      </section>

      <div className="-mt-22 relative z-20 px-6 pt-20 pb-24">
        <h1 className="text-4xl font-bold text-purple-400 mb-12 text-center">All Merch</h1>
        <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-10">
          {merchItems.map((item) => (
            <div
  key={item.id}
  className={`group transform transition-transform ${
    !isMobile ? 'hover:scale-[1.03]' : ''
  }`}
>              <Link
                to={`/merch/${item.id}`}
                className="block overflow-hidden rounded-xl border border-purple-700 shadow-md hover:shadow-purple-500 bg-gray-900"
              >
                <div className="relative h-72 w-full">
                  <img
                    src={item.image}
                    alt={item.name}
                    className={`absolute inset-0 w-full h-full object-cover transition-transform duration-300 ${
                      !isMobile ? 'group-hover:scale-105' : ''
                    }`}                  />
                  {item.badge && (
                    <div className="absolute top-3 left-3 bg-purple-800 text-white text-xs font-bold px-3 py-1 rounded-full shadow">
                      {item.badge}
                    </div>
                  )}
                </div>
              </Link>
              <div className="mt-4 text-center">
                <Link to={`/merch/${item.id}`} className="block">
                  <h2 className="text-xl font-semibold text-white hover:text-green-400 transition">{item.name}</h2>
                  <p className="text-green-400 font-semibold text-sm mt-1">${(item.price / 100).toFixed(2)}</p>
                </Link>
              </div>
            </div>
          ))}
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
