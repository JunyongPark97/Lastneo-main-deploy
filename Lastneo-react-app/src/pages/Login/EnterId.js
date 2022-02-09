/* eslint-disable */
// 아이디(주소 or 전화번호) 입력 컴포넌트

import React, { useState, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { enterAddress } from "../../_actions/login_actions";
import Button from "../../components/Button";
import InputDiv from "../../components/InputDiv";
import { isNickname, isPhoneNumber } from "../../utils/regexes";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import FormDiv from "../../components/FormDiv";

function EnterId({ history }) {
  const dispatch = useDispatch();
  const myRef = useRef();
  const [address, setAddress] = useState("");
  const [type, setType] = useState(false);

  const [msg, setMsg] = useState(0);
  const messages = [
    "집주소는 주소창에 입력해도 갈 수 있어요",
    "발급되지 않은 집주소 혹은 전화번호에요",
    "",
  ];

  useEffect(() => {
    if (address.includes("lastneo.io/")) {
      setType(isNickname(address.substr(11)));
    } else {
      setType(isPhoneNumber(address));
    }
  }, [address]);

  const onAddressHandler = (event) => {
    setAddress(event.target.value);
  };
  const onBlurHandler = () => {
    if (type) {
      setMsg(2);
    } else {
      setMsg(0);
    }
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
    let dataTosubmit = "";
    if (address.includes("lastneo.io/")) {
      dataTosubmit = address.substr(11);
    } else {
      dataTosubmit = address;
    }
    let body = {
      data: dataTosubmit,
    };
    dispatch(enterAddress(body)).then((response) => {
      if (response.payload.is_exact) {
        history.push(`/${response.payload.nickname}`);
      } else {
        setMsg(1);
      }
    });
  };

  return (
    <>
      <Navbar goBack={true} />
      <Container>
        <InputDiv color={msg == 1 ? "purple" : "pink"}>
          <h3>네오 집 주소를 입력해주세요</h3>
          <h4>집 주소를 까먹었다면 전화번호를 입력해주세요</h4>
          <FormDiv>
            <form onFocus={onFocusHandler} ref={myRef}>
              <label>집주소 or 전화번호</label>
              <input
                type="text"
                value={address}
                placeholder="lastneo.io/home"
                onChange={onAddressHandler}
                onBlur={onBlurHandler}
              ></input>
              <p>{messages[msg]}</p>
            </form>
            <Button
              onClick={onSubmitHandler}
              color={!type ? "lightPink" : "pink"}
              onClick={onSubmitHandler}
              disabled={!type}
            >
              네오 집으로 가기
            </Button>
          </FormDiv>
        </InputDiv>
        <Footer />
      </Container>
    </>
  );
}

export default EnterId;
