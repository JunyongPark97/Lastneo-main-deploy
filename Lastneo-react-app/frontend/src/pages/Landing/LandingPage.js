/* eslint-disable */
import React from "react";
import Footer from "../../components/Footer";
import styled from "styled-components";
import { useHistory } from "react-router";
import LandingNav from "./LandingNav";
import { customMedia } from "../../styles/GlobalStyle";
import images from "../../assets";

const StyledBtn = styled.button`
  width: 142px;
  height: 62px;
  background-color: ${(props) => props.theme.palette.pink};
  color: ${(props) => props.theme.palette.white};
  font-size: 18px;
  font-weight: 500;
  border-radius: 12px;

  &:hover {
    background-color: ${(props) => props.theme.palette.darkPink};
    color: ${(props) => props.theme.palette.grey};
  }

  ${customMedia.lessThan("mobile")`
    width: 114px;
    height: 52px;
    font-size: 16px;
  `}
`;

const Container = styled.div`
  width: 100%;
  text-align: center;
  color: ${(props) => props.theme.palette.black};
  padding-top: 60px;
  h1 {
    font-size: 64px;
    margin-bottom: 60px;
    font-weight: 900;
    line-height: 92px;
  }
  h2 {
    font-size: 48px;
    line-height: 70px;
    font-weight: 700;
  }
  h3 {
    font-weight: bold;
    font-size: 32px;
  }
  p {
    font-size: 24px;
  }
  ${customMedia.lessThan("mobile")`
  padding-top: 56px;
  section {
    width: 100%;
  }
  h1 {
    font-size: 48px;
    margin-bottom: 32px;
    line-height: 70px;
  }
  h2 {
    font-size: 32px;
  }
  h3 {
    font-size: 24px
  }
  `}
`;

const Section1 = styled.section`
  padding: 200px 0px;
  background-color: ${(props) => props.theme.palette.powderPurple};
  button {
    margin-bottom: 48px;
  }
  ${customMedia.lessThan("mobile")`
    padding: 96px 24px 0 24px; 
    height: 100vh;
  `}
`;

const Section2 = styled.section`
  padding: 200px 0px;
  background-color: ${(props) => props.theme.palette.lightPurple};
  color: ${(props) => props.theme.palette.powderGrey};
  p {
    font-size: 32px;
    font-weight: 500;
    line-height: 48px;
  }
  & > .mobile {
    display: none;
  }
  ${customMedia.lessThan("mobile")`
  padding: 96px 24px;
  
  & > .web {
    display: none;
  }
  & > .mobile {
    display: block;
    font-size: 24px;
    line-height: 35px;
  }
`}
`;

const Section3 = styled.section`
  padding: 0 0 200px 0;
  width: 960px;
  margin: auto;
  div {
    text-align: left;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 200px;
  }
  img {
    width: 400px;
    height: 400px;
  }
  h2 {
    margin-bottom: 20px;
  }
  p {
    font-size: 20px;
    line-height: 30px;
    color: ${(props) => props.theme.palette.powderGrey};
  }

  ${customMedia.lessThan("mobile")`
    padding: 96px 24px 0 24px;
    h2 {
      margin-bottom: 12px;
    }
    div {
      flex-direction: column;
      align-items: flex-start;
      margin: 0 0 128px 0;
      & > .second-img {
        order:3
      }
      & > .second-title {
        order:1
      }
      & > .second-desc {
        order:2
      }
      & > .fourth-img {
        order:3
      }
      & > .fourth-title {
        order:1
      }
      & > .fourth-desc {
        order:2
      }
    }
    img {
      width: 327px;
      height: 327px;
      margin-top: 80px;
    }
    h2 {
      line-height: 48px;
    }
    p {
      font-size: 16px;
      line-height: 26px;
    }
  `}
`;
const Section4 = styled.section`
  padding: 200px 0px;
  background-color: ${(props) => props.theme.palette.black};
  h2 {
    color: ${(props) => props.theme.palette.lightGrey};
    margin-bottom: 20px;
  }
  p {
    color: ${(props) => props.theme.palette.grey};
    margin-bottom: 20px;
    font-size: 20px;
    line-height: 29px;
  }
  & > .mobile {
    display: none;
  }
  button {
    margin: 0;
    font-size: 20px;
    font-weight: 500;
    background-color: transparent;
    width: 120px;
    height: 29px;
    color: ${(props) => props.theme.palette.flowerPink};
    img {
      width: 16px;
      height: 16px;
    }
  }
  ${customMedia.lessThan("mobile")`
  padding: 96px 24px;
  & > .web {
    display: none;
  }
  & > .mobile {
    display: block;
    font-size: 16px;
    line-height: 26px;
    margin-bottom: 12px;
  }
  h2 {
    margin-bottom: 12px;
  }
  button {
    font-size: 16px;
  }

  `}
`;

const Section5 = styled.section`
  padding: 120px 0px;
  background-color: ${(props) => props.theme.palette.paleYellow};
  h2 {
    margin-bottom: 60px;
  }
  & > .mobile {
    display: none;
  }
  ${customMedia.lessThan("mobile")`
    padding: 80px 0px;
    & > .web {
      display: none;
    }
    & > .mobile {
      display: block;
      line-height: 48px;
      margin-bottom: 32px;
    }
  `}
`;
function LandingPage() {
  const history = useHistory();

  const onClickHandler = () => {
    history.push("/register");
  };
  return (
    <>
      <LandingNav />
      <Container>
        <Section1>
          <h3>나를 담는 단 하나의 방법</h3>
          <h1>'네오'</h1>
          <StyledBtn onClick={onClickHandler}>네오 만들기</StyledBtn>
        </Section1>
        <Section2>
          <p className="web">
            곧 우리가 살아갈 확장된 세계,
            <br />
            메타버스 속 아바타의 모습은 계속 바뀔거에요.
            <br />
            나의 인격인 '네오'를 만들어
            <br />
            새로운 세계에서 살아갈 준비를 해보세요.
            <br />
          </p>
          <p className="mobile">
            곧 우리가 살아갈 확장된 세계,
            <br />
            메타버스 속 아바타의 모습은
            <br />
            계속 바뀔거에요.
            <br />
            나의 인격인 '네오'를 만들어
            <br />
            새로운 세계에서
            <br />
            살아갈 준비를 해보세요.
          </p>
        </Section2>
        <Section3>
          <div>
            <span>
              <h2>
                나를 네오에
                <br />
                담아보세요
              </h2>
              <p>
                나의 인격인 네오에
                <br />
                성격과 가치관을 가장 먼저 담아보세요.
              </p>
            </span>
            <img src={images.landing_temp} />
          </div>
          <div>
            <img className="second-img" src={images.landing_temp} />
            <span>
              <h2 className="second-title">
                네오가 캐릭터로
                <br />
                표현돼요
              </h2>
              <p className="second-desc">
                네오의 모습은 16가지 캐릭터와
                <br />
                여러 아이템으로 표현돼요.
              </p>
            </span>
          </div>
          <div>
            <span>
              <h2>
                네오 캐릭터로
                <br />
                나를 소개해보세요
              </h2>
              <p>
                이제 네오 캐릭터로 친구들에게
                <br />
                나를 소개하고 mbti처럼 사용해보세요.
              </p>
            </span>
            <img src={images.landing_temp} />
          </div>
          <div>
            <img src={images.landing_temp} className="fourth-img" />
            <span>
              <h2 className="fourth-title">
                모든 메타버스에서
                <br />
                네오가 필요할 거에요
              </h2>
              <p className="fourth-desc">
                다양한 모습의 모든 아바타에
                <br />
                네오라는 인격이 있어 또 다른 나로 살 수 있어요.
              </p>
            </span>
          </div>
        </Section3>
        <Section4>
          <h2>네오를 왜 만드나요?</h2>
          <p className="web">
            2040년, 현실이라는 절대적인 기준이 없어진 세상.
            <br />
            인류는 그 속에서 자신을 잃어버리는 혼돈에 빠집니다.
            <br />
            우리는 인류를 구하기 위해
            <br />
            분기점이 된 2022년, 현재로 도착하고..
            <br />
          </p>
          <p className="mobile">
            2040년, 현실이라는
            <br />
            절대적인 기준이 없어진 세상.
            <br />
            인류는 그 속에서
            <br />
            자신을 잃어버리는 혼돈에 빠집니다.
            <br />
            우리는 인류를 구하기 위해
            <br />
            분기점이 된 2022년 현재로 도착하고..
            <br />
          </p>
          <button>
            스토리 보기
            <img src={images.powderPinkArr} />
          </button>
        </Section4>
        <Section5>
          <h2 className="web">
            나를 담는 단 하나의 방법,
            <br />
            네오를 지금 만들어보세요
          </h2>
          <h2 className="mobile">
            나를 담는 단 하나의
            <br />
            방법, 네오를 지금
            <br />
            만들어보세요
          </h2>
          <StyledBtn onClick={onClickHandler}>네오 만들기</StyledBtn>
        </Section5>
      </Container>
      <Footer />
    </>
  );
}

export default LandingPage;
