/* eslint-disable */
import axios from "axios";
import { GUEST_INFO_SUCCESS, GUEST_INFO_FAILURE } from "./types";

// 페이지 렌더링 시 서버로부터 정보 받아오기
export const getGuestInfo = async (nickname) => {
  console.log("게스트 정보 요청");
  try {
    const req = await axios.get(
      process.env.REACT_APP_DB_HOST + `/api/v1/neohomeguest/${nickname}`
    );
    console.log(req.data);
    return {
      type: GUEST_INFO_SUCCESS,
      payload: req.data,
    };
  } catch (e) {
    console.log(e);
    return {
      type: GUEST_INFO_FAILURE,
      payload: e,
    };
  }
};
