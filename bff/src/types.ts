export enum MessageType {
  ControlMessage = "control", // used to controll the gui apperance
  ApplicationMessage = "application", // used to control the data the gui holds
}

export enum MessageModule {
  BAKSET = "basket",
}

export enum AbatekStreamingEvents {
  SCORE = "score",
  FIRI_LOGO_EVENT = "firi_logo",
  GAME_INFORMATION = "game_information",
  SPONSOR_DISPLAY = "sponsor_display",
  NAME_OVERLAY_EVENT = "name_overlay_event",
}

export type MessageRequest = {
  type: AbatekStreamingEvents;
  payload: object;
};

export type Message = {
  type: AbatekStreamingEvents;
  module: MessageModule;
  payload: object;
};
