import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./../reducer/authSlice/authSlice";
import productReducer from "../reducer/productSlice/productSlice";
import categoryReducer from "../reducer/categorySlice/categorySlice";
import BrandReducer from "../reducer/brandSlice/brandSlice";
import colorReducer from "../reducer/colorSlice/colorSlice";
import CartReducer from "../reducer/cartSlice/cartSlice";
import userReducer from "../reducer/userSlice/userSlice";

export const store = configureStore({
  reducer: {
    auth: authSlice,
    todo: productReducer,
    todoCategory: categoryReducer,
    todoBrand: BrandReducer,
    todoColor: colorReducer,
    todoCart: CartReducer,
    user: userReducer,
  },
});