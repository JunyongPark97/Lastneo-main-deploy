/* eslint-disable */
import {
  ENTER_ADDRESS_SUCCESS,
  ENTER_ADDRESS_FAILURE,
} from "../_actions/types";

export default function (
  state = { loginAttempt: false, loginSucceed: false },
  action
) {
  switch (action.type) {
    case ENTER_ADDRESS_SUCCESS:
      return {
        ...state,
        loginSucceed: action.payload.is_exact,
        hash_address: action.payload.hash_address,
      };
    case ENTER_ADDRESS_FAILURE:
      return {
        ...state,
        loginSucceed: false,
      };
    default:
      return state;
  }
}
