/* eslint-disable */
import { GUEST_INFO_SUCCESS } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GUEST_INFO_SUCCESS:
      const data = action.payload;
      return data;
    default:
      return state;
  }
}
