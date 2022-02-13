import styled from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const HomeDiv = styled.div`
  /* background-color: green; */
  width: 100vw;
  align-items: center;
  padding-top: 60px;
  /* padding-bottom: 230px; */

  ${customMedia.lessThan("mobile")`
  padding-top: 56px;
  `}
`;

export default HomeDiv;
