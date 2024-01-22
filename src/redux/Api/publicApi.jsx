import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const rootApi = createApi({
  reducerPath: "rootApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://book-bridge-server.vercel.app",
  }),
  tagTypes: ["comment"],
  endpoints: (builder) => ({
    postComment: builder.mutation({
      query: ({ id, comment }) => ({
        url: `/comments/${id}`,
        method: "PATCH",
        body: comment,
      }),
      invalidatesTags: ["comment"],
    }),
    getComments: builder.query({
      query: (id) => ({
        url: `/products/${id}`,
        method: "GET",
      }),
      providesTags: ["comment"],
    }),
  }),
});

export const { usePostCommentMutation, useGetCommentsQuery } = rootApi;

// export const apiReducer = rootApi.reducer;
