import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "config/baseQuery";

export const generalApi = createApi({
  //refetchOnFocus: true,
  baseQuery,
  reducerPath: "general",
  keepUnusedDataFor: 0,
  endpoints: (builder) => ({
    fetchVersion: builder.query({
      query: () => "/app/details",
    }),
  }),
});

export const { useFetchVersionQuery } = generalApi;
