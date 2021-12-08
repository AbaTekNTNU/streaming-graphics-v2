import { AppState } from "..";
import { Correction } from "../types";

export type CorrectScoreRequest = {
  type: Correction.SCORE;
  payload: {
    home: number;
    away: number;
  };
};

const correctScore = (
  appState: AppState,
  correctScoreRequest: CorrectScoreRequest
): AppState => {
  appState = {
    ...appState,
    score: {
      home: correctScoreRequest.payload.home,
      away: correctScoreRequest.payload.away,
    },
  };
  return appState;
};

export { correctScore };
