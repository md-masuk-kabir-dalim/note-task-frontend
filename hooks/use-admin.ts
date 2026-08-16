"use client";
import { adminRoutes } from "@/constant/end-point";
import {
  useCreateResourceMutation,
  useDeleteResourceMutation,
  useFetchResourceQuery,
  useUpdateResourceMutation,
} from "@/redux/api/commonApi";
import { tagTypes } from "@/redux/tag-types";
import type { ApiResponse } from "@/types/api";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";

export interface InterestGroup {
  interest: string;
  users: Pick<User, "_id" | "name" | "email" | "role">[];
}

export const useAdminUsers = (page = 1, limit = 10, skip = false) => {
  const query = useFetchResourceQuery(
    {
      url: adminRoutes.users,
      tags: [tagTypes.users],
      params: { page, limit },
    },
    { skip }
  );

  return {
    ...query,
    result: query.data as ApiResponse<User[]> | undefined,
  };
};

export const useAdminUser = (id?: string) => {
  const query = useFetchResourceQuery(
    {
      url: adminRoutes.userById(id || ""),
      tags: [tagTypes.users],
    },
    { skip: !id }
  );

  return {
    ...query,
    result: query.data as ApiResponse<User> | undefined,
  };
};

export const useAdminNotes = (page = 1, limit = 10, skip = false) => {
  const query = useFetchResourceQuery(
    {
      url: adminRoutes.notes,
      tags: [tagTypes.notes],
      params: { page, limit },
    },
    { skip }
  );

  return {
    ...query,
    result: query.data as ApiResponse<Note[]> | undefined,
  };
};

export const useUsersByInterests = (skip = false) => {
  const query = useFetchResourceQuery(
    {
      url: adminRoutes.groupedByInterests,
      tags: [tagTypes.users],
    },
    { skip }
  );

  return {
    ...query,
    result: query.data as ApiResponse<InterestGroup[]> | undefined,
  };
};

export const useAdminUserMutations = () => {
  const [createResource] = useCreateResourceMutation();
  const [updateResource] = useUpdateResourceMutation();
  const [deleteResource] = useDeleteResourceMutation();

  const createUser = (payload: {
    name: string;
    email: string;
    password: string;
    role?: string;
    interests?: string[];
  }) =>
    createResource({
      url: adminRoutes.users,
      tags: [tagTypes.users],
      payload,
    }).unwrap();

  const updateUser = (
    id: string,
    payload: {
      name?: string;
      email?: string;
      password?: string;
      role?: string;
      interests?: string[];
    }
  ) =>
    updateResource({
      url: adminRoutes.userById(id),
      tags: [tagTypes.users],
      payload,
    }).unwrap();

  const deleteUser = (id: string) =>
    deleteResource({
      url: adminRoutes.userById(id),
      tags: [tagTypes.users],
    }).unwrap();

  return { createUser, updateUser, deleteUser };
};
