/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { customMedia } from "../../styles/GlobalStyle";
import ModalContent from "./ModalContent";
import images from "../../assets";

function Modal({ className, onClose, maskClosable, closable, visible }) {
  const onMaskClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose(e);
    }
  };

  const close = (e) => {
    if (onClose) {
      onClose(e);
    }
  };

  return (
    <>
      <ModalOverlay visible={visible} />
      <ModalWrapper
        className={className}
        onClick={maskClosable ? onMaskClick : null}
        tabIndex="-1"
        visible={visible}
      >
        <ModalInner tabIndex="0" className="modal-inner">
          <ModalContent>
            <img className="modal-img" src={images.comingsoon} />
            <h2 className="modal-title">
              페이지 <span>준비중</span> 입니다..
            </h2>
            <p className="modal-desc">
              스토리 페이지는 현재 업데이트 준비중에 있습니다.
              <br />
              빠른 시일내에 준비하여 찾아뵙겠습니다.
            </p>
          </ModalContent>
          {closable && (
            <button className="modal-close" onClick={close}>
              닫기
            </button>
          )}
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

Modal.propTypes = {
  visible: PropTypes.bool,
};

const ModalWrapper = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1000;
  overflow: auto;
  outline: 0;
`;

const ModalOverlay = styled.div`
  box-sizing: border-box;
  display: ${(props) => (props.visible ? "block" : "none")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.6);
  z-index: 999;
`;

const ModalInner = styled.div`
  box-sizing: border-box;
  position: relative;
  box-shadow: 0 0 6px 0 rgba(0, 0, 0, 0.5);
  background-color: #fff;
  border-radius: 24px;
  width: 560px;
  height: 712px;
  max-width: 560px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px;
  button.modal-close {
    position: absolute;
    bottom: 40px;
    left: 50%;
    transform: translateX(-50%);
    width: 480px;
    height: 62px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 500;
    justify-content: center;
    background-color: ${(props) => props.theme.palette.lightGrey};
    color: ${(props) => props.theme.palette.powderGrey};
    &:hover {
      background-color: ${(props) => props.theme.palette.grey};
      color: ${(props) => props.theme.palette.darkGrey};
    }
  }

  ${customMedia.lessThan("mobile")`
    width: 327px;
    height: 592px;
    padding: 24px;
    button.modal-close {
      width: calc(100% - 48px);
      height: 52px;
      bottom: 22px;
      font-size: 16px;
      right: 24px;
    }
    h3 {
      font-size: 20px;
      margin-bottom: 24px;
    }
  `}
`;

export default Modal;
