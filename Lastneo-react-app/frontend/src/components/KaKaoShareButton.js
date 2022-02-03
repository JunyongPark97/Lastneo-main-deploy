/* eslint-diable */
import React, { useEffect } from "react";
import images from "../assets";

const KakaoShareButton = (props) => {
  useEffect(() => {
    createKakaoButton(props);
  }, [props]);

  const createKakaoButton = (props) => {
    // kakao sdk script이 정상적으로 불러와졌으면 window.Kakao로 접근이 가능합니다
    console.log("log");
    if (window.Kakao) {
      const kakao = window.Kakao;
      // 중복 initialization 방지
      if (!kakao.isInitialized()) {
        // 두번째 step 에서 가져온 javascript key 를 이용하여 initialize
        const key = "9cc0f70eda489b2d9b532ad142f112ee";
        kakao.init(key);
      }
      kakao.Link.createDefaultButton({
        // Render 부분 id=kakao-link-btn 을 찾아 그부분에 렌더링을 합니다
        container: "#kakao-link-btn",
        objectType: "feed",
        content: {
          title: "라스트네오",
          description: "neo is real me",
          imageUrl: `${props.img}`,
          link: {
            mobileWebUrl: `${props.home_address}`,
            webUrl: `${props.home_address}`,
          },
        },
        buttons: [
          {
            title: "친구네 방 구경가기",
            link: {
              mobileWebUrl: `${props.home_address}`,
              webUrl: `${props.home_address}`,
            },
          },
        ],
      });
    }
  };
  return (
    <div className="kakao-share-button" style={{ margin: "0px" }}>
      {/* Kakao share button */}
      <button id="kakao-link-btn">
        <img src={images.kakao} alt="kakao-share-icon" />
      </button>
    </div>
  );
};
export default KakaoShareButton;
