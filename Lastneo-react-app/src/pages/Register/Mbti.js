/* eslint-disable */

import React, { useState, useEffect } from "react";
import InputDiv from "../../components/InputDiv";
import Button from "../../components/Button";
import { isMbti } from "../../utils/regexes";
import { sendMbti } from "../../_actions/register_action";
import { useHistory } from "react-router";
import { useDispatch } from "react-redux";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import FormDiv from "../../components/FormDiv";
import Navbar from "../../components/Navbar";

function MBTI() {
  const history = useHistory();
  const dispatch = useDispatch();
  const [mbti, setMbti] = useState("");
  const [type, setType] = useState(false);
  const [msg, setMsg] = useState(0);

  const onMbtiHandler = (event) => {
    setMbti(event.target.value);
  };

  const messages = [
    "대문자 혹은 소문자 4자리로 알려주세요",
    "올바른 mbti 형식이 아니에요",
    "",
  ];

  useEffect(() => {
    setType(isMbti(mbti));
    if (mbti.length == 4 && !type) {
      setMsg(1);
    } else {
      setMsg(0);
    }
  }, [mbti]);

  useEffect(() => {
    if (type) {
      setMsg(2);
    }
  }, [type]);

  const onSubmitHandler = () => {
    dispatch(sendMbti(mbti));
    history.push("/register/values");
  };
  return (
    <>
      <Navbar goBack={true} />
      <Container>
        <InputDiv color={msg == 1 ? "purple" : "pink"}>
          <h3>나의 MBTI를 알려주세요</h3>
          <h4>네오에게 담겨요</h4>
          <FormDiv>
            <form>
              <label>mbti</label>
              <input
                type="text"
                value={mbti}
                placeholder="ISFP"
                maxLength="4"
                onChange={onMbtiHandler}
              ></input>
              <p>{messages[msg]}</p>
            </form>
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

export default MBTI;
