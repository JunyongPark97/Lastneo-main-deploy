/* eslint-disable */
import styled, { css } from "styled-components";
import { customMedia } from "../styles/GlobalStyle";
const NicknameInputDiv = styled.div`
  // background-color: lavender;
  width: 640px;
  margin: auto;
  padding-top: 60px;
  padding-bottom: 180px;
  position: relative;
  flex-grow: 1;
  flex-shrink: 0;
  color: ${(props) => props.theme.palette.black};

  h3 {
    margin-bottom: 8px;
    font-weight: 700;
  }
  h4 {
    font-weight: 400;
    color: ${(props) => props.theme.palette.darkGrey};
  }
  p {
    font-weight: 400;
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
    margin-bottom: 4px;
    font-weight: 400;
    outline: none;
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
  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
  input {
    font-size: 28px;
    padding: 0px 1px 8px 1px;
    margin-bottom: 4px;
    outline: none;
    color: ${(props) => props.theme.palette.black};
  }

  input::placeholder {
    color: ${(props) => props.theme.palette.grey};
  }

  input:focus {
    outline: none;
  }
  form:focus-within {
    label {
      ${(props) => {
        const selected = props.theme.palette[props.color];
        return css`
          color: ${selected};
        `;
      }}
    }
  }
  p {
    ${(props) => {
      if (props.color == "purple") {
        const selected = props.theme.palette[props.color];
        return css`
          color: ${selected};
        `;
      } else {
        return css`
          color: props.theme.palette.darkGrey;
        `;
      }
    }}
  }
  ${customMedia.lessThan("mobile")`
  padding: 24px 24px 0 24px;
  width: 100%;
  height: 100%;
  h3 {
    font-size: 20px;
    font-weight: bold;
  }
  h4 {
    font-size: 14px;
  }
  input {
    font-size: 24px;
  }
  p {
    font-size: 12px;
  }
  input {
    margin: 0;
    padding: 0;
    position: relative;
    top: 1.8px; // TODO: input이랑 prefix 높이 맞추느라
  }
    `}
`;

export default NicknameInputDiv;
