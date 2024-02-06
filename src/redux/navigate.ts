import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface NavigateState {
  path: string;
  was_logged_in: boolean;
}

interface PayloadActionType {
  path?: string;
  was_logged_in?: boolean;
}

const initialState: NavigateState = {
  path: "",
  was_logged_in: false,
};

export const navigateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<PayloadActionType>) => {
      state.path = action.payload.path ?? state.path;
      state.was_logged_in = action.payload.was_logged_in ?? state.was_logged_in;
    },
  },
});

export const { update } = navigateSlice.actions;
export const navigateState = (state: RootState) => state.navigate;
export default navigateSlice.reducer;
