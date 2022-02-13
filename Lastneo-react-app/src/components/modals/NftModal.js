/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { customMedia } from "../../styles/GlobalStyle";

function NftModal({
  className,
  onClose,
  onScroll,
  maskClosable,
  closable,
  visible,
  children,
}) {
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

  const scroll = (e) => {
    if (onScroll) {
      onScroll(e);
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
          {children}
          <button className="modal-scroll" onClick={scroll}>
            액자 보기
          </button>
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

NftModal.propTypes = {
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
  button.modal-close,
  button.modal-scroll {
    position: absolute;
    bottom: 40px;
    width: 228px;
    height: 62px;
    border-radius: 12px;
    font-size: 18px;
    font-weight: 500;
  }
  button.modal-close {
    background-color: ${(props) => props.theme.palette.lightGrey};
    color: ${(props) => props.theme.palette.powderGrey};
    &:hover {
      background-color: ${(props) => props.theme.palette.grey};
      color: ${(props) => props.theme.palette.darkGrey};
    }
    right: 40px;
  }
  button.modal-scroll {
    background-color: ${(props) => props.theme.palette.black};
    color: ${(props) => props.theme.palette.white};
    &:hover {
      background-color: ${(props) => props.theme.palette.powderGrey};
      color: ${(props) => props.theme.palette.grey};
    }
  }
  ${customMedia.lessThan("mobile")`
    width: 327px;
    height: 592px;
    padding: 24px;
    button.modal-close, button.modal-scroll {
      width: 132px;
      height: 52px;
      bottom: 22px;
      font-size: 16px;
    }
    button.modal-close {
      right: 24px;
    }
    h3 {
      font-size: 20px;
      margin-bottom: 24px;
    }
  `}
`;

export default NftModal;
