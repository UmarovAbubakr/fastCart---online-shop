import React from 'react';

const Contact = () => {
  return (
    <div className="max-w-[1170px] mx-auto px-4 py-20">
      <nav className="flex mb-10 text-sm">
        <span className="text-gray-400">Home</span>
        <span className="mx-2 text-gray-400">/</span>
        <span className="text-black font-medium">Contact</span>
      </nav>

      <div className="flex flex-col lg:flex-row gap-8">
        <div className="w-full lg:w-[340px] shadow-[0px_1px_13px_rgba(0,0,0,0.05)] rounded p-8 flex flex-col gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#DB4444] rounded-full flex items-center justify-center text-white">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Call To Us</h3>
            </div>
            <p className="text-sm">We are available 24/7, 7 days a week.</p>
            <p className="text-sm">Phone: +8801611112222</p>
          </div>

          <div className="border-t border-gray-300 w-full" />

          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 bg-[#DB4444] rounded-full flex items-center justify-center text-white">
                <svg width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="font-semibold text-lg">Write To Us</h3>
            </div>
            <p className="text-sm">Fill out our form and we will contact you within 24 hours.</p>
            <p className="text-sm">Emails: customer@exclusive.com</p>
            <p className="text-sm">Emails: support@exclusive.com</p>
          </div>
        </div>

        <div className="flex-1 shadow-[0px_1px_13px_rgba(0,0,0,0.05)] rounded p-8">
          <form className="flex flex-col h-full justify-between gap-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <input 
                type="text" 
                placeholder="Name" 
                className="bg-[#F5F5F5] px-4 py-3 rounded outline-none focus:ring-1 focus:ring-[#DB4444]"
                required 
              />
              <input 
                type="email" 
                placeholder="Email" 
                className="bg-[#F5F5F5] px-4 py-3 rounded outline-none focus:ring-1 focus:ring-[#DB4444]"
                required 
              />
              <input 
                type="tel" 
                placeholder="Phone" 
                className="bg-[#F5F5F5] px-4 py-3 rounded outline-none focus:ring-1 focus:ring-[#DB4444]"
                required 
              />
            </div>
            
            <textarea 
              placeholder="Your Massage" 
              className="bg-[#F5F5F5] px-4 py-3 rounded outline-none focus:ring-1 focus:ring-[#DB4444] min-h-[200px] resize-none"
              required
            ></textarea>

            <div className="flex justify-end">
              <button 
                type="submit" 
                className="bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-red-600 transition-colors"
              >
                Send Massage
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;