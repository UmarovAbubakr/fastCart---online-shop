import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosRequest, URL } from '../../utils/url';

export const getSubCategoory = createAsyncThunk(
    'todo/getSubCategoory',
    async () => {
        try {
            let { data } = await axios(URL + '/SubCategory/get-sub-category')
            return data.data
        } catch (error) {
            console.error(error);
        }
    }
)

export const deleteProducts = createAsyncThunk(
    'todo/DeleteProducts',
    async (id) => {
        try {
            await axios.delete(URL + '/Product/delete-product?id=' + id, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            return id
        } catch (error) {
            console.error(error);
        }
    }
)

export const addImg = createAsyncThunk(
    'todo/addImg',
    async (formData, { dispatch }) => {
        try {
            await axios.post(URL + '/Product/add-image-to-product', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            });
            dispatch(getProducts());
        } catch (error) {
            console.error(error);
        }
    }
);

export const postProduct = createAsyncThunk(
    "todo/postProduct",
    async (formData, { dispatch }) => {
        try {
            const { data } = await axiosRequest.post("Product/add-product", formData);
            dispatch(getProducts());
            return data;
        } catch (error) {
            console.error(error);
        }
    },
);