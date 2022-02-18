/* eslint-disable */
import styled, { css } from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const SectionContainer = styled.div`
  /* background-color: green; */
  border-bottom: solid 1px ${(props) => props.theme.palette.paleGrey};
  padding: 60px 0 60px 0;
  width: 640px;
  margin: auto;
  p.section-title {
    font-size: 16px;
    font-weight: 400;
    color: ${(props) => props.theme.palette.darkGrey};
  }
  h3 {
    margin-top: 40px;
    margin-bottom: 40px;
    font-weight: 700;
    line-height: 35px;
    span {
      color: ${(props) => props.theme.palette[props.color]};
    }
  }
  h3.broad-margin {
    margin-bottom: 60px;
  }
  ${customMedia.lessThan("mobile")`
  padding: 24px 0 48px 0;
  margin: 0 24px;
  width: calc(100% - 48px);
  p.section-title {
    font-size: 14px;
  }
  h3 {
    font-size: 20px;
    margin: 24px 0;
    line-height: 29px;
  }
  h3.broad-margin {
    margin-bottom: 48px;
  }
  `}

  ${({ owner, frame, communication, question }) => {
    if (communication || question) {
      return css`
        margin-bottom: 60px;
        ${customMedia.lessThan("mobile")`
          margin-bottom: 24px;
        `}
      `;
    } else if (frame && !owner) {
      return css`
        margin-bottom: 60px;
        ${customMedia.lessThan("mobile")`
          margin-bottom: 24px;
        `}
      `;
    }
  }}
`;

export default SectionContainer;
