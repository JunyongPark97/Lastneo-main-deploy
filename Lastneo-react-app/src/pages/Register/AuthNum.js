/* eslint-disable */
import React, { useState, useEffect } from "react";
import InputDiv from "../../components/InputDiv";
import Button from "../../components/Button";
import SmallBtn from "../../components/SmallBtn";
import { isAuthNumber } from "../../utils/regexes";
import { enterAuth } from "../../_actions/register_action";
import { useSelector, useDispatch } from "react-redux";
import { useHistory } from "react-router";
import { getAuth } from "../../_actions/register_action";
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
      if (response.type == "auth_success") {
        history.push("/register/mbti");
      } else {
        // 오류 종류에 따라 다른 에러 메시지를 띄워줄건지 아님 하나로 통일할건지
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
            <form>
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
