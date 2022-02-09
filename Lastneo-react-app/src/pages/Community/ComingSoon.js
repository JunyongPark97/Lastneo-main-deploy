/* eslint-disable*/
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styled from "styled-components";
import { customMedia } from "../../styles/GlobalStyle";
import images from "../../assets";

function ComingSoon() {
  return (
    <>
      <Navbar goBack={true} />
      <StyledContainer>
        <h1>Coming Soon!</h1>
        <p className="desc">
          광장에서 다른 네오들과 소통해보세요!
          <br />
          빠른 시일내에 준비하여 찾아뵙겠습니다.
        </p>
        <img src={images.community} />
      </StyledContainer>
      <Footer />
    </>
  );
}

export default ComingSoon;

const StyledContainer = styled.div`
  color: ${(props) => props.theme.palette.powderGrey};
  text-align: center;
  justify-content: center;
  height: 100%;
  padding-top: 60px;
  h1 {
    font-size: 48px;
    font-weight: 900;
    margin-bottom: 20px;
  }
  p.desc {
    font-size: 20px;
    margin-bottom: 60px;
  }
  img {
    width: 600px;
    height: 300px;
    margin: 0 auto;
  }
  ${customMedia.lessThan("mobile")`
  h1 {
      font-size: 28px;
      margin-bottom: 12px;
  }
  p.desc {
      font-size: 14px;
      margin-bottom: 32px;
  }
  img {
      width: 300px;
      height: 150px;
  }
  `}
`;
