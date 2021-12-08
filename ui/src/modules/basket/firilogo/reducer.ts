import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export enum FiriLogoGender {
  MEN = "men",
  WOMEN = "women",
}

export type FiriLogoState = {
  showLogo: boolean;
  gender: FiriLogoGender;
};

export type SetFiriLogoGenderRequest = {
  gender: FiriLogoGender;
};

const initialState: FiriLogoState = {
  showLogo: false,
  gender: FiriLogoGender.WOMEN,
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
    setLogoGender: (
      state: FiriLogoState,
      action: PayloadAction<SetFiriLogoGenderRequest>
    ) => {
      state.gender = action.payload.gender;
      return state;
    },
  },
});

export const { hideLogo, showLogo, setLogoGender } = firiLogoReducer.actions;

export default firiLogoReducer.reducer;
