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

const ItemTable = styled.div`
  padding: 32px 0px 16px 0px;
  width: 100%;
  border-top: solid 1px ${(props) => props.theme.palette.lightPink};
  ${customMedia.lessThan("mobile")`
    padding: 12px 0;
  `}
`;

const ItemRow = styled.div`
  background: blue;
  display: flex;
  flex-direction: row;
  flex: auto;
  justify-content: space-between;
  width: 100%;
`;

const ItemCell = styled.div`
  position: relative;
  display: flex;
  text-align: center;
  margin-top: 0px;
  background: lavender;
  border: 1px solid pink;
  padding-bottom: 76px;
  div.img-wrapper {
    width: 172px;
    height: 172px;
    margin-bottom: 8px;
    position: relative;
    border-radius: 16px;
    background-color: ${(props) => props.theme.palette.white};
  }
  img {
    width: 100%;
    height: 100%;
    border-radius: 16px;
    position: absolute;
    top: 0;
    left: 0;
  }
  p {
    position: absolute;
    margin-bottom: 0px;
    top: 180px;
    left: 50%;
    transform: translateX(-50%);
    word-break: keep-all;
    font-size: 18px;
    font-weight: 500;
    color: ${(props) => props.theme.palette.black};
  }

  ${customMedia.lessThan("mobile")`
    justify-content: center;
    padding-bottom: 50px;
    img {
      width: 100%;
      height: 100%;
    }
    p.item-name {
      font-size: 12px;
      top: 81px;
    }
    div.img-wrapper {
      margin-bottom: 4px;
      flex-basis: 0;
    }
  `}
`;

const NewAlert = styled.span`
  position: absolute;
  bottom: 0px;
  left: 50%;
  transform: translateX(-50%);
  margin-bottom: 0;
  color: ${(props) => props.theme.palette.pink};
  font-size: 18px;
  font-weight: 900;
  ${customMedia.lessThan("mobile")`
    font-size: 12px;
  `}
`;
const generateCell = (data) => {
  console.log(data);
  const items = [];
  let newItem = false;
  data.map((item, i) => {
    if (item.today_received) {
      newItem = true;
    }
    const cell = (
      <ItemCell key={i}>
        <div className="img-wrapper">
          <img src={item.item_image} />
          {item.today_received && <NewAlert>N</NewAlert>}
        </div>
        <p className="item-name">{item.item_name}</p>
      </ItemCell>
    );
    items.push(cell);
  });
  const result = { items, newItem };
  return result;
};

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
        <NewItemModal>
          <img src={yellowalert} />
          <p>이전과 달라진 아이템이 있어요. 네오가 인격을 담았나 보군요!</p>
        </NewItemModal>
      )}
      <ItemsContainer>
        <p className="title">
          네오 캐릭터의 <span>아이템</span>이에요!
        </p>
        <ItemTable>
          <ItemRow>
            {items[0] || (
              <ItemCell>
                <div className="img-wrapper">
                  <img src={images.emptycell} />
                </div>
                <p></p>
              </ItemCell>
            )}
            {items[1] || (
              <ItemCell>
                <div className="img-wrapper">
                  <img src={images.emptycell} />
                  <p> </p>
                </div>
              </ItemCell>
            )}
            {items[2] || (
              <ItemCell>
                <div className="img-wrapper">
                  <img src={images.emptycell} />
                  <p> </p>
                </div>
              </ItemCell>
            )}
          </ItemRow>
          <ItemRow>
            {items[3] || (
              <ItemCell>
                <div className="img-wrapper">
                  <img src={images.emptycell} />
                  <p> </p>
                </div>
              </ItemCell>
            )}
            {items[4] || (
              <ItemCell>
                <div className="img-wrapper">
                  <img src={images.emptycell} />
                  <p> </p>
                </div>
              </ItemCell>
            )}
            {items[5] || (
              <ItemCell>
                <div className="img-wrapper">
                  <img src={images.emptycell} />
                  <p> </p>
                </div>
              </ItemCell>
            )}
          </ItemRow>
        </ItemTable>
      </ItemsContainer>
    </SectionContainer>
  );
}

export default Item;
