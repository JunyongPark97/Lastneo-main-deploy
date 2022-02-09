/* eslint-disable */
import React from "react";
import styled, { css } from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const StyledFooter = styled.footer`
  ${({ theme, color }) => {
    if (color == "pink") {
      return css`
        background-color: ${theme.palette.palePink};
        color: ${theme.palette.powderPink};
        a:link {
          color: ${(props) => props.theme.palette.powderPink};
          text-decoration: none;
        }
        a:visited {
          color: ${(props) => props.theme.palette.powderPink};
          text-decoration: none;
        }
        a:hover {
          color: ${(props) => props.theme.palette.powderPink};
          text-decoration: none;
        }
      `;
    } else {
      return css`
        background-color: ${theme.palette.lightGrey};
        color: ${theme.palette.grey};
        a:link {
          color: ${(props) => props.theme.palette.grey};
          text-decoration: none;
        }
        a:visited {
          color: ${(props) => props.theme.palette.grey};
          text-decoration: none;
        }
        a:hover {
          color: ${(props) => props.theme.palette.grey};
          text-decoration: none;
        }
      `;
    }
  }}
  * {
    font-weight: 400;
  }
  font-size: 12px;
  width: 100%;
  flex: 0 0 auto;
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

function Footer({ color }) {
  return (
    <StyledFooter color={color}>
      <div className="mobile">
        <p>
          ⓒ 2022. 주식회사 몽데이크 Corp.
          <br />
          all rights reserved.
        </p>
        <span>
          <a href=" https://foremost-avocado-334.notion.site/5592e83a44fc414d81b8bb5b5f2ca9d6">
            개인정보
            <br />
            처리방침
          </a>
        </span>
        <span>
          <a href="https://foremost-avocado-334.notion.site/72c7e2423d9d4e75af4a239bfac0494c">
            라스트네오
            <br />
            이용약관
          </a>
        </span>
        <span>
          <a href="https://foremost-avocado-334.notion.site/b3a67f3531c341e69677140fd4ee2ef5">
            문의하기
          </a>
        </span>
      </div>
      <div className="web">
        <p>ⓒ 2022. 주식회사 몽데이크 Corp. all rights reserved.</p>
        <span>
          <a href=" https://foremost-avocado-334.notion.site/5592e83a44fc414d81b8bb5b5f2ca9d6">
            개인정보 처리방침
          </a>
        </span>
        <span>
          <a href="https://foremost-avocado-334.notion.site/72c7e2423d9d4e75af4a239bfac0494c">
            라스트네오 이용약관
          </a>
        </span>
        <span>
          <a href="https://foremost-avocado-334.notion.site/b3a67f3531c341e69677140fd4ee2ef5">
            문의하기
          </a>
        </span>
      </div>
    </StyledFooter>
  );
}

export default Footer;
