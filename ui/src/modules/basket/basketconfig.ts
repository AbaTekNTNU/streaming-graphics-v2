import { createSlice } from "@reduxjs/toolkit";

export enum BasketSkin {
  FIRI_MEN,
  FIRI_WOMEN,
  NTNUI,
}

type BasketConfig = {
  skin: BasketSkin;
};

const config: BasketConfig = {
  skin: BasketSkin.FIRI_WOMEN,
};

const configReducer = createSlice({
  name: "config",
  initialState: config,
  reducers: {},
});

export const {} = configReducer.actions;

export default configReducer.reducer;
