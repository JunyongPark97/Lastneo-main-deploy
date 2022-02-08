/* eslint-disable */
import React, { useEffect } from "react";
import styled from "styled-components";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router";
import { customMedia } from "../styles/GlobalStyle";
import images from "../assets";
import { css } from "styled-components";

function HomeNavbar({ match, owner, guest }) {
  const history = useHistory();
  const goBackHandler = () => {
    history.push({
      pathname: `${match.url}/frontdoor`,
      state: { nickname: match.params.id },
    });
  };
  const goHomeHandler = () => {
    console.log("go home");
    history.push("/");
  };
  const goMenuHandler = () => {
    history.push(`${match.url}/menu`);
  };
  return (
    <StyledNav>
      <div>
        <GoBackBtn onClick={goBackHandler}>
          <img src={images.goout} />
        </GoBackBtn>
        <GoHomeBtn onClick={goHomeHandler}>
          <img src={images.logo_width} />
        </GoHomeBtn>
        {owner && (
          <GoMenuBtn onClick={goMenuHandler}>
            <img src={images.dotsbtn} />
          </GoMenuBtn>
        )}
      </div>
    </StyledNav>
  );
}

export default withRouter(HomeNavbar);

const StyledNav = styled.div`
  height: 60px;
  width: 100%;
  font-size: 60px;
  text-align: center;
  color: ${(props) => props.theme.palette.pink};
  position: fixed;
  top: 0;
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
const GoMenuBtn = styled.button`
  height: 60px;
  background: none;
  position: absolute;
  right: 0;
  img {
    width: 20px;
    height: 20px;
  }
  ${customMedia.lessThan("mobile")`
    right: 24px;
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
