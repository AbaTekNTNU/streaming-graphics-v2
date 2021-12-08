import React from "react";
import { useDispatch } from "react-redux";
import useWebSocket from "react-use-websocket";
import { handleEvent } from "./events/handler";

const wsUrl = "ws://localhost:4000";

const WebSockets: React.FC = () => {
  const dispatch = useDispatch();

  useWebSocket(wsUrl, {
    onMessage: (event: MessageEvent<string>) => {
      console.log("got message");
      console.log(event.data);
      handleEvent(event, dispatch);
    },
  });
  return null;
};
export default WebSockets;
