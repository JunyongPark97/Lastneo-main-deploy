/* eslint-disable */
import styled from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const RoomDiv = styled.div`
  width: 100%;
  margin: auto;
  ${customMedia.lessThan("mobile")`
  margin: auto;
  `}
`;

export default RoomDiv;
