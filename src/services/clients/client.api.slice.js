import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "config/baseQuery";

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: baseQuery,
  tagTypes: ["Clients"],
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => "customer",
      providesTags: ["Clients"],
    }),
    getClient: builder.query({
      query: (clientId) => `customer/${clientId}`,
    }),
    createClient: builder.mutation({
      query: (body) => ({
        url: "customer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Clients"],
    }),
    updateClient: builder.mutation({
      query: ({ clientId, ...client }) => ({
        url: `customer/${clientId}`,
        method: "PUT",
        body: client,
      }),
      invalidatesTags: ["Clients"],
    }),
    deleteClient: builder.mutation({
      query: (clientId) => ({
        url: `customer/${clientId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Clients"],
    }),
  }),
});

export const {
  useGetAllClientsQuery,
  useGetClientQuery,
  useCreateClientMutation,
  useUpdateClientMutation,
  useDeleteClientMutation,
} = clientsApi;
