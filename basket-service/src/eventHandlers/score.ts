import { AppState } from "..";
import { EventResult, InternalEvent } from "../event";
import { Team, TeamData } from "../types";
import {
  sendLastScoreUpdateEvent,
  sendUpdateScoreEvent,
} from "../uiEvents/score";
import { handleAssistsEvent } from "./assits";

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

enum ShotValue {
  THREE = 3,
  TWO = 2,
  ONE = 1,
}

const handleInduvidualScoreIncrement = (
  appState: AppState,
  team: Team,
  playerId: number,
  increment: ShotValue
) => {
  let teamThatScored: TeamData | null = null;
  if (team === Team.HOME) {
    teamThatScored = appState.teams?.home ?? null;
  } else {
    teamThatScored = appState.teams?.away ?? null;
  }

  if (teamThatScored === null) {
    console.log("players not setup correctly");
  }

  const player = teamThatScored?.players.find(
    (player) => player.personId === playerId
  );

  if (player === undefined) {
    // players have not been set up yet, however store player information
    const undefinedPlayer = appState.undefinedPlayers.find(
      (player) => player.personId === playerId
    );

    if (undefinedPlayer === undefined) {
      appState.undefinedPlayers.push({
        personId: playerId,
        stats: {
          points: increment,
          assists: 0,
          turnovers: 0,
          shotsMade: {
            1: 0,
            2: 0,
            3: 0,
            [increment]: 1,
          },
          shotsMissed: {
            1: 0,
            2: 0,
            3: 0,
          },
        },
      });
    } else {
      // undefined player is already setup
      undefinedPlayer.stats.points += increment;
      undefinedPlayer.stats.shotsMade[increment] += 1;
    }
  } else {
    player.stats.points += increment;
    player.stats.shotsMade[increment] += 1;

    sendLastScoreUpdateEvent(
      `${player.firstName} ${player.lastName}`,
      increment,
      team
    );
  }

  return appState;
};

const handleInduvidualShotMiss = (
  appState: AppState,
  team: Team,
  playerId: number,
  attemptedPoints: ShotValue
) => {
  let teamThatScored: TeamData | null = null;
  if (team === Team.HOME) {
    teamThatScored = appState.teams?.home ?? null;
  } else {
    teamThatScored = appState.teams?.away ?? null;
  }

  if (teamThatScored === null) {
    console.log("players not setup correctly");
  }

  const player = teamThatScored?.players.find(
    (player) => player.personId === playerId
  );

  if (player === undefined) {
    // players have not been set up yet, however store player information
    const undefinedPlayer = appState.undefinedPlayers.find(
      (player) => player.personId === playerId
    );

    if (undefinedPlayer === undefined) {
      appState.undefinedPlayers.push({
        personId: playerId,
        stats: {
          points: 0,
          assists: 0,
          turnovers: 0,
          shotsMade: {
            1: 0,
            2: 0,
            3: 0,
          },
          shotsMissed: {
            1: 0,
            2: 0,
            3: 0,
            [attemptedPoints]: 1,
          },
        },
      });
    } else {
      // undefined player is already setup
      undefinedPlayer.stats.shotsMissed[attemptedPoints] += 1;
    }
  } else {
    player.stats.shotsMissed[attemptedPoints] += 1;
  }

  return appState;
};

const handleScoreEvent = (
  appState: AppState,
  playerId: number,
  team: Team,
  scoreEvent: ScoreEvent,
  assist: number | null
): [AppState, EventResult] => {
  let increment = 0;
  let attemptedPoints = 0;
  switch (scoreEvent) {
    case ScoreEvent.Made3Pt:
      increment = ShotValue.THREE;
      break;
    case ScoreEvent.Made2Pt:
      increment = ShotValue.TWO;
      break;
    case ScoreEvent.Made1Pt:
      increment = ShotValue.ONE;
      break;
    case ScoreEvent.Miss3Pt:
      attemptedPoints = 3;
      break;
    case ScoreEvent.Miss2Pt:
      attemptedPoints = 2;
      break;
    case ScoreEvent.Miss1Pt:
      attemptedPoints = 1;
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
  if (increment !== 0) {
    newAppState = handleInduvidualScoreIncrement(
      newAppState,
      team,
      playerId,
      increment
    );
  } else {
    newAppState = handleInduvidualShotMiss(
      newAppState,
      team,
      playerId,
      attemptedPoints
    );
  }
  sendUpdateScoreEvent(newAppState);
  if (assist !== null) {
    newAppState = handleAssistsEvent(newAppState, assist, team);
  }
  return [newAppState, { event: InternalEvent.UPDATE_SCORE }];
};

export { handleScoreEvent };
