/* eslint-disable */
import React, { useState } from "react";
import InputDiv from "../../components/InputDiv";
import Button from "../../components/Button";
import { isPassword } from "../../utils/regexes";
import { signUp } from "../../_actions/register_action";
import { useEffect } from "react";
import { sendPassword } from "../../_actions/register_action";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import FltBtn from "../../components/FltBtn";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import PwFormDiv from "../../components/PwFormDiv";

function Password() {
  const dispatch = useDispatch();
  const history = useHistory();
  const store = useSelector((state) => state.register);
  const [password, setPassword] = useState("");
  const [vPassword, setVPassword] = useState("");
  const [verified, setVerified] = useState(false);
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState(1);
  const [vMsg, setVMsg] = useState(3);

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
      dispatch(sendPassword(password)); // store에 password 저장
      setVMsg(0);
    } else if (vPassword.length == 0) {
      setVMsg(3);
    } else {
      setVMsg(4);
    }
  };

  const onClickHandler = () => {
    dispatch(signUp(store)).then((response) => {
      if (response.type == "signUp_success") {
        history.push("/register/result");
      } else {
        console.log(response.payload);
      }
    });
  };

  return (
    <Container>
      <InputDiv>
        <h3>집 비밀번호를 입력해주세요</h3>
        <h4>네오 집으로 들어갈 때 필요해요</h4>
        <PwFormDiv
          color={msg == 2 ? "purple" : "pink"}
          vColor={vMsg == 4 ? "purple" : "pink"}
        >
          <form className="first">
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
          <form className="second">
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
          완료
        </Button>
      </InputDiv>
      <Footer />
    </Container>
  );
}

export default Password;
