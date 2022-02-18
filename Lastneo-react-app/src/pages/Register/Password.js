/* eslint-disable */
import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { isPassword } from "../../utils/regexes";
import { useEffect } from "react";
import { sendPassword } from "../../modules/register";
import { signUp } from "../../modules/register";
import InputDiv from "../../components/InputDiv";
import Button from "../../components/Button";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import PwFormDiv from "../../components/PwFormDiv";
import LoadingModal from "../../components/modals/LoadingModal";

function Password() {
  const dispatch = useDispatch();
  const myRef = useRef();

  const store = useSelector((state) => state.register);
  const [password, setPassword] = useState("");
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState(1);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  const messages = [
    "",
    "영문 숫자 특수문자 모두 포함 8~15자 조합",
    "올바른 비밀번호 형식이 아니에요",
    "비밀번호를 확인해주세요",
    "비밀번호가 일치하지 않아요",
  ];

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const openLoadingModal = () => {
    setLoadingModalVisible(true);
  };
  const closeLoadingModal = () => {
    setLoadingModalVisible(false);
  };

  useEffect(() => {
    setType(isPassword(password));
  }, [password]);

  useEffect(() => {
    if (type) setMsg(0);
    else setMsg(1);
  }, [password]);

  const typeHandler = () => {
    if (type) {
      dispatch(sendPassword(password)); // store에 password 저장
      setMsg(0);
    } else if (password.length == 0) {
      setMsg(1);
    } else {
      setMsg(2);
    }
  };

  const onClickHandler = () => {
    openLoadingModal();
    dispatch(signUp(store)).then((response) => {
      if (response.type == "register/SIGNUP_SUCCESS") {
        closeLoadingModal();
        window.location.replace("/register/result");
      }
    });
  };

  const onFocusHandler = (event) => {
    event.stopPropagation();
    myRef.current.style.transform = "TranslateY(-10000px)";
    myRef.current.focus();
    setTimeout(function () {
      myRef.current.style.transform = "none";
    }, 100);
  };

  return (
    <>
      <Navbar goBack={true} />
      <Container>
        <InputDiv>
          <h3>집 비밀번호를 입력해주세요</h3>
          <h4>네오 집으로 들어갈 때 필요해요</h4>
          <PwFormDiv color={msg == 2 ? "purple" : "pink"}>
            <form className="first" onFocus={onFocusHandler} ref={myRef}>
              <label>비밀번호</label>
              <input
                type="text"
                placeholder="ABCD1234!"
                value={password}
                onChange={onPasswordHandler}
                onBlur={typeHandler}
                maxLength="16"
                ref={myRef}
              ></input>
              <p>{messages[msg]}</p>
            </form>
          </PwFormDiv>
          <Button
            onClick={onClickHandler}
            disabled={!type}
            color={!type ? "lightPink" : "pink"}
          >
            완료
          </Button>
        </InputDiv>
        <Footer />
      </Container>
      {loadingModalVisible && (
        <LoadingModal
          visible={loadingModalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeLoadingModal}
        ></LoadingModal>
      )}
    </>
  );
}

export default Password;
