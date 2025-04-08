import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import wishlistStatusReducer from "./slices/wishlistStatusSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlistStatus: wishlistStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
