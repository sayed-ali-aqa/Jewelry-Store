import { createSlice } from "@reduxjs/toolkit";
import { CartStatusProps } from "@types/allTypes";

const initialState: CartStatusProps = {
  cartStatus: false,
};

const cartStatusSlice = createSlice({
  name: "cartStatus",
  initialState,
  reducers: {
    setCartStatus: (state, action) => {
      state.cartStatus = action.payload;
    },
  },
});

export const { setCartStatus } = cartStatusSlice.actions;
export default cartStatusSlice.reducer;
