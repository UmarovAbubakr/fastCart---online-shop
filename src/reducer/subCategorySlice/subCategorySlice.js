import { createSlice } from "@reduxjs/toolkit";
import { getSubCategoory } from "../../api/subCategoryApi/subCategoryApi";

const initialState = {
    subCategory: []
};

export const productSlice = createSlice({
    name: "subCategory",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSubCategoory.fulfilled, (state, action) => {
            state.subCategory = action.payload;
        })
    },
});

export default productSlice.reducer;