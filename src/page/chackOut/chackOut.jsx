import React from 'react';
import jostik from'./../../assets/jostik.svg'
import manitor from'./../../assets/ekran.svg'
const ChackOut = () => {
  return (
    <div className="max-w-[1170px] mx-auto px-4 py-20">
      <nav className="flex mb-16 text-sm">
        <span className="text-gray-400">Account</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-400">My Account</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-400">Product</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-gray-400">View Cart</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-black font-medium">CheckOut</span>
      </nav>

      <h1 className="text-3xl font-medium mb-12 tracking-wider">Billing Details</h1>

      <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
        
        <div className="flex-1 space-y-8">
          {[
            { label: "First Name", required: true },
            { label: "Company Name", required: false },
            { label: "Street Address", required: true },
            { label: "Apartment, floor, etc. (optional)", required: false },
            { label: "Town/City", required: true },
            { label: "Phone Number", required: true },
            { label: "Email Address", required: true },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">
                {field.label}
                {field.required && <span className="text-[#DB4444]"> *</span>}
              </label>
              <input 
                type="text" 
                className="bg-[#F5F5F5] rounded p-3 outline-none focus:ring-1 focus:ring-[#DB4444]"
              />
            </div>
          ))}
          
          <div className="flex items-center gap-3">
            <input type="checkbox" id="save-info" className="w-5 h-5 accent-[#DB4444]" />
            <label htmlFor="save-info" className="text-sm">Save this information for faster check-out next time</label>
          </div>
        </div>

        <div className="w-full lg:w-[420px] pt-4">
          <div className="space-y-8">
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F5F5F5] p-2 rounded flex items-center justify-center">
                    <img src={jostik} alt="Gamepad" className="object-contain" />
                  </div>
                  <span className="text-sm">LCD Monitor</span>
                </div>
                <span className="text-sm font-medium">$650</span>
              </div>
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-[#F5F5F5] p-2 rounded flex items-center justify-center">
                    <img src={manitor} alt="Gamepad" className="object-contain" />
                  </div>
                  <span className="text-sm">H1 Gamepad</span>
                </div>
                <span className="text-sm font-medium">$1100</span>
              </div>
            </div>

            <div className="space-y-4 border-b border-gray-300 pb-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal:</span>
                <span>$1750</span>
              </div>
              <div className="flex justify-between text-sm border-t border-gray-300 pt-4">
                <span>Shipping:</span>
                <span>Free</span>
              </div>
              <div className="flex justify-between font-medium text-base border-t border-gray-300 pt-4">
                <span>Total:</span>
                <span>$1750</span>
              </div>
            </div>

            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-3">
                  <input type="radio" name="payment" id="bank" className="w-5 h-5 accent-black" />
                  <label htmlFor="bank" className="text-sm">Bank</label>
                </div>
                <div className="flex gap-2">
                   <div className="w-8 h-5 bg-gray-200 rounded" />
                   <div className="w-8 h-5 bg-gray-200 rounded" />
                   <div className="w-8 h-5 bg-gray-200 rounded" />
                </div>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="payment" id="cod" className="w-5 h-5 accent-black" defaultChecked />
                <label htmlFor="cod" className="text-sm">Cash on delivery</label>
              </div>
            </div>

            <div className="flex gap-4">
              <input 
                type="text" 
                placeholder="Coupon Code" 
                className="flex-1 border border-black rounded px-4 py-3 outline-none"
              />
              <button className="bg-[#DB4444] text-white px-8 py-3 rounded hover:bg-red-600 transition-colors">
                Apply Coupon
              </button>
            </div>

            <button className="w-full md:w-auto bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-red-600 transition-colors">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChackOut;
