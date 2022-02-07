/* eslint-disable */
import React, { useState } from "react";
import styled from "styled-components";
import images from "../../assets";
import { useHistory, withRouter } from "react-router";
import { customMedia } from "../../styles/GlobalStyle";
import Modal from "../../components/modals/ComingSoonModal";
// import Modal from "../../components/modals/LoadingModal";
import ModalContent from "../../components/modals/ModalContent";
function LandingNav() {
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <StyledNav open={open}>
      <InnerDiv>
        <button
          onClick={() => {
            history.push("/");
          }}
        >
          <img src={images.logo_width} />
        </button>
        <StyledUl open={open}>
          <li>
            <button
              onClick={() => {
                setOpen(false);
                setModalOpen(true);
              }}
            >
              스토리 보기
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setOpen(false);
                history.push("/register");
              }}
            >
              네오 만들기
            </button>
          </li>
          <li>
            <button
              onClick={() => {
                setOpen(false);
                history.push("/login");
              }}
            >
              네오 집 가기
            </button>
          </li>
        </StyledUl>

        <span
          onClick={() => {
            setOpen(!open);
          }}
        >
          <img src={images.hamburger} />
        </span>
      </InnerDiv>
      {modalOpen && (
        <Modal
          visible={modalOpen}
          closable={true}
          maskClosable={true}
          onClose={() => {
            setModalOpen(false);
          }}
        >
          <ModalContent>
            <img className="modal-img" src={images.comingsoon} />
            <h2>
              페이지 <span>준비중</span> 입니다..
            </h2>
            <p>
              스토리 페이지는 현재 업데이트 준비중에 있습니다.
              <br />
              빠른 시일내에 준비하여 찾아뵙겠습니다.
            </p>
          </ModalContent>
        </Modal>
      )}
    </StyledNav>
  );
}

export default withRouter(LandingNav);

const StyledNav = styled.div`
  width: 100%;
  flex-direction: row;
  justify-content: center;
  position: fixed;
  z-index: 100;
  background: ${(props) => props.theme.palette.white};
  img {
    width: auto;
    height: 26px;
  }
  button {
    background-color: transparent;
    color: ${(props) => props.theme.palette.powderGrey};
    font-size: 16px;
  }
  /* ${customMedia.lessThan("mobile")`
  background: ${({ theme, open }) => {
    return open ? theme.palette.white : theme.palette.powderPurple;
  }};
    `} */
`;

const InnerDiv = styled.div`
  width: 960px;
  height: 60px;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  font-size: 16px;
  span {
    display: none;
    img {
      width: 16px;
      height: 16px;
    }
  }
  ${customMedia.lessThan("mobile")`
  position: relative;
  padding-left: 24px;
  padding-right: 24px;
  height: 56px;
  width: 100%;
  span {
    display: block;
  }
    `}
`;

const StyledUl = styled.ul`
  display: flex;
  flex-direction: row;
  color: ${(props) => props.theme.palette.powderGrey};
  li {
    text-decoration: none;
    height: 60px;
    display: flex;
    align-items: center;
  }
  button {
    font-size: 16px;
    font-weight: 500;
    width: 104px;
    height: 44px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 8px;
    margin-right: 16px;
    &:hover {
      background-color: ${(props) => props.theme.palette.lightGrey};
    }
  }
  ${customMedia.lessThan("mobile")`
    display: ${({ open }) => {
      return !open ? "none" : "flex";
    }};
    li:hover {
      background-color: ${(props) => props.theme.palette.lightGrey};
    }
    button {
      margin-left: 12px;
    }
    flex-direction: column;
    position: absolute;
    top: 56px;
    left: 0px;
    width: 100%;
    background-color: ${(props) => props.theme.palette.white}
    `}
`;
