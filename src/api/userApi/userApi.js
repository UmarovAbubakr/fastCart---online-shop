import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { axiosRequest, URL } from './../../utils/url';

export const getUser = createAsyncThunk(
    'user/getUser',
    async (userId) => {
        try {
            const token = localStorage.getItem('token');
            const { data } = await axiosRequest(`UserProfile/get-user-profile-by-id?id=${userId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            }
        );
            return data.data;
        } catch (error) {
            throw error;
        }
    }
);

export const updateUserInfo = createAsyncThunk(
    'user/updateUserInfo',
    async (updatedData, { dispatch }) => {
        try {
            const token = localStorage.getItem('token');
            await axios.put(`${URL}/UserProfile/update-user-profile`, updatedData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            dispatch(getUser(updatedData.id));
        } catch (error) {
            throw error;
        }
    }
);
export const getProfileInfo = async (id) => {
    try {
        const { data } = await axiosRequest.get(`/UserProfile/get-user-profile-by-id?id=${id}`);
        return data.data;
    } catch (error) {
        console.error(error);
    }
};


export const editProfile = async (edited) => {
    try {
        await axiosRequest.put(`/UserProfile/update-user-profile`, edited)
    } catch (error) {
        console.error(error);

    }
}