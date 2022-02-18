/* eslint-disable */
import React, { useState, useEffect, useRef } from "react";
import InputDiv from "../../components/InputDiv";
import Button from "../../components/Button";
import { useHistory } from "react-router-dom";
import { login } from "../../modules/neohome";
import SmallBtn from "../../components/SmallBtn";
import styled from "styled-components";
import FormDiv from "../../components/FormDiv";
import { customMedia } from "../../styles/GlobalStyle";
import { css } from "styled-components";

function EnterPw({ nickname }) {
  const history = useHistory();
  const myRef = useRef();
  const [password, setPassword] = useState("");
  const [msg, setMsg] = useState(1);
  const [type, setType] = useState(false);

  const messages = [
    "",
    "네오를 만들 때 설정했었어요",
    "비밀번호가 맞지 않아요",
  ];

  useEffect(() => {
    if (!type) {
      setMsg(1);
    } else {
      setMsg(0);
    }
  }, [password]);

  useEffect(() => {
    if (password.length >= 6) {
      setType(true);
    }
  }, [password]);
  const onPasswordHandler = (event) => {
    setPassword(event.target.value);
  };

  const onClickHandler = () => {
    let body = {
      nickname,
      password,
    };
    login(body).then((response) => {
      if (response.type == "neohome/FRONTDOOR_LOGIN_SUCCESS") {
        history.push({
          pathname: `/${nickname}`,
          state: { from: "frontdoor", status: 0 },
        });
      } else {
        setMsg(2);
      }
    });
  };

  const onSmallBtnHandler = () => {
    history.push({ pathname: "/resetpw", state: { nickname: nickname } });
  };

  const onBlurHandler = () => {
    if (password.length > 5) {
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

  return (
    <StyledDiv>
      <StyledInputDiv color={msg == 2 ? "coolPurple" : "flowerPink"}>
        <h3>집 비밀번호를 입력해주세요</h3>
        <FormDiv>
          <form onFocus={onFocusHandler} ref={myRef}>
            <label>비밀번호</label>
            <input
              type="text"
              placeholder="ABCD1234!"
              value={password}
              onChange={onPasswordHandler}
              onBlur={onBlurHandler}
              maxLength="16"
            ></input>
            <p>{messages[msg]}</p>
          </form>
        </FormDiv>
        {(!type || msg == 2) && (
          <SmallBtn onClick={onSmallBtnHandler}>
            비밀번호를 까먹으셨나요?
          </SmallBtn>
        )}
        <Button
          onClick={onClickHandler}
          disabled={msg == 2 || !type}
          color={msg == 2 || !type ? "lightPink" : "pink"}
        >
          들어가기
        </Button>
      </StyledInputDiv>
    </StyledDiv>
  );
}

export default EnterPw;

const StyledDiv = styled.div`
  color: ${(props) => props.theme.palette.lightGrey};
  background-color: rgba(0, 0, 0, 0.6);
  flex-grow: 1;
  flex-shrink: 0;
  position: relative;
  align-items: center;
  width: 100%;
  h4 {
    margin-bottom: 40px;
  }
  ${customMedia.lessThan("mobile")`
  h4 {
    font-size: 16px;
  }
  h3 {
    font-size: 20px;
  }
    `}
`;

const StyledInputDiv = styled(InputDiv)`
  h3 {
    color: ${(props) => props.theme.palette.lightGrey};
    margin-bottom: 0;
  }
  label {
    ${(props) => {
      if (props.color == "coolPurple") {
        return css`
          color: ${(props) => props.theme.palette.coolPurple};
        `;
      } else {
        return css`
          color: ${(props) => props.theme.palette.lightGrey};
        `;
      }
    }}
  }
  p {
    ${(props) => {
      if (props.color == "coolPurple") {
        return css`
          color: ${(props) => props.theme.palette.coolPurple};
        `;
      } else {
        return css`
          color: ${(props) => props.theme.palette.gray};
        `;
      }
    }}
  }
  input {
    color: lightGrey;
    ${(props) => {
      if (props.color == "coolPurple") {
        return css`
          border-bottom: 2px solid ${(props) => props.theme.palette.coolPurple};
        `;
      } else {
        return css`
          border-bottom: 2px solid ${(props) => props.theme.palette.darkGrey};
        `;
      }
    }}
  }

  input::placeholder {
    color: ${(props) => props.theme.palette.darkGrey};
  }
  input:hover {
    ${(props) => {
      if (props.color == "coolPurple") {
        return css`
          border-bottom: solid ${(props) => props.theme.palette.coolPurple} 2px;
        `;
      } else {
        return css`
          border-bottom: solid ${(props) => props.theme.palette.coolWhite} 2px;
        `;
      }
    }}
  }
  form:focus-within {
    label {
      ${(props) => {
        const selected = props.theme.palette[props.color];
        return css`
          color: ${selected};
        `;
      }}
    }
    p {
      ${(props) => {
        if (props.color == "coolPurple") {
          const selected = props.theme.palette[props.color];
          return css`
            color: ${selected};
          `;
        } else {
          return css`
            color: props.theme.palette.gray;
          `;
        }
      }}
    }
    input {
      ${(props) => {
        const selected = props.theme.palette[props.color];
        return css`
          border-bottom: 2px solid ${selected};
        `;
      }}
    }
  }
`;
