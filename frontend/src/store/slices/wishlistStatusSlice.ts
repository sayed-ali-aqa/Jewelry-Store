import { createSlice } from "@reduxjs/toolkit";
import { WishlistStatusProps } from "@types/allTypes";

const initialState: WishlistStatusProps = {
  wishlistStatus: false,
};

const wishlistStatusSlice = createSlice({
  name: "wishlistStatus",
  initialState,
  reducers: {
    setWishlistStatus: (state, action) => {
      state.wishlistStatus = action.payload;
    },
  },
});

export const { setWishlistStatus } = wishlistStatusSlice.actions;
export default wishlistStatusSlice.reducer;
