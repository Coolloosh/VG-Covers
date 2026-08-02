// MerchItem.jsx
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useCart } from './CartContext';
import { getMerchImage, merchItems } from './merchData';

export default function MerchItem() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const { itemId } = useParams();
  const navigate = useNavigate();
  const product = merchItems.find((item) => item.id === itemId);
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState(product?.colors?.[0]?.value || "");
  const [message, setMessage] = useState("");
  const { addToCart } = useCart();
 

  if (!product) return <div className="text-white p-6">Item not found.</div>;

  const handleAddToCart = () => {
    if (product.sizes && !selectedSize) {
      setMessage("Please select a size.");
      return;
    }
    if (product.colors && !selectedColor) {
      setMessage("Please select a color.");
      return;
    }
    addToCart({
      name: product.name,
      price: product.price,
      image: getMerchImage(product, selectedColor),
      size: selectedSize,
      color: selectedColor,
    });
    setMessage("Added to cart!");
  };

  const recommendations = merchItems.filter((item) => item.id !== product.id).slice(0, 3);

  return (
    <div className="min-h-screen bg-black text-white pt-48 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col md:flex-row gap-8 items-start">
          <img src={getMerchImage(product, selectedColor)} alt={product.name} className="w-full md:w-1/2 rounded-xl border border-purple-700" />
          <div className="flex-1">
            <h1 className="text-3xl font-bold text-purple-400 mb-2">{product.name}</h1>
            <p className="text-green-400 text-xl font-semibold mb-4">${(product.price / 100).toFixed(2)}</p>
            <p className="text-purple-200 mb-6">{product.description}</p>

            {product.colors && (
              <div className="mb-4">
                <p className="text-sm font-bold uppercase tracking-wide text-purple-300 mb-2">
                  Color
                </p>
                <div className="grid grid-cols-3 gap-2">
                  {product.colors.map((color) => (
                    <button
                      key={color.value}
                      type="button"
                      onClick={() => setSelectedColor(color.value)}
                      className={`flex items-center justify-center gap-2 rounded-lg border px-3 py-2 font-bold transition ${
                        selectedColor === color.value
                          ? 'border-green-400 text-green-400 bg-green-400/10'
                          : 'border-purple-700 text-purple-200 bg-gray-900 hover:border-purple-400'
                      }`}
                    >
                      <span
                        className="h-4 w-4 rounded-full border border-white/40"
                        style={{ backgroundColor: color.swatch }}
                      />
                      {color.name}
                    </button>
                  ))}
                </div>
              </div>
            )}

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
