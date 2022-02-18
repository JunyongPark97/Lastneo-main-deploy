/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import pinkarr_r from "../../../assets/pinkarr_r.png";
import { customMedia } from "../../../styles/GlobalStyle";
import Modal from "../../../components/modals/ComingSoonModal";
import ModalContent from "../../../components/modals/ModalContent";
import images from "../../../assets";

const DescSection = styled.section`
  width: 640px;
  margin: auto;
  border-bottom: solid 1px ${(props) => props.theme.palette.paleGrey};
  padding: 60px 0;
  color: ${(props) => props.theme.palette.black};
  h2 {
    margin-bottom: 12px;
  }
  h3 {
    font-size: 24px;
    font-weight: 400;
    span {
      font-weight: 700;
    }
  }
  h4 {
    margin-bottom: 60px;
    font-size: 18px;
    font-weight: 400;
    color: ${(props) => props.theme.palette.darkGrey};
  }
  p {
    margin-bottom: 40px;
    font-size: 16px;
    font-weight: 400;
    color: ${(props) => props.theme.palette.darkGrey};
  }
  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    button.modal-btn {
      background-color: transparent;
      margin-top: 20px;
      padding: 2px 4px 0px 4px;
      border-radius: 4px;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: ${(props) => props.theme.palette.pink};
      font-size: 20px;
      font-weight: 500;
      &:hover {
        background-color: ${(props) => props.theme.palette.lightGrey};
      }
      img {
        width: 16px;
        height: 16px;
        position: relative;
        bottom: 1px;
      }
    }
  }
  ${customMedia.lessThan("mobile")`
  width: calc(100% - 48px);
  padding: 24px 0 48px 0;
  margin: 0 24px;
  h2 {
    font-size: 24px;
    margin-bottom: 8px;
  }
  h4 {
    font-size: 16px;
    margin-bottom: 48px;
  }
  h3 {
    font-size: 20px;
  }
  p {
    font-size: 14px;
    margin-bottom: 24px;
  }
  div {
    button.modal-btn {
      font-size: 16px;
      margin-top: 16px;
      img {
        width: 12px;
        height: 12px;
      }
    }
  }
    `}
`;

const generateItemDesc = (store) => {
  const { name, value_name, description } = store;
  const idx1 = description.search(name);
  const idx2 = description.search(value_name);
  const len1 = name.length;
  const len2 = value_name.length;
  const text1 = description.substring(idx2 + len2, idx1);
  const text2 = description.substr(idx1 + len1);

  return (
    <h3>
      <span>{value_name}</span>
      {text1}
      <span>{name}</span>
      {text2}
    </h3>
  );
};

function Character({ store }) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <DescSection>
      <h2>네오 캐릭터</h2>
      <h4>나를 닮은 네오가 캐릭터로 표현돼요.</h4>
      <p>캐릭터</p>
      <div>
        {generateItemDesc(store.value_items)}
        <h3>
          '{store.mbti} <span>{store.mbti_name}</span>'
        </h3>
        <button
          className="modal-btn"
          onClick={() => {
            setModalOpen(true);
          }}
        >
          더 알아보기
          <img src={pinkarr_r} />
        </button>
      </div>
      {modalOpen && (
        <Modal
          visible={modalOpen}
          closable={true}
          maskClosable={true}
          onClose={() => {
            setModalOpen(false);
          }}
        ></Modal>
      )}
    </DescSection>
  );
}

export default Character;
