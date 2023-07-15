import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "config/baseQuery";

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: baseQuery,
  tagTypes: ["Clients"],
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => "v1/customer",
      providesTags: ["Clients"],
    }),
    getClient: builder.query({
      query: (clientId) => `v1/customer/${clientId}`,
    }),
    createClient: builder.mutation({
      query: (body) => ({
        url: "v1/customer",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Clients"],
    }),
    updateClient: builder.mutation({
      query: ({ clientId, ...client }) => ({
        url: `v1/customer/${clientId}`,
        method: "PUT",
        body: client,
      }),
      invalidatesTags: ["Clients"],
    }),
    deleteClient: builder.mutation({
      query: (clientId) => ({
        url: `v1/customer/${clientId}`,
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
