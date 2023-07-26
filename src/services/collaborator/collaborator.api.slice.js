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
  }),
});

export const {
  useGetAllCollaboratorsQuery,
  useGetCollaboratorQuery,
  useCreateCollaboratorMutation,
} = collaboratorApi;
