/* eslint-disable*/
import React from "react";
import images from "../assets";
import styled from "styled-components";
import Footer from "../components/Footer";
import Container from "../components/Container";
import Navbar from "../components/Navbar";
import { customMedia } from "../styles/GlobalStyle";
function NotFound() {
  return (
    <div style={{ height: "100%", width: "100%" }}>
      <Navbar />
      <StyledContainer>
        <h1>404 Error</h1>
        <p className="desc">
          요청하신 페이지를 찾을 수 없습니다.
          <br />
          입력하신 주소가 정확한지 다시 한번 확인해주세요.
        </p>
        <img src={images.yellowalert} />
      </StyledContainer>
      <Footer />
    </div>
  );
}

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
    width: 200px;
    height: 200px;
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
      width: 128px;
      height: 128px;
  }
  `}
`;
export default NotFound;
