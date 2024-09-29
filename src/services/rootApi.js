import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_BASE_URL }),
  endpoints: (builder) => ({
    register: builder.mutation({
      query: ({ fullName, email, password }) => ({
        url: "/signup",
        body: { fullName, email, password },
        method: "POST",
      }),
    }),

    login: builder.mutation({
      query: ({ email, password }) => ({
        url: "/login",
        body: { email, password },
        method: "POST",
      }),
    }),

    verityOtp: builder.mutation({
      query: ({ email, otp }) => ({
        url: "/verify-otp",
        body: { email, otp },
        method: "POST",
      }),
    }),
  }),
});

export const { useRegisterMutation, useLoginMutation, useVerityOtpMutation } =
  rootApi;
