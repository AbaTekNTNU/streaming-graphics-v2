import { AppState } from "..";
import { EventResult, InternalEvent } from "../event";
import { Team } from "../types";
import { sendUpdateScoreEvent } from "../uiEvents/score";

enum ScoreEvent {
  Made3Pt = 200442,
  Made2Pt = 200443,
  Made1Pt = 200444,
  Miss3Pt = 200580,
  Miss2Pt = 200581,
  Miss1Pt = 200445,
}

export enum ScoreNifEvent {
  SHOT_RESULT = "ShotResult",
}

const handleScoreEvent = (
  appState: AppState,
  team: Team,
  scoreEvent: ScoreEvent
): [AppState, EventResult] => {
  let increment = 0;
  switch (scoreEvent) {
    case ScoreEvent.Made3Pt:
      increment = 3;
      break;
    case ScoreEvent.Made2Pt:
      increment = 2;
      break;
    case ScoreEvent.Made1Pt:
      increment = 1;
      break;
  }
  let newAppState: AppState = appState;
  if (team === Team.HOME) {
    newAppState = {
      ...appState,
      score: {
        home: appState.score.home + increment,
        away: appState.score.away,
      },
    };
  } else if (team === Team.AWAY) {
    newAppState = {
      ...appState,
      score: {
        home: appState.score.home,
        away: appState.score.away + increment,
      },
    };
  } else {
    newAppState = appState;
  }
  sendUpdateScoreEvent(newAppState);
  return [newAppState, { event: InternalEvent.UPDATE_SCORE }];
};

export { handleScoreEvent };
