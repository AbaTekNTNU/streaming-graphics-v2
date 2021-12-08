import { createSlice } from "@reduxjs/toolkit";

type Coach = {};

type Player = {};

type TeamDetail = {
  name: string;
  logo: string;
  coaches: Coach[];
  players: Player[];
};

type TeamState = {
  home: TeamDetail;
  away: TeamDetail;
  showGameSummary: boolean;
  showTeamPresentation: boolean;
};
const initialState: TeamState = {
  home: {
    name: "Nerds",
    logo: "https://ntnui.no/basket/wp-content/uploads/sites/165/2020/05/cropped-NTNUI-favicon.png",
    players: [],
    coaches: [],
  },
  away: {
    name: "Geezes",
    logo: "https://ntnui.no/basket/wp-content/uploads/sites/165/2020/05/cropped-NTNUI-favicon.png",
    players: [],
    coaches: [],
  },
  showGameSummary: false,
  showTeamPresentation: false,
};

const teamReducer = createSlice({
  name: "team",
  initialState,
  reducers: {
    showGameInitialSummary: (state: TeamState) => {
      state.showGameSummary = true;
      return state;
    },
    hideGameInitialSummary: (state: TeamState) => {
      state.showGameSummary = false;
      return state;
    },
    showTeamInformation: (state: TeamState) => {
      state.showTeamPresentation = true;
      return state;
    },
    hideTeamInformation: (state: TeamState) => {
      state.showTeamPresentation = false;
      return state;
    },
  },
});

export const {
  showGameInitialSummary,
  hideGameInitialSummary,
  showTeamInformation,
  hideTeamInformation,
} = teamReducer.actions;

export default teamReducer.reducer;
