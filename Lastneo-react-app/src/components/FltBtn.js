/* eslint-disable */
import styled from "styled-components";
import Button from "./Button";
import { customMedia } from "../styles/GlobalStyle";
import { css } from "styled-components";

const FltBtn = styled(Button)`
  position: sticky;
  bottom: 60px;
  z-index: 100;
  margin: 0 auto;
  width: 640px;
  ${({ color, theme }) => {
    if (color == "black") {
      return css`
        &:hover {
          background: ${theme.palette.powderGrey};
          color: ${theme.palette.grey};
        }
      `;
    }
  }}

  ${({ visible }) => {
    if (!visible) {
      return css`
        ${customMedia.greaterThan("mobile")`
        visibility: hidden;
      `}
      `;
    }
  }}

  ${customMedia.lessThan("mobile")`
  position: sticky;
  width: calc(100vw - 48px);
  margin: 0 auto;
  left: 0;
  right: 0;
  bottom: 24px;
    `}
`;

export default FltBtn;
