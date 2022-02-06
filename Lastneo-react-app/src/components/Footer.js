/* eslint-disable */
import React from "react";
import styled, { css } from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const StyledFooter = styled.footer`
  background-color: ${(props) => props.theme.palette.lightGrey};
  color: ${(props) => props.theme.palette.grey};
  font-size: 12px;
  width: 100%;
  flex-grow: 0;
  font-weight: 400;
  margin-top: auto;
  div.web {
    height: 60px;
    margin: auto;
    width: 640px;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    p {
      font-size: 12px;
    }
  }
  div.mobile {
    width: 100%;
    height: 66px;
    text-align: left;
    margin: 0;
    padding: 24px 18px;
    display: none;
    p {
      font-size: 10px;
    }
  }

  ${customMedia.lessThan("mobile")`
  font-size: 10px;
  div.web {
    display: none;
  }
  div.mobile {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;

  }

  `}
`;

function Footer({ home }) {
  return (
    <StyledFooter home>
      <div className="mobile">
        <p>
          ⓒ 2022. 주식회사 몽데이크 Corp.
          <br />
          all rights reserved.
        </p>
        <span>
          개인정보
          <br />
          처리방침
        </span>
        <span>
          라스트네오
          <br />
          이용약관
        </span>
        <span>문의하기</span>
      </div>
      <div className="web">
        <p>ⓒ 2022. 주식회사 몽데이크 Corp. all rights reserved.</p>
        <span>개인정보 처리방침</span>
        <span>라스트네오 이용약관</span>
        <span>문의하기</span>
      </div>
    </StyledFooter>
  );
}

export default Footer;
