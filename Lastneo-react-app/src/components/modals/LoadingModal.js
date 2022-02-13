/* eslint-disable */

import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";
import { customMedia } from "../../styles/GlobalStyle";
import images from "../../assets";

function LoadingModal({
  className,
  onClose,
  maskClosable,
  closable,
  visible,
  children,
  nft,
  item,
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
          <LoadingModalContent>
            {item && <img src={images.itemloading} />}
            {nft && <img src={images.nftloading} />}
          </LoadingModalContent>
        </ModalInner>
      </ModalWrapper>
    </>
  );
}

LoadingModal.propTypes = {
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
  border-radius: 24px;
  width: 560px;
  height: 712px;
  max-width: 560px;
  top: 50%;
  transform: translateY(-50%);
  margin: 0 auto;
  padding: 40px;

  ${customMedia.lessThan("mobile")`
    width: 327px;
    height: 592px;
    padding: 24px;
    h3 {
      font-size: 20px;
      margin-bottom: 24px;
    }
  `}
`;

const LoadingModalContent = styled.div`
  height: 100%;
  text-align: center;
  justify-content: center;
  img {
    width: 120px;
    height: 120px;
    margin: 0 auto;
  }
  ${customMedia.lessThan("mobile")`
  img {
    width: 96px;
    height: 96px;
  }
  `}
`;

export default LoadingModal;
