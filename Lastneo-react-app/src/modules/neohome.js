/* eslint-disable */
import axios from "axios";
import { REACT_APP_DB_HOST } from "../keys";

const SET_NICKNAME = "neohome/SET_NICKNAME";
const SET_TAB = "neohome/SET_TAB";
const SET_SCROLL = "neohome/SET_SCROLL";
const UNSET_SCROLL = "neohome/UNSET_SCROLL";

export const setNickname = (nickname) => {
  return {
    type: SET_NICKNAME,
    payload: nickname,
  };
};

export const setTab = (dest) => {
  return {
    type: SET_TAB,
    payload: dest,
  };
};

export const setScroll = (section) => {
  return {
    type: SET_SCROLL,
    payload: section,
  };
};

export const unsetScroll = () => {
  return {
    type: UNSET_SCROLL,
  };
};

const initialState = {
  tab: "character",
  nickname: "",
  scroll: false,
  scroll_to: "",
};

export default function neohome(state = initialState, action) {
  switch (action.type) {
    case SET_NICKNAME:
      return {
        ...state,
        nickname: action.payload,
      };
    case SET_TAB:
      return {
        ...state,
        tab: action.payload,
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

// 현관-로그인
export const login = async (dataTosubmit) => {
  const req = await axios.post(
    REACT_APP_DB_HOST + "/accounts/v1/login/",
    dataTosubmit
  );
  const { token } = req.data;
  localStorage.setItem("token", token);
};

// 비밀번호 재설정
// 1. 인증번호 받기
export const getAuth = async (dataTosubmit) => {
  await axios.post(
    REACT_APP_DB_HOST + "/api/v1/sms/reset_pw_send/",
    dataTosubmit
  );
};

// 2. 인증번호 매칭 여부 확인
export const enterAuth = async (dataTosubmit) => {
  await axios.post(
    REACT_APP_DB_HOST + "/api/v1/sms/reset_pw_confirm/",
    dataTosubmit
  );
};

// 3. 재설정할 비밀번호 전송
export const enterNewPw = async (dataTosubmit) => {
  await axios.post(REACT_APP_DB_HOST + "/accounts/v1/reset_pw/", dataTosubmit);
};
