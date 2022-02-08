import styled from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const Container = styled.div`
  /* background-color: purple; */
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  padding-top: 60px;
  ${customMedia.lessThan("mobile")`
  height: calc(var(--vh, 1vh) * 100 + 66px); // 100vh + Footer height
  width: 100vw;
  padding-top: 56px;
  `}
`;

export default Container;
