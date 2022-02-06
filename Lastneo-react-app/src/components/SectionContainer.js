/* eslint-disable */
import styled from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const SectionContainer = styled.div`
  /* background-color: green; */
  border-bottom: solid 1px ${(props) => props.theme.palette.paleGrey};
  padding: 60px 0 60px 0;
  p {
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
  padding: 24px 24px 48px 24px;
  p {
    font-size: 14px;
  }
  h3 {
    font-size: 20px;
  }
  `}
`;

export default SectionContainer;
