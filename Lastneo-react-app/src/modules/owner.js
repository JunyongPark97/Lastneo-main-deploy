/* eslint-disable */
import axios from "axios";
import { REACT_APP_DB_HOST } from "../keys";

const OWNER_INFO_SUCCESS = "owner/OWNER_INFO_SUCCESS";
const OWNER_INFO_FAILURE = "owner/OWNER_INFO_FAILURE";

// 페이지 렌더링 시 서버로부터 정보 받아오기
export const getOwnerInfo = async (nickname) => {
  try {
    const options = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    };
    const req = await axios.get(
      REACT_APP_DB_HOST + `/api/v1/neohomeowner/${nickname}/`,
      options
    );
    return {
      type: OWNER_INFO_SUCCESS,
      payload: req.data,
    };
  } catch (e) {
    return {
      type: OWNER_INFO_FAILURE,
      payload: e,
    };
  }
};

export default function owner(state = {}, action) {
  switch (action.type) {
    case OWNER_INFO_SUCCESS:
      const data = action.payload;
      return data;
    case OWNER_INFO_FAILURE:
      return state;
    default:
      return state;
  }
}

// 사용자가 작성한 big5 질문에 대한 응답을 서버에 전송
export const sendBig5 = async (dataTosubmit) => {
  console.log(dataTosubmit);
  try {
    const options = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    };
    const req = await axios.post(
      REACT_APP_DB_HOST + "/api/v1/big5question/",
      dataTosubmit,
      options
    );
    return {
      payload: req.data,
    };
  } catch (e) {
    return {
      payload: e,
    };
  }
};

// 사용자가 수정한 홈 description을 서버에 전송
export const sendHomeDesc = async (data) => {
  const body = { description: data.description, nickname: data.nickname };
  try {
    const options = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    };
    const req = await axios.put(
      REACT_APP_DB_HOST + `/api/v1/homeintroduction/`,
      body,
      options
    );
    return {
      payload: data.description,
    };
  } catch (e) {
    return {
      payload: e,
    };
  }
};

// nft 생성하는 요청을 서버에 전송
export const createNft = async (data) => {
  const body = {};
  try {
    const options = {
      headers: { Authorization: `Token ${localStorage.getItem("token")}` },
    };
    const req = await axios.post(
      REACT_APP_DB_HOST + `/api/v1/nftblock/`,
      body,
      options
    );
    return {
      payload: req.data,
    };
  } catch (e) {
    return {
      payload: e,
    };
  }
};
