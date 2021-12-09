import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Player } from "../team/component/TeamPresentationComponent";

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

type NameState = {
  showName: boolean;
  payload: NamePayload;
  duration: number;
  type: NameSkin;
  playerProfileContext: PlayerProfileContext | null;
};

const initialState: NameState = {
  showName: false,
  type: NameSkin.PLAYER_FULL,
  payload: {
    name: "",
    role: "",
    points: null,
  },
  playerProfileContext: null,
  duration: 5000,
};

type PlayerFullOverlayRequest = {
  player: Player;
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
    setPlayerFullOverlay: (
      state: NameState,
      action: PayloadAction<PlayerFullOverlayRequest>
    ) => {
      state.playerProfileContext = {
        profile: action.payload.player,
        team: action.payload.team,
      };
      return state;
    },
  },
});

export const { showNameOverlay, hideNameOverlay, setPlayerFullOverlay } =
  reducer.actions;

export default reducer.reducer;
