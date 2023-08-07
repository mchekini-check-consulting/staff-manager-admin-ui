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
  }),
});

export const {
  useCreateSocietyMutation,
} = societyApi;
