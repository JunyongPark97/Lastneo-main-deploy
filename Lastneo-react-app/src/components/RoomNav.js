/* eslint-disable */
import styled from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const RoomNav = styled.div`
  height: 60px;
  width: 100%;
  border-bottom: solid 1px ${(props) => props.theme.palette.paleGrey};

  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-right: 40px;
    font-size: 16px;
    font-weight: 500;
    height: 100%;
    cursor: pointer;
    color: ${(props) => props.theme.palette.darkGrey};
    &:hover {
      color: ${(props) => props.theme.palette.pink};
      border-bottom: solid 2px ${(props) => props.theme.palette.pink};
    }
  }
  div.nav-container {
    height: 100%;
    margin: auto;
    width: 640px;
    flex-direction: row;
    align-items: center;
  }
  div.nav-menu {
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  ${customMedia.lessThan("mobile")`
  width: 100%;
  div.nav-container {
    width: calc(100% - 48px);
  }
  span {
    font-size: 14px;
    margin-right: 32px;
  }
  `}
`;

export default RoomNav;
