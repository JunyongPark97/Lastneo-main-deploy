/*eslint-disable*/
import React, { useEffect, useState } from "react";
import InputDiv from "../../components/InputDiv";
import Button from "../../components/Button";
import { isNickname } from "../../utils/regexes";
import styled, { css } from "styled-components";
import { useDispatch } from "react-redux";
import { sendNickname } from "../../_actions/register_action";
import { useHistory } from "react-router";
import FormDiv from "../../components/FormDiv";
import Footer from "../../components/Footer";
import Container from "../../components/Container";
import NicknameInputDiv from "../../components/NicknameInputDiv";
import { customMedia } from "../../styles/GlobalStyle";
import Navbar from "../../components/Navbar";

function Nickname() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [nickname, setNickname] = useState("");
  const [msg, setMsg] = useState(0);
  const [type, setType] = useState(false);

  const messages = [
    "영문소문자 숫자 특수문자(.과_만 해당) 3~10자 조합 ",
    "이미 사용 중인 집주소에요",
    ".과_ 이외의 특수문자는 사용할 수 없어요",
    "",
  ];

  useEffect(() => {
    setType(isNickname(nickname));
  }, [nickname]);

  useEffect(() => {
    setMsg(0);
  }, [type, nickname]);

  const onNicknameHandler = (event) => {
    setNickname(event.target.value);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    let body = { nickname: nickname };
    dispatch(sendNickname(body)).then((response) => {
      if (response.type == "nickname_success") {
        history.push("/register/password");
      } else {
        console.log(response.payload);
        setMsg(1);
      }
    });
  };

  const onBlurHandler = () => {
    if (nickname.length == 0) {
      setMsg(0);
    } else if (!type) {
      setMsg(2);
    }
    if (type) {
      setMsg(3);
    }
  };

  return (
    <>
      <Navbar goBack={true} />
      <Container>
        <NicknameInputDiv color={msg == 1 || msg == 2 ? "purple" : "pink"}>
          <h3>집 주소를 만들어주세요</h3>
          <h4>설정한 주소에서 네오를 만나볼 수 있어요</h4>
          <FormDiv>
            <form>
              <label>집주소</label>
              <StyledSpan color={msg == 1 || msg == 2 ? "purple" : "pink"}>
                lastneo.io/
                <input
                  className="input-nickname"
                  onChange={onNicknameHandler}
                  onBlur={onBlurHandler}
                  placeholder="address"
                  maxLength="10"
                />
              </StyledSpan>
              <p>{messages[msg]}</p>
            </form>
          </FormDiv>
          <Button
            onClick={onSubmitHandler}
            disabled={!type}
            color={!type ? "lightPink" : "pink"}
          >
            다음
          </Button>
        </NicknameInputDiv>
        <Footer />
      </Container>
    </>
  );
}

export default Nickname;

const StyledSpan = styled.span`
  font-size: 28px;
  font-weight: 400;
  margin-bottom: 4px;
  ${(props) => {
    if (props.color == "purple") {
      return css`
        border-bottom: 2px solid ${(props) => props.theme.palette.purple};
      `;
    } else {
      return css`
        border-bottom: 2px solid ${(props) => props.theme.palette.grey};
      `;
    }
  }}
  &:hover {
    ${(props) => {
      if (props.color != "purple") {
        return css`
          border-bottom: 2px solid ${(props) => props.theme.palette.black};
        `;
      }
    }}
  }
  &:focus-within {
    ${(props) => {
      const selected = props.theme.palette[props.color];
      return css`
        border-bottom: 2px solid ${selected};
      `;
    }}
  }
  ${customMedia.lessThan("mobile")`
    font-size: 24px;
    display: flex;
    flex-direction: row;
    padding-bottom: 8px;
  `}
`;
