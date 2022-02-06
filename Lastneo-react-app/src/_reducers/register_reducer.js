/* eslint-disable */

import {
  AUTH_SUCCESS,
  AUTH_FAILURE,
  AUTH_REQ_SUCCESS,
  AUTH_REQ_FAILURE,
  ENTER_MBTI,
  ENTER_PASSWORD,
  ENTER_VALUES,
  CONFIRM_MARKETING,
  SIGNUP_SUCCESS,
  NICKNAME_SUCCESS,
} from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case AUTH_REQ_SUCCESS:
      return { ...state, phone: action.payload };
    case AUTH_REQ_FAILURE:
      return state;
    case AUTH_SUCCESS:
      return {
        ...state,
        phone: action.payload.phone,
        confirm_key: action.payload.confirm_key,
      };
    case AUTH_FAILURE:
      return state;
    case CONFIRM_MARKETING:
      return {
        ...state,
        is_marketing: action.payload,
      };
    case ENTER_MBTI:
      return {
        ...state,
        mbti: action.payload,
      };
    case ENTER_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case ENTER_VALUES:
      return {
        ...state,
        values: action.payload,
      };
    case NICKNAME_SUCCESS:
      return {
        ...state,
        nickname: action.payload,
      };
    case SIGNUP_SUCCESS:
      console.log("서버로부터 받은 데이터 req.data");
      console.log(action.payload);
      return {
        result: action.payload,
      };
    default:
      return state;
  }
}
