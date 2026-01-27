import React, { useState, useEffect } from 'react';
import { Heart, Truck, RefreshCw, Minus, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { URL } from '../../utils/url';

const Info = () => {
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState('M');
  const [selectedColor, setSelectedColor] = useState('blue');

  useEffect(() => {
    const savedProduct = localStorage.getItem('selectedProduct');
    if (savedProduct) {
      setProduct(JSON.parse(savedProduct));
    }
  }, []);

  const handleBuyNow = () => {
    const selectedProduct = {
      name: product.name,
      price: product.price,
      quantity: quantity,
      total: product.price * quantity
    };

    localStorage.setItem('checkoutItem', JSON.stringify(selectedProduct));

    navigate('/checkOut');
  };



  if (!product) return <div className="text-center py-20">Loading...</div>;

  return (
    <div className="max-w-7xl mx-auto px-4 py-10 font-sans">
      <nav className="text-sm text-gray-500 mb-10">
        Account / Product / <span className="text-black font-semibold">{product.productName}</span>
      </nav>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-2 flex flex-row lg:flex-col gap-4 order-2 lg:order-1">
          <div className="bg-[#F5F5F5] rounded flex items-center justify-center p-4 h-32 w-full cursor-pointer">
            <img src={`${URL}/images/${product.image}`} alt="thumb" className="max-h-full object-contain" />
          </div>
        </div>

        <div className="lg:col-span-5 bg-[#F5F5F5] rounded flex items-center justify-center p-8 order-1 lg:order-2 h-[600px]">
          <img src={`${URL}/images/${product.image}`} alt={product.name} className="max-h-full object-contain" />
        </div>

        <div className="lg:col-span-5 order-3 lg:pl-4">
          <h1 className="text-2xl font-semibold mb-3">{product.productName}</h1>

          <div className="flex items-center gap-3 mb-4">
            <div className="flex text-yellow-400">
              {[...Array(5)].map((_, i) => (
                <span key={i}>{i < (product.rating || 5) ? '★' : '☆'}</span>
              ))}
            </div>
            <span className="text-gray-400 text-sm">({product.reviews || 0} Reviews)</span>
            <span className="text-gray-300">|</span>
            <span className="text-[#00FF66] text-sm">In Stock</span>
          </div>

          <div className="text-2xl mb-6">${product.price}</div>
          <p className="text-sm mb-6 pb-6 border-b border-gray-300">{product.categoryName}</p>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-xl mr-2">Colours:</span>
            <button onClick={() => setSelectedColor('blue')} className={`w-5 h-5 rounded-full border-2 ${selectedColor === 'blue' ? 'border-black' : 'border-transparent'} bg-[#A0BCE0]`} />
            <button onClick={() => setSelectedColor('red')} className={`w-5 h-5 rounded-full border-2 ${selectedColor === 'red' ? 'border-black' : 'border-transparent'} bg-[#E07575]`} />
          </div>

          <div className="flex items-center gap-4 mb-8">
            <span className="text-xl mr-2">Size:</span>
            {['XS', 'S', 'M', 'L', 'XL'].map((size) => (
              <button key={size} onClick={() => setSelectedSize(size)} className={`w-10 h-10 border rounded flex items-center justify-center text-sm font-medium ${selectedSize === size ? 'bg-[#DB4444] text-white' : ''}`}>
                {size}
              </button>
            ))}
          </div>

          <div className="flex gap-4 mb-10">
            <div className="flex border rounded">
              <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 border-r"><Minus size={20} /></button>
              <div className="px-8 flex items-center font-bold text-xl">{quantity}</div>
              <button onClick={() => setQuantity(quantity + 1)} className="px-3 bg-[#DB4444] text-white"><Plus size={20} /></button>
            </div>

            <button onClick={handleBuyNow} className="flex-grow bg-[#DB4444] text-white font-medium rounded py-2">
              Buy Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Info;