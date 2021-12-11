export enum InternalEvent {
  UPDATE_SCORE,
  START,
  STOP,
  RESET_CLOCK,
  NOTHING,
}

export type EventResult = {
  event: InternalEvent;
};

export enum NifDefaultTypes {
  TEAM = "Team",
  EVENT_ID = "Id",
  EVENT_TYPE = "EventType",
  PLAYER_ID = "Player",
  ASSIST = "Assist",
}
