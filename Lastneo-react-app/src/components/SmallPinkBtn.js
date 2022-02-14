import styled, { css } from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const SmallPinkBtn = styled.button`
  width: 76px;
  height: 36px;
  background-color: ${(props) => props.theme.palette.lightPink};
  color: ${(props) => props.theme.palette.pink};
  border-radius: 4px;
  font-weight: 500;
  font-size: 14px;
  &:hover {
    background-color: ${(props) => props.theme.palette.powderPink};
    color: ${(props) => props.theme.palette.darkPink};
    a:link {
      color: ${(props) => props.theme.palette.darkPink};
    }
    a:visited {
      color: ${(props) => props.theme.palette.darkPink};
    }
    a:hover {
      color: ${(props) => props.theme.palette.darkPink};
    }
  }
  ${({ disabled }) => {
    if (disabled) {
      return css`
        cursor: default;
        background-color: ${(props) => props.theme.palette.paleGrey};
        color: ${(props) => props.theme.palette.white};
        &:hover {
          background-color: ${(props) => props.theme.palette.paleGrey};
          color: ${(props) => props.theme.palette.white};
          a:link {
            color: ${(props) => props.theme.palette.white};
            text-decoration: none;
          }
          a:visited {
            color: ${(props) => props.theme.palette.white};
            text-decoration: none;
          }
          a:hover {
            color: ${(props) => props.theme.palette.white};
            text-decoration: none;
          }
      `;
    }
  }}
  a:link {
    color: ${(props) => props.theme.palette.pink};
    text-decoration: none;
  }
  a:visited {
    color: ${(props) => props.theme.palette.pink};
    text-decoration: none;
  }
  a:hover {
    text-decoration: none;
  }

  ${customMedia.lessThan("mobile")`
  width: 64px;
  height: 31px;
  `}
`;

export default SmallPinkBtn;
