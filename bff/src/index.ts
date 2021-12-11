import * as http from "http";
import express from "express";
import WebSocket from "ws";
import cors from "cors";
import fetch from "node-fetch";
import {
  AbatekStreamingEvents,
  Message,
  MessageModule,
  MessageRequest,
} from "./types";

const port = 4000;

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

const send = (msg: MessageRequest, module: MessageModule) => {
  const message: Message = {
    module: module,
    type: msg.type,
    payload: msg.payload,
  };
  webSocketServer.clients.forEach((client) => {
    client.send(JSON.stringify(message));
  });
};

app.post("/controller", (req: express.Request, res: express.Response) => {
  console.log(req.body);
  send(req.body, MessageModule.BAKSET);
  res.send({ result: "ok" });
});

app.post("/basket", (req: express.Request, res: express.Response) => {
  send(req.body, MessageModule.BAKSET);
  res.send({ result: "ok" });
});

app.post(
  "/basket/name-overlay/team/:team/player/:playerId",
  async (req: express.Request, res: express.Response) => {
    const playerStats = await fetch(
      `http://localhost:8000/team/${req.params.team}/player/${req.params.playerId}`
    ).then((r) => r.json());

    if (playerStats.ok) {
      send(
        {
          type: AbatekStreamingEvents.NAME_OVERLAY_EVENT,
          payload: {
            type: "application",
            event: "nameOverlay.Player.Full.Update",
            player: playerStats.player,
            team: req.params.team, // H | A
          },
        },
        MessageModule.BAKSET
      );

      send(
        {
          type: AbatekStreamingEvents.NAME_OVERLAY_EVENT,
          payload: {
            type: "control",
            event: "nameOverlay.visibility",
            value: true,
          },
        },
        MessageModule.BAKSET
      );
      res.send({ ok: true });
    } else {
      res.send({ ok: false });
    }
  }
);

app.post(
  "/basket/name-overlay/team/:team/coach/:coachId",
  async (req: express.Request, res: express.Response) => {
    const coachStats = await fetch(
      `http://localhost:8000/team/${req.params.team}/coach/${req.params.coachId}`
    ).then((r) => r.json());

    if (coachStats.ok) {
      send(
        {
          type: AbatekStreamingEvents.NAME_OVERLAY_EVENT,
          payload: {
            type: "application",
            event: "nameOverlay.Coach.Full.Update",
            coach: coachStats.coach,
            team: req.params.team, // H | A
          },
        },
        MessageModule.BAKSET
      );

      send(
        {
          type: AbatekStreamingEvents.NAME_OVERLAY_EVENT,
          payload: {
            type: "control",
            event: "nameOverlay.visibility",
            value: true,
          },
        },
        MessageModule.BAKSET
      );
      res.send({ ok: true });
    } else {
      res.send({ ok: false });
    }
  }
);

app.get("/team", async (req: express.Request, res: express.Response) => {
  const result = await fetch("http://localhost:8000/state").then((r) =>
    r.json()
  );
  res.send(result);
});

server.listen(port, () => {
  console.log(`bff running at ${port}`);
});
