/* eslint-disable */
import React from "react";
import styled from "styled-components";
import images from "../../../assets";
import { customMedia } from "../../../styles/GlobalStyle";

const DescSection = styled.section`
  width: 640px;
  padding: 60px 0;
  border-bottom: solid 1px ${(props) => props.theme.palette.paleGrey};
  color: ${(props) => props.theme.palette.darkGrey};

  h2 {
    margin-bottom: 12px;
    font-size: 28px;
    font-weight: 700;
    color: ${(props) => props.theme.palette.black};
  }
  h4 {
    margin-bottom: 60px;
    font-size: 18px;
    font-weight: 400;
  }
  p {
    margin-bottom: 12px;
    font-size: 16px;
    font-weight: 400;
  }
  span {
    font-size: 32px;
    font-wieght: 700;
    color: ${(props) => props.theme.palette.purple};
  }
  div {
    margin-top: 40px;
    display: flex;
    flex-direction: column;
    align-items: center;
    img {
      width: 160px;
      height: auto;
      margin-bottom: 40px;
    }
    p {
      margin-bottom: 0px;
      font-size: 14px;
    }
    button {
      background-color: rgba(0, 0, 0, 0);
      margin-top: 20px;
      display: flex;
      flex-direction: row;
      align-items: center;
      color: ${(props) => props.theme.palette.pink};
      font-size: 18px;
      font-weight: medium;
      img {
        width: 20px;
        height: 20px;
      }
    }
  }
  ${customMedia.lessThan("mobile")`
  width: 100%;
  padding: 24px 24px 48px 24px;
  p {
    font-size: 14px;
    margin-bottom: 8px;
  }
  h2 {
    font-size: 24px;
  }
  h3 {
    font-size: 20px;
  }
  h4 {
    font-size: 16px;
  }
  div {
    p {
      font-size: 12px;
    }
  }
    `}
`;

function Neo({ store }) {
  return (
    <DescSection>
      <h2>네오</h2>
      <h4>네오는 내가 담은 인격이에요</h4>
      <p>현재 담은 횟수</p>
      <span>{store.neo_blocks.num_block}</span>
      <div>
        <img src={images.neosoul} />
        <p>mbti와 나를 잘 설명하는 단어가 먼저 담겨있어요</p>
      </div>
    </DescSection>
  );
}

export default Neo;
