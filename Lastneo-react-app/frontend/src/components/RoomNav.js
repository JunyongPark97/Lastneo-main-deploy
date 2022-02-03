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
    margin-right: 40px;
    padding-bottom: 16px; // 이게 조건부여야 함
    font-size: 18px;
    cursor: pointer;
    &:hover {
      color: ${(props) => props.theme.palette.pink};
      border-bottom: solid 2px ${(props) => props.theme.palette.pink};
    }
  }

  ${customMedia.lessThan("mobile")`
  width: 100%;
  padding: 24px;
  span {
    font-size: 16px;
    margin-right: 28px;
  }
  `}
`;

export default RoomNav;
