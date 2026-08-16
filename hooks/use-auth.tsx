"use client";
import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "@/redux/store";
import { logout, setCredentials } from "@/redux/features/slice/authSlice";
import { baseApi } from "@/redux/api/baseApi";
import type { AuthUser, User } from "@/types/user";
import { authRoutes, usersRoutes } from "@/constant/end-point";
import {
  useCreateResourceMutation,
  useLazyFetchResourceQuery,
  useUpdateResourceMutation,
} from "@/redux/api/commonApi";
import { tagTypes } from "@/redux/tag-types";
import { clearClientAuthCookies } from "@/lib/auth-session";

const mapProfile = (profile: User): AuthUser => ({
  id: profile._id,
  email: profile.email,
  name: profile.name,
  role: profile.role,
  interests: profile.interests,
  phone: profile.phoneNo,
  avatar: profile.image,
});

export function useAuth() {
  const dispatch = useDispatch<AppDispatch>();
  const user = useSelector((state: RootState) => state.auth.user);
  const isAuthenticated = !!user;
  const isAdmin = user?.role === "ADMIN";
  const [fetchProfile] = useLazyFetchResourceQuery();
  const [updateResource] = useUpdateResourceMutation();
  const [logoutRequest] = useCreateResourceMutation();

  const fetchAndSetUser = useCallback(async () => {
    dispatch(baseApi.util.resetApiState());

    const res = (await fetchProfile({
      url: authRoutes.getMyProfile,
    }).unwrap()) as { data?: User };

    if (!res?.data) return null;
    const mappedUser = mapProfile(res.data);
    dispatch(setCredentials({ user: mappedUser }));
    return mappedUser;
  }, [dispatch, fetchProfile]);

  const logoutUser = async () => {
    try {
      await logoutRequest({ url: authRoutes.logout }).unwrap();
    } catch {
      // Cookie may already be gone; still clear local session.
    }
    dispatch(baseApi.util.resetApiState());
    dispatch(logout());
    clearClientAuthCookies();
  };

  const updateProfile = async (
    data: Partial<Pick<AuthUser, "name" | "phone" | "avatar">> & {
      interests?: string[];
    }
  ) => {
    const res = (await updateResource({
      url: usersRoutes.updateUser,
      tags: [tagTypes.users, tagTypes.auth],
      payload: {
        name: data.name,
        phoneNo: data.phone,
        interests: data.interests,
        ...(data.avatar ? { image: data.avatar } : {}),
      },
    }).unwrap()) as { data?: User };

    const updated = res?.data;
    if (user) {
      dispatch(
        setCredentials({
          user: {
            ...user,
            name: updated?.name ?? data.name ?? user.name,
            phone: updated?.phoneNo ?? data.phone ?? user.phone,
            avatar: updated?.image ?? data.avatar ?? user.avatar,
            interests: updated?.interests ?? data.interests ?? user.interests,
          },
        })
      );
    }
  };

  return {
    loading: false,
    user,
    fetchAndSetUser,
    logout: logoutUser,
    updateProfile,
    isAuthenticated,
    isAdmin,
  };
}
