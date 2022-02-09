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
    history.go(-1);
  };
  const goHomeHandler = () => {
    history.push("/");
  };
  return (
    <StyledNav color={color}>
      <div>
        {goBack && (
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

Navbar.defaultProps = {
  color: "white",
};
const StyledNav = styled.div`
  height: 60px;
  width: 100%;
  font-size: 60px;
  text-align: center;
  color: ${(props) => props.theme.palette.pink};
  position: fixed;
  top: 0;

  z-index: 100;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;

  ${({ theme, color }) => {
    const selected = theme.palette[color];
    return css`
      background: ${selected};
    `;
  }}
  div {
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
    height: 56px;
  `}
`;

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
