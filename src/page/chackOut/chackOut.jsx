import React, { useState, useEffect } from 'react';

const ChackOut = () => {
  const [orderItem, setOrderItem] = useState(null);
  const [formData, setFormData] = useState({
    firstName: '', companyName: '', streetAddress: '', apartment: '', city: '', phone: '', email: ''
  });
  const [saveInfo, setSaveInfo] = useState(false);

  useEffect(() => {
    const savedData = localStorage.getItem('billingDetails');
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setSaveInfo(true);
    }

    const item = localStorage.getItem('checkoutItem');
    if (item) {
      setOrderItem(JSON.parse(item));
    }
  }, []);

  const handleChange = (e, fieldKey) => {
    setFormData({ ...formData, [fieldKey]: e.target.value });
  };

  const handlePlaceOrder = () => {
    if (saveInfo) {
      localStorage.setItem('billingDetails', JSON.stringify(formData));
    } else {
      localStorage.removeItem('billingDetails');
    }
    alert("Order Placed!");
  };

  if (!orderItem) return <div className="text-center py-20">No product found</div>;

  return (
    <div className="max-w-[1170px] mx-auto px-4 py-20">
      <nav className="flex mb-16 text-sm text-gray-400">
        Account / My Account / Product / View Cart / <span className="text-black ml-1">CheckOut</span>
      </nav>

      <h1 className="text-3xl font-medium mb-12 tracking-wider">Billing Details</h1>

      <div className="flex flex-col lg:flex-row gap-20 lg:gap-32">
        <div className="flex-1 space-y-8">
          {[
            { label: "First Name", key: "firstName", required: true },
            { label: "Company Name", key: "companyName", required: false },
            { label: "Street Address", key: "streetAddress", required: true },
            { label: "Apartment, floor, etc. (optional)", key: "apartment", required: false },
            { label: "Town/City", key: "city", required: true },
            { label: "Phone Number", key: "phone", required: true },
            { label: "Email Address", key: "email", required: true },
          ].map((field, idx) => (
            <div key={idx} className="flex flex-col gap-2">
              <label className="text-gray-400 text-sm">
                {field.label} {field.required && <span className="text-[#DB4444]">*</span>}
              </label>
              <input 
                type="text" 
                value={formData[field.key]}
                onChange={(e) => handleChange(e, field.key)}
                className="bg-[#F5F5F5] rounded p-3 outline-none focus:ring-1 focus:ring-[#DB4444]"
              />
            </div>
          ))}
          
          <div className="flex items-center gap-3">
            <input 
              type="checkbox" id="save-info" className="w-5 h-5 accent-[#DB4444]" 
              checked={saveInfo} onChange={() => setSaveInfo(!saveInfo)}
            />
            <label htmlFor="save-info" className="text-sm">Save this information</label>
          </div>
        </div>

        <div className="w-full lg:w-[420px] pt-4">
          <div className="space-y-8">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-[#F5F5F5] p-2 rounded flex items-center justify-center">
                  <img src={`${URL}/images/${orderItem.image}`} alt="item" className="object-contain" />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-medium">{orderItem.name}</span>
                  <span className="text-xs text-gray-400">Size: {orderItem.selectedSize} | Qty: {orderItem.quantity}</span>
                </div>
              </div>
              <span className="text-sm font-medium">${orderItem.price}</span>
            </div>

            <div className="space-y-4 border-b border-gray-300 pb-4">
              <div className="flex justify-between text-sm"><span>Subtotal:</span><span>${orderItem.price}</span></div>
              <div className="flex justify-between text-sm border-t border-gray-300 pt-4"><span>Shipping:</span><span>Free</span></div>
              <div className="flex justify-between font-medium text-base border-t border-gray-300 pt-4"><span>Total:</span><span>${orderItem.price*orderItem.quantity}</span></div>
            </div>

            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <input type="radio" name="payment" id="bank" className="w-5 h-5 accent-black" />
                <label htmlFor="bank" className="text-sm">Bank</label>
              </div>
              <div className="flex items-center gap-3">
                <input type="radio" name="payment" id="cod" className="w-5 h-5 accent-black" defaultChecked />
                <label htmlFor="cod" className="text-sm">Cash on delivery</label>
              </div>
            </div>

            <button onClick={handlePlaceOrder} className="w-full bg-[#DB4444] text-white px-12 py-4 rounded">
              Place Order
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChackOut;