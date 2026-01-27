import { createSlice } from "@reduxjs/toolkit";
import { getUser } from './../../api/userApi/userApi';
import { data } from "react-router-dom";

const initialState = {
  value: 0,
  data: []
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getUser.fulfilled, (state, action) => {
      state.data = action.payload
    })
  },
});

export default userSlice.reducer;