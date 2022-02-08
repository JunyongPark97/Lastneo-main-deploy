/* eslint-disable */
import styled, { css } from "styled-components";
import { customMedia } from "../styles/GlobalStyle";
const InputDiv = styled.div`
  /* background-color: lavender; */
  width: 640px;
  margin: auto;
  padding-top: 60px;
  padding-bottom: 180px;
  position: relative;
  flex: 1 0 auto;
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
  p.modal-msg {
    font-size: 12px;
    margin-top: 4px;
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
  form:focus-within {
    label {
      ${(props) => {
        const selected = props.theme.palette[props.color];
        return css`
          color: ${selected};
        `;
      }}
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
    input {
      ${(props) => {
        const selected = props.theme.palette[props.color];
        return css`
          border-bottom: 2px solid ${selected};
        `;
      }}
    }
  }

  input {
    font-size: 28px;
    padding: 0px 1px 8px 1px;
    margin-bottom: 4px;
    outline: none;
    color: ${(props) => props.theme.palette.black};

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

  input::placeholder {
    color: ${(props) => props.theme.palette.grey};
  }

  input:focus {
    outline: none;
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

  ${customMedia.lessThan("mobile")`
  padding: 24px 24px 0 24px;
  width: 100%;
  height: calc(var(--vh, 1vh) * 100 - 56px); // 100vh - Navbar height
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
    `}
`;

export default InputDiv;
