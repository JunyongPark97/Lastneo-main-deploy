/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterIcon,
  TwitterShareButton,
} from "react-share";
import KakaoShareButton from "../../components/KaKaoShareButton";
import { CopyToClipboard } from "react-copy-to-clipboard";
import SmallPinkBtn from "../../components/SmallPinkBtn";
import useScript from "../../hooks";
import { customMedia } from "../../styles/GlobalStyle";
import Container from "../../components/Container";
import ResultNavbar from "../../components/ResultNavbar";
import ResultFooter from "../../components/ResultFooter";
import images from "../../assets";

function Result() {
  const store = useSelector((store) => store.register.result);
  console.log(store);
  const history = useHistory();
  const kakaoData = { img: store.neo_image, home_address: store.home_address };
  const onClickHandler = () => {
    history.push({
      pathname: `/${store.nickname}`,
      state: {
        from: "register",
      },
    });
  };

  const status = useScript("https://developers.kakao.com/sdk/js/kakao.js");
  return (
    <>
      <ResultNavbar />
      <Container>
        <StyledDiv>
          <h3>나의 네오 캐릭터는..</h3>
          <h1>
            {/* {store.item_description} */}
            {generateItemDesc(store)}
            <p>
              '{store.mbti} <span>{store.mbti_name}</span>'
            </p>
          </h1>
          <img src={store.neo_image} />
          <p>나를 담은 네오가 표현된 캐릭터에요!</p>
          <ShareDiv>
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
          </ShareDiv>
          <h3 className="address-desc">
            네오는 아래 <span>집 주소</span>에서 만날 수 있어요
          </h3>
          <h2>{store.home_address}</h2>
          <CopyToClipboard text={store.home_address}>
            <SmallPinkBtn>주소 복사</SmallPinkBtn>
          </CopyToClipboard>
          <StaticBtn onClick={onClickHandler} color="pink">
            네오 집으로 가기
          </StaticBtn>
        </StyledDiv>
        <ResultFooter />
      </Container>
    </>
  );
}

export default Result;

const generateItemDesc = (store) => {
  const { item_name, value_name, item_description } = store;
  const idx1 = item_description.search(item_name);
  const idx2 = item_description.search(value_name);
  const len1 = item_name.length;
  const len2 = value_name.length;
  const text1 = item_description.substring(idx2 + len2, idx1);
  const text2 = item_description.substr(idx1 + len1);

  return (
    <p>
      <span>{value_name}</span>
      {text1}
      <span>{item_name}</span>
      {text2}
    </p>
  );
};

const StaticBtn = styled(Button)`
  margin-top: 60px;
  margin-bottom: 60px;
  position: static;
  ${customMedia.lessThan("mobile")`
  margin: 48px 0;
  `}
`;

const StyledDiv = styled.div`
  color: ${(props) => props.theme.palette.black};
  * {
    text-align: center;
  }
  background-color: ${(props) => props.theme.palette.lightYellow};
  width: 100%;
  flex-grow: 1;
  align-items: center;
  padding-top: 72px;
  h1 {
    font-size: 24px;
    margin-bottom: 16px;
    line-height: 32px;
    p {
      font-size: 24px;
      color: ${(props) => props.theme.palette.black};
      margin-bottom: 0;
    }
    span {
      font-weight: 700;
    }
  }
  h2 {
    font-size: 24px;
    font-weight: 500;
    margin-bottom: 16px;
  }
  h3 {
    font-size: 16px;
    margin-bottom: 16px;
    font-weight: 500;
    span {
      font-weight: 700;
    }
  }
  h3.address-desc {
    margin-bottom: 8px;
    font-weight: 400;
  }
  img {
    width: 300px;
    height: 300px;
    margin-top: 40px;
    border-radius: 24px;
  }
  p {
    font-weight: 400;
    margin-top: 8px;
    color: ${(props) => props.theme.palette.darkGrey};
  }
  button {
    img {
      width: 40px;
      height: 40px;
      margin: 0 4px;
    }
  }
  ${customMedia.lessThan("mobile")`
  padding-top: 24px;
  h1 {
    font-size: 20px;
    line-height: 28px;
  }
  h2 {
    font-weight: 400;
    font-size: 16px; 
  }
  h3 {
    font-size: 14px;
    margin-bottom: 8px;
  }
  img {
    margin-top: 32px;
  }

  `}
`;

const ShareDiv = styled.div`
  div {
    flex-direction: row;
    margin-bottom: 12px;
  }
  button {
    background-color: transparent;
    padding: 0;
  }
  img {
    margin-top: 0px;
    width: 40px;
    height: 40px;
    &:hover {
      filter: brightness(50%);
    }
  }
  p {
    margin: 0;
    font-weight: 500;
    color: ${(props) => props.theme.palette.black};
  }
  margin-top: 40px;
  margin-bottom: 40px;
  ${customMedia.lessThan("mobile")`
    margin-top: 32px;
    margin-bottom: 24px;
  `}
`;
