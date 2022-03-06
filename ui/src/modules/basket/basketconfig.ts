import { createSlice } from "@reduxjs/toolkit";

export enum BasketSkin {
  FIRI_MEN,
  FIRI_WOMEN,
  NTNUI,
}

type BasketConfig = {
  skin: BasketSkin;
};

const initialState: BasketConfig = {
  skin: BasketSkin.FIRI_MEN,
};

const configReducer = createSlice({
  name: "config",
  initialState: initialState,
  reducers: {},
});

export const {} = configReducer.actions;

export default configReducer.reducer;
