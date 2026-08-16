"use client";
import { useSelector } from "react-redux";
import { notesRoutes } from "@/constant/end-point";
import {
  useCreateResourceMutation,
  useDeleteResourceMutation,
  useFetchResourceQuery,
  useUpdateResourceMutation,
} from "@/redux/api/commonApi";
import type { RootState } from "@/redux/store";
import { tagTypes } from "@/redux/tag-types";
import type { ApiResponse } from "@/types/api";
import type { Note } from "@/types/note";

export const useNotes = (page = 1, limit = 10, skip = false) => {
  const userId = useSelector((state: RootState) => state.auth.user?.id);
  const query = useFetchResourceQuery(
    {
      url: notesRoutes.getAll,
      tags: [tagTypes.notes],
      params: { page, limit, owner: userId },
    },
    { skip: skip || !userId }
  );

  return {
    ...query,
    result: query.data as ApiResponse<Note[]> | undefined,
  };
};

export const useNote = (id?: string) => {
  const query = useFetchResourceQuery(
    {
      url: notesRoutes.getById(id || ""),
      tags: [tagTypes.notes],
    },
    { skip: !id }
  );

  return {
    ...query,
    result: query.data as ApiResponse<Note> | undefined,
  };
};

export const useNoteMutations = () => {
  const [createResource, createState] = useCreateResourceMutation();
  const [updateResource, updateState] = useUpdateResourceMutation();
  const [deleteResource, deleteState] = useDeleteResourceMutation();

  const createNote = (payload: { title: string; content: string }) =>
    createResource({
      url: notesRoutes.create,
      tags: [tagTypes.notes],
      payload,
    }).unwrap();

  const updateNote = (id: string, payload: { title?: string; content?: string }) =>
    updateResource({
      url: notesRoutes.update(id),
      tags: [tagTypes.notes],
      payload,
    }).unwrap();

  const deleteNote = (id: string) =>
    deleteResource({
      url: notesRoutes.delete(id),
      tags: [tagTypes.notes],
    }).unwrap();

  return {
    createNote,
    updateNote,
    deleteNote,
    createState,
    updateState,
    deleteState,
  };
};
