import React, { useState, useEffect, use } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import './../../App.css'
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

import musicBox from './../../assets/calonka.svg';
import ps5 from './../../assets/ps5.svg';
import women from './../../assets/women.svg';
import kalonka from './../../assets/kalonka.svg';
import duhi from './../../assets/duhi.svg';
import appleLogo from './../../assets/apple.svg';
import iphone from './../../assets/iphone.svg';
import samsung from './image.svg';
import samsungImg from './../../assets/image.png';
import onePlus from './../../assets/image copy.png';
import onePlusLogo from './../../assets/onePlus.svg';
import xiaomi from './../../assets/image copy 2.png';
import xiaomiLogo from './../../assets/xiaomi.svg';
import jostik from './../../assets/jostik.svg';
import jostikS from './../../assets/jostikS.svg';
import klaviatura from './../../assets/klaviatura.svg';
import ekran from './../../assets/ekran.svg';
import stul from './../../assets/stul.svg';
import kurtka from './../../assets/kurtka.svg';
import korm from './../../assets/korm.svg';
import krem from './../../assets/krem.svg';
import photoAparat from './../../assets/photoAparat.svg';
import noute from './../../assets/noute.svg';
import car from './../../assets/car.svg';
import krasofki from './../../assets/krasofki.svg';
import { getProducts } from '../../api/productApi/productApi';
import { URL } from '../../utils/url';
import { getCategory } from '../../api/categoryApi/categoryApi';
import { AddToCart } from '../../api/cart API/cartApi';
import { Eye, Heart } from 'lucide-react';


const Home = () => {
  const dispatch = useDispatch();
  const [wishlist, setWishlist] = useState(() => {
    const saved = localStorage.getItem('wishlist');
    return saved ? JSON.parse(saved) : [];
  });
  const { data = {} } = useSelector((store) => store.todo);
  const { data: category } = useSelector((state) => state.todoCategory);

  const handleViewProduct = (product) => {
    localStorage.setItem('selectedProduct', JSON.stringify(product));
  };

  const [timeLeft, setTimeLeft] = useState({
    days: 3,
    hours: 23,
    minutes: 19,
    seconds: 56,
  });

  const toggleWishlist = (product) => {
    const savedWishlist = JSON.parse(localStorage.getItem('wishlist')) || [];
    const isExist = savedWishlist.find(item => item.id === product.id);

    let updatedWishlist;
    if (isExist) {
      updatedWishlist = savedWishlist.filter(item => item.id !== product.id);
    } else {
      updatedWishlist = [...savedWishlist, product];
    }

    setWishlist(updatedWishlist);

    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));

    window.dispatchEvent(new Event('wishlistUpdated'));
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const handleOk = () => {
    setIsModalOpen(false);
  };

  const handleCancel = () => {
    setIsModalOpen(false);
  };


  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { days, hours, minutes, seconds } = prev;
        if (seconds > 0) {
          seconds--;
        } else {
          seconds = 59;
          if (minutes > 0) {
            minutes--;
          } else {
            minutes = 59;
            if (hours > 0) {
              hours--;
            } else {
              hours = 23;
              if (days > 0) days--;
            }
          }
        }
        return { days, hours, minutes, seconds };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (num) => String(num).padStart(2, '0');



  const exploreProducts = [
    { id: 101, name: "Breed Dry Dog Food", image: korm, currentPrice: 100, rating: 3, reviews: 35 },
    { id: 102, name: "CANON EOS DSLR Camera", image: photoAparat, currentPrice: 360, rating: 4, reviews: 95 },
    { id: 103, name: "ASUS FHD Gaming Laptop", image: noute, currentPrice: 700, rating: 5, reviews: 325 },
    { id: 104, name: "Curology Product Set", image: krem, currentPrice: 500, rating: 4, reviews: 145 },
    { id: 105, name: "Kids Electric Car", image: car, currentPrice: 960, rating: 5, reviews: 65, isNew: true },
    { id: 106, name: "Jr. Zoom Soccer Cleats", image: krasofki, currentPrice: 1160, rating: 5, reviews: 35 },
    { id: 107, name: "GP11 Shooter USB Gamepad", image: jostikS, currentPrice: 660, rating: 4, reviews: 55, isNew: true },
    { id: 108, name: "Quilted Satin Jacket", image: kurtka, currentPrice: 660, rating: 4, reviews: 55 },
  ];

  const slides = [
    { id: 's1', name1: "Up to 10%", name2: 'off Voucher', logo: appleLogo, name: "iPhone 14 Series", img: iphone },
    { id: 's2', name1: "Samsung Galaxy", name2: 'S25 Ultra', logo: samsung, name: "Samsung Galaxy S25 Ultra", img: samsungImg },
    { id: 's3', name1: "Up to 10%", name2: 'off Voucher', logo: onePlusLogo, name: "OnePlus Ace 3 Pro", img: onePlus },
    { id: 's4', name1: "Xiaomi 17", name2: ' Pro Max', logo: xiaomiLogo, name: "Xiaomi 17 Pro Max", img: xiaomi },
  ];

  const categories = [
    { id: 1, name: "Phones", icon: "M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" },
    { id: 2, name: "Computers", icon: "M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" },
    { id: 3, name: "SmartWatch", icon: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" },
    { id: 4, name: "Camera", icon: "M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" },
    { id: 5, name: "HeadPhones", icon: "M12 1v2m0 18v2M5 12H3m18 0h-2M7 7L5.5 5.5m13 13L17 17m0-10L18.5 5.5M5.5 18.5L7 17" },
    { id: 6, name: "Gaming", icon: "M15 10H9m6 4H9m10-4a5 5 0 01-10 0V9a5 5 0 0110 0v1z" },
  ];

  useEffect(() => {
    dispatch(getProducts());
    dispatch(getCategory())
    console.log(dispatch(getCategory()));
  }, [dispatch]);

  return (
    <div className="w-full bg-white pt-10 px-4 lg:px-10">
      <div className="max-w-[1170px] mx-auto">
        <Swiper
          style={{ borderRadius: '5px' }}
          spaceBetween={0}
          autoplay={{ delay: 4000 }}
          pagination={{ clickable: true }}
          modules={[Autoplay, Pagination]}
          className="mySwiper w-full bg-black text-white min-h-[400px] md:h-[444px]"
        >
          {slides.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="flex flex-col md:flex-row items-center justify-between h-full px-8 md:px-16 py-10">
                <div className="flex flex-col gap-4 w-full md:w-1/2">
                  <div className="flex items-center gap-4">
                    <img src={slide.logo} alt="" className="w-8 h-8 object-contain" />
                    <p>{slide.name}</p>
                  </div>
                  <h1 className="text-3xl md:text-5xl font-semibold leading-tight">{slide.name1} <br /> {slide.name2}</h1>
                  <Link to="/shop" className="flex items-center gap-2 border-b border-white w-fit pb-1 group">
                    <span>Shop Now</span>
                    <svg className="w-5 h-5 group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" /></svg>
                  </Link>
                </div>
                <img src={slide.img} alt="" className="h-[250px] md:h-[350px] object-contain" />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <section className="max-w-[1170px] mx-auto py-16 border-b">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-[#DB4444] rounded" />
          <span className="text-[#DB4444] font-semibold">Today's</span>
        </div>
        <div className="flex flex-wrap items-end gap-12 mb-10">
          <h2 className="text-3xl font-semibold">Flash Sales</h2>
          <div className="flex gap-4 font-bold">
            {['Days', 'Hours', 'Minutes', 'Seconds'].map((label, i) => (
              <div key={label} className="flex flex-col items-center">
                <span className="text-[10px]">{label}</span>
                <span className="text-2xl">{formatTime(Object.values(timeLeft)[i])}</span>
              </div>
            ))}
          </div>
        </div>
        <Swiper slidesPerView={1} spaceBetween={30} breakpoints={{ 640: { slidesPerView: 2 }, 1024: { slidesPerView: 4 } }} className="mb-10">
          {data?.products?.map((p) => {
            const isProductInWishlist = wishlist.some(item => item.id === p.id);
            return (
              <SwiperSlide key={p.id}>
                <div className="group">
                  <div className="relative bg-[#F5F5F5] h-[250px] flex items-center justify-center rounded overflow-hidden">
                    {p.hasDiscount && (
                      <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-2 py-1 rounded">
                        -{Math.round(100 - (p.discountPrice / p.price) * 100)}%
                      </span>
                    )}

                    <div className="absolute top-3 right-3 flex flex-col gap-2">
                      <Link>
                        <button
                          onClick={() => toggleWishlist(p)}
                          className="bg-white p-1.5 rounded-full hover:bg-[#DB4444] hover:text-white transition-colors"
                        >
                          <Heart
                            size={20}
                            fill={isProductInWishlist ? "#DB4444" : "none"}
                            stroke={isProductInWishlist ? "#DB4444" : "currentColor"}
                          />
                        </button>
                      </Link>
                      <Link to={`/info`} onClick={() => handleViewProduct(p)}>
                        <button className="bg-white p-1.5 rounded-full hover:bg-[#DB4444] hover:text-white transition-colors">
                          <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </button>
                      </Link>
                    </div>

                    <img
                      src={`${URL}/images/${p.image}`}
                      alt={p.productName}
                      className="max-h-[180px] object-contain group-hover:scale-105 transition-transform"
                    />

                    <button style={{cursor:'pointer'}} onClick={() => { dispatch(AddToCart(p.id)) }} className="absolute bottom-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition-all">
                      Add To Cart
                    </button>
                  </div>

                  <div className="mt-4">
                    <h3 className="font-semibold text-black">{p.productName}</h3>
                    <div className="flex gap-3 font-medium">
                      {p.hasDiscount ? (
                        <>
                          <span className="text-[#DB4444]">${p.discountPrice}</span>
                          <span className="text-gray-400 line-through">${p.price}</span>
                        </>
                      ) : (
                        <span className="text-[#DB4444]">${p.price}</span>
                      )}
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            )
          })}
        </Swiper>
        <Link to='/products'>
          <div className="flex justify-center mt-14"><button className="bg-[#DB4444] text-white px-12 py-4 rounded">View All Products</button></div>
        </Link>
      </section>

      <section className="max-w-[1170px] mx-auto py-16 border-b">
        <div className="flex items-center gap-4 mb-10">
          <div className="w-5 h-10 bg-[#DB4444] rounded" />
          <span className="text-[#DB4444] font-semibold">Categories</span>
        </div>
        <h2 className="text-3xl font-semibold mb-10">Browse By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-6 gap-8">
          {category?.map((cat) => (
            <div
              key={cat.id}
              className="border flex flex-col items-center justify-center h-[145px] rounded hover:bg-[#DB4444] hover:text-white transition-colors cursor-pointer group"
            >
              <img src={URL + `/images/${cat.categoryImage}`} alt="" />
              <span className="text-sm font-medium">{cat.categoryName}</span>
            </div>
          ))}
        </div>
      </section>

      <section className="max-w-[1170px] mx-auto py-16 bg-black flex flex-col md:flex-row items-center justify-between rounded px-10 my-16">
        <div className="text-white space-y-6">
          <p className="text-[#00FF66] font-semibold">Categories</p>
          <h2 className="text-4xl md:text-5xl font-semibold">Enhance Your <br /> Music Experience</h2>
          <div className="flex gap-4">
            {['23', '05', '59', '35'].map((v, i) => (
              <div key={i} className="w-16 h-16 rounded-full bg-white text-black flex flex-col items-center justify-center">
                <span className="font-bold">{v}</span>
                <span className="text-[10px]">{['Hours', 'Days', 'Minutes', 'Seconds'][i]}</span>
              </div>
            ))}
          </div>
          <button className="bg-[#00FF66] text-white px-12 py-4 rounded">Buy Now!</button>
        </div>
        <img src={musicBox} className="w-full max-w-[500px] object-contain mt-10 md:mt-0" />
      </section>

      <section className="max-w-[1170px] mx-auto py-16 border-b">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-[#DB4444] rounded" />
          <span className="text-[#DB4444] font-semibold">Our Products</span>
        </div>
        <h2 className="text-3xl font-semibold mb-10">Explore Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {data?.products?.map((p) => {
            const isProductInWishlist = wishlist.some(item => item.id === p.id);
            return (
              <div key={p.id} className="group cursor-pointer">
                <div className="relative bg-[#F5F5F5] h-[250px] flex items-center justify-center rounded overflow-hidden">
                  {p.hasDiscount && (
                    <span className="absolute top-3 left-3 bg-[#00FF66] text-white text-xs px-3 py-1 rounded">
                      NEW
                    </span>
                  )}
                  <div className="absolute top-3 right-3 flex flex-col gap-2">
                    <button
                      onClick={() => toggleWishlist(p)}
                      className="bg-white p-1.5 rounded-full hover:bg-[#DB4444] hover:text-white transition-colors"
                    >
                      <Heart size={20} fill={isProductInWishlist ? "red" : "none"} />
                    </button>
                    <Link to={`/product/${p.id}`} onClick={() => handleViewProduct(p)}>
                      <button className="bg-white p-1.5 rounded-full hover:bg-[#DB4444] hover:text-white transition-colors">
                        <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      </button>
                    </Link>
                  </div>
                  <img
                    src={`${URL}/images/${p.image}`}
                    alt={p.productName}
                    className="max-h-[180px] object-contain group-hover:scale-105 transition-transform"
                  />
                  <button style={{cursor:'pointer'}} className="absolute bottom-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition-all">
                    Add To Cart
                  </button>
                </div>
                <div className="mt-4 space-y-2">
                  <h3 className="font-semibold">{p.productName}</h3>
                  <div className="flex gap-2 items-center">
                    <span className="text-[#DB4444] font-medium">
                      ${p.hasDiscount ? p.discountPrice : p.price}
                    </span>
                    <div className="flex text-[#FFAD33]">
                      {[...Array(5)].map((_, i) => (
                        <svg
                          key={i}
                          width="16"
                          height="16"
                          fill={i < 5 ? "currentColor" : "none"}
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                        </svg>
                      ))}
                    </div>
                    <span className="text-xs text-gray-400">({p.quantity})</span>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <Link to='/products'>
          <div className="flex justify-center mt-14"><button className="bg-[#DB4444] text-white px-12 py-4 rounded">View All Products</button></div>
        </Link>
      </section>

      <section className="max-w-[1170px] mx-auto py-16">
        <div className="flex items-center gap-4 mb-6">
          <div className="w-5 h-10 bg-[#DB4444] rounded" />
          <span className="text-[#DB4444] font-semibold">Featured</span>
        </div>
        <h2 className="text-3xl font-semibold mb-10">New Arrival</h2>

        <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-8 h-auto md:h-[600px]">

          <div className="md:col-span-2 md:row-span-2 bg-black rounded relative overflow-hidden group flex items-end p-8">
            <img
              src={ps5}
              alt="PS5"
              className="absolute inset-0 w-full h-full object-contain p-4 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="relative z-10 text-white space-y-3">
              <h3 className="text-2xl font-semibold">PlayStation 5</h3>
              <p className="text-sm text-gray-300 max-w-[240px]">
                Black and White version of the PS5 coming out on sale.
              </p>
              <button className="border-b border-gray-400 hover:border-white pb-1 font-medium transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          <div className="md:col-span-2 bg-[#0D0D0D] rounded relative overflow-hidden group flex items-end p-6">
            <img
              src={women}
              alt="Women"
              className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
            <div className="relative z-10 text-white space-y-2">
              <h3 className="text-xl font-semibold">Women's Collections</h3>
              <p className="text-xs text-gray-300 max-w-[200px]">
                Featured woman collections that give you another vibe.
              </p>
              <button className="border-b border-gray-400 hover:border-white pb-1 text-sm transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          <div className="bg-[#0D0D0D] rounded relative overflow-hidden group flex items-end p-6">
            <img
              src={kalonka}
              alt="Speakers"
              className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="relative z-10 text-white space-y-2">
              <h3 className="text-lg font-semibold">Speakers</h3>
              <p className="text-xs text-gray-300">Amazon wireless speakers</p>
              <button className="border-b border-gray-400 hover:border-white pb-1 text-xs transition-colors">
                Shop Now
              </button>
            </div>
          </div>

          <div className="bg-[#0D0D0D] rounded relative overflow-hidden group flex items-end p-6">
            <img
              src={duhi}
              alt="Perfume"
              className="absolute inset-0 w-full h-full object-contain p-6 transition-transform duration-500 group-hover:scale-105"
            />
            <div className="relative z-10 text-white space-y-2">
              <h3 className="text-lg font-semibold">Perfume</h3>
              <p className="text-xs text-gray-300">GUCCI INTENSE OUD EDP</p>
              <button className="border-b border-gray-400 hover:border-white pb-1 text-xs transition-colors">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="max-w-[1170px] mx-auto py-20 flex flex-wrap justify-center gap-20">
        {[
          { title: "FREE AND FAST DELIVERY", desc: "Free delivery for all orders over $140", icon: "M20 12h-3l-2 7-4-15-2 8H4" },
          { title: "24/7 CUSTOMER SERVICE", desc: "Friendly 24/7 customer support", icon: "M12 1v2m0 18v2M5 12H3m18 0h-2M7 7L5.5 5.5m13 13L17 17" },
          { title: "MONEY BACK GUARANTEE", desc: "We return money within 30 days", icon: "M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" }
        ].map((service, idx) => (
          <div key={idx} className="flex flex-col items-center text-center gap-4">
            <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center">
              <div className="w-14 h-14 bg-black rounded-full flex items-center justify-center text-white">
                <svg width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d={service.icon} /></svg>
              </div>
            </div>
            <div>
              <h4 className="font-bold text-lg">{service.title}</h4>
              <p className="text-sm">{service.desc}</p>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Home;