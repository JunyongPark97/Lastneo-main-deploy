/* eslint-disable */
import axios from "axios";
import { REACT_APP_DB_HOST } from "../keys";

export const isOwner = async (data) => {
  console.log("isOwner");
  try {
    const options = {
      headers: { Authorization: localStorage.getItem("token") },
    };
    const req = await axios.get(
      REACT_APP_DB_HOST + `/api/v1/is_owner/${data.nickname}`,
      options
    );
    console.log(req);
    return req;
  } catch (e) {
    return e;
  }
};
