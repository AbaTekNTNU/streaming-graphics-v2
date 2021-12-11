import { NifDefaultTypes } from "./event";

const getAssistByMessage = (message: any): number | null => {
  if (message[NifDefaultTypes.ASSIST]) {
    return message[NifDefaultTypes.ASSIST];
  }
  return null;
};

export { getAssistByMessage };
