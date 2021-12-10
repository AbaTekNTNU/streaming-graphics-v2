import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { BasketPages } from "./types";

export type BasketSlice = {
  page: BasketPages;
};

const initialState: BasketSlice = {
  page: BasketPages.CONTROL_BUTTONS,
};

export type GotoPageRequest = {
  page: BasketPages;
};

const basketState = createSlice({
  name: "basket",
  initialState,
  reducers: {
    gotoPage: (state: BasketSlice, action: PayloadAction<GotoPageRequest>) => {
      state.page = action.payload.page;
      return state;
    },
  },
});

export const { gotoPage } = basketState.actions;

export default basketState.reducer;
