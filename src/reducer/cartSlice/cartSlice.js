// В вашем Redux слайсе для корзины
import { createSlice } from '@reduxjs/toolkit';
import { getCart, deleteFromCart, clearCart, AddToCart, increaseCart, reduceCart } from '../../api/cart API/cartApi';

const cartSlice = createSlice({
    name: 'todoCart',
    initialState: {
        data: null,
        loading: false,
        error: null,
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getCart.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getCart.fulfilled, (state, action) => {
                state.loading = false;
                state.data = action.payload;
            })
            .addCase(getCart.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message;
            })
            
            .addCase(deleteFromCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(deleteFromCart.fulfilled, (state, action) => {
                state.loading = false;
            })
            .addCase(deleteFromCart.rejected, (state) => {
                state.loading = false;
            })
            
            .addCase(clearCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(clearCart.fulfilled, (state) => {
                state.loading = false;
                state.data = null;
            })
            .addCase(clearCart.rejected, (state) => {
                state.loading = false;
            })
            
            .addCase(increaseCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(increaseCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(increaseCart.rejected, (state) => {
                state.loading = false;
            })
            
            .addCase(reduceCart.pending, (state) => {
                state.loading = true;
            })
            .addCase(reduceCart.fulfilled, (state) => {
                state.loading = false;
            })
            .addCase(reduceCart.rejected, (state) => {
                state.loading = false;
            });
    },
});

export default cartSlice.reducer;