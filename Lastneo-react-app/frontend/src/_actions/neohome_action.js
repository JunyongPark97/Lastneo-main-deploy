/* eslint-disable */
import axios from "axios";
import {
  RESET_PW_AUTH_FAILURE,
  RESET_PW_AUTH_REQ_FAILURE,
  RESET_PW_AUTH_REQ_SUCCESS,
  RESET_PW_AUTH_SUCCESS,
} from "./types";

// 현관-로그인
export const login = async (dataTosubmit) => {
  try {
    const req = await axios.post(
      process.env.REACT_APP_DB_HOST + "/accounts/v1/login/",
      dataTosubmit
    );
    const { token } = req.data;
    localStorage.setItem("token", token);
    return {
      status: true,
      payload: req,
    };
  } catch (e) {
    console.log(e);
    return {
      payload: e,
    };
  }
};

// 비밀번호 재설정

// 인증번호 받기
export const getAuth = async (dataTosubmit) => {
  console.log(dataTosubmit);
  try {
    const req = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/v1/sms/reset_pw_send/",
      dataTosubmit
    );
    return {
      type: RESET_PW_AUTH_REQ_SUCCESS,
      status: true,
    };
  } catch (e) {
    return {
      type: RESET_PW_AUTH_REQ_FAILURE,
      payload: e.response.data,
    };
  }
};

// 인증번호 매칭 여부 확인
export const enterAuth = async (dataTosubmit) => {
  try {
    const req = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/v1/sms/reset_pw_confirm/",
      dataTosubmit
    );
    return {
      type: RESET_PW_AUTH_SUCCESS,
      status: true,
    };
  } catch (e) {
    return {
      type: RESET_PW_AUTH_FAILURE,
      payload: e.response.data,
    };
  }
};

// 재설정할 비밀번호 전송
export const enterNewPw = async (dataTosubmit) => {
  console.log(dataTosubmit);
  try {
    const req = await axios.post(
      process.env.REACT_APP_DB_HOST + "/accounts/v1/reset_pw/",
      dataTosubmit
    );
    return {
      status: true,
    };
  } catch (e) {
    console.log(e);
  }
};
