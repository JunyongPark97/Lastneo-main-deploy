/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import InputDiv from "../../components/InputDiv";
import Button from "../../components/Button";
import SmallBtn from "../../components/SmallBtn";
import { isAuthNumber } from "../../utils/regexes";
import { enterAuth } from "../../_actions/neohome_action";
import { useSelector, useDispatch } from "react-redux";
import { useHistory, useLocation } from "react-router";
import FormDiv from "../../components/FormDiv";
import { getAuth } from "../../_actions/neohome_action";
import Container from "../../components/Container";
import Footer from "../../components/Footer";
import MsgModal from "../../components/modals/MsgModal";
import Navbar from "../../components/Navbar";

function AuthNum() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();
  const myRef = useRef();
  const [authNum, setAuthNum] = useState("");
  const [type, setType] = useState(false);
  const [modal, setModal] = useState(false);
  const [errMsg, setErrMsg] = useState(false);

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
  const onFocusHandler = (event) => {
    event.stopPropagation();
    myRef.current.style.transform = "TranslateY(-10000px)";
    myRef.current.focus();
    setTimeout(function () {
      myRef.current.style.transform = "none";
    }, 100);
  };
  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {
      phone: location.state.phone,
      confirm_key: authNum,
    };
    enterAuth(body).then((response) => {
      if (response.status) {
        history.push({
          pathname: "/resetpw/password",
          state: {
            phone: location.state.phone,
            nickname: location.state.nickname,
            confirm_key: authNum,
          },
        });
      } else {
        setErrMsg(true);
      }
    });
  };
  const onClickHandler = (event) => {
    setTimeout(() => {
      setModal(true);
    }, 500);

    event.preventDefault();
    let body = {
      nickname: location.state.nickname,
      phone: location.state.phone,
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
                onChange={onAuthNumHandler}
              ></input>
              {errMsg && <p>인증번호가 맞지 않거나 입력시간이 초과되었어요</p>}
            </form>
            <SmallBtn onClick={onClickHandler}>인증번호 재전송</SmallBtn>
            <MsgModal show={modal} auth left />
          </FormDiv>
          <Button
            onClick={onSubmitHandler}
            type="submit"
            color={!type ? "lightPink" : "pink"}
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
