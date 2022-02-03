/* eslint-disable */
import styled from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const RoomDiv = styled.div`
  width: 640px;
  margin: auto;

  ${customMedia.lessThan("mobile")`
  width: 100%;
  margin: auto;
  `}
`;

export default RoomDiv;
