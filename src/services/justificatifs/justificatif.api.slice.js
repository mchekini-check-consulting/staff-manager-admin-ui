import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "config/baseQuery";

export const documentApi = createApi({
  reducerPath: "collaboratorApi",
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    searchDocuments: builder.mutation({
      query: (body) => ({
        url: "documents/search",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSearchDocumentsMutation } = documentApi;
