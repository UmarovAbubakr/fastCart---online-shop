import React from 'react'
import icon from '../../assets/icon.svg';
import img1 from '../../assets/facebook.svg';
import img2 from '../../assets/insatgram.svg';
import img3 from '../../assets/linkedin.svg';
import img4 from '../../assets/twiter.svg';
const Footer = () => {
    return (
        <div>
            <footer className='bg-black text-white py-10 px-6'>
                <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8">
                    <div className='flex flex-col gap-3'>
                        <h3 className='text-2xl font-bold'>Exclusive</h3>
                        <p>Subscribe</p>
                        <p className='text-sm text-gray-400'>Get 10% off your first order</p>
                        <div className='border border-white rounded p-2 flex justify-between'>
                            <input className='bg-transparent outline-none w-full text-sm' placeholder='Enter email' type="text" />
                            <img src={icon} alt="send icon" className="w-5" />
                        </div>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h3 className='text-xl font-bold'>Support</h3>
                        <p className='text-sm'>111 Bijoy sarani, Dhaka, Bangladesh</p>
                        <p className='text-sm'>exclusive@gmail.com</p>
                        <p className='text-sm'>+88015-88888-9999</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h3 className='text-xl font-bold'>Account</h3>
                        <p className='text-sm cursor-pointer'>My Account</p>
                        <p className='text-sm cursor-pointer'>Cart</p>
                        <p className='text-sm cursor-pointer'>Wishlist</p>
                        <p className='text-sm cursor-pointer'>Shop</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h3 className='text-xl font-bold'>Quick Links</h3>
                        <p className='text-sm cursor-pointer'>Privacy Policy</p>
                        <p className='text-sm cursor-pointer'>Terms Of Use</p>
                        <p className='text-sm cursor-pointer'>FAQ</p>
                        <p className='text-sm cursor-pointer'>Contact</p>
                    </div>

                    <div className='flex flex-col gap-3'>
                        <h3 className='text-xl font-bold'>Follow Us</h3>
                        <div className='flex items-center gap-4'>
                            <img src={img1} className="w-6 cursor-pointer" alt="fb" />
                            <img src={img2} className="w-6 cursor-pointer" alt="ig" />
                            <img src={img3} className="w-6 cursor-pointer" alt="in" />
                            <img src={img4} className="w-6 cursor-pointer" alt="tw" />
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

export default Footer
