import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openPopup: false,
  newClientForm: {
    customerEmail: "",
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerTvaNumber: "",
  },
};

const clientsSlice = createSlice({
  name: "clients",
  initialState,
  reducers: {
    togglePopup: (state) => {
      return { ...state, openPopup: !state.openPopup };
    },
    resetForm: (state) => {
      return { ...state, newClientForm: { ...initialState.newClientForm } };
    },
    updateForm: (state, action) => {
      const { name, value } = action.payload;

      return {
        ...state,
        newClientForm: {
          ...state.newClientForm,
          [name]: value,
        },
      };
    },
  },
});

export const { resetForm, togglePopup, updateForm } = clientsSlice.actions;
export default clientsSlice.reducer;
