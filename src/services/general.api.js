import { createApi } from "@reduxjs/toolkit/query/react";
import { transformedBaseQuery } from "config/baseQuery";

export const generalApi = createApi({
  //refetchOnFocus: true,
  baseQuery: transformedBaseQuery(),
  reducerPath: "general",
  keepUnusedDataFor: 0,
  refetchOnMountOrArgChange: true,
  endpoints: (builder) => ({
    fetchVersion: builder.query({
      query: () => "/app/details",
    }),
  }),
});

export const { useFetchVersionQuery } = generalApi;
