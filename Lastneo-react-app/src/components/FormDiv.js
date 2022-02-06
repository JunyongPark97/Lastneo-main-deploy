/* eslint-disable */
import styled, { css } from "styled-components";
import { customMedia } from "../styles/GlobalStyle";
const FormDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;

  ${customMedia.lessThan("mobile")`
    margin-top: 48px;
  `}
`;

export default FormDiv;
