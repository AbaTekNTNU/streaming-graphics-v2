import { createSlice } from "@reduxjs/toolkit";

type SponsorState = {
  showSponsors: boolean;
};

const initialState: SponsorState = {
  showSponsors: false,
};

const sponsorSlice = createSlice({
  name: "sponsors",
  initialState,
  reducers: {},
});

export const {} = sponsorSlice.actions;

export default sponsorSlice.reducer;
