/* eslint-disable */
import axios from "axios";
import { REACT_APP_DB_HOST } from "../keys";

const FRONTDOOR_LOGIN_SUCCESS = "neohome/FRONTDOOR_LOGIN_SUCCESS";
const SET_BIG5_ANSWERS = "neohome/SET_BIG5_ANSWERS";
const SET_NICKNAME = "neohome/SET_NICKNAME";
const SET_TAB = "neohome/SET_TAB";
const SET_SCROLL = "neohome/SET_SCROLL";
const UNSET_SCROLL = "neohome/UNSET_SCROLL";
const RESET_PW_AUTH_REQ_SUCCESS = "neohome/RESET_PW_AUTH_REQ_SUCCESS";
const RESET_PW_AUTH_SUCCESS = "neohome/RESET_PW_AUTH_SUCCESS";

// 현관-로그인
export const login = async (dataTosubmit) => {
  try {
    const req = await axios.post(
      REACT_APP_DB_HOST + "/accounts/v1/login/",
      dataTosubmit
    );
    const { token } = req.data;
    localStorage.setItem("token", token);
    return {
      type: FRONTDOOR_LOGIN_SUCCESS,
      payload: req,
    };
  } catch (e) {
    return {
      payload: e,
    };
  }
};

// 비밀번호 재설정
// 1. 인증번호 받기
export const getAuth = async (dataTosubmit) => {
  try {
    const req = await axios.post(
      REACT_APP_DB_HOST + "/api/v1/sms/reset_pw_send/",
      dataTosubmit
    );
    return {
      type: RESET_PW_AUTH_REQ_SUCCESS,
    };
  } catch (e) {
    return {
      payload: e.response.data,
    };
  }
};

// 2. 인증번호 매칭 여부 확인
export const enterAuth = async (dataTosubmit) => {
  try {
    const req = await axios.post(
      REACT_APP_DB_HOST + "/api/v1/sms/reset_pw_confirm/",
      dataTosubmit
    );
    return {
      type: RESET_PW_AUTH_SUCCESS,
    };
  } catch (e) {
    return {
      payload: e.response.data,
    };
  }
};

// 3. 재설정할 비밀번호 전송
export const enterNewPw = async (dataTosubmit) => {
  try {
    const req = await axios.post(
      REACT_APP_DB_HOST + "/accounts/v1/reset_pw/",
      dataTosubmit
    );
    return {
      status: true,
    };
  } catch (e) {}
};

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

export const setBig5Answers = (arr) => {
  return {
    type: SET_BIG5_ANSWERS,
    payload: arr,
  };
};

const initialState = {
  tab: "character",
  nickname: "",
  scroll: false,
  scroll_to: "",
  big5_answers: [],
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
    case SET_BIG5_ANSWERS:
      return {
        ...state,
        big5_answers: action.payload,
      };
    default:
      return state;
  }
}
