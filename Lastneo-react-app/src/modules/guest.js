/* eslint-disable */
import axios from "axios";
import { REACT_APP_DB_HOST } from "../keys";

const GUEST_INFO_SUCCESS = "guest/GUEST_INFO_SUCCESS";

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

export default function (state = {}, action) {
  switch (action.type) {
    case GUEST_INFO_SUCCESS:
      const data = action.payload;
      return data;
    default:
      return state;
  }
}
