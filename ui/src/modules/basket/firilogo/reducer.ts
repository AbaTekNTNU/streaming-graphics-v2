import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum FiriLogoGender {
  MEN = "men",
  WOMEN = "women",
}

export type FiriLogoState = {
  showLogo: boolean;
};

const initialState: FiriLogoState = {
  showLogo: true,
};

const firiLogoReducer = createSlice({
  name: "firiLogo",
  initialState: initialState,
  reducers: {
    hideLogo: (state: FiriLogoState) => {
      state.showLogo = false;
      return state;
    },
    showLogo: (state: FiriLogoState) => {
      state.showLogo = true;
      return state;
    },
  },
});

export const { hideLogo, showLogo } = firiLogoReducer.actions;

export default firiLogoReducer.reducer;
