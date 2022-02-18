/* eslint-disable */

import InputDiv from "../../components/InputDiv";
import React, { useState, useEffect, useRef } from "react";
import { enterNewPw } from "../../modules/neohome";
import Button from "../../components/Button";
import { isPassword } from "../../utils/regexes";
import { useHistory, useLocation } from "react-router";
import Container from "../../components/Container";
import PwFormDiv from "../../components/PwFormDiv";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useSelector } from "react-redux";

function Password() {
  const history = useHistory();
  const location = useLocation();
  const myRef = useRef();
  const store = useSelector((store) => store.neohome);
  const [password, setPassword] = useState("");
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState(1);

  const messages = [
    "",
    "영문 숫자 특수문자 2가지 이상 8~15자 조합",
    "올바른 비밀번호 형식이 아니에요",
    "비밀번호를 확인해주세요",
    "비밀번호가 일치하지 않아요",
  ];

  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
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
      setMsg(0);
    } else if (password.length == 0) {
      setMsg(1);
    } else {
      setMsg(2);
    }
  };

  const onClickHandler = () => {
    let body = {
      phone: location.state.phone,
      confirm_key: location.state.confirm_key,
      password: password,
    };
    enterNewPw(body).then((response) => {
      if (response.status) {
        history.push(`/${store.nickname}`); // 집으로 이동
      } else {
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
          <h3>집 비밀번호를 재설정해주세요</h3>
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
              ></input>
              <p>{messages[msg]}</p>
            </form>
          </PwFormDiv>
          <Button
            onClick={onClickHandler}
            disabled={!type}
            color={!type ? "lightPink" : "pink"}
          >
            완료하고 집으로 가기
          </Button>
        </InputDiv>
        <Footer />
      </Container>
    </>
  );
}

export default Password;
