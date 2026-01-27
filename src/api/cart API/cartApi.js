import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosRequest, URL } from './../../utils/url';

export const getCart = createAsyncThunk(
    'todoCart/getCart',
    async () => {
        try {
            let { data } = await axiosRequest.get('/Cart/get-products-from-cart')
            console.log(data);
            return data
        } catch (error) {
            console.error(error);
        }
    }
)


export const deleteFromCart = createAsyncThunk(
    'todoCart/deleteFromCart',
    async (id, { dispatch }) => {
        try {
            await axiosRequest.delete(`${URL}/Cart/delete-product-from-cart?id=${id}`)
            dispatch(getCart())
        } catch (error) {
            console.error(error);
        }
    }
)

export const clearCart = createAsyncThunk(
    'todoCart/clearCart',
    async (_, { dispatch }) => {
        try {
            await axiosRequest.delete('/Cart/clear-cart')
            dispatch(getCart())
        } catch (error) {
            console.error(error);
        }
    }
)

export const AddToCart = createAsyncThunk(
    'todoCart/clearCart',
    async (id, { dispatch }) => {
        try {
            await axiosRequest.post('/Cart/add-product-to-cart?id='+id)
            dispatch(getCart())
        } catch (error) {
            console.error(error);
        }
    }
)