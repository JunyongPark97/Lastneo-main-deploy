/* eslint-disable */
import axios from "axios";

import valueList from "../assets/values";
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
  SIGNUP_FAILURE,
  NICKNAME_SUCCESS,
  NICKNAME_FAILURE,
} from "./types";

// 핸드폰 번호 입력 후 인증번호 전송 요청하는 액션
export const getAuth = async (dataTosubmit) => {
  try {
    console.log(dataTosubmit);
    const req = await axios.post(
      // process.env.REACT_APP_DB_HOST + "/api/v1/sms/send/",
      "/api/v1/sms/send/",
      dataTosubmit
    );
    console.log("res");
    console.log(req);
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
      process.env.REACT_APP_DB_HOST + "/api/v1/sms/confirm/",
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
    console.log(dataTosubmit);
    const req = await axios.post(
      process.env.REACT_APP_DB_HOST + "/accounts/v1/check_nickname/",
      dataTosubmit
    );
    console.log(req);
    return {
      type: NICKNAME_SUCCESS,
      payload: dataTosubmit.nickname,
    };
  } catch (e) {
    console.log(e);
    return {
      type: NICKNAME_FAILURE,
      payload: e,
    };
  }
};
// 서버에 회원가입 요청하는 액션
export const signUp = async (dataTosubmit) => {
  console.log("회원가입 정보");
  console.log(dataTosubmit);
  try {
    const req = await axios.post(
      process.env.REACT_APP_DB_HOST + "/accounts/v1/signup/",
      dataTosubmit
    );
    const { token } = req.data;
    console.log("토큰");
    console.log(token);
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
