import { NifDefaultTypes } from "./event";

export const getPlayerIdFromMessage = (message: any): number => {
  return message[NifDefaultTypes.PLAYER_ID];
};
