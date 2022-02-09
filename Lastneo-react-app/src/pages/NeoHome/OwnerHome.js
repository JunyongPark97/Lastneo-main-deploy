/* eslint-disable */
import React, { useEffect, useState } from "react";
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
import Modal from "../../components/modals/WelcomeModal";
import { Helmet } from "react-helmet-async";

function OwnerHome({ nickname }) {
  const store = useSelector((store) => store.owner);
  const store_neohome = useSelector((store) => store.neohome);
  const currentUrl = document.location.href;
  const [modalVisible, setModalVisible] = useState(false);
  const dispatch = useDispatch();

  const { tab } = useSelector((state) => state.neohome);

  useEffect(() => {
    if (!store.is_done) {
      setModalVisible(true);
    }
    dispatch({ type: "set_tab", payload: "character" });
  }, []);

  const closeModal = () => {
    setModalVisible(false);
  };
  const scrollModal = () => {
    dispatch({ type: "set_scroll" });
    setModalVisible(false);
    dispatch({ type: "set_tab", payload: "neo" });
  };

  const onClickHandler = () => {
    dispatch(getOwnerInfo(nickname)).then((response) => {
      // 캐릭터방-네오방 이동할 때마다 서버에 요청해서 정보 업데이트
      if (response.type == "owner_info_success") {
        if (tab == "character") {
          dispatch({ type: "set_tab", payload: "neo" });
        } else {
          dispatch({ type: "set_tab", payload: "character" });
        }
      }
    });
  };

  return (
    <>
      <Helmet>
        {/* URL 정보 */}
        <meta property="og:url" content={currentUrl} />
        {/* title 정보 */}
        <meta
          property="og:title"
          content={`${store_neohome.nickname}님의 네오입니다.`}
        />
        {/* 페이지 상세 정보 */}
        <meta property="og:description" content="네오 설명" />
        {/* 페이지 대표 이미지 정보 */}
        <meta property="og:image" content={store.mini_profile} />
        {/* 트위터 메타 정보 */}
        <meta
          name="twitter:title"
          content={`${store_neohome.nickname}의 네오입니다.`}
        />
        <meta name="twitter:description" content="네오 설명" />
        <meta name="twitter:image" content={store.mini_profile} />
      </Helmet>
      <HomeDiv>
        <Profile store={store} owner={true} nickname={nickname} />
        <HomeNav>
          <TabBtn
            className="tab-char"
            onClick={() => {
              dispatch({ type: "set_tab", payload: "character" });
            }}
            color={tab == "character" ? "black" : "white"}
            textColor={tab == "character" ? "white" : "gray"}
          >
            <img className="block-white" src={images.whiteblock} />
            <img className="block-pink" src={images.pinkblock} />
            캐릭터 방
          </TabBtn>
          <TabBtn
            className="tab-neo"
            onClick={() => {
              dispatch({ type: "set_tab", payload: "neo" });
            }}
            color={tab == "neo" ? "black" : "white"}
            textColor={tab == "neo" ? "white" : "gray"}
          >
            <img className="block-white" src={images.whiteblock} />
            <img className="block-black" src={images.blackblock} />
            네오 방
          </TabBtn>
        </HomeNav>
        {tab == "character" ? (
          <CharacterRoom store={store} owner />
        ) : (
          <NeoRoom store={store} />
        )}
        <FltBtn onClick={onClickHandler} color="black">
          {tab == "character" ? <>네오 방 가기</> : <>캐릭터 방 가기</>}
        </FltBtn>
        <HomeFooter />
        {modalVisible && (
          <Modal
            visible={modalVisible}
            closable={true}
            maskClosable={true}
            onClose={closeModal}
            onScroll={scrollModal}
          />
        )}
      </HomeDiv>
    </>
  );
}

export default OwnerHome;

const TabBtn = styled.button`
  padding: 18px 0;
  width: 320px;
  text-align: center;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 12px 12px 0 0;
  font-size: 18px;
  font-weight: 500;
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
    if (textColor == "gray") {
      return css`
        border: 1px solid ${(props) => props.theme.palette.paleGrey};
        &:hover {
          border: 1px solid ${(props) => props.theme.palette.lightGrey};
          background: ${(props) => props.theme.palette.lightGrey};
        }
        img.block-pink,
        img.block-black {
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
