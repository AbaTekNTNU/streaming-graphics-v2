enum MessageType {
  ControlMessage = "control", // used to controll the gui apperance
  ApplicationMessage = "application", // used to control the data the gui holds
}

export enum MessageModule {
  BAKSET = "basket",
}

export type MessageRequest = {
  type: MessageType;
  module: MessageModule;
  payload: object;
};

export type Message = {
  type: MessageType;
  payload: object;
  module: MessageModule;
};
