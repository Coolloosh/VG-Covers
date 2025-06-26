// layout.jsx — Fix logo/cart alignment shift between collapsed and open mobile views
import React, { useState, useRef, useEffect } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import { ShoppingCart, User, ChevronDown } from 'lucide-react';
import { useCart } from '../CartContext';

const logo = "/crop.png";

export default function Layout() {
  const navigate = useNavigate();
  const location = useLocation();
  const { cart, updateCartItem, updateCartSize, getTotal } = useCart();
  const [cartOpen, setCartOpen] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [showsOpen, setShowsOpen] = useState(false);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const showsTimeout = useRef(null);
  const galleryTimeout = useRef(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;



  const handleDropdown = (setter, open, ref) => {
    clearTimeout(ref.current);
    if (open) {
      setter(true);
    } else {
      ref.current = setTimeout(() => setter(false), 200);
    }
  };

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setMobileOpen(false);
        setShowsOpen(false);
        setGalleryOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navLinkClass = ({ isActive }) => `uppercase tracking-widest font-bold transition ${
    isActive ? 'text-green-400' : (!isMobile ? 'text-white hover:text-green-400' : 'text-white')
  }`;
  return (
<div className="bg-black text-white font-sans min-h-screen relative overflow-x-hidden">
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        {/* MOBILE NAV */}
        <div className="flex md:hidden items-center justify-between px-4 py-4">
          <button
            onClick={() => setMobileOpen(true)}
            className="text-white text-3xl focus:outline-none"
          >☰</button>

          <div onClick={() => navigate("/")} className="cursor-pointer translate-y-[2px]">
            <div className="w-20 h-20 rounded-full border-4 border-white bg-white/100 shadow flex items-center justify-center">
              <img src={logo} alt="VG" className="w-full h-full object-contain" />
            </div>
          </div>

          <div className="flex gap-4 items-center translate-y-[2px]">
          <button
  onClick={() => setCartOpen(true)}
  className={`relative transition ${
    !isMobile ? 'hover:text-green-400' : ''
  }`}
>
  <ShoppingCart size={24} />
  {cart.length > 0 && (
    <span className="absolute -top-2 -right-2 text-xs bg-purple-600 rounded-full px-1.5">
      {cart.reduce((sum, i) => sum + i.quantity, 0)}
    </span>
  )}
</button>
          </div>
        </div>
        
        {/* MOBILE OVERLAY */}
        {mobileOpen && (
          <div className="fixed inset-0 bg-black z-50 overflow-y-auto pt-6 pb-12 px-6 flex flex-col">
            <div className="flex justify-between items-center mb-12">
              <button onClick={() => setMobileOpen(false)} className="text-white text-3xl">×</button>
              <div onClick={() => { navigate("/"); setMobileOpen(false); }} className="cursor-pointer translate-y-[2px]">
              <div className="w-20 h-20 rounded-full border-4 border-white bg-white/100 shadow flex items-center justify-center">
              <img src={logo} alt="VG" className="w-full h-full object-contain" />
            </div>
              </div>
              <button
  onClick={() => setCartOpen(true)}
  className={`text-white transition ${
    !isMobile ? 'hover:text-green-400' : ''
  }`}
>
  <ShoppingCart size={24} />
</button>
            </div>

            <div className="flex flex-col gap-6 text-2xl font-bold">
              <NavLink onClick={() => setMobileOpen(false)} to="/contact" className={navLinkClass}>CONTACT</NavLink>
              <NavLink onClick={() => setMobileOpen(false)} to="/band" className={navLinkClass}>BAND</NavLink>
              <NavLink onClick={() => setMobileOpen(false)} to="/music" className={navLinkClass}>MUSIC</NavLink>

              <div>
              <button
  className={`flex justify-between items-center w-full text-left text-white text-2xl font-bold transition ${
    !isMobile ? 'hover:text-green-400' : ''
  }`}
  onClick={() => setShowsOpen(!showsOpen)}
>
                  SHOWS <ChevronDown className={`ml-2 transition-transform ${showsOpen ? 'rotate-180' : ''}`} />
                </button>
                {showsOpen && (
                  <div className="ml-4 mt-2 flex flex-col space-y-2 text-lg">
<NavLink
  onClick={() => setMobileOpen(false)}
  to="/shows"
  className={`text-purple-300 text-lg transition ${
    !isMobile ? 'hover:text-white' : ''
  }`}
>
  Upcoming Shows
</NavLink>
<NavLink
  onClick={() => setMobileOpen(false)}
  to="/past-shows"
  className={`text-purple-300 text-lg transition ${
    !isMobile ? 'hover:text-white' : ''
  }`}
>
  Past Shows
</NavLink>                
  </div>
                )}
              </div>

              <div>
              <button
  className={`flex justify-between items-center w-full text-left text-white text-2xl font-bold transition ${
    !isMobile ? 'hover:text-green-400' : ''
  }`}
  onClick={() => setGalleryOpen(!galleryOpen)}
>
                  GALLERY <ChevronDown className={`ml-2 transition-transform ${galleryOpen ? 'rotate-180' : ''}`} />
                </button>
                {galleryOpen && (
                  <div className="ml-4 mt-2 flex flex-col space-y-2 text-lg">
<NavLink
  onClick={() => setMobileOpen(false)}
  to="/gallery/photos"
  className={`text-purple-300 text-lg transition ${
    !isMobile ? 'hover:text-white' : ''
  }`}
>
  Photos
</NavLink>                   
<NavLink
  onClick={() => setMobileOpen(false)}
  to="/gallery/videos"
  className={`text-purple-300 text-lg transition ${
    !isMobile ? 'hover:text-white' : ''
  }`}
>
  Videos
</NavLink>                  </div>
                )}
              </div>

              <NavLink onClick={() => setMobileOpen(false)} to="/fanclub" className={navLinkClass}>FANCLUB</NavLink>
              <NavLink onClick={() => setMobileOpen(false)} to="/merch" className={navLinkClass}>SHOP</NavLink>
              <NavLink onClick={() => setMobileOpen(false)} to="/booking" className={navLinkClass}>BOOKING</NavLink>
            </div>

            <div className="mt-16 pt-6 border-t border-purple-700 text-sm text-gray-400 text-center">
              <p>© 2025 Vanylla Godzylla LLC. All rights reserved.</p>
              <div className="mt-3 flex justify-center gap-4 text-xl">
                <a href="https://instagram.com/vanylla.godzylla" className="hover:text-pink-400">Instagram</a>
                <a href="https://www.youtube.com/@vanyllagodzylla1282" className="hover:text-red-400">YouTube</a>
                <a href="https://open.spotify.com/artist/12x1KFm8qY060D9wyrjyqo" className="hover:text-green-400">Spotify</a>
              </div>
            </div>
          </div>
        )}


        {/* DESKTOP NAV */}
        <div className="hidden md:flex justify-center items-center py-4">
          <div className="flex items-center gap-12 relative" style={{ paddingRight: "20px", transform: "translateX(-24px)" }}>
            <div className="flex gap-6 items-center">
              <div className="flex gap-3 pr-4">
                <a href="https://www.instagram.com/vanylla.godzylla/" target="_blank" rel="noreferrer" className="hover:text-green-400 transition"><i className="fa-brands fa-instagram text-xl"></i></a>
                <a href="https://www.tiktok.com/@vanyllagodzylla" target="_blank" rel="noreferrer" className="hover:text-green-400 transition"><i className="fa-brands fa-tiktok text-xl"></i></a>
                <a href="https://www.youtube.com/@vanyllagodzylla1282" target="_blank" rel="noreferrer" className="hover:text-green-400 transition"><i className="fa-brands fa-youtube text-xl"></i></a>
                <a href="https://open.spotify.com/artist/12x1KFm8qY060D9wyrjyqo?si=vvyRemjhS3i3DW7wuVvQzg" target="_blank" rel="noreferrer" className="hover:text-green-400 transition"><i className="fa-brands fa-spotify text-xl"></i></a>
                <a href="https://www.facebook.com/people/Vanylla-Godzylla/61569538812755/" target="_blank" rel="noreferrer" className="hover:text-green-400 transition"><i className="fa-brands fa-facebook-f text-xl"></i></a>
              </div>
              <NavLink to="/contact" className={navLinkClass}>Contact</NavLink>
              <NavLink to="/band" className={navLinkClass}>Band</NavLink>
              <NavLink to="/music" className={navLinkClass}>Music</NavLink>
              <div
                className="relative"
                onMouseEnter={() => handleDropdown(setShowsOpen, true, showsTimeout)}
                onMouseLeave={() => handleDropdown(setShowsOpen, false, showsTimeout)}
              >
                <button
                  onClick={() => navigate('/shows')}
                  className="flex items-center gap-1 text-white hover:text-green-400 uppercase font-bold"
                >
                  Shows <ChevronDown size={14} className={`transition-transform ${showsOpen ? 'rotate-180' : ''}`} />
                </button>
                {showsOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-black/80 backdrop-blur-md border border-purple-700 rounded-lg shadow-xl z-50">
                    <button onClick={() => navigate('/shows')} className="block w-full text-left px-6 py-2 hover:bg-purple-800 whitespace-nowrap">Upcoming Shows</button>
                    <button onClick={() => navigate('/past-shows')} className="block w-full text-left px-6 py-2 hover:bg-purple-800 whitespace-nowrap">Past Shows</button>
                  </div>
                )}
              </div>
            </div>

            <div className="cursor-pointer" onClick={() => navigate("/")}>
              <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 border-white bg-white/100 backdrop-blur-md shadow-[0_0_40px_rgba(255,255,255,0.2)] flex items-center justify-center transition-transform duration-300 hover:scale-110">
                <img src={logo} alt="VG" className="w-24 h-24 sm:w-28 sm:h-32 object-contain" />
              </div>
            </div>

            <div className="flex gap-6 items-center">
              <div
                className="relative"
                onMouseEnter={() => handleDropdown(setGalleryOpen, true, galleryTimeout)}
                onMouseLeave={() => handleDropdown(setGalleryOpen, false, galleryTimeout)}
              >
                <button
                  onClick={() => navigate('/gallery/photos')}
                  className="flex items-center gap-1 text-white hover:text-green-400 uppercase font-bold"
                >
                  Gallery <ChevronDown size={14} className={`transition-transform ${galleryOpen ? 'rotate-180' : ''}`} />
                </button>
                {galleryOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 bg-black/80 backdrop-blur-md border border-purple-700 rounded-lg shadow-xl z-50">
                    <button onClick={() => navigate('/gallery/photos')} className="block w-full text-left px-6 py-2 hover:bg-purple-800 whitespace-nowrap">Photos</button>
                    <button onClick={() => navigate('/gallery/videos')} className="block w-full text-left px-6 py-2 hover:bg-purple-800 whitespace-nowrap">Videos</button>
                  </div>
                )}
              </div>
              <NavLink to="/fanclub" className={navLinkClass}>Fanclub</NavLink>
              <NavLink to="/merch" className={navLinkClass}>Shop</NavLink>
              <NavLink to="/booking" className={navLinkClass}>Booking</NavLink>
              <button onClick={() => setCartOpen(true)} className="hover:text-green-400 relative">
                <ShoppingCart size={20} />
                {cart.length > 0 && (
                  <span className="absolute -top-2 -right-2 text-xs bg-purple-600 rounded-full px-1.5">
                    {cart.reduce((sum, i) => sum + i.quantity, 0)}
                  </span>
                )}
              </button>
            { /* <NavLink to="/login" className="hover:text-green-400"><User size={20} /></NavLink>*/}
              <NavLink to="/" className="hover:text-green-400"><User size={20} /></NavLink>

            </div>
          </div>
        </div>
      </header>

      {/* CART DRAWER */}
      {cartOpen && (
        <div className="fixed top-0 right-0 w-full sm:w-96 h-full bg-gray-950 text-white shadow-xl z-[999] p-6 overflow-y-auto">
          <button onClick={() => setCartOpen(false)} className="text-xl absolute top-4 right-4">&times;</button>
          <h3 className="text-2xl font-bold mb-6">Your Cart</h3>
          {cart.length === 0 ? (
            <p>Your cart is empty.</p>
          ) : (
            <div className="space-y-4">
              {cart.map((item) => (
  <div key={item.uid} className="border-b border-gray-700 pb-4 flex gap-4 items-start">
    <img
      src={item.image}
      alt={item.name}
      className="w-20 h-20 object-cover rounded shadow-md border border-purple-700"
    />
    <div className="flex-1">
      <h4 className="font-bold text-lg">{item.name}</h4>
      {item.size && (
        <div className="text-sm text-purple-400 mb-2">
          Size:
          <select
            className="ml-2 bg-gray-800 text-white rounded px-2 py-1"
            value={item.size}
            onChange={(e) => updateCartSize(item.uid, e.target.value)}
          >
            {["S", "M", "L", "XL", "XXL"].map((size) => (
              <option key={size} value={size}>{size}</option>
            ))}
          </select>
        </div>
      )}
      <p className="text-sm">${(item.price / 100).toFixed(2)} each</p>
      <div className="flex items-center gap-2 mt-2">
        <button onClick={() => updateCartItem(item.uid, item.quantity - 1)} className="px-2 py-1 bg-gray-800 rounded">-</button>
        <span>{item.quantity}</span>
        <button onClick={() => updateCartItem(item.uid, item.quantity + 1)} className="px-2 py-1 bg-gray-800 rounded">+</button>
      </div>
    </div>
  </div>
))}
              <p className="text-right text-lg mt-4">Subtotal: ${(getTotal() / 100).toFixed(2)}</p>
              <button
                onClick={async () => {
                  try {
                    const isInPerson = window.location.pathname === "/checkout/pickup";

const res = await fetch('/api/create-checkout-session', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ cartItems: cart, pickup: isInPerson })
});

                    const data = await res.json();
                    if (data.url) window.location.href = data.url;
                    else throw new Error('No checkout URL returned');
                  } catch (err) {
                    console.error('Checkout error:', err);
                    alert('Failed to start checkout. Please try again.');
                  }
                }}
                className="mt-6 bg-green-500 hover:bg-green-400 w-full py-3 rounded-full font-bold text-black"
              >
                Proceed to Checkout
              </button>
            </div>
          )}
        </div>
      )}

{!mobileOpen && (
  <main className="pt-0">
    <Outlet />
  </main>
)}
    </div>
  );
  
}
