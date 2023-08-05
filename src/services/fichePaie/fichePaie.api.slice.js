import { generalApi } from "../general.api";

export const fichePaieApi = generalApi.injectEndpoints({
  endpoints: (builder) => ({
    affectFichePaie: builder.mutation({
      query: (body) => {
        return {
          url: "paysheet",
          method: "POST",
          body,
        };
      },
    }),
  }),
});

export const { useAffectFichePaieMutation } = fichePaieApi;
