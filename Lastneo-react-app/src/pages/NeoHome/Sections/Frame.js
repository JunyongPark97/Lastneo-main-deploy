/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import NewItemModal from "../../../components/NewItemModal";
import yellowalert from "../../../assets/yellowalert.png";
import ItemsContainer from "../../../components/ItemsContainer";
import SectionContainer from "../../../components/SectionContainer";
import SmallPinkBtn from "../../../components/SmallPinkBtn";
import { customMedia } from "../../../styles/GlobalStyle";

const FramesContainer = styled(ItemsContainer)`
  div {
    width: 100%;
    overflow: auto;
  }
  ${customMedia.lessThan("mobile")`
  div {
    width: calc(100vw - 96px);
  }
  `}
`;
const FrameTable = styled.div`
  display: table;
  // padding-top: 32px;
  border-top: solid 1px ${(props) => props.theme.palette.lightPink};
  border-spacing: 60px;
  ${customMedia.lessThan("mobile")`
  border-spacing: 32px;
  width: 100%;
  `}
`;
const FrameCell = styled.div`
  display: table-cell;
  text-align: center;
  img {
    width: 300px;
    height: 300px;
    margin-top: 8px;
    margin-bottom: 8px;
  }
  p {
    font-size: 14px;
    margin-bottom: 0px;
  }
  ${customMedia.lessThan("mobile")`
  img {
    width: 240px;
    height: 240px;
  }
  `}
`;

function Frame({ store }) {
  const localstore = store.nfts_info;
  const [modal, setModal] = useState(false);
  const [modalMsg, setModalMsg] = useState(-1);
  const messages = [
    "아직 발급받은 액자가 없어요. 네오 방에서 인격을 공유해보세요!",
    "새로운 캐릭터 액자가 있어요! 네오의 소유권이 생겼네요!",
  ];

  useEffect(() => {
    if (localstore.length == 0) {
      setModal(true);
      setModalMsg(0);
    }
  }, []);
  return (
    <SectionContainer color="pink">
      <p>액자</p>
      <h3 className={!modal ? "broad-margin" : undefined}>
        네오 소유권과 함께
        <br />
        캐릭터 액자가 <span>{localstore.length}번</span> 발급되었어요
      </h3>
      {modal && (
        <NewItemModal>
          <img src={yellowalert} />
          <p>{messages[modalMsg]}</p>
        </NewItemModal>
      )}
      {localstore.length != 0 && (
        <FramesContainer>
          <span>발급받은 네오 캐릭터의 액자에요!</span>
          <div>
            <FrameTable>
              {localstore.map((item, i) => {
                return (
                  <FrameCell key={i}>
                    <p>
                      {i + 1}번째 {item.created_at}
                    </p>
                    <img src={item.nft_image} />
                    <p>액자와 함께 발급된 nft를 확인해보세요</p>
                    <SmallPinkBtn>보러가기</SmallPinkBtn>
                  </FrameCell>
                );
              })}
            </FrameTable>
          </div>
        </FramesContainer>
      )}
    </SectionContainer>
  );
}

export default Frame;
