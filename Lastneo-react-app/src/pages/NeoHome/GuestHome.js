/* eslint-disable */
import React, { useEffect, useReducer, useState } from "react";
import { useSelector } from "react-redux";
import HomeDiv from "../../components/HomeDiv";
import HomeFooter from "../../components/HomeFooter";
import CharacterRoom from "./CharacterRoom";
import HomeNav from "../../components/HomeNav";
import Profile from "./Sections/Profile";
import styled, { css } from "styled-components";
import images from "../../assets";
import { customMedia } from "../../styles/GlobalStyle";
import FltBtn from "../../components/FltBtn";
import { useHistory } from "react-router";
import HomeNavbar from "../../components/HomeNavbar";
const GuestHome = () => {
  const history2 = useHistory();
  const store = useSelector((store) => store.guest);
  console.log(history2);
  const onClickHandler = () => {
    history2.push("/register");
  };
  return (
    <>
      <HomeNavbar />
      <HomeDiv>
        <Profile store={store} owner={false} />
        <HomeNav>
          <TabBtn color="black" textColor="white">
            <img src={images.pinkblock} />
            캐릭터 방
          </TabBtn>
        </HomeNav>
        <CharacterRoom store={store} owner={false} />
        <FltBtn color="pink" onClick={onClickHandler}>
          내 네오 만들기
        </FltBtn>
        <HomeFooter />
      </HomeDiv>
    </>
  );
};

export default GuestHome;

const TabBtn = styled.button`
  padding: 16px 0;
  width: 320px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px 12px 0 0;
  font-size: 18px;
  img {
    width: 20px;
    height: 20px;
    margin-right: 20px;
    margin-bottom: 0;
  }
  ${(props) => {
    console.log(props.color);
    const color = props.color;
    const textColor = props.textColor;
    const selected = props.theme.palette[color];
    const textSelected = props.theme.palette[textColor];
    return css`
      background-color: ${selected};
      color: ${textSelected};
    `;
  }}

  ${customMedia.lessThan("mobile")`
  width: 164px;
  font-size: 16px;
  button {
    padding: 12px 0;
    width: 164px;
  }`}
`;
