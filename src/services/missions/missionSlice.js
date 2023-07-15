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
  }),
});

export const { useCreateMissionMutation } = missionSlice;
