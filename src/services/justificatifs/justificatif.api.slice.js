import { generalApi } from "../general.api";

export const documentApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    searchDocuments: builder.mutation({
      query: (body) => ({
        url: "justificatif/search",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useSearchDocumentsMutation } = documentApi;
