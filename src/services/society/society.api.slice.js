import { generalApi } from "services/general.api";

export const societyApi = generalApi.injectEndpoints({
  tagTypes: ["Society"],
  endpoints: (builder) => ({
    createSociety: builder.mutation({
      query: (body) => ({
        url: "society",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Society"],
    }),
    getSociety: builder.query({
      query: () => ({
        url: "society",
      }),
      providesTags: ["Society"],
    }),
  }),
});

export const { useCreateSocietyMutation, useGetSocietyQuery } = societyApi;
