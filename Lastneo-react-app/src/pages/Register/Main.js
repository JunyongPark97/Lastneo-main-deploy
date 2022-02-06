/* eslint-disable */
import React from "react";
import Button from "../../components/Button";
import styled from "styled-components";
import Footer from "../../components/Footer";
import images from "../../assets";
import { useHistory } from "react-router";

const Container = styled.div`
  width: 100%;
  h3 {
    margin-bottom: 8px;
  }
  padding-bottom: 80px;
`;
const StyledButton = styled(Button)`
  position: static;
  margin: auto;
`;
const Section1 = styled.section`
  padding-top: 72px;
  padding-bottom: 120px;
  text-align: center;
  background-color: ${(props) => props.theme.palette.powderPurple};
  p {
    margin-bottom: 16px;
    color: ${(props) => props.theme.palette.darkGrey};
  }
  img {
    width: 300px;
    height: auto;
  }
  h2 {
    margin-bottom: 20px;
  }
`;
const Section2 = styled.section`
  margin: auto;
  width: 640px;
  padding-top: 80px;
  padding-bottom: 80px;
  img {
    width: 100px;
    height: 100px;
    margin-bottom: 20px;
  }
  section {
    display: flex;
    flex-direction: row;
    margin-top: 80px;
    div {
      flex: 1;
    }
  }
  span {
    font-size: 20px;
    margin-top: 4px;
    margin-bottom: 0;
  }
  h4 {
    color: ${(props) => props.theme.palette.darkGrey};
    font-weight: 400;
  }
  p {
    color: ${(props) => props.theme.palette.darkGrey};
    font-weight: 400;
  }
`;

const Section3 = styled(Section2)`
  span {
    margin-top: 0;
    margin-bottom: 4px;
  }
`;
function Main() {
  const history = useHistory();
  const onClickHandler = () => {
    history.push("/register/phonenum");
  };
  return (
    <>
      <Container>
        <Section1>
          <p>네오 만들기</p>
          <h2>
            내가 담은 인격인
            <br />
            네오를 만들고 소유하세요
          </h2>
          <img src={images.mainImg} />
        </Section1>
        <Section2>
          <h3>네오는 이렇게 탄생해요</h3>
          <h4>
            프리모(처음의) 네오는 나의 대표 인격을 공유하고,
            <br />
            제공되는 집 주소와 비밀번호만 설정하면 완료!
          </h4>
          <section>
            <div>
              <img src={images.purplehuman} />
              <p>나의 mbti와 가치관을 네오에게</p>
              <span>인격 공유하기</span>
            </div>
            <div>
              <img src={images.key} />
              <p>네오가 있을 집을 안전하게</p>
              <span>집 비밀번호 설정하기</span>
            </div>
          </section>
        </Section2>
        <Section3>
          <h3>나를 닮은 네오는?</h3>
          <h4>
            이미지로 표현되어 인격과 함께 NFT가 발급됩니다.
            <br />
            네오는 제공된 집에서 다시 만나볼 수 있어요.
          </h4>
          <section>
            <div>
              <img src={images.yellownft} />
              <span>네오 NFT</span>
              <p>
                담은 인격과 네오의 이미지를
                <br />
                소유해보세요
              </p>
            </div>
            <div>
              <img src={images.pinkhome} />
              <span>네오집</span>
              <p>
                나를 꾸준히 담아보고,
                <br />
                집으로 친구를 초대하세요
              </p>
            </div>
          </section>
        </Section3>
        <StyledButton onClick={onClickHandler} color="pink">
          시작하기
        </StyledButton>
      </Container>
      <Footer />
    </>
  );
}

export default Main;
