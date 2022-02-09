/* eslint-disable */
import axios from "axios";
import { REACT_APP_DB_HOST } from "../keys";

export const isOwner = async (data) => {
  const body = { nickname: data.nickname };
  try {
    const options = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    const req = await axios.post(
      REACT_APP_DB_HOST + `/api/v1/is_owner/`,
      body,
      options
    );
    return req;
  } catch (e) {
    return e;
  }
};
