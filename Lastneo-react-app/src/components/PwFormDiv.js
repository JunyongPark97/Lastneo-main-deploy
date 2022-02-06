/* eslint-disable */
import styled, { css } from "styled-components";
import { customMedia } from "../styles/GlobalStyle";
const PwFormDiv = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-top: 60px;
  & > .first {
    margin-bottom: 40px;
    input {
      ${(props) => {
        if (props.color == "purple") {
          return css`
            border-bottom: 2px solid ${(props) => props.theme.palette.purple};
          `;
        } else {
          return css`
            border-bottom: 2px solid ${(props) => props.theme.palette.grey};
          `;
        }
      }}
    }
    input:hover {
      ${(props) => {
        if (props.color !== "purple") {
          return css`
            border-bottom: solid ${(props) => props.theme.palette.black} 2px;
          `;
        }
      }}
    }
    p {
      ${(props) => {
        if (props.color == "purple") {
          return css`
            color: ${(props) => props.theme.palette.purple};
          `;
        } else {
          return css`
            color: ${(props) => props.theme.palette.darkGrey};
          `;
        }
      }}
    }
    label {
      ${(props) => {
        if (props.color == "purple") {
          return css`
            color: ${(props) => props.theme.palette.purple};
          `;
        } else {
          return css`
            color: ${(props) => props.theme.palette.black};
          `;
        }
      }}
    }
    &:focus-within {
      label {
        ${(props) => {
          const selected = props.theme.palette[props.color];
          return css`
            color: ${selected};
          `;
        }}
      }
      input {
        ${(props) => {
          const selected = props.theme.palette[props.color];
          return css`
            border-bottom: 2px solid ${selected};
          `;
        }}
      }
    }
  }
  & > .second {
    input {
      ${(props) => {
        if (props.vColor == "purple") {
          return css`
            border-bottom: 2px solid ${(props) => props.theme.palette.purple};
          `;
        } else {
          return css`
            border-bottom: 2px solid ${(props) => props.theme.palette.grey};
          `;
        }
      }}
    }
    input:hover {
      ${(props) => {
        if (props.color !== "purple") {
          return css`
            border-bottom: solid ${(props) => props.theme.palette.black} 2px;
          `;
        }
      }}
    }
    p {
      ${(props) => {
        if (props.vColor == "purple") {
          return css`
            color: ${(props) => props.theme.palette.purple};
          `;
        } else {
          return css`
            color: ${(props) => props.theme.palette.darkGrey};
          `;
        }
      }}
    }
    label {
      ${(props) => {
        if (props.vColor == "purple") {
          return css`
            color: ${(props) => props.theme.palette.purple};
          `;
        } else {
          return css`
            color: ${(props) => props.theme.palette.black};
          `;
        }
      }}
    }
    &:focus-within {
      label {
        ${(props) => {
          const selected = props.theme.palette[props.vColor];
          return css`
            color: ${selected};
          `;
        }}
      }
      input {
        ${(props) => {
          const selected = props.theme.palette[props.vColor];
          return css`
            border-bottom: 2px solid ${selected};
          `;
        }}
      }
    }
  }
  ${customMedia.lessThan("mobile")`
    margin-top: 48px;  
    & > .first {
    margin-bottom: 36px; 
    }
  `}
`;

export default PwFormDiv;
