import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*
Slice containing url for basket backend.
*/

export interface UrlState {
  value: string;
}

const getInitialValue = (): string => {
  return `http://${window.location.hostname}:4000`;
};

const initialState: UrlState = {
  value: getInitialValue(),
};

export const urlSlice = createSlice({
  name: "url",
  initialState,
  reducers: {
    setByValue: (state, action: PayloadAction<string>) => {
      state.value = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setByValue } = urlSlice.actions;

export default urlSlice.reducer;
