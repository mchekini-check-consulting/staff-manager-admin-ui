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
