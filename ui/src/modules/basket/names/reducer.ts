import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Coach, Player } from "../team/component/TeamPresentationComponent";
import { teamsConfig } from "../teamsConfig";

export type NamePayload = {
  name: string;
  role: string;
  points: number | null;
};
export enum NameSkin {
  SIMPLE,
  PLAYER_FULL,
  COACH,
}

type PlayerProfileContext = {
  team: "H" | "A";
  profile: Player;
};

type CoachProfileContext = {
  team: "H" | "A";
  profile: Coach;
};

type NameState = {
  showName: boolean;
  payload: NamePayload;
  duration: number;
  type: NameSkin;
  profileContext: PlayerProfileContext | CoachProfileContext | null;
};

const initialState: NameState = {
  showName: false,
  type: NameSkin.SIMPLE,
  payload: {
    name: "",
    role: "",
    points: null,
  },
  profileContext: null,
  duration: 5000,
};

type PlayerFullOverlayRequest = {
  player: Player;
  team: "H" | "A";
};

type CoachFullOverlayRequest = {
  coach: Coach;
  team: "H" | "A";
};

const reducer = createSlice({
  name: "name",
  initialState,
  reducers: {
    showNameOverlay: (state: NameState) => {
      state.showName = true;
      return state;
    },
    hideNameOverlay: (state: NameState) => {
      state.showName = false;
      return state;
    },
    setCoachOverlay: (
      state: NameState,
      action: PayloadAction<CoachFullOverlayRequest>
    ) => {
      const { name } =
        action.payload.team === "H" ? teamsConfig.home : teamsConfig.away;

      state.type = NameSkin.SIMPLE;
      state.payload = {
        name: `${action.payload.coach.firstName} ${action.payload.coach.lastName}`,
        role: `Coach, ${name}`,
        points: null,
      };
      return state;
    },
    setPlayerFullOverlay: (
      state: NameState,
      action: PayloadAction<PlayerFullOverlayRequest>
    ) => {
      state.type = NameSkin.PLAYER_FULL;
      state.profileContext = {
        profile: action.payload.player,
        team: action.payload.team,
      };
      return state;
    },
  },
});

export const {
  showNameOverlay,
  hideNameOverlay,
  setPlayerFullOverlay,
  setCoachOverlay,
} = reducer.actions;

export default reducer.reducer;
