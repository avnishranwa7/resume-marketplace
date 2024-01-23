import { configureStore } from "@reduxjs/toolkit";

// local imports
import authReducer from "./auth";
import navigateReducer from "./navigate";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    navigate: navigateReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
