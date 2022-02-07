import styled from "styled-components";
import { customMedia } from "../../styles/GlobalStyle";

const ModalContent = styled.div`
  text-align: center;
  align-items: center;
  font-weight: 500;
  color: ${(props) => props.theme.palette.powderGrey};
  img.modal-img {
    width: 200px;
    height: 200px;
    margin-bottom: 40px;
    margin-top: 80px;
  }
  h2.modal-title {
    font-weight: 500;
    font-size: 40px;
    margin-bottom: 20px;
    span {
      font-weight: 700;
    }
  }
  p.modal-desc {
    font-size: 20px;
    line-height: 29px;
  }
  ${customMedia.lessThan("mobile")`
  img.modal-img {
    width: 128px;
    height: 128px;
    margin-bottom: 24px;
    margin-top: 120px;
  }
  h2.modal-title {
    font-size: 24px;
    margin-bottom: 12px;
  }
  p.modal-desc {
    font-size: 12px;
    line-height: 17px;
  }
  `}
`;

export default ModalContent;
