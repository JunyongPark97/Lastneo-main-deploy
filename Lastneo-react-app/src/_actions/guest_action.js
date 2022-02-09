/* eslint-disable */
import axios from "axios";
import { GUEST_INFO_SUCCESS, GUEST_INFO_FAILURE } from "./types";
import { REACT_APP_DB_HOST } from "../keys";

// 페이지 렌더링 시 서버로부터 정보 받아오기
export const getGuestInfo = async (nickname) => {
  try {
    const req = await axios.get(
      REACT_APP_DB_HOST + `/api/v1/neohomeguest/${nickname}/`
    );
    return {
      type: GUEST_INFO_SUCCESS,
      payload: req.data,
    };
  } catch (e) {
    return {
      type: GUEST_INFO_FAILURE,
      payload: e,
    };
  }
};
