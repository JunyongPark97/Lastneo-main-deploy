/* eslint-disable */
import React, { useState, useEffect } from "react";
import { useLocation, useHistory } from "react-router";
import styled from "styled-components";
import bell from "../../assets/bell.png";
import lock from "../../assets/lock.png";
import EnterPw from "./EnterPw";
import images from "../../assets";
import Footer from "../../components/Footer";
import { customMedia } from "../../styles/GlobalStyle";
import Navbar from "../../components/Navbar";
import Container from "../../components/Container";

function FrontDoor() {
  const [passwordUI, setPasswordUI] = useState(false);
  const [nickname, setNickname] = useState("");
  const location = useLocation();
  const history = useHistory();
  useEffect(() => {
    setNickname(location.state.nickname);
  }, []);
  const onBellHandler = () => {
    history.push({
      pathname: `/${nickname}`,
      state: { from: "frontdoor", status: 1 },
    });
  };
  const onLockHandler = () => {
    setPasswordUI(true);
  };
  return (
    <>
      <Navbar color="#666666" goBack={false} />
      <Container>
        {!passwordUI ? (
          <Default
            onLockHandler={onLockHandler}
            onBellHandler={onBellHandler}
            nickname={nickname}
          />
        ) : (
          <EnterPw nickname={nickname} />
        )}
        <Footer />
      </Container>
    </>
  );
}

function Default({ onLockHandler, onBellHandler, nickname }) {
  return (
    <StyledDiv>
      <h4>
        집 주소
        <br />
        {`https://lastneo.io/${nickname}`}
      </h4>
      <h3>초인종을 눌러 안으로 들어가보세요</h3>
      <ImgDiv>
        <img src={images.frontdoorhome} />
      </ImgDiv>
      <BellBtn onClick={onBellHandler}>
        <img src={bell} />
      </BellBtn>
      <LockBtn>
        <p>집 주인이신가요?</p>
        <button onClick={onLockHandler}>
          <img src={lock} />
        </button>
      </LockBtn>
    </StyledDiv>
  );
}

export default FrontDoor;

const StyledDiv = styled.div`
  color: ${(props) => props.theme.palette.lightGrey};
  padding-bottom: 180px;
  background: lavender;
  background-color: rgba(0, 0, 0, 0.6);
  flex-grow: 1;
  flex-shrink: 0;
  position: relative;
  align-items: center;
  text-align: center;
  width: 100%;
  padding-top: 60px;
  h4 {
    margin-bottom: 40px;
  }
  ${customMedia.lessThan("mobile")`
  h4 {
    font-size: 16px;
  }
  h3 {
    font-size: 20px;
  }
    `}
`;

const ImgDiv = styled.div`
  position: absolute;
  top: 0;
  height: 100%;
  z-index: -100;
  text-align: center;
  img {
    display: inline;
    margin: auto;
    width: auto;
    height: 50%;
  }
`;

const BellBtn = styled.button`
  background: none;
  img {
    width: 120px;
    height: 120px;
  }
  position: absolute;
  top: 50%;
  margin-bottom: 30px;
`;

const LockBtn = styled.button`
  background: none;
  img {
    width: 60px;
    height: 60px;
  }
  button {
    background: none;
  }
  p {
    color: ${(props) => props.theme.palette.lightGrey};
    margin-bottom: 8px;
  }
  position: absolute;
  top: 80%;
`;
