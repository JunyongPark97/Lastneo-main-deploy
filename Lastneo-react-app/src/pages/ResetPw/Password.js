/* eslint-disable */

import InputDiv from "../../components/InputDiv";
import React, { useState, useEffect, useRef } from "react";
import { enterNewPw } from "../../_actions/neohome_action";
import Button from "../../components/Button";
import { isPassword } from "../../utils/regexes";
import { useHistory, useLocation } from "react-router";
import Container from "../../components/Container";
import PwFormDiv from "../../components/PwFormDiv";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";

function Password() {
  const history = useHistory();
  const location = useLocation();
  const myRef = useRef();
  const myRef2 = useRef();

  const [password, setPassword] = useState("");
  const [vPassword, setVPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState(1);
  const [vMsg, setVMsg] = useState(3);

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

  const onVPasswordHandler = (event) => {
    setVPassword(event.target.value);
  };

  useEffect(() => {
    setType(isPassword(password));
    setVerified(password == vPassword);
  }, [password, vPassword]);

  useEffect(() => {
    if (type) setMsg(0);
    else setMsg(1);
  }, [password]);

  useEffect(() => {
    if (verified) setVMsg(0);
    else setVMsg(3);
  }, [vPassword]);

  const typeHandler = () => {
    if (type) {
      setMsg(0);
    } else if (password.length == 0) {
      setMsg(1);
    } else {
      setMsg(2);
    }
  };

  const verifiedHandler = () => {
    if (verified) {
      setVMsg(0);
    } else if (vPassword.length == 0) {
      setVMsg(3);
    } else if (!verified) {
      setVMsg(4);
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
        history.push(`/${location.state.nickname}`); // 집으로 이동
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

  const onFocusHandler2 = (event) => {
    event.stopPropagation();
    myRef2.current.style.transform = "TranslateY(-10000px)";
    myRef2.current.focus();
    setTimeout(function () {
      myRef2.current.style.transform = "none";
    }, 100);
  };

  return (
    <>
      <Navbar goBack={true} />
      <Container>
        <InputDiv>
          <h3>집 비밀번호를 재설정해주세요</h3>
          <h4>네오 집으로 들어갈 때 필요해요</h4>
          <PwFormDiv
            color={msg == 2 ? "purple" : "pink"}
            vColor={vMsg == 4 ? "purple" : "pink"}
          >
            <form className="first" onFocus={onFocusHandler} ref={myRef}>
              <label>비밀번호</label>
              <input
                type="password"
                placeholder="ABCD1234!"
                value={password}
                onChange={onPasswordHandler}
                onBlur={typeHandler}
                maxLength="16"
              ></input>
              <p>{messages[msg]}</p>
            </form>
            <form className="second" onFocus={onFocusHandler2} ref={myRef2}>
              <label>비밀번호 확인</label>
              <input
                type="password"
                placeholder="ABCD1234!"
                value={vPassword}
                onChange={onVPasswordHandler}
                onBlur={verifiedHandler}
                maxLength="16"
              ></input>
              <p>{messages[vMsg]}</p>
            </form>
          </PwFormDiv>
          <Button
            onClick={onClickHandler}
            disabled={!type || !verified}
            color={!type || !verified ? "lightPink" : "pink"}
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
