/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";
import NewItemModal from "../../../components/NewItemModal";
import ItemsContainer from "../../../components/ItemsContainer";
import yellowalert from "../../../assets/yellowalert.png";
import SectionContainer from "../../../components/SectionContainer";
import { customMedia } from "../../../styles/GlobalStyle";
import images from "../../../assets";

function Item({ store }) {
  const localstore = store.items;
  const { items, newItem } = generateCell(localstore);
  const [modal, setModal] = useState(newItem);
  return (
    <SectionContainer color="pink">
      <p>아이템</p>
      <h3 className={!modal ? "broad-margin" : undefined}>
        인격이 담긴 네오가
        <br />
        캐릭터에 <span>표현한 아이템</span>이에요
      </h3>
      {modal && (
        <NewItemModal newItem={newItem}>
          <img src={yellowalert} />
          <p className="msg-web">
            이전과 달라진 아이템이 있어요. 네오가 인격을 담았나 보군요!
          </p>
          <p className="msg-mobile">
            이전과 달라진 아이템이 있어요.
            <br />
            네오가 인격을 담았나 보군요!
          </p>
        </NewItemModal>
      )}
      <ItemsContainer>
        <p className="title">
          네오 캐릭터의 <span>아이템</span>이에요!
        </p>
        <GridContainer>
          {[...Array(6)].map((e, i) => {
            return (
              items[i] || (
                <GridItem>
                  <div className="item-wrapper">
                    <img className="item-bg" src={images.itembg} />
                    <img className="item-img" src={images.emptycell} />
                  </div>
                  <p className="item-desc"></p>
                </GridItem>
              )
            );
          })}
        </GridContainer>
      </ItemsContainer>
    </SectionContainer>
  );
}

export default Item;

const GridContainer = styled.div`
  width: 100%;
  height: 100%;
  border-top: solid 1px ${(props) => props.theme.palette.lightPink};
  padding-top: 32px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 16px 30px;
  grid-gap: 16px 30px;
  ${customMedia.lessThan("mobile")`
    padding-top: 24px;
    gap: 12px 24px;
    grid-gap: 12px 24px;
  `}
`;

const GridItem = styled.div`
  position: relative;
  .item-wrapper {
    position: relative;
    width: 100%;
    padding-bottom: 100%;
    border-radius: 16px;
    margin-bottom: 8px;
  }

  .item-img {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 10;
  }

  .item-bg {
    width: 100%;
    height: auto;
    position: absolute;
    top: 0;
    left: 0;
  }
  .item-desc {
    text-align: center;
    word-break: keep-all;
    font-size: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.black};
  }

  ${customMedia.lessThan("mobile")`
    .item-wrapper {
      margin-bottom: 4px;
    }
    .item-desc {
      font-size: 12px;
      line-height: 17px;
    }
  `}
`;

const NewAlert = styled.span`
  position: absolute;
  /* bottom: 0px; */
  left: 50%;
  bottom: 0px;
  transform: translateX(-50%);
  margin-bottom: 0;
  z-index: 10;
  color: ${(props) => props.theme.palette.pink};
  font-size: 18px;
  font-weight: 900;
  ${customMedia.lessThan("mobile")`
    font-size: 12px;
  `}
`;
const generateCell = (data) => {
  const items = [];
  let newItem = false;

  // 가치관 아이템 추가
  items.push(
    <GridItem key="0">
      <div className="item-wrapper">
        <img src={data[0].item_image} className="item-img" />
        <img src={images.itembg} className="item-bg" />
        {data[0].today_received && <NewAlert>N</NewAlert>}
      </div>
      <p className="item-desc">{data[0].item_name}</p>
    </GridItem>
  );

  const reverse_items = data.slice(1).reverse();
  reverse_items.map((item, i) => {
    if (item.today_received) {
      newItem = true;
    }
    const cell = (
      <GridItem key={i + 1}>
        <div className="item-wrapper">
          <img src={item.item_image} className="item-img" />
          <img src={images.itembg} className="item-bg" />
          {item.today_received && <NewAlert>N</NewAlert>}
        </div>
        <p className="item-desc">{item.item_name}</p>
      </GridItem>
    );
    items.push(cell);
  });
  const result = { items, newItem };
  return result;
};
