/* eslint-disable */
import { GUEST_INFO_SUCCESS } from "../_actions/types";

export default function (state = {}, action) {
  switch (action.type) {
    case GUEST_INFO_SUCCESS:
      const data = action.payload;
      return data;
    // case GUEST_INFO_FAILURE:
    //   return {
    //     mini_profile: data.mini_profile,
    //     home_address: data.home_address,
    //     description: data.description,
    //     mbti: data.mbti,
    //     mbti_name: data.mbti_name,
    //     neo_image: data.neo_image,
    //     value_items: data.value_items,
    //     // big5_items: data.big5_items,
    //     big5_items: [
    //       { item_image: "temp", name: "소극적인 멜빵" },
    //       { item_image: "temp", name: "소극적인 멜빵" },
    //       { item_image: "temp", name: "소극적인 멜빵" },
    //     ],
    //     // nfts_info: data.nfts_info,
    //     nfts_info: [
    //       {
    //         nft_image:
    //           "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/nft/228/38",
    //         created_at: "2022-01-24T18:49:48.910401Z",
    //       },
    //       {
    //         nft_image:
    //           "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/nft/228/38",
    //         created_at: "2022-01-24T18:49:48.910401Z",
    //       },
    //       {
    //         nft_image:
    //           "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/nft/228/38",
    //         created_at: "2022-01-24T18:49:48.910401Z",
    //       },
    //       {
    //         nft_image:
    //           "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/nft/228/38",
    //         created_at: "2022-01-24T18:49:48.910401Z",
    //       },
    //       {
    //         nft_image:
    //           "https://lastneo-storages-dev.s3.ap-northeast-2.amazonaws.com/media/nft/228/38",
    //         created_at: "2022-01-24T18:49:48.910401Z",
    //       },
    //     ],
    //   };
    default:
      return state;
  }
}
