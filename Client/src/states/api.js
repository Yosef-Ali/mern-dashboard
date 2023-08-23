import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: import.meta.env.VITE_REACT_APP_BASE_URL,
  }),
  reducerPath: "adminApi",
  tagTypes: ["User", "Product", "Customers"],
  endpoints: (builder) => ({
    getUser: builder.query({
      query: (id) => `general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: builder.query({
      query: () => `client/products`,
      providesTags: ["Product"],
    }),
    getCustomers: builder.query({
      query: () => "client/customers",
      providesTags: ["Customers"],
    }),
  }),
});

export const { useGetUserQuery, useGetProductsQuery, useGetCustomersQuery } =
  api;
