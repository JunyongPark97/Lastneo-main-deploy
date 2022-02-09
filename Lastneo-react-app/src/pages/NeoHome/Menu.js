/* eslint-disable */
import React from "react";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import styled from "styled-components";
import { customMedia } from "../../styles/GlobalStyle";
import { useHistory } from "react-router";

function Menu() {
  const history = useHistory();
  return (
    <>
      <Navbar goBack={true} />
      <StyledDiv>
        <ul>
          <li>
            <a href="/">라스트네오 홈페이지</a>
          </li>
          <HorizonLine />
          <li>
            <a href="/resetpw">집 비밀번호 바꾸기</a>
          </li>
          <li>
            <span
              onClick={() => {
                history.push("/community");
              }}
            >
              광장 가기
            </span>
          </li>
          <HorizonLine />
          <li>
            <a href="https://foremost-avocado-334.notion.site/5592e83a44fc414d81b8bb5b5f2ca9d6">
              개인정보 처리방침
            </a>
          </li>
          <li>
            <a href="https://foremost-avocado-334.notion.site/72c7e2423d9d4e75af4a239bfac0494c">
              라스트네오 이용약관
            </a>
          </li>
          <li>
            <a href="https://foremost-avocado-334.notion.site/b3a67f3531c341e69677140fd4ee2ef5">
              문의하기
            </a>
          </li>
        </ul>
      </StyledDiv>
      <Footer />
    </>
  );
}

export default Menu;

const StyledDiv = styled.div`
  padding-top: 60px;
  height: 100%;
  font-size: 16px;
  * {
    font-weight: 500;
    color: ${(props) => props.theme.palette.powderGrey};
  }
  ul {
    list-style: none;
    width: 640px;
    display: flex;
    flex-direction: column;
  }
  li {
    padding: 18px 20px;
    height: 100%;
    width: 100%;
    &:hover {
      background: ${(props) => props.theme.palette.lightGrey};
    }
  }
  hr.line {
    border: solid 1px black;
  }
  span {
    cursor: pointer;
  }
  a,
  span {
    display: block;
  }
  a:link {
    color: ${(props) => props.theme.palette.powderGrey};
    text-decoration: none;
  }
  a:visited {
    color: ${(props) => props.theme.palette.powderGrey};
    text-decoration: none;
  }
  a:hover {
    color: ${(props) => props.theme.palette.powderGrey};
    text-decoration: none;
  }
  ${customMedia.lessThan("mobile")`
  width: 100%;
  padding-top: 56px;
  padding-left: 24px;
  font-size: 14px;
  li {
    padding: 18px 0;
  }

  `}
`;

const HorizonLine = ({ text }) => {
  return (
    <StyledLine>
      <span style={{ background: "#fff", padding: "0 10px" }}>{text}</span>
    </StyledLine>
  );
};

const StyledLine = styled.div`
  width: 100%;
  text-align: center;
  border-bottom: 1px solid #ebebeb;
  line-height: 0.1em;

  ${customMedia.lessThan("mobile")`
  width: calc(100vw - 48px);
  `}
`;
