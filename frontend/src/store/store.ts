import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice";
import wishlistStatusReducer from "./slices/wishlistStatusSlice";
import cartStatusReducer from "./slices/cartStatusSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    wishlistStatus: wishlistStatusReducer,
    cartStatus: cartStatusReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
