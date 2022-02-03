import React from "react";

import styled from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const StyledBtn = styled.button`
  /* 공통 스타일 */
  border-radius: 4px;
  background-color: ${(props) => props.theme.palette.lightGrey};
  font-weight: 500;
  cursor: pointer;
  height: 36px;
  text-align: center;
  display: flex;
  align-items: center;
  width: fit-content;
  padding: 8px 12px;
  margin-top: 16px;
  /* 크기 */
  font-size: 14px;
  font-weight: 500;
  color: ${(props) => props.theme.palette.powderGrey};
  &:hover {
    background-color: ${(props) => props.theme.palette.grey};
    color: ${(props) => props.theme.palette.darkGrey};
  }

  ${customMedia.lessThan("mobile")`
    height: 29px;
    font-size: 12px;
    padding: 6px 10px;
    margin-top: 12px;
  `};
`;

function SmallBtn({ children, ...rest }) {
  return <StyledBtn {...rest}>{children}</StyledBtn>;
}

export default SmallBtn;
