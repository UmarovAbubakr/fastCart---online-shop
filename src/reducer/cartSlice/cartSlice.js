import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/authApi/authApi";
import { saveToken } from "../../utils/url";
import { getCart } from "../../api/cart API/cartApi";

const initialState = {
  data: [],
  todoCart:[]
};

export const CartSlice = createSlice({
  name: "todoCart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCart.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
});

export const { } = CartSlice.actions;

export default CartSlice.reducer;
 