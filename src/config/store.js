import { configureStore } from "@reduxjs/toolkit";
import { generalApi } from "services/general.api";

export const store = configureStore({
  reducer: {
    [generalApi.reducerPath]: generalApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(generalApi.middleware),
});
