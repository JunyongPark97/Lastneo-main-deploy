/* eslint-disable */
import { createGlobalStyle } from "styled-components";
import { generateMedia } from "styled-media-query";
import reset from "styled-reset";

export const customMedia = generateMedia({
  desktop: "78em",
  mobile: "1000px",
});
const GlobalStyle = createGlobalStyle`

    ${reset};
    :root {
        --vh: 100%;
    }
    * {
    box-sizing: border-box;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    }
    html {
        height: 100%;
    }
    body {
        height: 100%;
        width: 100%;
        margin: 0;
        line-height: 1.3;
        font-weight: 500;
        font-family: 'Noto Sans KR', sans-serif;
    }
    #root {
        height: 100%;
        width: 100%;
        // background-color: skyblue;
    }
    div {
        display: flex;
        flex-direction: column;
    }
    h1 {
        line-height: 1;
    }
    h2 {
        font-size: 28px;
        font-weight: bold;
    }
    h3 {
        font-size: 24px;
        font-weight: bold;
    }
    h4 {
        font-size: 16px;
    }
    p {
        font-size: 14px;
    }
    label {
        font-size: 14px;
    }
    input {
        border: 0px;
        background-color: transparent;
    }
    button {
        -webkit-appearance: none;
        -moz-appearance: none;
        appearance: none;
        border: 0;
        outline: 0;
        cursor: pointer;
        padding: 0;
    }
    img {
        border: 0;
    }
    input, textarea, button { 
        appearance: none; 
        -moz-appearance: none; 
        -webkit-appearance: none; 
        border-radius: 0; 
        -webkit-border-radius: 0; 
        -moz-border-radius: 0; 
    }

    ${customMedia.lessThan("mobile")`
    html, body {
        max-width: 100%;
        overflow-x: hidden;
    }

    `}
    
`;

export default GlobalStyle;
