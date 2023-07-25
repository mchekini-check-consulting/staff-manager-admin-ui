import { generalApi } from "../general.api";

export const missionSlice = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    createMission: builder.mutation({
      query: (body) => ({
        url: "/mission",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Missions"],
    }),
    getMissions: builder.query({
      query: () => ({
        url: "/mission",
      }),
      providesTags: ["Missions"],
    }),
  }),
});

export const { useCreateMissionMutation, useGetMissionsQuery } = missionSlice;
