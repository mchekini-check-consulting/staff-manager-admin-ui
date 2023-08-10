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
  }),
});

export const { useSearchInvoicesMutation } = invoiceApi;
