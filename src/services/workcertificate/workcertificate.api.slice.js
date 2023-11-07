import { generalApi } from "services/general.api";

export const workCertificateapi = generalApi.injectEndpoints({
  tagTypes: ["WorkCertificate"],
  endpoints: (builder) => ({
    createWorkCertificate: builder.mutation({
      query: (body) => ({
        url: "workCertificate",
        method: "POST",
        body,
        responseType: "arraybuffer",
        responseHandler: async (res) => {
          const blob = await res.blob();
          return window.URL.createObjectURL(blob);
        },
      }),
    }),
  }),
});

export const { useCreateWorkCertificateMutation } = workCertificateapi;
