import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { teamsConfig } from "../teamsConfig";

type Team = {
  name: string;
};
export interface ScoreState {
  score: {
    home: number;
    away: number;
  };
  teams: {
    home: Team;
    away: Team;
  };
  clock: {
    secondsRemaining: number;
    period: string;
    running: boolean;
  };
  scoreVisible: boolean;
  clockVisible: boolean;
}

export type SetScoreRequest = {
  home: number;
  away: number;
};

export type ClockCorrectionRequest = {
  secondsRemaining: number;
  period: string;
};

const initialState: ScoreState = {
  score: {
    home: 0,
    away: 0,
  },
  teams: {
    home: {
      name: teamsConfig.home.shortName,
    },
    away: {
      name: teamsConfig.away.shortName,
    },
  },
  clock: {
    period: "1",
    secondsRemaining: 600,
    running: false,
  },
  scoreVisible: false,
  clockVisible: true,
};

const scoreSlice = createSlice({
  name: "score",
  initialState,
  reducers: {
    stopClock: (state: ScoreState) => {
      state.clock.running = false;
      console.log(state);
      return state;
    },
    startClock: (state: ScoreState) => {
      state.clock.running = true;
      return state;
    },
    correctTime: (
      state: ScoreState,
      action: PayloadAction<ClockCorrectionRequest>
    ) => {
      state.clock = {
        secondsRemaining: action.payload.secondsRemaining,
        period: action.payload.period,
        running: state.clock.running,
      };
      return state;
    },
    showClock: (state: ScoreState) => {
      state.clockVisible = true;
      return state;
    },
    hideClock: (state: ScoreState) => {
      state.clockVisible = false;
      return state;
    },
    hideScore: (state: ScoreState) => {
      state.scoreVisible = false;
      return state;
    },
    showScore: (state: ScoreState) => {
      state.scoreVisible = true;
      return state;
    },
    setScore: (state: ScoreState, action: PayloadAction<SetScoreRequest>) => {
      state.score = action.payload;
      return state;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setScore,
  showScore,
  hideScore,
  correctTime,
  stopClock,
  startClock,
  hideClock,
  showClock,
} = scoreSlice.actions;

export default scoreSlice.reducer;
