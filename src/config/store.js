import { configureStore } from "@reduxjs/toolkit";
import { generalApi } from "services/general.api";
import clientsReducer from "services/clients/client.slice";

export const store = configureStore({
  reducer: {
    [generalApi.reducerPath]: generalApi.reducer,
    clients: clientsReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(generalApi.middleware),
});
