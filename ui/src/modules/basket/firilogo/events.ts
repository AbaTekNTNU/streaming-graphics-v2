import { Dispatch } from "redux";
import { AbaTekStreamingEvent } from "../../../types";
import { AbatekMessage } from "../events";
import { FiriLogoGender, hideLogo, setLogoGender, showLogo } from "./reducer";

enum FiriLogoMessage {
  LOGO_VISIBILITY = "logo.visibility",
  USE_MEN_LOGO = "logo.gender.useMen",
}

const doHideLogo = (dispatch: Dispatch) => {
  dispatch(hideLogo());
};

const doShowLogo = (dispatch: Dispatch) => {
  console.log("show logo");
  dispatch(showLogo());
};

export const handleLogoVisibilityState = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  console.log("log event");
  switch ((event as any).payload.control) {
    case FiriLogoMessage.LOGO_VISIBILITY:
      if ((event as any).payload.value) {
        doShowLogo(dispatch);
      } else {
        doHideLogo(dispatch);
      }
      break;
    case FiriLogoMessage.USE_MEN_LOGO:
      if ((event as any).payload.value) {
        dispatch(
          setLogoGender({
            gender: FiriLogoGender.MEN,
          })
        );
      } else {
        dispatch(
          setLogoGender({
            gender: FiriLogoGender.WOMEN,
          })
        );
      }
  }
};

export const handleFiriLogoEvent = (
  event: AbaTekStreamingEvent,
  dispatch: Dispatch
) => {
  switch ((event as any).payload.type) {
    case AbatekMessage.CONTROL:
      handleLogoVisibilityState(event, dispatch);
      break;
  }
};
