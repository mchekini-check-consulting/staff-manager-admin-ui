import { generalApi } from "../general.api";

export const activitySlice = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    getActivities: builder.query({
      query: () => ({
        url: "/activity",
      }),
    }),
  }),
});

export const { useGetActivitiesQuery } = activitySlice;
