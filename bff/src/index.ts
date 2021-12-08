import * as http from "http";
import express from "express";
import WebSocket from "ws";
import cors from "cors";
import fetch from "node-fetch";
import { Message, MessageModule, MessageRequest } from "./types";

const port = 4000;

const app = express();

app.use(express.json());
app.use(cors());

const server = http.createServer(app);

const webSocketServer = new WebSocket.Server({ server });

const send = (msg: MessageRequest, module: MessageModule) => {
  const message: Message = {
    type: msg.type,
    module: module,
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

app.get("/team", async (req: express.Request, res: express.Response) => {
  const result = await fetch("http://localhost:8000/state").then((r) =>
    r.json()
  );
  res.send(result);
});

server.listen(port, () => {
  console.log(`bff running at ${port}`);
});
