import styled, { css } from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const NewItemModal = styled.div`
  background-color: ${(props) => props.theme.palette.lightGrey};
  color: ${(props) => props.theme.palette.darkGrey};
  padding: 20px 0px 20px 32px;
  font-size: 18px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  /* margin-bottom: 40px; */
  img {
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
  p {
    margin-bottom: 0px;
  }
  p.msg-mobile {
    display: none;
  }
  ${({ newItem }) => {
    if (newItem) {
      return css`
        margin-bottom: 40px;
        ${customMedia.lessThan("mobile")`
      margin-bottom: 24px;
      `};
      `;
    }
  }}
  ${customMedia.lessThan("mobile")`
  width: 100%;
  padding: 16px 0px 16px 24px;
  font-size: 16px;
  img {
    width: 16px;
    height: 16px;
    margin-right: 16px;
  }
  p {
    margin-bottom: 0px;
    padding: 0;
  }
  p.msg-mobile {
    display: block;
  }
  p.msg-web {
    display: none;
  }
  `}
`;

export default NewItemModal;
