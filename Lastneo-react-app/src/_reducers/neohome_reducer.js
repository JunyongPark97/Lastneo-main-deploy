/* eslint-disable */
import {
  GET_NICKNAME,
  GET_TAB,
  SET_NICKNAME,
  SET_TAB,
  SET_SCROLL,
  UNSET_SCROLL,
} from "../_actions/types";

const initialState = {
  tab: "character",
  nickname: "",
  scroll: false,
  scroll_to: "",
};
export default function (state = initialState, action) {
  switch (action.type) {
    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.payload,
      };
    case GET_NICKNAME:
      return {
        payload: state.nickname,
      };
    case SET_TAB:
      return {
        ...state,
        tab: action.payload,
      };
    case GET_TAB:
      return {
        payload: state.tab,
      };
    case SET_SCROLL:
      return {
        ...state,
        scroll: true,
        scroll_to: action.payload,
      };
    case UNSET_SCROLL:
      return {
        ...state,
        scroll: false,
      };
    default:
      return state;
  }
}
