// MerchItem.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';

const merchItems = [
 
  {
    id: "SkullShirt",
    name: "VG Skull Tee",
    price: 2500,
    image: "/SkullShirt.webp",
    description: "Black tee with skull design and VG text.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "OGShirt",
    name: "OG Tee",
    price: 2500,
    image: "/OGShirt.png",
    description: "Cream colored tee containing the original print.",
    sizes: ["S", "M", "L", "XL", "XXL"]
  },
  {
    id: "stickerpack",
    name: "Sticker Pack",
    price: 1000,
    image: "/stickerpack.webp",
    description: "6 machine-cut vinyl stickers containing the Vanylla Godzylla Logo."
  },
  {
    id: "poster",
    name: "Show Poster",
    price: 500,
    image: "/posters.webp",
    description: "A limited edition poster from one of the previous shows."
  },
 
];

export default function MerchItem() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { itemId } = useParams();
  const navigate = useNavigate();
  const product = merchItems.find((item) => item.id === itemId);
  const [selectedSize, setSelectedSize] = useState("");
  const [message, setMessage] = useState("");
  const { addToCart } = useCart();
 

  if (!product) return <div className="text-white p-6">Item not found.</div>;

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      setMessage("Please select a size.");
      return;
    }
    addToCart({
      name: product.name,
      price: product.price,
      image: product.image, // ✅ Add this line
      size: selectedSize // or any other props you track
    });
    setMessage("Added to cart!");
  };

  const recommendations = merchItems.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white pt-48 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img src={product.image} alt={product.name} className="w-full md:w-1/2 rounded-xl border border-purple-700" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-purple-400 mb-2">{product.name}</h1>
            <p className="text-green-400 text-xl font-semibold mb-4">${(product.price / 100).toFixed(2)}</p>
            <p className="text-purple-200 mb-6">{product.description}</p>

            {product.sizes && (
              <select
                value={selectedSize}
                onChange={(e) => setSelectedSize(e.target.value)}
                className="mb-4 w-full p-2 rounded bg-gray-800 border border-purple-600"
              >
                <option value="">Select Size</option>
                {product.sizes.map((size) => (
                  <option key={size} value={size}>{size}</option>
                ))}
              </select>
            )}

            <button
              onClick={handleAddToCart}
              className="bg-purple-600 hover:bg-purple-500 w-full py-3 rounded-full font-bold text-white transition"
            >
              Add to Cart
            </button>

            {message && <p className="mt-3 text-green-400">{message}</p>}
          </div>
        </div>

        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-4 text-purple-300">You might also like</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {recommendations.map((item) => (
             <div
             key={item.id}
             className={`bg-gray-900 p-4 rounded-lg border border-purple-700 shadow cursor-pointer transition ${
               !isMobile ? 'hover:shadow-purple-600' : ''
             }`}
             onClick={() => navigate(`/merch/${item.id}`)}
           >
                <img src={item.image} alt={item.name} className="w-full h-48 object-cover rounded mb-3" />
                <h3 className="text-lg font-bold text-white">{item.name}</h3>
                <p className="text-green-400 text-sm">${(item.price / 100).toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
        
      </div>
      <footer className="bg-black pt-48 pb-2 text-center text-sm text-gray-500">
        <p>© 2025 Vanylla Godzylla. All rights reserved.</p>
        <p>
  Follow us: 
  <a
    href="https://instagram.com/vanylla.godzylla"
    className="text-pink-400 ml-1"
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
    </div>
    
    
  );
}
