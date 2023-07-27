import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  tokenPersisted: false,
};

const generalSlice = createSlice({
  name: "generalSlice",
  initialState,
  reducers: {
    tokenPersisted: (state, action) => {
      return { ...state, tokenPersisted: action.payload };
    },
  },
});

export const { tokenPersisted } = generalSlice.actions;
export default generalSlice.reducer;
