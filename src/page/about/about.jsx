import React from 'react';
import img from './../../assets/img.svg'
import user1 from './../../assets/user1.svg'
import user2 from './../../assets/user2.svg'
import user3 from './../../assets/user3.svg'
import user4 from './../../assets/image copy 3.png'
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
const About = () => {
  const teamMembers = [
    {
      name: "Tom Cruise",
      role: "Founder & Chairman",
      image:user1 ,
    },
    {
      name: "Emma Watson",
      role: "Managing Director",
      image:user2 ,
    },
    {
      name: "Will Smith",
      role: "Product Designer",
      image: user3,
    },
    {
      name: "John Doe",
      role: "Product Meneger",
      image: user4,
    },
  ];
  const stats = [
    { id: 1, value: "10.5k", label: "Sellers active our site", icon: "M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z", isActive: false },
    { id: 2, value: "33k", label: "Monthly Product Sale", icon: "M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z", isActive: true },
    { id: 3, value: "45.5k", label: "Customer active in our site", icon: "M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z", isActive: false },
    { id: 4, value: "25k", label: "Anual gross sale in our site", icon: "M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12z", isActive: false },
  ];

  return (
    <div className="w-full bg-white">
      <div className="max-w-[1170px] mx-auto px-4 py-10 lg:py-20">
        <nav className="flex mb-10 lg:mb-20 text-sm">
          <span className="text-gray-400">Home</span>
          <span className="mx-2 text-gray-400">/</span>
          <span className="text-black font-medium">About</span>
        </nav>

        <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-20 mb-20 lg:mb-32">
          <div className="w-full lg:w-1/2 space-y-6 lg:space-y-10">
            <h1 className="text-4xl lg:text-5xl font-semibold tracking-wider">Our Story</h1>
            <div className="space-y-6 text-base leading-relaxed">
              <p>
                Launched in 2015, Exclusive is South Asia's premier online shopping 
                marketplace with an active presence in Bangladesh. Supported 
                by wide range of tailored marketing, data and service solutions, 
                Exclusive has 10,500 sellers and 300 brands and serves 3 
                millions customers across the region.
              </p>
              <p>
                Exclusive has more than 1 Million products to offer, growing at a 
                very fast. Exclusive offers a diverse assortment in categories 
                ranging from consumer.
              </p>
            </div>
          </div>
          <div className="w-full lg:w-1/2">
            <img 
              src={img}
              alt="Our Story" 
              className="w-full h-[300px] lg:h-[300px] object-cover rounded shadow-sm"
            />
          </div>
        </section>

        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 lg:mb-10">
          {stats.map((stat) => (
            <div 
              key={stat.id}
              className={`border rounded flex flex-col items-center justify-center p-8 transition-all group cursor-pointer 
                ${stat.isActive ? 'bg-[#DB4444] border-[#DB4444] text-white shadow-lg' : 'hover:bg-[#DB4444] hover:border-[#DB4444] hover:text-white'}`}
            >
              <div className={`w-20 h-20 rounded-full flex items-center justify-center mb-6 transition-all
                ${stat.isActive ? 'bg-white/30' : 'bg-gray-300 group-hover:bg-white/30'}`}
              >
                <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all
                  ${stat.isActive ? 'bg-white text-black' : 'bg-black text-white group-hover:bg-white group-hover:text-black'}`}
                >
                  <svg width="30" height="30" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path d={stat.icon} />
                  </svg>
                </div>
              </div>
              <h3 className="text-3xl font-bold mb-2">{stat.value}</h3>
              <p className="text-sm text-center">{stat.label}</p>
            </div>
          ))}
        </section>
      </div>


    <section className="max-w-[1170px] mx-auto pt-4">
      <Swiper
        modules={[Autoplay, Pagination]}
        spaceBetween={30}
        slidesPerView={3}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          bulletActiveClass: 'bg-[#DB4444] opacity-100',
        }}
        breakpoints={{
          15: { slidesPerView: 1  },
          1024: { slidesPerView: 3 },
        }}
        className="pb-20 team-swiper"
      >
        {teamMembers.map((member, index) => (
          <SwiperSlide key={index}>
            <div className="flex flex-col">
              <div className="bg-[#F5F5F5] rounded flex items-end justify-center h-[430px] overflow-hidden">
                <img 
                  src={member.image} 
                  alt={member.name} 
                  className="max-h-full object-contain"
                />
              </div>
              
              <div className="mt-8 space-y-2">
                <h3 className="text-3xl font-medium tracking-wider">{member.name}</h3>
                <p className="text-base">{member.role}</p>
                
                <div className="flex gap-4 pt-2">
                  <a href="#" className="hover:text-[#DB4444] transition-colors">
                    <i className="fab fa-twitter text-xl"></i>
                  </a>
                  <a href="#" className="hover:text-[#DB4444] transition-colors">
                    <i className="fab fa-instagram text-xl"></i>
                  </a>
                  <a href="#" className="hover:text-[#DB4444] transition-colors">
                    <i className="fab fa-linkedin-in text-xl"></i>
                  </a>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      <style jsx global>{`
        .team-swiper .swiper-pagination-bullet {
          width: 12px;
          height: 12px;
          background: #808080;
          opacity: 0.5;
        }
        .team-swiper .swiper-pagination-bullet-active {
          background: #DB4444 !important;
          border: 2px solid #808080;
          opacity: 1 !important;
        }
      `}</style>
    </section>
    </div>
  );
};

export default About;