import React, { useState } from 'react';
import { Heart, Truck, RefreshCw, Minus, Plus } from 'lucide-react';
import img1 from './../../assets/img1.svg'
import img2 from './../../assets/img2.svg'
import img3 from './../../assets/img3.svg'
import img4 from './../../assets/img4.svg'
import img5 from './../../assets/img5.svg'
import { Link } from 'react-router-dom';
const Info = () => {
  const [quantity, setQuantity] = useState(2);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('blue');

  const product = {
    name: "Havic HV G-92 Gamepad",
    price: 192.00,
    rating: 4,
    reviews: 150,
    description: "PlayStation 5 Controller Skin High quality vinyl with air channel adhesive for easy bubble free install & mess free removal Pressure sensitive.",
    images: [
      img1,
      img2,
      img3,
      img4,
    ]
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
      <nav className="text-sm text-gray-500 mb-10">
        Account  /  Gaming  /  <span className="text-black font-semibold">{product.name}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">

        <div className="lg:col-span-2 flex flex-row lg:flex-col gap-4 order-2 lg:order-1">
          {product.images.map((img, idx) => (
            <div key={idx} className="bg-[#F5F5F5] rounded flex items-center justify-center p-4 h-32 w-full cursor-pointer">
              <img src={img} alt="thumbnail" className="max-h-full object-contain" />
            </div>
          ))}
        </div>

        <div className="lg:col-span-5 bg-[#F5F5F5] rounded flex items-center justify-center p-8 order-1 lg:order-2 h-[600px]">
          <img src={product.images[0]} alt="Main product" className="max-h-full object-contain" />
        </div>

        <div className="lg:col-span-5 order-3 lg:pl-4">
          <h1 className="text-2xl font-semibold tracking-wide mb-3">{product.name}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < product.rating ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="text-gray-400 text-sm">({product.reviews} Reviews)</span>
            <span className="text-gray-300">|</span>
            <span className="text-[#00FF66] text-sm">In Stock</span>
          </div>

          <div className="text-2xl mb-6">${product.price.toFixed(2)}</div>

          <p className="text-sm leading-relaxed mb-6 pb-6 border-b border-gray-300">
            {product.description}
          </p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-xl mr-2">Colours:</span>
            <button
              onClick={() => setSelectedColor('blue')}
              className={`w-5 h-5 rounded-full border-2 ${selectedColor === 'blue' ? 'border-black' : 'border-transparent'} bg-[#A0BCE0]`}
            />
            <button
              onClick={() => setSelectedColor('red')}
              className={`w-5 h-5 rounded-full border-2 ${selectedColor === 'red' ? 'border-black' : 'border-transparent'} bg-[#E07575]`}
            />
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-xl mr-2">Size:</span>
            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
              <button
                key={size}
                onClick={() => setSelectedSize(size)}
                className={`w-10 h-10 border rounded flex items-center justify-center text-sm font-medium transition-colors
                  ${selectedSize === size ? 'bg-[#DB4444] text-white border-[#DB4444]' : 'hover:border-black'}`}
              >
                {size}
              </button>
            ))}
          </div>

          <div className="flex gap-4 mb-10">
            <div className="flex border rounded overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-3 border-r hover:bg-gray-100 transition-colors"
              >
                <Minus size={20} />
              </button>
              <div className="px-8 flex items-center font-bold text-xl">{quantity}</div>
              <button
                onClick={() => setQuantity(quantity + 1)}
                className="px-3 bg-[#DB4444] text-white hover:bg-[#c13a3a] transition-colors"
              >
                <Plus size={20} />
              </button>
            </div>
              <button className="flex-grow bg-[#DB4444] text-white font-medium rounded hover:bg-[#c13a3a] transition-colors">
            <Link to='/checkOut'>
                Buy Now
            </Link>
              </button>

            <button className="p-2 border rounded hover:bg-gray-50 transition-colors">
              <Heart size={24} />
            </button>
          </div>

          <div className="border rounded">
            <div className="flex items-center gap-4 p-4 border-b">
              <Truck size={32} />
              <div>
                <div className="font-medium">Free Delivery</div>
                <button className="text-xs underline">Enter your postal code for Delivery Availability</button>
              </div>
            </div>
            <div className="flex items-center gap-4 p-4">
              <RefreshCw size={32} />
              <div>
                <div className="font-medium">Return Delivery</div>
                <div className="text-xs">Free 30 Days Delivery Returns. <button className="underline">Details</button></div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Info;