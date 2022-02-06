/* eslint-disable */
import React from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import { customMedia } from "../styles/GlobalStyle";
import back from "../assets/back.png";
import images from "../assets";
import { css } from "styled-components";

function Navbar({ color, goBack }) {
  const history = useHistory();
  const goBackHandler = () => {
    // history.goBack();
    console.log("go back handler");
    history.go(-1);
  };
  const goHomeHandler = () => {
    console.log("go home");
    history.push("/");
  };
  return (
    <StyledNav color={color}>
      <div>
        {goBack && (
          // <GoBackBtn onClick={goBackHandler}>
          <GoBackBtn
            onClick={() => {
              history.goBack();
            }}
          >
            <img src={back} />
          </GoBackBtn>
        )}
        <GoHomeBtn onClick={goHomeHandler}>
          <img src={images.logo_width} />
        </GoHomeBtn>
      </div>
    </StyledNav>
  );
}

export default withRouter(Navbar);

const StyledNav = styled.div`
  height: 60px;
  width: 100%;
  font-size: 60px;
  text-align: center;
  color: ${(props) => props.theme.palette.pink};
  position: fixed;
  z-index: 100;
  /* position: relative; */
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  ${(props) => {
    return css`
      background: ${props.color};
    `;
  }}
  div {
    /* background: yellow; */
    height: 100%;
    width: 640px;
    position: relative;
    justify-content: center;
  }
  button {
    background-color: transparent;
  }
  ${customMedia.lessThan("mobile")`
    width: 100%;
  `}
`;

StyledNav.defaultProps = {
  color: "#ffffff",
};

const GoBackBtn = styled.button`
  height: 60px;
  background: none;
  position: absolute;
  left: 0;
  img {
    width: 20px;
    height: 20px;
  }
  ${customMedia.lessThan("mobile")`
    left: 24px;
    img {
    width: 16px;
    height: 16px;
  }
  `}
`;

const GoHomeBtn = styled.button`
  width: 120px;
  height: 32px;
  img {
    width: auto;
    height: 26px;
  }
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
`;
