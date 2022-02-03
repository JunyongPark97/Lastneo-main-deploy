/* eslint-disable */
import React, { useEffect } from "react";
import SectionContainer from "../../../components/SectionContainer";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import { CopyToClipboard } from "react-copy-to-clipboard";
import styled from "styled-components";
import useScript from "../../../hooks";
import SmallPinkBtn from "../../../components/SmallPinkBtn";
import images from "../../../assets";
import { customMedia } from "../../../styles/GlobalStyle";
import KakaoShareButton from "../../../components/KaKaoShareButton";
import { useSelector } from "react-redux";

const ShareBtns = styled.div`
  align-items: center;
  margin-bottom: 40px;
  div {
    flex-direction: row;
    margin-bottom: 12px;
  }
  button {
    background-color: transparent;
    padding: 0;
  }
  img {
    width: 50px;
    height: 50px;
    margin: 0 4px;
    &:hover {
      filter: brightness(50%);
    }
  }
  p {
    font-size: 14px;
    color: ${(props) => props.theme.palette.black};
  }
  ${customMedia.lessThan("mobile")`
  margin-bottom: 24px;
  `}
`;

const CopyDiscode = styled.div`
  flex-direction: row;
  img {
    width: 50px;
    height: 50px;
    margin-bottom: 20px;
  }
  div {
    flex: 1;
    span {
      margin-bottom: 16px;
      h4 {
        font-size: 20px;
      }
      p {
        font-size: 14px;
      }
    }
  }
  h4 {
    margin-bottom: 4px;
  }

    margin-bottom: 0;
  }
  ${customMedia.lessThan("mobile")`
  flex-direction: column;
  div { 
    position: relative;
    flex-direction: row;
    margin-bottom: 33px;
    img {
      width: 40px;
      height: 40px;
      margin-right: 16px;
    }
    span {
      margin-right: 
      h4 {
        font-size: 16px;
      }
      p {
        font-size: 12px;
      }
    }
    button {
      position: absolute;
      right: 0;
    }
  }
  `}
`;
function Communication({ store }) {
  const kakaoData = { img: store.neo_image, home_address: store.home_address };
  const store_neohome = useSelector((store) => store.neohome);
  console.log(store_neohome);
  return (
    <SectionContainer color="pink" style={{ marginBottom: "60px" }}>
      <p>소통하기</p>
      <h3>
        네오 집을 친구에게 <span>공유</span>하고
        <br />
        다른 네오들과 <span>소통</span>해보세요
      </h3>
      <ShareBtns>
        <div>
          <KakaoShareButton props={kakaoData} />
          <FacebookShareButton url={store.home_address}>
            <img src={images.fb} />
          </FacebookShareButton>
          <TwitterShareButton url={store.home_address}>
            <img src={images.tw} />
          </TwitterShareButton>
        </div>
        <p>공유하기</p>
      </ShareBtns>
      <CopyDiscode>
        <div>
          <img src={images.pinkhome} />
          <span>
            <h4>{`lastneo.io/${store_neohome.nickname}`}</h4>
            <p>친구를 집으로 초대 해보세요!</p>
          </span>
          <CopyToClipboard text={store.home_address}>
            <SmallPinkBtn>복사하기</SmallPinkBtn>
          </CopyToClipboard>
        </div>
        <div>
          <img src={images.pinkbubble} />
          <span>
            <h4>디스코드방</h4>
            <p>나와 비슷한 네오들과 소통해보세요!</p>
          </span>
          <SmallPinkBtn>둘러보기</SmallPinkBtn>
        </div>
      </CopyDiscode>
    </SectionContainer>
  );
}

export default Communication;
