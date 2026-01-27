import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../../api/productApi/productApi';
import { getBrands } from './../../api/brandApi/brandApi';
import { URL } from '../../utils/url';
import { getCategory } from '../../api/categoryApi/categoryApi';

const Products = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.todo);
  const { data: brands } = useSelector((state) => state.todoBrand);
  const { data: category } = useSelector((state) => state.todoCategory);

  const [params, setParams] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 999999 });

  useEffect(() => {
    dispatch(getBrands());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getCategory());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getProducts(params));
    console.log(params);
  }, [dispatch, params]);

  const productsArray = data?.products || (Array.isArray(data) ? data : []);

  const filteredProducts = productsArray.filter(product => {
    const matchesBrand = selectedBrand ? product.brandId === selectedBrand : true;
    const matchesPrice = product.price >= priceRange.min && product.price <= priceRange.max;
    return matchesBrand && matchesPrice;
  });

  return (
    <div className="max-w-[1170px] mx-auto py-10 px-4 flex gap-8">
      <aside className="w-[250px] shrink-0 flex flex-col gap-8">


        <div>
          <h3 className="text-xl font-medium mb-4 pb-2 border-b">Category</h3>
          <div className="space-y-2">
            <label className="flex items-center gap-3 cursor-pointer group">
              <input
                type="radio"
                name="category"
                defaultChecked
                onChange={() => setParams({ ...params, CategoryId: "" })}
                className="w-4 h-4 accent-[#ce2727]"
              />
              <span className="text-gray-600 group-hover:text-black">All</span>
            </label>

            {category?.map((cat) => (
              <label key={cat.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="category"
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
                defaultChecked
                onChange={() => setParams({ ...params, BrandId: "" })}
                className="w-4 h-4 accent-[#ce2727]"
              />
              <span className="text-gray-600 group-hover:text-black">All</span>
            </label>
            {brands?.map((brand) => (
              <label key={brand.id} className="flex items-center gap-3 cursor-pointer group">
                <input
                  type="radio"
                  name="brand"
                  value={selectedBrand}
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
          <div className="flex gap-2 items-center mb-4">
            <input type="number" placeholder="Min" className="w-full border rounded p-2 text-sm outline-none" onChange={(e) => setPriceRange({ ...priceRange, min: +e.target.value })} />
            <span>-</span>
            <input type="number" placeholder="Max" className="w-full border rounded p-2 text-sm outline-none" onChange={(e) => setPriceRange({ ...priceRange, max: +e.target.value })} />
          </div>
        </div>
      </aside>

      <main className="flex-1">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div key={product.id} className="group relative border rounded-md p-4 hover:shadow-lg transition-shadow">
              <div className="bg-[#F5F5F5] rounded h-[250px] flex items-center justify-center relative overflow-hidden">
                <img src={`${URL}/images/${product.image}`} alt="" className="object-contain h-[80%] group-hover:scale-110 transition-transform" />
                {product.discount > 0 && <span className="absolute top-3 left-3 bg-[#DB4444] text-white text-xs px-3 py-1 rounded">-{product.discount}%</span>}
                <button className="cursor-pointer absolute bottom-0 w-full bg-black text-white py-2 translate-y-full group-hover:translate-y-0 transition-transform">Add To Cart</button>
              </div>
              <div className="mt-4">
                <h4 className="font-medium truncate">{product.productName}</h4>
                <div className="flex gap-3 mt-2">
                  <span className="text-[#DB4444] font-medium">${product.price}</span>
                  {product.oldPrice && <span className="text-gray-400 line-through">${product.oldPrice}</span>}
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Products;