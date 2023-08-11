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
    updateMission: builder.mutation({
      query: ({ id, ...body }) => ({
        url: `mission/${id}`,
        method: "PUT",
        body,
      }),
    }),
  }),
});

export const { useCreateMissionMutation, useGetMissionsQuery, useUpdateMissionMutation } =
  missionSlice;
