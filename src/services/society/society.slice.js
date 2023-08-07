import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openPopup: false,
  confirmSocietyCreation: false,
  newSocietyForm: {
    name: "",
    siret: "",
    vat: "",
    contact: "",
    email: "",
    address: "",
    capital: 0,
  },
};

const societySlice = createSlice({
  name: "society",
  initialState,
  reducers: {
    togglePopup: (state) => {
      return { ...state, openPopup: !state.openPopup };
    },
    toggleSnackbar: (state) => {
      return { ...state, confirmSocietyCreation: !state.confirmSocietyCreation };
    },
    resetForm: (state) => {
      return { ...state, newSocietyForm: { ...initialState.newSocietyForm } };
    },
    updateForm: (state, action) => {
      const { name, value } = action.payload;
      return {
        ...state,
        newSocietyForm: {
          ...state.newSocietyForm,
          [name]: value,
        },
      };
    },
  },
});

export const { resetForm, togglePopup, updateForm, toggleSnackbar } = societySlice.actions;
export default societySlice.reducer;
