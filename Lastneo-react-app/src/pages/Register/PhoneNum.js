/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import InputDiv from "../../components/InputDiv";
import Button from "../../components/Button";
import SmallBtn from "../../components/SmallBtn";
import styled from "styled-components";
import { isPhoneNumber } from "../../utils/regexes";
import { getAuth } from "../../modules/register";
import { confirmMarketing } from "../../modules/register";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import checked from "../../assets/checked.png";
import unchecked from "../../assets/unchecked.png";
import { customMedia } from "../../styles/GlobalStyle";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import FormDiv from "../../components/FormDiv";
import Navbar from "../../components/Navbar";

function PhoneNum() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [phoneNum, setPhoneNum] = useState("");
  const [msg, setMsg] = useState(0);
  const [activateBtn, setActivateBtn] = useState(false);
  const myRef = useRef();
  const [phoneType, setPhoneType] = useState(false);
  const [term, setTerm] = useState(true); // checkbox input에 클릭 시 토글
  const [marketing, setMarketing] = useState(true);

  const messages = [
    "전화번호 10자리 혹은 11자리를 알려주세요",
    "올바른 전화번호 형식이 아니에요",
    "이미 네오가 있는 전화번호에요",
    "",
  ];

  // 페이지 렌더링 시 Scroll to top
  useEffect(() => {
    window.onload = function () {
      setTimeout(function () {
        scrollTo(0, 0);
      }, 100);
    };
  }, []);
  useEffect(() => {
    if (!phoneType && phoneNum.length == 0) {
      setMsg(0);
    }
  }, [phoneType, phoneNum]);

  useEffect(() => {
    setActivateBtn(phoneType && term);
  }, [phoneType, term]);

  const onTermHandler = () => {
    setTerm(!term);
  };

  const onMarketingHandler = () => {
    setMarketing(!marketing);
  };

  const onBlurHandler = () => {
    if (phoneNum.length == 0) {
      setMsg(0);
    } else if (!phoneType) {
      setMsg(1);
    }
    if (phoneType) {
      setMsg(3);
    }
  };
  const onPhoneNumHandler = (event) => {
    setPhoneNum(event.target.value);
    setPhoneType(isPhoneNumber(event.target.value));
  };

  const onSubmitHandler = (event) => {
    event.preventDefault();
    let body = {
      phone: phoneNum,
    };
    dispatch(confirmMarketing(marketing));
    dispatch(getAuth(body)).then((response) => {
      if (response.type == "register/AUTH_REQ_SUCCESS") {
        history.push("/register/authnum");
      } else if (
        response.payload.non_field_errors[0] == "이미 가입된 정보가 있습니다."
      ) {
        setMsg(2);
        setActivateBtn(false);
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

  const onClickHandler = () => {
    history.push("/login");
  };

  return (
    <>
      <Navbar goBack={true} color="white" />
      <Container>
        <InputDiv
          className="input-container"
          color={msg == 1 || msg == 2 ? "purple" : "pink"}
        >
          <h3>전화번호를 입력해주세요</h3>
          <h4>네오의 집 주소나 비밀번호를 찾을 때 필요해요</h4>
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
            <SmallBtn onClick={onClickHandler}>
              이미 네오를 발급 받았었나요?
            </SmallBtn>
            <AgrDiv>
              <CheckBox>
                <span type="button" onClick={onTermHandler}>
                  <img src={!term ? unchecked : checked} />
                </span>
                <span>
                  <StyledLink>
                    <a href="https://foremost-avocado-334.notion.site/5592e83a44fc414d81b8bb5b5f2ca9d6">
                      개인정보 처리방침
                    </a>
                  </StyledLink>
                  &nbsp;및&nbsp;
                  <StyledLink>
                    <a href="https://foremost-avocado-334.notion.site/72c7e2423d9d4e75af4a239bfac0494c">
                      라스트네오 이용약관
                    </a>
                  </StyledLink>
                  &nbsp;필수 동의
                </span>
              </CheckBox>
              <CheckBox>
                <span type="button" onClick={onMarketingHandler}>
                  <img src={!marketing ? unchecked : checked} />
                </span>
                <span>
                  <StyledLink>
                    <a href="https://foremost-avocado-334.notion.site/a79bcee6344749b497b9229248655710">
                      마케팅 수신
                    </a>
                  </StyledLink>
                  &nbsp;선택 동의
                </span>
              </CheckBox>
            </AgrDiv>
          </FormDiv>
          <Button
            onClick={onSubmitHandler}
            disabled={!phoneType || !term || !activateBtn}
            color={!activateBtn ? "lightPink" : "pink"}
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

const CheckBox = styled.div`
  margin-bottom: 8px;
  display: flex;
  flex-direction: row;
  align-items: center;
  font-weight: 400;
  button {
    background: none;
    border: none;
  }
  img {
    width: 20px;
    height: auto;
    cursor: pointer;
  }
  span {
    margin-right: 12px;
    font-size: 14px;
    color: ${(props) => props.theme.palette.gray};
  }

  ${customMedia.lessThan("mobile")`
  img {
    width: 16px;
    height: 16px;
  }
  span {
    font-size: 12px;
  }
    `}
`;

const AgrDiv = styled.div`
  margin-top: 16px;
`;

const StyledLink = styled.button`
  color: ${(props) => props.theme.palette.gray};
  font-weight: 400;
  font-size: 14px;
  a:link {
    color: ${(props) => props.theme.palette.gray};
    text-decoration: underline ${(props) => props.theme.palette.gray};
  }
  a:visited {
    color: ${(props) => props.theme.palette.gray};
    text-decoration: none;
  }
  a:hover {
    color: ${(props) => props.theme.palette.gray};
    text-decoration: none;
  }
  ${customMedia.lessThan("mobile")`
    font-size: 12px;
    `}
`;
