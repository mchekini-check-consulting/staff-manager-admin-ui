import { configureStore } from "@reduxjs/toolkit";
import { generalApi } from "services/general.api";
import clientsReducer from "services/clients/client.slice";
import { clientsApi } from "services/clients/client.api.slice";
import { collaboratorApi } from "../services/collaborator/collaborator.api.slice";
import generalSlice from "services/general.slice";

export const store = configureStore({
  reducer: {
    clients: clientsReducer,
    generalSlice: generalSlice,
    [generalApi.reducerPath]: generalApi.reducer,
    [clientsApi.reducerPath]: clientsApi.reducer,
    [collaboratorApi.reducerPath]: collaboratorApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(generalApi.middleware)
      .concat(clientsApi.middleware)
      .concat(collaboratorApi.middleware),
});
