/* eslint-disable */
import axios from "axios";
import {
  OWNER_INFO_SUCCESS,
  OWNER_INFO_FAILURE,
  SEND_BIG5_SUCCESS,
  SEND_BIG5_FAILURE,
  EDIT_DESC_SUCCESS,
  EDIT_DESC_FAILURE,
  CREATE_NFT_SUCCESS,
  CREATE_NFT_FAILURE,
} from "./types";
import { REACT_APP_DB_HOST } from "../keys";

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
      // payload: {
      //   neo_room_image:
      //     "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/home/image/%EB%84%A4%EC%98%A4_%EC%BA%90%EB%A6%AD%ED%84%B0_%EB%B0%A9_%EB%B6%84%ED%99%8D.png",
      //   mini_profile:
      //     "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/neoupperimage/342/53KPlDz.png",
      //   home_address: "http://3.37.14.91/erenshin",
      //   mbti: "ENFP",
      //   mbti_name: "범고래",
      //   description: "나를 담는 단 하나의 방법 '네오'",
      //   neo_image:
      //     "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/neoimage/342/M2vLden.png",
      //   value_items: {
      //     value_name: "권력",
      //     name: "체스말",
      //     description: "권력을 위한 체스말을 가진",
      //     item_image:
      //       "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/item/meta/%EC%B2%B4%EC%8A%A4%EB%A7%90",
      //   },
      //   items: [
      //     {
      //       item_name: "체스말",
      //       item_image:
      //         "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/item/meta/%EC%B2%B4%EC%8A%A4%EB%A7%90",
      //       created_at: "2022년 02월 03일",
      //       today_received: true,
      //     },
      //     {
      //       item_name: "감성적인 비닐봉투",
      //       item_image:
      //         "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/item/meta/%EA%B0%90%EC%84%B1%EC%A0%81%EC%9D%B8_%EB%B9%84%EB%8B%90%EB%B4%89%ED%88%AC",
      //       created_at: "2022년 02월 03일",
      //       today_received: true,
      //     },
      //   ],
      //   nfts_info: [
      //     {
      //       nft_image:
      //         "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/neoupperimage/412/CjhCmtY.jpg",
      //       created_at: "2022.02.08",
      //       today_received: false,
      //     },
      //     {
      //       nft_image:
      //         "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/neoupperimage/412/CjhCmtY.jpg",
      //       created_at: "2022.02.11",
      //       today_received: false,
      //     },
      //     {
      //       nft_image:
      //         "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/neoupperimage/412/CjhCmtY.jpg",
      //       created_at: "2022.02.13",
      //       today_received: false,
      //     },
      //     {
      //       nft_image:
      //         "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/neoupperimage/412/CjhCmtY.jpg",
      //       created_at: "2022.02.17",
      //       today_received: false,
      //     },
      //   ],
      //   today_datetime: "2022.02.11",
      //   neo_questions: [
      //     {
      //       id: 31,
      //       section: "A",
      //       question: "타인의 문제에 대해 관심이 없다.",
      //     },
      //     {
      //       id: 22,
      //       section: "A",
      //       question: "타인의 걱정에 대해 관심이 없다.",
      //     },
      //     {
      //       id: 35,
      //       section: "A",
      //       question: "나는 타인을 위해 어떤 것이든 한다.",
      //     },
      //     {
      //       id: 40,
      //       section: "A",
      //       question: "타인을 위해 내 시간을 쓴다.",
      //     },
      //     {
      //       id: 37,
      //       section: "A",
      //       question: "타인에 대해 관심이 많다.",
      //     },
      //   ],
      //   neo_blocks: {
      //     num_block: 2,
      //     remain_block: 2,
      //   },
      //   is_done: false,
      //   is_weekend: true,
      // },
    };
  } catch (e) {
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
      REACT_APP_DB_HOST + "/api/v1/big5question/",
      dataTosubmit,
      options
    );
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
    console.log(req);
    return {
      type: CREATE_NFT_SUCCESS,
      payload: req.data,
    };
  } catch (e) {
    return {
      type: CREATE_NFT_FAILURE,
      payload: e,
      // payload: {
      //   // 임시 데이터
      //   nft_image:
      //     "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/neoupperimage/412/CjhCmtY.jpg",
      // },
    };
  }
};
