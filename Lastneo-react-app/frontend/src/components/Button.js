import React from "react";
import styled, { css } from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const StyledButton = styled.button`
  /* 공통 스타일 */
  outline: none;
  border: none;
  border-radius: 12px;
  color: ${(props) => props.theme.palette.white};
  font-weight: 500;
  cursor: pointer;

  /* 크기 */
  height: 60px;
  width: 640px;
  font-size: 18px;
  font-weight: medium;
  text-align: center;
  padding: 18px 0px;

  /* 반응형 */
  position: absolute;
  bottom: 60px;

  /* 색상 */
  ${(props) => {
    const selected = props.theme.palette[props.color];
    return css`
      background: ${selected};
    `;
  }}

  &:hover {
    background: ${(props) => props.theme.palette.darkPink};
    color: ${(props) => props.theme.palette.grey};
  }

  &:disabled {
    &:hover {
      ${(props) => {
        const selected = props.theme.palette[props.color];
        return css`
          background: ${selected};
          color: ${(props) => props.theme.palette.white};
          cursor: auto;
        `;
      }}
    }
  }

  ${customMedia.lessThan("mobile")`
  width: calc(100vw - 48px);
  height: 48px;
  bottom: 24px;
  font-size: 16px;
  padding: 14px 0px;
    `}
`;

function Button({ children, ...rest }) {
  return <StyledButton {...rest}>{children}</StyledButton>;
}

export default Button;
