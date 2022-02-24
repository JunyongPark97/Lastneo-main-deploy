/* eslint-disable */
import styled from "styled-components";
import { customMedia } from "../../styles/GlobalStyle";

const ItemModalContent = styled.div`
  align-items: center;
  .img-container {
    width: 100%;
    height: 280px;
    border-radius: 24px 24px 0 0;

    align-items: center;
    justify-content: center;
    background-color: ${(props) => props.theme.palette.palePink};
  }
  .item-modal-img {
    width: 200px;
    height: 200px;
  }
  .item-modal-name {
    font-size: 24px;
    font-weight: 700;
    color: ${(props) => props.theme.palette.black};
  }
  .desc-container {
    width: calc(100% - 80px);
    margin: auto;
    padding-top: 32px;
    border-top: 1px solid ${(props) => props.theme.palette.paleGrey};
  }
  .item-modal-desc {
    font-size: 18px;
    font-weight: 400;
    color: ${(props) => props.theme.palette.darkGrey};
    word-wrap: break-word;
  }
  ${customMedia.lessThan("mobile")`
  .img-container {
    height: 208px;
  }
  .item-modal-img {
    width: 160px;
    height: 160px;
  }
  .item-modal-name {
    font-size: 20px;
  }
  .desc-container {
    width: calc(100% - 48px);
  }
  .item-modal-desc {
    font-size: 16px;
  }
  `}
`;

export default ItemModalContent;
