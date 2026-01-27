import React, { useEffect, useState } from 'react';
import { Trash2, ShoppingCart } from 'lucide-react';
import { URL } from './../../utils/url';
import { Link } from 'react-router-dom';

const WhishList = () => {
  const [items, setItems] = useState([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('wishlist')) || [];
    setItems(data);
  }, []);

  const removeFromWishlist = (id) => {
    const updated = items.filter(item => item.id !== id);
    setItems(updated);
    localStorage.setItem('wishlist', JSON.stringify(updated));
    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  return (
    <div className="max-w-[1170px] mx-auto py-10 px-4">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-xl">Wishlist ({items.length})</h2>
        <button className="border border-black px-10 py-3 rounded hover:bg-black hover:text-white transition">
          Move All To Bag
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {items.map((product) => (
          <div key={product.id} className="group relative">
            <div className="bg-[#f5f5f5] rounded p-4 relative h-[250px] flex items-center justify-center">
              <img 
                src={`${URL}/images/${product.image}`} 
                alt={product.productName} 
                className="max-h-full object-contain"
              />
              
              <button 
                onClick={() => removeFromWishlist(product.id)}
                className="absolute top-3 right-3 bg-white p-2 rounded-full hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={18} />
              </button>

              <button className="absolute bottom-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <ShoppingCart size={18} /> Add To Cart
              </button>
            </div>
            
            <div className="mt-4">
              <h3 className="font-medium">{product.productName}</h3>
              <p className="text-[#DB4444]">${product.price}</p>
            </div>
          </div>
        ))}
      </div>
      
      {items.length === 0 && (
        <div className="text-center py-20">
          <p className="text-gray-500 mb-5">Your wishlist is empty</p>
          <Link to="/" className="bg-[#DB4444] text-white px-10 py-3 rounded">Go Shopping</Link>
        </div>
      )}
    </div>
  );
};

export default WhishList;