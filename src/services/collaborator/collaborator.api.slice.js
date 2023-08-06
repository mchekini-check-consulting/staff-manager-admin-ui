import { generalApi } from "services/general.api";

export const collaboratorApi = generalApi.injectEndpoints({
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
    updateCollaborator: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `collaborator/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const {
  useGetAllCollaboratorsQuery,
  useGetCollaboratorQuery,
  useCreateCollaboratorMutation,
  useUpdateCollaboratorMutation,
} = collaboratorApi;
