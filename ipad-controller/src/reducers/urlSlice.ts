import { createSlice, PayloadAction } from "@reduxjs/toolkit";

/*
Slice containing url for basket backend.
*/

export interface UrlState {
  value: string;
}

const initialState: UrlState = {
  value: "http://localhost:4000",
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
