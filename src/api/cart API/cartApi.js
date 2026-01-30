import { createAsyncThunk } from '@reduxjs/toolkit';
import { axiosRequest } from './../../utils/url';

export const getCart = createAsyncThunk(
    'todoCart/getCart',
    async () => {
        try {
            const { data } = await axiosRequest.get('/Cart/get-products-from-cart')
            return data
        } catch (error) {
            console.error("Error getting cart:", error);
            throw error;
        }
    }
)

export const deleteFromCart = createAsyncThunk(
    'todoCart/deleteFromCart',
    async (id,{dispatch}) => {
        try {
            await axiosRequest.delete(`/Cart/delete-product-from-cart?id=${id}`)
            return id;
            dispatch(getCart())
        } catch (error) {
            console.error("Error deleting from cart:", error);
            throw error;
        }
    }
)

export const clearCart = createAsyncThunk(
    'todoCart/clearCart',
    async (_,{dispatch}) => {
        try {
            await axiosRequest.delete('/Cart/clear-cart')
            return true;
            dispatch(getCart())
        } catch (error) {
            console.error("Error clearing cart:", error);
            throw error;
        }
    }
)

export const AddToCart = createAsyncThunk(
    'todoCart/AddToCart',
    async (id,{dispatch}) => {
        try {
            await axiosRequest.post(`/Cart/add-product-to-cart?id=${id}`)
            return id;
            dispatch(getCart())
        } catch (error) {
            console.error("Error adding to cart:", error);
            throw error;
        }
    }
)

export const increaseCart = createAsyncThunk(
    'todoCart/increaseCart',
    async (id,{dispatch}) => {
        try {
            await axiosRequest.put(`/Cart/increase-product-in-cart?id=${id}`)
            return id;
            dispatch(getCart())
        } catch (error) {
            console.error("Error increasing quantity:", error);
            throw error;
        }
    }
)

export const reduceCart = createAsyncThunk(
    'todoCart/reduceCart',
    async (id,{dispatch}) => {
        try {
            await axiosRequest.put(`/Cart/reduce-product-in-cart?id=${id}`)
            return id;
            dispatch(getCart())
        } catch (error) {
            console.error("Error reducing quantity:", error);
            throw error;
        }
    }
)