export enum AbaTekStreamingModule {
  BASKET = "basket",
}

export enum AbaTekStreamingEventType {
  SCORE = "score",
  FIRI_LOGO_EVENT = "firi_logo",
  GAME_INFORMATION = "game_information",
  SPONSOR_DISPLAY = "sponsor_display",
}

export type AbaTekStreamingEvent = {
  module: AbaTekStreamingModule;
  type: AbaTekStreamingEventType;
};
