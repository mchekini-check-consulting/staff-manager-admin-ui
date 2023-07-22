import { generalApi } from "../general.api";

export const missionSlice = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    createMission: builder.mutation({
      query: (body) => ({
        url: "/mission",
        method: "POST",
        body,
      }),
    }),
    getMissions: builder.query({
      query: () => ({
        url: "/mission",
      }),
    }),
  }),
});

export const { useCreateMissionMutation, useGetMissionsQuery } = missionSlice;
