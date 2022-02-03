import styled from "styled-components";
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
  }
  ${customMedia.lessThan("mobile")`
  width: 64px;
  height: 31px;
  `}
`;

export default SmallPinkBtn;
