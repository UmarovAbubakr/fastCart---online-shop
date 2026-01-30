import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../api/productApi/productApi';
import { getBrands } from './../../api/brandApi/brandApi';
import { URL } from '../../utils/url';
import { getCategory } from '../../api/categoryApi/categoryApi';
import { Search, PackageSearch } from 'lucide-react';
import img from './../../assets/image copy 6.png'
import { AddToCart } from '../../api/cart API/cartApi';
import { notification } from 'antd';
import { useNavigate } from 'react-router-dom';
const token = localStorage.getItem('token');

const Products = () => {
  const [api, contextHolder] = notification.useNotification();
  const dispatch = useDispatch();
  const [search, setSearch] = useState('');
  const { data } = useSelector((state) => state.todo);
  const cartItems = useSelector((state) => state.cart?.data || []);
  const { data: brands } = useSelector((state) => state.todoBrand);
  const { data: category } = useSelector((state) => state.todoCategory);
  const navigate = useNavigate()
  const [params, setParams] = useState({});
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategory());
    if(!token) {
      navigate('/LogIn')
    }
  }, [dispatch]);

  useEffect(() => {
    const timer = setTimeout(() => {
      dispatch(getProducts({ ...params, ProductName: search }));
    }, 400);
    return () => clearTimeout(timer);
  }, [dispatch, params, search]);

  const productsArray = data?.products || (Array.isArray(data) ? data : []);

  const filteredProducts = productsArray.filter(product => {
    return product.price >= priceRange.min && product.price <= priceRange.max;
  });

  const clearFilters = () => {
    setSearch('');
    setParams({});
    setPriceRange({ min: 0, max: 999999 });
  };

  const handleAddToCart = (product) => {
    const token = localStorage.getItem('token');
    if (!token) {
      api.error({
        message: 'Please Login First',
        description: 'You need to be logged in to add items to cart',
        placement: 'bottomRight',
      });
      return;
    }

    const isExist = cartItems.some(item => item.id === product.id);
    if (isExist) {
      api.warning({
        message: 'Product already in cart',
        description: `${product.productName} is already there.`,
        placement: 'bottomRight',
      });
    } else {
      dispatch(AddToCart(product.id));
      api.success({
        message: 'Added to cart',
        description: `${product.productName} added successfully.`,
        placement: 'bottomRight',
      });
    }
  };

  return (
    <div className="max-w-[1170px] mx-auto py-10 px-4 flex flex-col md:flex-row gap-8">
      {contextHolder}
      <aside className="w-full md:w-[250px] shrink-0 flex flex-col gap-8">
        <div className="relative flex items-center">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            placeholder="Search products..."
            className="bg-[#f5f5f5] text-sm py-2 px-4 rounded w-full focus:outline-none border focus:border-gray-300"
          />
          <Search size={18} className="absolute right-3 text-gray-400" />
        </div>

        <div>
          <h3 className="text-xl font-medium mb-4 pb-2 border-b">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                checked={!params.CategoryId}
                onChange={() => setParams({ ...params, CategoryId: "" })}
                className="w-4 h-4 accent-[#ce2727]"
              />
              <span className="text-gray-600 group-hover:text-black">All Categories</span>
            </label>
            {category?.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
                  checked={params.CategoryId === cat.id}
                  onChange={() => setParams({ ...params, CategoryId: cat.id })}
                  className="w-4 h-4 accent-[#ce2727]"
                />
                <span className="text-gray-600 group-hover:text-black">{cat.categoryName}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-4 pb-2 border-b">Brands</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="brand"
                checked={!params.BrandId}
                onChange={() => setParams({ ...params, BrandId: "" })}
                className="w-4 h-4 accent-[#ce2727]"
              />
              <span className="text-gray-600 group-hover:text-black">All Brands</span>
            </label>
            {brands?.map((brand) => (
              <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="brand"
                  checked={params.BrandId === brand.id}
                  onChange={() => setParams({ ...params, BrandId: brand.id })}
                  className="w-4 h-4 accent-[#ce2727]"
                />
                <span className="text-gray-600 group-hover:text-black">{brand.brandName}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl font-medium mb-4 pb-2 border-b">Price range</h3>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              value={priceRange.min || ''}
              placeholder="Min"
              className="w-full border rounded p-2 text-sm outline-none focus:border-[#ce2727]"
              onChange={(e) => setPriceRange({ ...priceRange, min: +e.target.value })}
            />
            <span>-</span>
            <input
              type="number"
              value={priceRange.max === 999999 ? '' : priceRange.max}
              placeholder="Max"
              className="w-full border rounded p-2 text-sm outline-none focus:border-[#ce2727]"
              onChange={(e) => setPriceRange({ ...priceRange, max: +e.target.value })}
            />
          </div>
        </div>
      </aside>

      <main className="flex-1">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <div key={product.id} className="group relative border rounded-md p-4 hover:shadow-lg transition-all duration-300">
                <div className="bg-[#F5F5F5] rounded h-[250px] flex items-center justify-center relative overflow-hidden">
                  <img
                    src={`${URL}/images/${product.image}`}
                    alt={product.productName}
                    className="object-contain h-[80%] group-hover:scale-110 transition-transform duration-500"
                  />
                  {product.discount > 0 && (
                    <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-3 py-1 rounded">
                      -{product.discount}%
                    </span>
                  )}
                  <button onClick={() => handleAddToCart(product)} className="absolute bottom-0 w-full bg-black text-white py-2 opacity-0 group-hover:opacity-100 transition-all cursor-pointer">
                    Add To Cart
                  </button>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium truncate text-gray-800">{product.productName}</h4>
                  <div className="flex gap-3 mt-2 items-center">
                    <span className="text-[#DB4444] font-bold">${product.price}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 bg-[#f9f9f9] rounded-xl border-2 border-dashed border-gray-200">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4">
              <img className='w-[150px]' src={img} alt="" />
            </div>
            <h3 className="text-2xl font-semibold text-gray-700">No results found</h3>
            <p className="text-gray-500 mt-2 text-center max-w-[300px]">
              Try adjusting your filters or search terms to find what you're looking for.
            </p>
            <button
              onClick={clearFilters}
              className="mt-6 px-8 py-2 bg-[#FFC845] text-white rounded shadow-md hover:bg-[#ffd677] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}
      </main>
    </div>
  );
};

export default Products;