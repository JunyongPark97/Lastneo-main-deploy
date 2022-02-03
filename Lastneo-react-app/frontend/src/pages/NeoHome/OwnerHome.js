/* eslint-disable */
import React, { useState } from "react";
import styled, { css } from "styled-components";
import HomeDiv from "../../components/HomeDiv";
import { useDispatch, useSelector } from "react-redux";
import HomeFooter from "../../components/HomeFooter";
import Profile from "./Sections/Profile";
import CharacterRoom from "./CharacterRoom";
import NeoRoom from "./NeoRoom";
import HomeNav from "../../components/HomeNav";
import FltBtn from "../../components/FltBtn";
import { customMedia } from "../../styles/GlobalStyle";
import images from "../../assets";
import { getOwnerInfo } from "../../_actions/owner_action";

function OwnerHome({ nickname }) {
  const store = useSelector((store) => store.owner);
  const store_neohome = useSelector((store) => store.neohome);
  const dispatch = useDispatch();

  // const [tab, setTab] = useState(true); // true이면 캐릭터 방, false면 네오 방
  const { tab } = useSelector((state) => state.neohome);

  const onClickHandler = () => {
    dispatch(getOwnerInfo(nickname)).then((response) => {
      // 캐릭터방-네오방 이동할 때마다 서버에 요청해서 정보 업데이트
      if (response.type == "owner_info_success") {
        console.log(response);
        dispatch({ type: "set_tab", payload: !tab });
      }
    });
  };

  return (
    <HomeDiv>
      <Profile store={store} owner={true} nickname={nickname} />
      <HomeNav>
        <TabBtn
          onClick={() => {
            // setTab(true);
            dispatch({ type: "set_tab", payload: true });
          }}
          color={tab ? "black" : "white"}
          textColor={tab ? "white" : "grey"}
        >
          <img className="block-white" src={images.whiteblock} />
          <img className="block-pink" src={images.pinkblock} />
          캐릭터 방
        </TabBtn>
        <TabBtn
          onClick={() => {
            // setTab(false);
            dispatch({ type: "set_tab", payload: false });
          }}
          color={!tab ? "black" : "white"}
          textColor={!tab ? "white" : "grey"}
        >
          <img src={images.whiteblock} />
          네오 방
        </TabBtn>
      </HomeNav>
      {tab ? <CharacterRoom store={store} owner /> : <NeoRoom store={store} />}
      <FltBtn onClick={onClickHandler} color="black">
        {tab ? <>네오 방 가기</> : <>캐릭터 방 가기</>}
      </FltBtn>
      <HomeFooter />
    </HomeDiv>
  );
}

export default OwnerHome;

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
    const color = props.color;
    const textColor = props.textColor;
    const selected = props.theme.palette[color];
    const textSelected = props.theme.palette[textColor];
    return css`
      background-color: ${selected};
      color: ${textSelected};
    `;
  }}

  ${(props) => {
    const textColor = props.textColor;
    const textSelected = props.theme.palette[textColor];
    if (textColor == "grey") {
      return css`
        border: 1px solid ${textSelected};
        img.block-pink {
          display: none;
        }
      `;
    } else if (textColor == "white") {
      return css`
        img.block-white {
          display: none;
        }
      `;
    }
  }}

  ${customMedia.lessThan("mobile")`
  width: 164px;
  font-size: 16px;
  button {
    padding: 12px 0;
    width: 164px;
  }`}
`;
