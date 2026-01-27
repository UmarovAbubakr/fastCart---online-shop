import { createAsyncThunk } from "@reduxjs/toolkit";
import { apiInstance } from "../../utils/url";

export const registerUser = createAsyncThunk(
  "auth/registerUser",
  async (user) => {
    try {
      const { data } = await apiInstance.post(`/Account/register`, user);
      return data;
    } catch (error) {
      console.error(error);
    }
  }
);

export const loginUser = createAsyncThunk(
  "auth/loginUser", 
  async (user) => {
    try {
      const { data } = await apiInstance.post(`/Account/login`, user);
      return data;
    } catch (error) {
      console.error(error);
    }
});