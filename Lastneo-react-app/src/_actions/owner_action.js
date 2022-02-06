/* eslint-disable */
import axios from "axios";
import {
  OWNER_INFO_SUCCESS,
  OWNER_INFO_FAILURE,
  SEND_BIG5_SUCCESS,
  SEND_BIG5_FAILURE,
  EDIT_DESC_SUCCESS,
  EDIT_DESC_FAILURE,
} from "./types";

// 페이지 렌더링 시 서버로부터 정보 받아오기
export const getOwnerInfo = async (nickname) => {
  console.log("주인 정보 요청");
  try {
    const options = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    };
    const req = await axios.get(
      process.env.REACT_APP_DB_HOST + `/api/v1/neohomeowner/${nickname}/`,
      options
    );
    console.log(req);
    return {
      type: OWNER_INFO_SUCCESS,
      payload: req.data,
    };
  } catch (e) {
    console.log(e);
    return {
      type: OWNER_INFO_FAILURE,
      payload: e,
    };
  }
};

// 사용자가 작성한 big5 질문에 대한 응답을 서버에 전송
export const sendBig5 = async (dataTosubmit) => {
  try {
    const options = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    };
    const req = await axios.post(
      process.env.REACT_APP_DB_HOST + "/api/v1/big5question/",
      dataTosubmit,
      options
    );
    console.log(req);
    return {
      type: SEND_BIG5_SUCCESS,
      payload: req.data,
    };
  } catch (e) {
    return {
      type: SEND_BIG5_FAILURE,
      payload: e,
    };
  }
};

// 사용자가 수정한 홈 description을 서버에 전송
export const sendHomeDesc = async (data) => {
  const body = { description: data.description };
  console.log("요청 발생!");
  try {
    const options = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    };
    const req = await axios.put(
      process.env.REACT_APP_DB_HOST +
        `/api/v1/homeintroduction/${data.nickname}/`,
      body,
      options
    );
    return {
      type: EDIT_DESC_SUCCESS,
      payload: data.description,
    };
  } catch (e) {
    return {
      type: EDIT_DESC_FAILURE,
      payload: e,
    };
  }
};
