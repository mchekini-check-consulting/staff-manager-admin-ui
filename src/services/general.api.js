import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "config/baseQuery";

export const generalApi = createApi({
  baseQuery,
  reducerPath: "general",
  endpoints: (builder) => ({
    fetchVersion: builder.query({
      query: () => "/app/details",
    }),
  }),
});

export const { useFetchVersionQuery } = generalApi;
