/* eslint-disable */
import React from "react";
import styled, { css } from "styled-components";
import images from "../../assets";
import { customMedia } from "../../styles/GlobalStyle";

function MsgModal({ show, share, auth, left, center, mobile }) {
  return (
    <StyledDiv
      show={show}
      share={share}
      auth={auth}
      left={left}
      center={center}
      mobile={mobile}
    >
      <img className="copy-modal-img" src={images.blackalert} />
      {share && (
        <span className="copy-modal-desc">클립보드에 복사되었어요!</span>
      )}
      {auth && (
        <span className="copy-modal-desc">인증번호가 전송되었어요!</span>
      )}
    </StyledDiv>
  );
}

export default MsgModal;

const StyledDiv = styled.div`
  ${({ show, center, left, mobile }) => {
    if (show && center) {
      return css`
        visibility: visible;
        justify-content: center;
      `;
    } else if (show && left) {
      return css`
        visibility: visible;
        justify-content: flex-start;
      `;
    } else if (show && mobile) {
      return css`
        ${customMedia.lessThan("mobile")`
          margin-top: 0;
          visibility: visible;
          justify-content: flex-end;
      `}
      `;
    } else {
      return css`
        visibility: hidden;
      `;
    }
  }}
  flex-direction: row;
  align-items: center;
  margin-top: 12px;
  .copy-modal-img {
    width: 16px;
    height: 16px;
    margin-right: 8px;
    margin-top: 0;
    margin-bottom: 0;
  }
  .copy-modal-desc {
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.palette.black};
    margin-bottom: 0;
  }
  ${customMedia.lessThan("mobile")`
  margin-top: 8px;
  .copy-modal-img {
      width: 12px;
      height: 12px;
      margin-right: 4px;
  }
  .copy-modal-desc {
      font-size: 12px;
  }
  `}
`;
