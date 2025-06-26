import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/react"; // ✅ correct
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import VanyllaGodzyllaSite from './VanyllaGodzyllaSite';
import DeerParkShow1 from './shows/deer-park-11-29.jsx';
import ConchIslandShow1 from "./shows/conch-4-26.jsx";
import BOTB3 from "./shows/botb3.jsx";
import CATS from "./shows/cats.jsx";
import CONCH2 from "./shows/conch-6-20.jsx";
import DPBOTB from "./shows/dpbotb.jsx";
import PUNK from "./shows/punkflea.jsx";
import SMYRNA from "./shows/smyrna.jsx";
import SWIM from "./shows/swim.jsx";
import TRAPT from "./shows/trapt.jsx";
import UDRESS from "./shows/udress.jsx";
import UNION from "./shows/union.jsx";
import Layout from './components/layout.jsx';
import BandPage from './BandPage'; // ✅ NEW IMPORT
import MusicCatalog from './MusicCatalog';
import MusicRelease from './MusicRelease';
import BookingPage from './BookingPage';
import MerchCatalog from './MerchCatalog.jsx';
import MerchItem from './MerchItem'; // ✅ Add this at the top
import { CartProvider } from './CartContext'; // ✅ Add this
import UpcomingShowsPage from './UpcomingShowsPage'; // ✅ Add this import
import PastShowsPage from './PastShowsPage'; // ✅ Add this import
import PhotoGallery from './PhotoGallery';
import VideoGallery from './VideoGallery';
import PhotoGalleryDetail from './PhotoGalleryDetail';
import VideoGalleryDetail from './VideoGalleryDetail';
import FanclubSignupPage from './FanClub'; // ✅ NEW
import ContactPage from './ContactPage.jsx';
// wherever your routes are defined (e.g., App.jsx or Routes.jsx)
import CancelPage from './CancelPage.jsx';
import SuccessPage from './SuccessPage.jsx';
import ShowDetail from './ShowDetail';
import ScrollToTop from './ScrollToTop';
import CoverRelease from "./CoverRelease.jsx";
import InPersonCheckout from "./InPersonCheckout.jsx";










/*

function SuccessPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col justify-center items-center text-center px-6">
      <h1 className="text-4xl font-bold text-green-400 mb-4">Thank you for your order!</h1>
      <p className="text-lg text-purple-300 mb-8">We appreciate your support. Your gear will be with you soon.</p>
      <a
        href="/"
        className="bg-purple-600 hover:bg-purple-500 text-white font-bold px-6 py-3 rounded-full shadow-md transition-all"
      >
        Return Home
      </a>
    </div>
  );
}*/

export default function App() {
  return (
    <CartProvider> {/* ✅ Wrap the whole app */}
      <Router>
      <ScrollToTop /> 
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<VanyllaGodzyllaSite />} />
            <Route path="/band" element={<BandPage />} />
            <Route path="/success" element={<SuccessPage />} />
            <Route path="/music" element={<MusicCatalog />} />
            <Route path="/music/:releaseId" element={<MusicRelease />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/merch" element={<MerchCatalog />} />
            <Route path="/merch/:itemId" element={<MerchItem />} /> {/* Now directly uses MerchItem */}
            <Route path="/shows" element={<UpcomingShowsPage />} />
            <Route path="/shows/:slug" element={<ShowDetail />} />
            <Route path="/past-shows" element={<PastShowsPage />} />

            
            <Route path="/shows/deer-park-11-29" element={<DeerParkShow1 />} />
            <Route path="/shows/conch-4-26" element={<ConchIslandShow1 />} />
            <Route path="/shows/smyrna" element={<SMYRNA />} />
            <Route path="/shows/conch-6-20" element={<CONCH2 />} />
            <Route path="/shows/punkflea" element={<PUNK />} />
            <Route path="/shows/cats" element={<CATS />} />
            <Route path="/shows/trapt" element={<TRAPT />} />
            <Route path="/shows/dpbotb" element={<DPBOTB />} />
            <Route path="/shows/botb3" element={<BOTB3 />} />
            <Route path="/shows/udress" element={<UDRESS />} />
            <Route path="/shows/union" element={<UNION />} />
            <Route path="/shows/swim" element={<SWIM />} />
          




            <Route path="/gallery/photos" element={<PhotoGallery />} />
            <Route path="/gallery/videos" element={<VideoGallery />} />
            <Route path="/gallery/photos/:slug" element={<PhotoGalleryDetail />} />
            <Route path="/gallery/videos/:slug" element={<VideoGalleryDetail />} />
            <Route path="/fanclub" element={<FanclubSignupPage />} /> // ✅ NEW
            <Route path="/contact" element={<ContactPage/>} />
            <Route path="/cancel" element={<CancelPage />} />
            <Route path="/music/covers/:coverId" element={<CoverRelease />} />
            <Route path="/checkout/pickup" element={<InPersonCheckout />} />


           


          </Route>
        </Routes>
        <Analytics />
        <SpeedInsights />
      </Router>
    </CartProvider>
  );
}


function MerchItemWrapper() {
  const [cart, setCart] = React.useState([]);
  const [selectedSizes, setSelectedSizes] = React.useState({});
  
  const addToCartGlobal = (product) => {
    const { v4: uuidv4 } = require('uuid');
    const uid = uuidv4();
    setCart((prev) => [...prev, { ...product, uid, quantity: 1 }]);
  };

  return <MerchItem addToCartGlobal={addToCartGlobal} />;
}