/* eslint-disable */
import axios from "axios";
import { REACT_APP_DB_HOST } from "../keys";

const GUEST_INFO_PENDING = "guest/GUEST_INFO_PENDING";
const GUEST_INFO_SUCCESS = "guest/GUEST_INFO_SUCCESS";
const GUEST_INFO_FAILURE = "guest/GUEST_INFO_FAILURE";

// 페이지 렌더링 시 서버로부터 정보 받아오기
export const getGuestInfo = (nickname) => async (dispatch) => {
  dispatch({ type: GUEST_INFO_PENDING });
  try {
    const req = await axios.get(
      REACT_APP_DB_HOST + `/api/v1/neohomeguest/${nickname}/`
    );
    dispatch({
      type: GUEST_INFO_SUCCESS,
      payload: req.data,
    });
  } catch (e) {
    dispatch({
      type: GUEST_INFO_FAILURE,
      error: e,
    });
  }
};

const initialState = {
  loading: false,
  data: null,
  error: null,
};
export default function (state = initialState, action) {
  switch (action.type) {
    case GUEST_INFO_PENDING:
      return {
        ...state,
        loading: true,
        data: null,
        error: null,
      };
    case GUEST_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        data: action.payload,
        error: null,
      };
    case GUEST_INFO_FAILURE:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    default:
      return state;
  }
}
