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
    getDocCollab: builder.query({
      query: (docName) => ({
        url: `justificatif/${docName}`,
        responseType: "arraybuffer",
        responseHandler: async (res) => {
          const blob = await res.blob();
          return window.URL.createObjectURL(blob);
        },
      }),
    }),
  }),
});

export const { useSearchDocumentsMutation, useLazyGetDocCollabQuery } = documentApi;
