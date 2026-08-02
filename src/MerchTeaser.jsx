// Polished MerchTeaser.jsx — hide chevrons on mobile only
import React, { useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { merchItems } from './merchData';

export default function MerchTeaser() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const scrollRef = useRef(null);
  const navigate = useNavigate();

  const scroll = (dir) => {
    const container = scrollRef.current;
    if (container) {
      const cardWidth = 256;
      container.scrollBy({ left: dir === 'left' ? -cardWidth * 2 : cardWidth * 2, behavior: 'smooth' });
    }
  };

  const displayedItems = [...merchItems, ...merchItems];
  /*remove ml-4 if something is weird*/

  return (
    <section id="merch" className="bg-black py-20 px-6 max-w-7xl mx-auto border-t border-purple-800/40">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-4xl font-extrabold text-purple-400 tracking-wide uppercase">Merch</h2>
        <Link to="/merch" className="text-green-400 hover:text-green-300 text-sm font-semibold tracking-wide transition ml-4">
          More Merch →
        </Link>
      </div>

      <div className="relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto gap-6 pb-4 scrollbar-hide scroll-smooth snap-x snap-mandatory"
        >
          {displayedItems.map((item, index) => (
            <div
              key={`${item.id}-${index}`}
              className="min-w-[240px] snap-start"
            >
              <div
  className={`bg-gray-900/70 backdrop-blur-sm rounded-xl border border-purple-800 p-4 shadow-[0_0_30px_rgba(128,0,128,0.3)] transform transition-transform duration-300 cursor-pointer ${
    !isMobile ? 'hover:shadow-purple-600 hover:scale-[1.03]' : ''
  }`}
  onClick={() => navigate(`/merch/${item.id}`)}
>
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 object-cover rounded-lg mb-3"
                />
                <h3 className="text-white text-lg font-extrabold tracking-wide">{item.name}</h3>
                <p className="text-green-400 font-semibold text-sm">${(item.price / 100).toFixed(2)}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 left-0">
          <button onClick={() => scroll('left')} className="text-white text-3xl hover:text-green-400 transition">
            <ChevronLeft size={22} />
          </button>
        </div>
        <div className="hidden sm:flex absolute top-1/2 -translate-y-1/2 right-0">
          <button onClick={() => scroll('right')} className="text-white text-3xl hover:text-green-400 transition">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
