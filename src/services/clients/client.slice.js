import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  openPopup: false,
  confirmClientCreation: false,
  newClientForm: {
    customerEmail: "",
    customerName: "",
    customerAddress: "",
    customerPhone: "",
    customerTvaNumber: "",
  },
  openUpdatePopup: false,
  updateClientForm: {
    id: "",
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
    toggleSnackbar: (state) => {
      return { ...state, confirmClientCreation: !state.confirmClientCreation };
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
    initData: (state, action) => {
      return { ...state, updateClientForm: { ...action.payload } };
    },
    toggleUpdatePopup: (state) => {
      return { ...state, openUpdatePopup: !state.openUpdatePopup };
    },
    resetUpdateForm: (state) => {
      return { ...state, updateClientForm: { ...initialState.updateClientForm } };
    },
    onChangeClientForm: (state, action) => {
      const { name, value } = action.payload;
      return {
        ...state,
        updateClientForm: {
          ...state.updateClientForm,
          [name]: value,
        },
      };
    },
  },
});

export const {
  resetForm,
  togglePopup,
  updateForm,
  toggleSnackbar,
  initData,
  toggleUpdatePopup,
  resetUpdateForm,
  onChangeClientForm,
} = clientsSlice.actions;
export default clientsSlice.reducer;
