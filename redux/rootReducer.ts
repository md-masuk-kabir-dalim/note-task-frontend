import { baseApi } from "./api/baseApi";
import authReducer from "./features/slice/authSlice";
import { combineReducers } from "@reduxjs/toolkit";

export const rootReducer = combineReducers({
  [baseApi.reducerPath]: baseApi.reducer,
  auth: authReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
