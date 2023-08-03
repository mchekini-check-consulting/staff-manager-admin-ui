import { fetchBaseQuery } from "@reduxjs/toolkit/dist/query";
import { API_URL } from "./constants";

export const baseQuery = fetchBaseQuery({
  baseUrl: API_URL,
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      headers.set("Authorization", `Bearer ${accessToken}`);
    }
    return headers;
  },
});

export const transformedBaseQuery = () => async (args, api, extraOptions) => {
  const response = await baseQuery(args, api, extraOptions);

  const fineStatus = response.meta.response.status > 199 && response.meta.response.status < 300;

  return {
    ...response,
    data: fineStatus && response.data?.payload,
    error: !fineStatus && { status: response.error?.status, ...response.error?.data },
  };
};
