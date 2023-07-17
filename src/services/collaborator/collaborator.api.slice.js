import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const collaboratorApi = createApi({
  reducerPath: "collaboratorApi",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api/v1" }), // Remplacez l'URL par celle de votre API
  endpoints: (builder) => ({
    getAllCollaborators: builder.query({
      query: () => "collaborator",
    }),
    getCollaborator: builder.query({
      query: (collaboratorId) => `collaborator/${collaboratorId}`,
    }),
    createCollaborator: builder.mutation({
      query: (body) => ({
        url: "collaborator",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllCollaboratorsQuery,
  useGetCollaboratorQuery,
  useCreateCollaboratorMutation,
} = collaboratorApi;
