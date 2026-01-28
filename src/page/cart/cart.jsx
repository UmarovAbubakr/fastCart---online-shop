import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { deleteFromCart, clearCart, getCart } from "../../api/cart API/cartApi";
import { URL } from "./../../utils/url";
import img from './../../assets/image copy 5.png'
const Cart = () => {
  const { data } = useSelector((store) => store.todoCart);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getCart());
  }, [dispatch]);

  const cartItems = data?.data?.[0]?.productsInCart;

  const subtotal = Array.isArray(cartItems) 
    ? cartItems.reduce((acc, item) => acc + (item.product?.price * item.quantity), 0)
    : 0;

  const uniquePositions = cartItems?.length

  return (
    <div className="max-w-[1170px] mx-auto py-20 px-4">
      <nav className="text-sm text-gray-400 mb-20">
        <Link to="/" className="hover:underline">Home</Link> / <span className="text-black">Cart</span>
      </nav>

      <div className="space-y-10">
        <div className="grid grid-cols-4 font-medium px-10 py-6 shadow-sm rounded">
          <span>Product</span>
          <span>Price</span>
          <span>Quantity</span>
          <span>Subtotal</span>
        </div>

        {Array.isArray(cartItems) && cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div key={item.id} className="grid grid-cols-4 items-center px-10 py-6 shadow-md rounded relative group">
              <div className="flex items-center gap-4">
                <div className="relative">
                  <img 
                    src={`${URL}/images/${item.product?.image}`} 
                    alt={item.product?.productName} 
                    className="w-12 h-12 object-contain" 
                  />
                  <button 
                    onClick={() => dispatch(deleteFromCart(item.product?.id))}
                    className="absolute -top-2 -left-2 bg-[#DB4444] text-white rounded-full w-5 h-5 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    ×
                  </button>
                </div>
                <span className="text-sm">{item.product?.productName}</span>
              </div>
              
              <span>${item.product?.price}</span>

              <div className="border border-gray-300 rounded w-16 px-2 py-1 flex justify-between items-center">
                <span>{String(item.quantity).padStart(2, '0')}</span>
                <div className="flex flex-col text-[10px] cursor-pointer">
                  <button className="hover:text-[#DB4444]">▲</button>
                  <button className="hover:text-[#DB4444]">▼</button>
                </div>
              </div>

              <div className="flex justify-between items-center">
                <span>${item.product?.price * item.quantity}</span>
                <button 
                  onClick={() => dispatch(deleteFromCart(item.product?.id))} 
                  className="text-red-500 hover:scale-110 transition-transform"
                >
                  <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-10  0 border rounded">
            <img style={{width:'180px',margin:'auto',padding:'auto'}} className="py-5" src={img} alt="" />
            <h1 className="text-black text-lg font-bold">And the basket is clean</h1>
            <h1 className="text-gray-700 font-bold">Add products to complete the order</h1>
            <button className="bg-yellow-400 text-black px-5 py-3 rounded-xl font-medium" onClick={()=>{navigate('/products')}}>Products</button>
          </div>
        )}
      </div>

      <div className="flex justify-between mt-6">
        <Link to="/" className="border border-black px-12 py-4 rounded font-medium hover:bg-black hover:text-white transition-colors">
          Return To Shop
        </Link>
        <button onClick={() => dispatch(clearCart())} className="border border-[#DB4444] text-[#DB4444] px-12 py-4 rounded font-medium hover:bg-[#DB4444] hover:text-white">
          Remove all
        </button>
      </div>

      <div className="flex justify-end mt-20">
        <div className="border-2 border-black rounded px-6 py-8 w-full lg:w-[470px]">
          <h3 className="text-xl font-medium mb-6">Cart Total</h3>
          <div className="flex justify-between border-b border-gray-300 pb-4 mb-4 font-medium">
            <span>Total:</span>
            <span>${subtotal}</span>
          </div>
          <button className="w-full bg-[#DB4444] text-white py-4 rounded font-medium hover:bg-[#c03939]">
            Proceed to checkout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Cart;