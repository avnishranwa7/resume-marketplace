import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

// local imports
import { User } from "../types/user";

interface AuthState {
  logged_in: boolean;
  user: User;
}

const initialState: AuthState = {
  logged_in: false,
  user: { email: "", userId: "" },
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<User>) => {
      state.logged_in = true;
      state.user = action.payload;
    },
    logout: (state) => {
      state.logged_in = false;
      state.user = { email: "", userId: "" };
    },
  },
});

export const { login, logout } = authSlice.actions;
export const auth = (state: RootState) => state.auth;
export default authSlice.reducer;
