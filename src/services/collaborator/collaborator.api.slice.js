import { generalApi } from "services/general.api";

export const collaboratorApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    createCollaborator: builder.mutation({
      query: (body) => ({
        url: "collaborator",
        method: "POST",
        body,
      }),
    }),
  }),
});

export const { useCreateCollaboratorMutation } = collaboratorApi;
