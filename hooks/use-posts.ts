"use client";
import { postsRoutes } from "@/constant/end-point";
import {
  useCreateResourceMutation,
  useFetchResourceQuery,
} from "@/redux/api/commonApi";
import { tagTypes } from "@/redux/tag-types";
import type { ApiResponse } from "@/types/api";
import type { UserWithPosts } from "@/types/post";

export const useUserPosts = (userId?: string) => {
  const query = useFetchResourceQuery(
    {
      url: postsRoutes.getByUser(userId || ""),
      tags: [tagTypes.posts],
    },
    { skip: !userId }
  );

  return {
    ...query,
    result: query.data as ApiResponse<UserWithPosts> | undefined,
  };
};

export const useCreatePost = () => {
  const [createResource, state] = useCreateResourceMutation();

  const createPost = (payload: { title: string; content: string }) =>
    createResource({
      url: postsRoutes.create,
      tags: [tagTypes.posts],
      payload,
    }).unwrap();

  return { createPost, ...state };
};
