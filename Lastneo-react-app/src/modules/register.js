/* eslint-disable */
import axios from "axios";
import valueList from "../assets/values";
import { REACT_APP_DB_HOST } from "../keys";

const AUTH_SUCCESS = "register/AUTH_SUCCESS";
const AUTH_FAILURE = "register/AUTH_FAILURE";
const AUTH_REQ_SUCCESS = "register/AUTH_REQ_SUCCESS";
const AUTH_REQ_FAILURE = "register/AUTH_REQ_FAILURE";
const ENTER_MBTI = "register/ENTER_MBTI";
const ENTER_PASSWORD = "register/ENTER_PASSWORD";
const ENTER_VALUES = "register/ENTER_VALUES";
const SIGNUP_SUCCESS = "register/SIGNUP_SUCCESS";
const SIGNUP_FAILURE = "register/SIGNUP_FAILURE";
const NICKNAME_SUCCESS = "register/NICKNAME_SUCCESS";
const NICKNAME_FAILURE = "register/NICKNAME_FAILURE";
const CONFIRM_MARKETING = "register/CONFIRM_MARKETING";

// 핸드폰 번호 입력 후 인증번호 전송 요청하는 액션
export const getAuth = async (dataTosubmit) => {
  try {
    const req = await axios.post(
      REACT_APP_DB_HOST + "/api/v1/sms/send/",
      dataTosubmit
    );
    return {
      type: AUTH_REQ_SUCCESS,
      payload: dataTosubmit.phone,
    };
  } catch (e) {
    return {
      type: AUTH_REQ_FAILURE,
      payload: e.response.data,
    };
  }
};

// 마케팅수신동의 여부를 store에 저장하는 액션
export const confirmMarketing = (confirmed) => {
  return {
    type: CONFIRM_MARKETING,
    payload: confirmed,
  };
};

// 인증번호 일치 여부 전송 요청하는 액션 - 사용자가 '다음' 버튼을 클릭하면 해당 액션이 발생해야 함
export const enterAuth = async (dataTosubmit) => {
  try {
    const req = await axios.post(
      REACT_APP_DB_HOST + "/api/v1/sms/confirm/",
      dataTosubmit
    );
    return {
      type: AUTH_SUCCESS,
      payload: dataTosubmit,
    };
  } catch (e) {
    return {
      type: AUTH_FAILURE,
      payload: e.response.data,
    };
  }
};

// 사용자 mbti를 store에 저장하는 액션
export const sendMbti = (mbti) => {
  return {
    type: ENTER_MBTI,
    payload: mbti,
  };
};

// 사용자가 설정한 집 비밀번호를 store에 저장하는 액션
export const sendPassword = (pw) => {
  return {
    type: ENTER_PASSWORD,
    payload: pw,
  };
};

// 사용자가 고른 가치관을 store에 저장하는 액션
export const sendValues = (data) => {
  const indices = [];
  let idx = data.indexOf(true);
  while (idx != -1) {
    indices.push(idx);
    idx = data.indexOf(true, idx + 1);
  }

  const final = [];
  for (let i = 0; i < valueList.length; i++) {
    if (indices.includes(i)) {
      final.push(valueList[i].name);
    }
  }

  return {
    type: ENTER_VALUES,
    payload: final,
  };
};

// 사용자가 입력한 닉네임을 서버에 전송하는 액션
// 닉네임 사용 가능 여부를 응답으로 받음
export const sendNickname = async (dataTosubmit) => {
  try {
    const req = await axios.post(
      REACT_APP_DB_HOST + "/accounts/v1/check_nickname/",
      dataTosubmit
    );
    return {
      type: NICKNAME_SUCCESS,
      payload: dataTosubmit.nickname,
    };
  } catch (e) {
    return {
      type: NICKNAME_FAILURE,
      payload: e,
    };
  }
};
// 서버에 회원가입 요청하는 액션
export const signUp = async (dataTosubmit) => {
  try {
    const req = await axios.post(
      REACT_APP_DB_HOST + "/accounts/v1/signup/",
      dataTosubmit
    );
    const { token } = req.data;
    localStorage.setItem("token", token);
    return {
      type: SIGNUP_SUCCESS,
      payload: req.data,
    };
  } catch (e) {
    return {
      type: SIGNUP_FAILURE,
      payload: e,
    };
  }
};

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
      return {
        result: action.payload,
      };
    default:
      return state;
  }
}
