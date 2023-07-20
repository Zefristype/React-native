import { createSlice } from "@reduxjs/toolkit";

const initState = {
  userId: null,
  login: null,
  email: null,
  avatar: null,
  stateChange: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState: initState,
  reducers: {
    updateUserProfile: (state, { payload }) => ({
      ...state,
      userId: payload.userId,
      login: payload.login,
      email: payload.email,
      avatar: payload.avatar,
    }),
    updateUserAvatar: (state, { payload }) => ({
      ...state,
      avatar: payload.avatar,
    }),
    authStateChange: (state, { payload }) => ({
      ...state,
      stateChange: payload.stateChange,
    }),
    authSignOut: () => initState,
  },
});

export const { updateUserProfile, updateUserAvatar, authStateChange, authSignOut } =
  authSlice.actions;

export const authReducer = authSlice.reducer;
