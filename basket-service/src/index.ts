import express from "express";
import * as process from "process";
import { formatTeamData } from "./conversation/team";
import { correctScore } from "./corrections/score";
import { handleMessageGlobalSideEffects } from "./effects";
import { NifDefaultTypes } from "./event";
import { ClockNifEvent, handleClockEvent } from "./eventHandlers/clock";
import { handleScoreEvent, ScoreNifEvent } from "./eventHandlers/score";
import { handleFoulSideEffects } from "./sideEffects/foul";
import { getTeamFromMessage } from "./team";
import { Correction, TeamsState } from "./types";
import { correctTime } from "./uiEvents/clock";

const app = express();
const port = process.env.port ?? 8000;

app.use(express.json());

const EVENT_START_STOP_CLOCK = 2;
const EVENT_SHOT = 200436;
const EVENT_SUBSTITUTION = 200438;
const EVENT_FOUL = 200437;
const EVENT_TIMEOUT = 200439;

const supportedEvents = [
  EVENT_START_STOP_CLOCK,
  EVENT_SHOT,
  EVENT_SUBSTITUTION,
  EVENT_TIMEOUT,
];

export type AppState = {
  score: {
    home: number;
    away: number;
  };
  clock: {
    period: string;
    lastKownSecondsRemaining: number;
  };
  teams: TeamsState | null;
};

let appState: AppState = {
  score: {
    home: 0,
    away: 0,
  },
  clock: {
    period: "1",
    lastKownSecondsRemaining: 600,
  },
  teams: null,
};

const alreadyHandledEvents: number[] = [];

app.post("/correct", (req: express.Request, res: express.Response) => {
  switch (req.body.type) {
    case Correction.SCORE:
      appState = correctScore(appState, req.body);
      break;
  }
  res.send({ result: "ok" });
});

app.post("/team", (req: express.Request, res: express.Response) => {
  console.log("got team event");
  appState = formatTeamData(req.body, appState);
  res.send({ result: "ok" });
});

app.post("/message", (req: express.Request, res: express.Response) => {
  const message = req.body;
  let eventResult;

  if (message[NifDefaultTypes.EVENT_ID]) {
    if (alreadyHandledEvents.includes(message[NifDefaultTypes.EVENT_ID])) {
      return res.send({ result: "already handled" });
    } else {
      alreadyHandledEvents.push(message[NifDefaultTypes.EVENT_ID]);
    }
  }

  appState = handleMessageGlobalSideEffects(appState, message);

  if (supportedEvents.includes(message["EventType"] as number)) {
    switch (message["EventType"]) {
      case EVENT_START_STOP_CLOCK:
        [appState, eventResult] = handleClockEvent(
          appState,
          message[ClockNifEvent.TYPE]
        );
        break;
      case EVENT_SHOT:
        [appState, eventResult] = handleScoreEvent(
          appState,
          getTeamFromMessage(message),
          message[ScoreNifEvent.SHOT_RESULT]
        );
        break;
      case EVENT_FOUL:
        handleFoulSideEffects();
        break;
    }
  } else {
    // will discard the event
  }
  res.send({ status: "ok" });
});

app.get("/state", (req: express.Request, res: express.Response) => {
  res.send(appState);
});

app.post("/resetclock", (req: express.Request, res: express.Response) => {
  appState = {
    ...appState,
    clock: {
      period: appState.clock.period,
      lastKownSecondsRemaining: 600,
    },
  };
  correctTime(appState);
  res.send({ result: "ok" });
});

app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
