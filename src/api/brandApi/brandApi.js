import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { URL } from '../../utils/url';

export const getBrands = createAsyncThunk(
    'todoBrand/getBrands',
    async () => {
        try {
            let { data } = await axios(URL + '/Brand/get-brands')
            console.log(data.data);
            return data.data
        } catch (error) {
            console.error(error);
        }
    }
)

export const deleteBrands = createAsyncThunk(
    'todoBrand/DeleteBrands',
    async (id) => {
        try {
            const { data } = await axios.delete(URL + '/Brand/delete-brand?id=' + id, {
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

export const newBrand = createAsyncThunk(
    'todoBrand/NewBrand',
    async (newBrand,{dispatch}) => {
        try {
            const { data } = await axios.post(URL + '/Brand/add-brand?BrandName=' + newBrand, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(getBrands())   
        } catch (error) {
            console.error(error);
        }
    }
)

export const editBrand = createAsyncThunk(
    'todoBrand/editBrand',
    async (e, { dispatch }) => {
        try {
            const { data } = await axios.put(URL + `/Brand/update-brand?Id=${e.id}&BrandName=${e.name}`, {}, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                }
            })
            dispatch(getBrands())   
        } catch (error) {
            console.error(error);
        }
    }
)