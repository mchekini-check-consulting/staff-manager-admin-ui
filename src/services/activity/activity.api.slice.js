import { generalApi } from "services/general.api";

export const activitySlice = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => "activity",
    }),
    validateCra: builder.mutation({
      query: (id) => ({
        url: `/activity/validate-cra/${id}`,
        method: "POST",
      }),
    }),
  }),
});

export const { useGetActivitiesQuery, useValidateCraMutation } = activitySlice;
