import { createSlice } from "@reduxjs/toolkit";

export enum BasketSkin {
  FIRI,
  NTNUI,
}

type BasketConfig = {
  skin: BasketSkin;
};

const config: BasketConfig = {
  skin: BasketSkin.NTNUI,
};

const configReducer = createSlice({
  name: "config",
  initialState: config,
  reducers: {},
});

export const {} = configReducer.actions;

export default configReducer.reducer;
