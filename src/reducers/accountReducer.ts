import {
  singularAccountInterface,
  accountActionInterface,
} from "../types/accountReducerInterface";
import ACTIONS from "./actions";

export const initialAccountsState = {};

/* reducer */
export function accountReducer(
  accountState: singularAccountInterface[],
  action: accountActionInterface
) {
  switch (action.type) {
    case ACTIONS.RETRIEVE:
      return action.payload ? [...action.payload] : [...accountState];
    case ACTIONS.SET:
      return action.payload ? [...action.payload] : [...accountState];
    default:
      return [...accountState];
  }
}

/* action creator */