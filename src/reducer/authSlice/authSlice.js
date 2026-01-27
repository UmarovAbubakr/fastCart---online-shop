import { createSlice } from "@reduxjs/toolkit";
import { loginUser, registerUser } from "../../api/authApi/authApi";
import { saveToken } from "../../utils/url";

const initialState = {
  value: 0,
  statusRegistration: false,
  statusLogin: false,
  errorMessege: "",
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(registerUser.fulfilled, (state, action) => {
      state.statusRegistration = action.payload?.statusCode === 200;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      if (action.payload?.statusCode === 200) {
        state.statusLogin = true;
        const token = action.payload?.data;
        if (token) {
          saveToken(token);
        }
      } else {
        state.statusLogin = false;
      }
    });
  },
});

export default authSlice.reducer;