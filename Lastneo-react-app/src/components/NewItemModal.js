import styled, { css } from "styled-components";
import { customMedia } from "../styles/GlobalStyle";

const NewItemModal = styled.div`
  background-color: ${(props) => props.theme.palette.lightGrey};
  color: ${(props) => props.theme.palette.darkGrey};
  padding: 18px 0px 18px 32px;
  border-radius: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  /* margin-bottom: 40px; */
  img {
    width: 20px;
    height: 20px;
    margin-right: 20px;
  }
  p {
    margin-bottom: 0px;
    font-size: 18px;
    font-weight: 400;
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
  padding: 14px 0px 14px 24px;
  img {
    width: 16px;
    height: 16px;
    margin-right: 16px;
  }
  p {
    margin-bottom: 0px;
    padding: 0;
    font-size: 16px;
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
