import { generalApi } from "../general.api";

export const invoiceApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    searchInvoices: builder.mutation({
      query: (body) => ({
        url: "invoice/search",
        method: "POST",
        body,
      }),
    }),
    getInvoiceDoc: builder.query({
      query: (docName) => ({
        url: `invoice/${docName}`,
        responseType: "arraybuffer",
        responseHandler: async (res) => {
          const blob = await res.blob();
          return window.URL.createObjectURL(blob);
        },
      }),
    }),
  }),
});

export const { useSearchInvoicesMutation, useLazyGetInvoiceDocQuery } = invoiceApi;
