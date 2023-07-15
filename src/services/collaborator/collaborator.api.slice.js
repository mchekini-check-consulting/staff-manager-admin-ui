import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "config/baseQuery";

export const collaboratorApi = createApi({
  reducerPath: "collaboratorApi",
  baseQuery: baseQuery,
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
