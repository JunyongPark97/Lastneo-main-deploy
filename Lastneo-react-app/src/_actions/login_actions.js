/* eslint-disable */
import axios from "axios";
import { ENTER_ADDRESS_SUCCESS, ENTER_ADDRESS_FAILURE } from "./types";
import { REACT_APP_DB_HOST } from "../keys";

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
