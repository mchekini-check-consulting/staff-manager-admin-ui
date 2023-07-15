import { configureStore } from "@reduxjs/toolkit";
import { generalApi } from "services/general.api";
import clientsReducer from "services/clients/client.slice";
import { clientsApi } from "services/clients/client.api.slice";

export const store = configureStore({
  reducer: {
    [generalApi.reducerPath]: generalApi.reducer,
    clients: clientsReducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(generalApi.middleware).concat(clientsApi.middleware),
});
