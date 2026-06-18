import React, { useState } from 'react';
import PageHero from './PageHero';


export default function FanclubSignupPage() {
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', street: '', city: '', state: '', zip: '', country: '', dob: '', gender: ''
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch('https://fanclub-api.onrender.com/subscribe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (data.success) setSubmitted(true);
      else throw new Error(data.error || 'Failed to sign up');
    } catch (err) {
      setError(err.message);
    }
  };

  return (
    
    <main className="min-h-screen bg-black text-white font-sans">
        <PageHero
                    /*  image="/fanclub3.png"
                      title="Fanclub"
                      subtitle={<span className="text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">join or die...</span>}
                    /* subtitle={<span className="text-green-400 text-xl md:text-2xl italic tracking-wide opacity-80">Whisper into the chaos...</span>}*/
                   /*   gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
                      imageClass="object-bottom brightness-50 scale-105 transition duration-[2000ms]"

                      titleColor="purple"
                      titleFont="font-sans font-extrabold tracking-normal"*/
                     /* titleFont="font-bebas"*/
                 /*   />*/
                      image="/fanclub1.webp"
                      title="Fanclub"
                      subtitle={<span className="text-purple-400 text-2xl md:text-2xl italic tracking-wide drop-shadow-[0_0_25px_rgba(0,255,0,0.3)] animate-fade-in-slow opacity-90">become a VIG...</span>}
                    /* subtitle={<span className="text-green-400 text-xl md:text-2xl italic tracking-wide opacity-80">Whisper into the chaos...</span>}*/
                      gradientClass="bg-gradient-to-b from-transparent via-black/30 to-black"
                      imageClass="object-top brightness-50 scale-85 transition duration-[2000ms]"
                      titleColor="purple"
                      titleFont="font-sans font-extrabold tracking-normal"
                     /* titleFont="font-bebas"*/
                    />
        
        
      <div className="max-w-4xl mx-auto px-6 py-16">
        
     
        <h1 className="text-4xl font-bold text-green-400 mb-6 text-center">Join the V.I.G. Fanclub</h1>
        <p className="text-purple-300 text-center mb-10">Be the first to know about new drops, exclusive content, and secret shows.</p>

        {submitted ? (
          <p className="text-green-400 font-semibold text-center">Thank you for signing up!</p>
        ) : (
          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4 rounded-2xl border border-purple-900/80 bg-zinc-950/80 p-5 shadow-[0_0_40px_rgba(126,34,206,0.14)] sm:p-7 md:grid-cols-2">
            <input type="text" name="firstName" value={form.firstName} onChange={handleChange} placeholder="First Name" required className="rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            <input type="text" name="lastName" value={form.lastName} onChange={handleChange} placeholder="Last Name" required className="rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" required className="col-span-full rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            <input type="date" name="dob" value={form.dob} onChange={handleChange} className="rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            <select name="gender" value={form.gender} onChange={handleChange} className="rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500">
              <option value="">Gender</option>
              <option value="female">Female</option>
              <option value="male">Male</option>
              <option value="nonbinary">Non-binary</option>
              <option value="prefer-not-to-say">Prefer not to say</option>
            </select>
            <input type="text" name="street" value={form.street} onChange={handleChange} placeholder="Street Address" required className="col-span-full rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            <input type="text" name="city" value={form.city} onChange={handleChange} placeholder="City" required className="rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            <input type="text" name="state" value={form.state} onChange={handleChange} placeholder="State/Province" required className="rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            <input type="text" name="zip" value={form.zip} onChange={handleChange} placeholder="ZIP / Postal Code" required className="rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            <input type="text" name="country" value={form.country} onChange={handleChange} placeholder="Country" required className="rounded-xl border border-purple-900 bg-black/70 p-3.5 text-white placeholder-purple-300/70 outline-none transition focus:border-green-500 focus:ring-1 focus:ring-green-500" />
            <button
  type="submit"
  className={`col-span-full bg-green-500 text-black font-bold py-3 rounded-full shadow-md transition ${
    !isMobile ? 'hover:bg-green-400' : ''
  }`}
>
  Join Now
</button>
            {error && <p className="col-span-full text-red-400 text-center mt-2">{error}</p>}
          </form>
        )}
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
