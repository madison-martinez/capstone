import { alertActionTypes } from "../actions/alert";

export function alert(state = {}, action) {
  switch (action.type) {
    case alertActionTypes.SUCCESS:
      return {
        type: "ALERT_SUCCESS",
        message: action.message,
      };
    case alertActionTypes.ERROR:
      return {
        type: "ALERT_ERROR",
        message: action.message,
      };
    case alertActionTypes.RESET:
      return {};
    default:
      return state;
  }
};
