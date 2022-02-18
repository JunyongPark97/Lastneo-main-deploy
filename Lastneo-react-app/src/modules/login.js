/* eslint-disable */
// 로그인(네오 입주 페이지)과 관련된 액션 타입, 액션 생성 함수, 리듀서가 정의되어 있습니다. (Ducks 패턴)
import axios from "axios";
import { REACT_APP_DB_HOST } from "../keys";

// 액션 타입
const ENTER_ADDRESS_SUCCESS = "login/ENTER_ADDRESS_SUCCESS";
const ENTER_ADDRESS_FAILURE = "login/ENTER_ADDRESS_FAILURE";

// 액션 생성 함수
export const enterAddress = async (dataTosubmit) => {
  try {
    const request = await axios.post(
      REACT_APP_DB_HOST + "/api/v1/door/",
      dataTosubmit
    );
    return {
      type: ENTER_ADDRESS_SUCCESS,
      payload: request.data,
    };
  } catch (e) {
    return {
      type: ENTER_ADDRESS_FAILURE,
      payload: e,
    };
  }
};

// 리듀서
export default function login(
  state = { loginAttempt: false, loginSucceed: false },
  action
) {
  switch (action.type) {
    case ENTER_ADDRESS_SUCCESS:
      return {
        ...state,
        loginSucceed: action.payload.is_exact,
        hash_address: action.payload.hash_address,
      };
    case ENTER_ADDRESS_FAILURE:
      return {
        ...state,
        loginSucceed: false,
      };
    default:
      return state;
  }
}
