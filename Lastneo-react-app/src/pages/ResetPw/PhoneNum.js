/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import { getAuth } from "../../modules/neohome";
import InputDiv from "../../components/InputDiv";
import { isPhoneNumber } from "../../utils/regexes";
import Button from "../../components/Button";
import { useHistory, useLocation } from "react-router";
import Container from "../../components/Container";
import FormDiv from "../../components/FormDiv";
import Footer from "../../components/Footer";
import Navbar from "../../components/Navbar";
import { useDispatch, useSelector } from "react-redux";

// 현관 - 비밀번호 재설정
// 해당 루트로 접근
function PhoneNum() {
  const history = useHistory();
  const dispatch = useDispatch();
  const location = useLocation(); // 현관 EnterPw.js 에서 state: {nickname:nickname} 으로 이름 보내줄 것임
  const myRef = useRef();
  const [phoneNum, setPhoneNum] = useState("");
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState(0);
  const store = useSelector((store) => store.neohome);
  const messages = [
    "전화번호 10자리 혹은 11자리를 알려주세요",
    "10자리 혹은 11자리로 알려주세요",
    "옳지 않은 전화번호에요",
    "",
  ];

  const onPhoneNumHandler = (event) => {
    setPhoneNum(event.target.value);
    setType(isPhoneNumber(event.target.value));
  };

  const onBlurHandler = () => {
    if (phoneNum.length == 0) {
      setMsg(0);
    } else if (!type) {
      setMsg(1);
    }
    if (type) {
      setMsg(3);
    }
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = { nickname: store.nickname, phone: phoneNum };
    getAuth(body)
      .then(() => {
        history.push({
          pathname: "/resetpw/authnum",
          state: { phone: phoneNum, nickname: store.nickname },
        });
      })
      .catch(() => {
        setMsg(2);
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

  useEffect(() => {
    setType(isPhoneNumber(phoneNum));
  }, [phoneNum]);

  useEffect(() => {
    if (!type || phoneNum.length == 0) {
      setMsg(0);
    }
  }, [type, phoneNum]);

  return (
    <>
      <Navbar goBack={true} />

      <Container>
        <InputDiv color={msg == 1 || msg == 2 ? "purple" : "pink"}>
          <h3>전화번호를 입력해주세요</h3>
          <h4>비밀번호 재설정을 위해 필요해요</h4>
          <FormDiv>
            <form onFocus={onFocusHandler} ref={myRef}>
              <label>전화번호</label>
              <input
                type="text"
                value={phoneNum}
                placeholder="01012345678"
                onChange={onPhoneNumHandler}
                onBlur={onBlurHandler}
                maxLength="11"
              ></input>
              <p>{messages[msg]}</p>
            </form>
          </FormDiv>
          <Button
            type="submit"
            disabled={msg == 2 || !type}
            color={msg == 2 || !type ? "lightPink" : "pink"}
            onClick={onSubmitHandler}
          >
            다음
          </Button>
        </InputDiv>
        <Footer />
      </Container>
    </>
  );
}

export default PhoneNum;
