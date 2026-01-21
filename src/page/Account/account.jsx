import React from 'react';

const MyAccount = () => {
  return (
    <div className="max-w-[1170px] mx-auto px-4 py-20">
      <div className="flex justify-between items-center mb-16">
        <nav className="text-sm">
          <span className="text-gray-400">Home</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-black font-medium">My Account</span>
        </nav>
        <p className="text-sm">
          Welcome! <span className="text-[#DB4444]">Md Rimel</span>
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-10 lg:gap-20">
        <aside className="w-full md:w-[280px] space-y-6">
          <div>
            <h3 className="font-medium text-base mb-4">Manage My Account</h3>
            <ul className="ml-8 space-y-2 text-sm text-gray-500">
              <li className="text-[#DB4444] cursor-pointer">My Profile</li>
              <li className="hover:text-[#DB4444] cursor-pointer">Address Book</li>
              <li className="hover:text-[#DB4444] cursor-pointer">My Payment Options</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4">My Orders</h3>
            <ul className="ml-8 space-y-2 text-sm text-gray-500">
              <li className="hover:text-[#DB4444] cursor-pointer">My Returns</li>
              <li className="hover:text-[#DB4444] cursor-pointer">My Cancellations</li>
            </ul>
          </div>

          <div>
            <h3 className="font-medium text-base mb-4 cursor-pointer">My WishList</h3>
          </div>
        </aside>

        <main className="flex-1 shadow-[0px_1px_13px_rgba(0,0,0,0.05)] rounded p-8 lg:p-12">
          <h2 className="text-[#DB4444] text-xl font-medium mb-8">Edit Your Profile</h2>
          
          <form className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm">First Name</label>
                <input 
                  type="text" 
                  placeholder="Md" 
                  className="bg-[#F5F5F5] px-4 py-3 rounded outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Last Name</label>
                <input 
                  type="text" 
                  placeholder="Rimel" 
                  className="bg-[#F5F5F5] px-4 py-3 rounded outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label className="text-sm">Email</label>
                <input 
                  type="email" 
                  placeholder="rimel1111@gmail.com" 
                  className="bg-[#F5F5F5] px-4 py-3 rounded outline-none"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm">Address</label>
                <input 
                  type="text" 
                  placeholder="Kingston, 5236, United State" 
                  className="bg-[#F5F5F5] px-4 py-3 rounded outline-none"
                />
              </div>
            </div>

            <div className="space-y-4 pt-4">
              <h3 className="text-sm font-medium">Password Changes</h3>
              <div className="flex flex-col gap-4">
                <input 
                  type="password" 
                  placeholder="Current Password" 
                  className="bg-[#F5F5F5] px-4 py-3 rounded outline-none w-full"
                />
                <input 
                  type="password" 
                  placeholder="New Password" 
                  className="bg-[#F5F5F5] px-4 py-3 rounded outline-none w-full"
                />
                <input 
                  type="password" 
                  placeholder="Confirm New Password" 
                  className="bg-[#F5F5F5] px-4 py-3 rounded outline-none w-full"
                />
              </div>
            </div>

            <div className="flex justify-end items-center gap-8 pt-4">
              <button type="button" className="text-sm hover:underline">
                Cancel
              </button>
              <button 
                type="submit" 
                className="bg-[#DB4444] text-white px-12 py-4 rounded hover:bg-red-600 transition-colors shadow-sm"
              >
                Save Changes
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
};

export default MyAccount;