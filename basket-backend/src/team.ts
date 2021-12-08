import { NifDefaultTypes } from "./event";
import { Team } from "./types";

export const getTeamFromMessage = (message: any): Team => {
  if (message[NifDefaultTypes.TEAM] === Team.HOME) {
    return Team.HOME;
  }
  return Team.AWAY;
};
