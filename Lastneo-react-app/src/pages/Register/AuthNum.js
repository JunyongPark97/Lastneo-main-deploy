/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import InputDiv from "../../components/InputDiv";
import Button from "../../components/Button";
import SmallBtn from "../../components/SmallBtn";
import { isAuthNumber } from "../../utils/regexes";
import { enterAuth } from "../../modules/register";
import { getAuth } from "../../modules/register";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import FormDiv from "../../components/FormDiv";
import MsgModal from "../../components/modals/MsgModal";
import Navbar from "../../components/Navbar";
function AuthNum() {
  const state = useSelector((state) => state.register);
  const dispatch = useDispatch();
  const history = useHistory();
  const [authNum, setAuthNum] = useState("");
  const myRef = useRef();
  const [type, setType] = useState(false);
  const [errMsg, setErrMsg] = useState(false);
  const [modal, setModal] = useState(false);

  useEffect(() => {
    if (modal) {
      let timer = setTimeout(() => {
        setModal(false);
      }, 2000);
      return () => {
        clearTimeout(timer);
      };
    }
  }, [modal]);

  const onAuthNumHandler = (event) => {
    setAuthNum(event.target.value);
    setType(isAuthNumber(event.target.value));
    setErrMsg(false);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {
      phone: state.phone,
      confirm_key: authNum,
    };
    dispatch(enterAuth(body)).then((response) => {
      if (response.type == "register/AUTH_SUCCESS") {
        history.push("/register/mbti");
      } else {
        setErrMsg(true);
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
  const onClickHandler = (event) => {
    setTimeout(() => {
      setModal(true);
    }, 500);

    event.preventDefault();
    let body = {
      phone: state.phone,
    };
    dispatch(getAuth(body));
  };

  return (
    <>
      <Navbar goBack={true} />
      <Container>
        <InputDiv color={errMsg ? "purple" : "pink"}>
          <h3>
            문자로 전송된 인증번호
            <br />
            4자리를 알려주세요
          </h3>
          <FormDiv>
            <form onFocus={onFocusHandler} ref={myRef}>
              <label>인증번호</label>
              <input
                type="text"
                value={authNum}
                placeholder="0000"
                maxLength={4}
                onChange={onAuthNumHandler}
              ></input>
              {errMsg && <p>인증번호가 맞지 않거나 입력시간이 초과되었어요</p>}
            </form>
            <SmallBtn onClick={onClickHandler}>인증번호 재전송</SmallBtn>
            <MsgModal show={modal} auth left />
          </FormDiv>
          <Button
            onClick={onSubmitHandler}
            color={!type ? "lightPink" : "pink"}
            disable={!type ? "lightPink" : "pink"}
          >
            다음
          </Button>
        </InputDiv>
        <Footer />
      </Container>
    </>
  );
}

export default AuthNum;
