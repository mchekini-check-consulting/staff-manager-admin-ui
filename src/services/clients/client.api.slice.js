import { createApi } from "@reduxjs/toolkit/dist/query";
import { baseQuery } from "config/baseQuery";

export const clientsApi = createApi({
  reducerPath: "clientsApi",
  baseQuery: baseQuery,
  tagTypes: ["Clients"],
  endpoints: (builder) => ({
    getAllClients: builder.query({
      query: () => "client",
      providesTags: ["Clients"],
    }),
    getClient: builder.query({
      query: (clientId) => `client/${clientId}`,
    }),
    createClient: builder.mutation({
      query: (body) => ({
        url: "client",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Clients"],
    }),
    updateClient: builder.mutation({
      query: ({ clientId, ...client }) => ({
        url: `client/${clientId}`,
        method: "PUT",
        body: client,
      }),
      invalidatesTags: ["Clients"],
    }),
    deleteClient: builder.mutation({
      query: (clientId) => ({
        url: `client/${clientId}`,
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
