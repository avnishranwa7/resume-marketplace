import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "./index";

interface NavigateState {
  path: string;
}

interface PayloadActionType {
  path: string;
}

const initialState: NavigateState = {
  path: "",
};

export const navigateSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    update: (state, action: PayloadAction<PayloadActionType>) => {
      state.path = action.payload.path;
    },
  },
});

export const { update } = navigateSlice.actions;
export const navigateState = (state: RootState) => state.navigate;
export default navigateSlice.reducer;
