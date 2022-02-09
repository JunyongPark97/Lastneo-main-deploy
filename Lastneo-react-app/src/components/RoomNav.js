/* eslint-disable */
import styled from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const RoomNav = styled.div`
  flex-direction: row;
  align-items: center;
  height: 60px;
  width: 640px;
  border-bottom: solid 1px ${(props) => props.theme.palette.paleGrey};
  span {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    margin-right: 40px;
    font-size: 16px;
    height: 100%;
    cursor: pointer;
    color: ${(props) => props.theme.palette.black};
    &:hover {
      color: ${(props) => props.theme.palette.pink};
      border-bottom: solid 2px ${(props) => props.theme.palette.pink};
    }
  }
  div.nav-menu {
    height: 100%;
    align-items: center;
    justify-content: center;
  }

  ${customMedia.lessThan("mobile")`
  width: 100%;
  padding: 24px;
  span {
    font-size: 14px;
    margin-right: 28px;
  }
  `}
`;

export default RoomNav;
