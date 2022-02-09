/* eslint-disable */
import {
  OWNER_INFO_SUCCESS,
  OWNER_INFO_FAILURE,
  SEND_BIG5_SUCCESS,
  EDIT_DESC_SUCCESS,
  EDIT_DESC_FAILURE,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case OWNER_INFO_SUCCESS:
      const data = action.payload;
      return data;
    case OWNER_INFO_FAILURE:
      return state;
    case SEND_BIG5_SUCCESS:
      return {
        ...state,
      };
    case EDIT_DESC_SUCCESS:
      return {
        ...state,
        description: action.payload,
      };
    default:
      return state;
  }
}
