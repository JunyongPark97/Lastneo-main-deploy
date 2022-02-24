/* eslint-disable */
import React from "react";
import styled, { css } from "styled-components";
import LandingNav from "../Landing/LandingNav";
import Footer from "../../components/Footer";
import { customMedia } from "../../styles/GlobalStyle";

function StoryPage() {
  return (
    <>
      <LandingNav></LandingNav>
      <StoryContainer>
        <h1 className="main-title">
          <span>스토리</span> : 네오의 탄생
        </h1>
        <Paragraph>
          <h3>
            <span>첫번째.</span> 수없이 많은 세계에서 사는 사람들
          </h3>
          <div className="web">
            <p>
              2040년, 현실이라는 절대적인 기준이 없는 세상.
              <br />
              지금 현실이라고 믿는 이 세상도 메타버스 중 하나의 세상일 뿐인
              시대.
              <br />
              인류는 수없이 많은 세계를 넘나들며 학교에 가고, 연애를 하며
              살아갑니다.
              <br />
            </p>
            <p>하지만 우리 인류는 중대한 문제에 마주칩니다.</p>
          </div>
          <div className="mobile">
            <p>
              2040년, 현실이라는 절대적인 기준이 없는 세상.
              <br />
              지금 현실이라고 믿는 이 세상도
              <br />
              메타버스 중 하나의 세상일 뿐인 시대.
              <br />
              인류는 수없이 많은 세계를 넘나들며
              <br />
              학교에 가고, 연애를 하며 살아갑니다.
              <br />
            </p>
            <p>하지만 우리 인류는 중대한 문제에 마주칩니다.</p>
          </div>
        </Paragraph>
        <Paragraph>
          <h3>
            <span>두번째.</span> 혼돈에 빠진 인류
          </h3>
          <p>
            얼굴, 피부, 심지어는 성별까지 자유롭게 바꿔가며 살다 보니
            <br />
            인류는 점점 자신이 누구인지 혼란스러워졌습니다.
            <br />
            우리는 매일 스스로에게 이런 질문을 합니다.
            <br />
            ‘나는 누구인가?’, ‘무엇을 나라고 믿을 수 있는가?'
          </p>
          <p className="wide-margin">
            인류는 혼돈의 세상에서 각 세계마다 협약을 맺고,
            <br />
            우리를 정의하기 위한 단 하나의 기준을 세우려 했죠.
            <br />
            하지만 각자 살아가는 세계는 너무 달랐고,
            <br />그 사이에서 기준을 정하기엔 너무 멀리 와버렸습니다.
          </p>
        </Paragraph>
        <Paragraph>
          <h3>
            <span>세번째.</span> 과연 인류는 어떻게 되는걸까요?
          </h3>
          <div className="web">
            <p>
              그러나 이 혼돈 속에서도 ‘네오’ 라는 디지털 인격을 지닌 소수의
              사람들이 있었고,
              <br />
              이들은 자신이 누구인지 혼란스러워 하지 않았습니다.
            </p>
            <p>
              그들은 이 혼돈의 세상을 구하기 위해 회의를 열었습니다.
              <br />
              그 결과, 당장의 인류를 구하기엔 너무 늦었다고 판단해
              <br />
              과거의 인류가 각자의 인격을 네오로 구현해 지니고 있게 하자고
              결정했습니다.
            </p>
          </div>
          <div className="mobile">
            <p>
              그러나 이 혼돈 속에서도 ‘네오’ 라는
              <br />
              디지털 인격을 지닌 소수의 사람들이 있었고,
              <br />
              이들은 자신이 누구인지 혼란스러워 하지 않았습니다.
            </p>
            <p>
              그들은 이 혼돈의 세상을 구하기 위해 회의를 열었습니다.
              <br />
              그 결과, 당장의 인류를 구하기엔 너무 늦었다고 판단해
              <br />
              과거의 인류가 각자의 인격을 네오로 구현해
              <br />
              지니고 있게 하자고 결정했습니다.
            </p>
          </div>
        </Paragraph>
        <Paragraph>
          <h3>
            <span>네번째.</span> 2022년이라는 목적지
          </h3>
          <div className="web">
            <p>
              그들이 과거의 인류가 네오라는 인격을 잘 구현하도록 분석한 결과,
              <br />
              메타버스라는 새로운 세계의 분기점이 된 2022년을 목적지로
              정했습니다.
              <br />
              또한, 혼돈 속에서 살아남은 101,485개의 네오 데이터를 압축해 양자
              우주선에 실었습니다.
            </p>
            <p className="wide-margin">
              드디어! 준비한 우주선이 웜홀을 거쳐 2022년으로 향하는데. 삐리삐립
              - - -
            </p>
          </div>
          <div className="mobile">
            <p>
              그들이 과거의 인류가 네오라는 인격을 잘 구현하도록 분석한 결과,
              <br />
              메타버스라는 새로운 세계의 분기점이 된<br />
              2022년을 목적지로 정했습니다.
              <br />
              또한, 혼돈 속에서 살아남은 101,485개의
              <br />
              네오 데이터를 압축해 양자 우주선에 실었습니다.
            </p>
            <p className="wide-margin">
              드디어! 준비한 우주선이 웜홀을 거쳐 2022년으로 향하는데.
              <br />
              삐리삐립 - - -
            </p>
          </div>
        </Paragraph>
        <Paragraph>
          <h3>
            <span>다섯번째. </span>샐리 킴 박사를 아시나요?
          </h3>
          <div className="web">
            <p>
              웜홀을 지나던 중, 네오 데이터에서 이상현상이 발견됩니다.
              <br />
              101,485개로 압축한 데이터가 양자화 과정에서 단 16개로
              다운그레이드된 것이죠.
              <br />
              소실되지 않은 데이터를 실은 양자 우주선은 겨우 2022년에 도달했고,
              <br />
              천재 샐리 킴 박사에 의해 발견됩니다.
            </p>
            <p>
              미래의 인류로부터 온 중요한 데이터임을 직감한 샐리 킴 박사는
              <br />더 이상의 데이터 소실을 막기 위한 저장장치를 개발합니다.
            </p>
          </div>
          <div className="mobile">
            <p>
              웜홀을 지나던 중, 네오 데이터에서 이상현상이 발견됩니다.
              <br />
              101,485개로 압축한 데이터가 양자화 과정에서
              <br />
              단 16개로 다운그레이드된 것이죠.
              <br />
              소실되지 않은 데이터를 실은 양자 우주선은
              <br />
              겨우 2022년에 도달했고, 천재 샐리 킴 박사에 의해 발견됩니다.
            </p>
            <p>
              미래의 인류로부터 온 중요한 데이터임을 직감한 샐리 킴 박사는
              <br />더 이상의 데이터 소실을 막기 위한 저장장치를 개발합니다.
            </p>
          </div>
        </Paragraph>
        <Paragraph>
          <h3>
            <span>마지막. </span>깨달은 사람들
          </h3>
          <div className="web">
            <p>
              네오 데이터를 담을 수 있는 16개의 그릇, 애니마를 만든 샐리 킴
              박사는
              <br />
              현재 인류에게 단호하게 공포합니다.
              <br />
              각자의 네오를 만들어 자신을 잃지 않아야 한다고.. 인류의 미래를
              바꿔야 한다고..
            </p>
            <p className="wide-margin">
              이제 사람들은 자신의 인격인 네오를 만들어 사라지지 않는 네트워크에
              기록하고, <br />
              네오가 담긴 애니마를 점점 발전시키기 시작했습니다.
              <br />곧 모든 사람이 알게 되겠죠. 잠깐! 이 글을 읽는 당신, 네오는
              만드신 건가요?
            </p>
          </div>
          <div className="mobile">
            <p>
              네오 데이터를 담을 수 있는 16개의 그릇,
              <br />
              애니마를 만든 샐리 킴 박사는 현재 인류에게 단호하게 공포합니다.
              <br />
              각자의 네오를 만들어 자신을 잃지 않아야 한다고..
              <br />
              인류의 미래를 바꿔야 한다고..
            </p>
            <p className="wide-margin">
              이제 사람들은 자신의 인격인 네오를 만들어
              <br />
              사라지지 않는 네트워크에 기록하고, <br />
              네오가 담긴 애니마를 점점 발전시키기 시작했습니다.
              <br />곧 모든 사람이 알게 되겠죠.
              <br />
              잠깐! 이 글을 읽는 당신, 네오는 만드신 건가요?
            </p>
          </div>
        </Paragraph>
        <StyledSection>
          <h1>
            지금 바로
            <br />
            네오를 만들어보세요
          </h1>
          <button
            onClick={() => {
              window.location.href = "register";
            }}
          >
            네오 만들기
          </button>
        </StyledSection>
        <Footer />
      </StoryContainer>
    </>
  );
}

const StoryContainer = styled.div`
  background-image: url(/img/storybg_web.png);
  background-position: center top;
  margin-top: 60px;
  width: 100%;
  h1.main-title {
    padding: 120px 0;
    text-align: center;
    color: ${(props) => props.theme.palette.palePurple};
    font-size: 32px;
    font-weight: 500;
    span {
      color: ${(props) => props.theme.palette.coolPurple};
      font-size: 48px;
      font-weight: 700;
    }
  }

  ${customMedia.lessThan("mobile")`
  background-image: url(/img/storybg_mobile.png);
  background-position: center top;
  background-size: cover;
  margin-top: 56px;
  h1.main-title {
    padding: 64px 0;
    font-size: 24px;
    span {
      font-size: 32px;
    }
  }

  `}
`;

const Paragraph = styled.section`
  font-size: 20px;
  line-height: 29px;
  margin: 0 auto;
  margin-bottom: 60px;
  width: 960px;
  .mobile {
    display: none;
  }
  h3 {
    color: ${(props) => props.theme.palette.lightGrey};
    font-weight: 500;
    margin-bottom: 20px;
    span {
      color: ${(props) => props.theme.palette.coolPurple};
      font-size: 28px;
      font-weight: 500;
    }
  }
  p {
    color: ${(props) => props.theme.palette.grey};
    font-size: 20px;
    font-weight: 400;
  }
  p:nth-of-type(1) {
    margin-bottom: 20px;
    /* background: blue; */
  }
  p.wide-margin {
    /* background: green; */
    margin-bottom: 140px;
  }
  ${customMedia.lessThan("mobile")`
  width: 100%;
  padding: 0 24px;
  margin-bottom: 48px;
  font-size: 12px;
  line-height: 17px;
  .mobile {
    display: block;
  }
  .web {
    display: none;
  }
  h3 {
    font-size: 12px;
    span {
      font-size: 16px;
    }
  }
  p {
    font-size: 12px;
  }
  p.wide-margin {
    margin-bottom: 80px;
  }
  `}
`;
const StyledSection = styled.section`
  margin: auto;
  text-align: center;
  padding-bottom: 120px;
  h1 {
    font-size: 48px;
    font-weight: 700;
    line-height: 70px;
    color: ${(props) => props.theme.palette.lightGrey};
    margin-bottom: 60px;
  }
  button {
    width: 142px;
    height: 62px;
    border-radius: 12px;
    background-color: ${(props) => props.theme.palette.purple};
    color: ${(props) => props.theme.palette.white};
    font-size: 18px;
    font-weight: 500;
    &:hover {
      background-color: ${(props) => props.theme.palette.darkPurple};
    }
  }
  ${customMedia.lessThan("mobile")`
  width: 100%;
  padding-bottom: 64px;
  padding-top: 66px;
  h1 {
    font-size: 32px;
    line-height: 48px;
    margin-bottom: 32px;
  }
  button {
    width: 114px;
    height: 52px;
    font-size: 16px;
  }
  `}
`;
export default StoryPage;
