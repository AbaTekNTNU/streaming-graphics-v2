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
  reducers: {
    showSponsorDisplay: (state: SponsorState) => {
      state = { showSponsors: true };
      return state;
    },
    hideSponsorDisplay: (state: SponsorState) => {
      state = { showSponsors: false };
      return state;
    },
  },
});

export const { showSponsorDisplay, hideSponsorDisplay } = sponsorSlice.actions;

export default sponsorSlice.reducer;
