/* eslint-disable */
import React from "react";
import SectionContainer from "../../../components/SectionContainer";
import styled from "styled-components";
import images from "../../../assets";
import Button from "../../../components/Button";
import { customMedia } from "../../../styles/GlobalStyle";

const DatesDiv = styled.div`
  margin-bottom: 60px;
  p.nft-records {
    color: ${(props) => props.theme.palette.darkGrey};
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 8px;
  }

  ${customMedia.lessThan("mobile")`
  margin-bottom: 48px;
  p.nft-records {
    font-size: 12px;
    margin-bottom: 6px;
  }
  `}
`;
const DescDiv = styled.div`
  p {
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    img {
      width: 16px;
      height: 16px;
      margin-right: 16px;
    }
  }
`;

const NftDiv = styled.div`
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  img {
    width: 80px;
    height: 80px;
    margin-left: 10px;
    margin=right: 10px;
  }
`;
const StyledButton = styled(Button)`
  margin-top: 20px;
  position: static;
  &:hover {
    background: ${(props) => props.theme.palette.darkPurple};
    color: ${(props) => props.theme.palette.grey};
  }
  ${customMedia.lessThan("mobile")`
    margin-top: 12px;
  `}
`;

const generateDates = (store) => {
  const arr = [];
  const items = store.items;
  if (items[0].today_received) {
    // 가치관 아이템 추가
    arr.push({ idx: 1, date: "오늘" });
  } else {
    arr.push({ idx: 1, date: items[0].created_at });
  }
  const reverse_items = items.slice(1).reverse(); // 가치관 아이템 제외한 아이템 배열을 역순으로 만듦
  reverse_items.map((item, idx) => {
    if (item.today_received) {
      arr.push({ idx: idx + 2, date: "오늘" }); // 가치관 아이템이 1번째이므로 2번째부터 시작
    } else {
      arr.push({ idx: idx + 2, date: item.created_at });
    }
  });

  return arr;
};

function GetNft({ store, remain }) {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    if (i < remain) {
      arr.push(true);
    } else {
      arr.push(false);
    }
  }

  return (
    <SectionContainer color="purple">
      <p>소유하기</p>
      <h3>
        네오를 소유할 수 있는
        <br />
        NFT 발급까지 <span>{store.neo_blocks.remain_block}/5 번</span> 담았어요
      </h3>
      <DatesDiv>
        {generateDates(store).map((item, i) => {
          return (
            <p className="nft-records" key={i}>
              {item.idx}번째&nbsp;&nbsp;|&nbsp;{item.date} 담음
            </p>
          );
        })}
      </DatesDiv>
      <NftDiv>
        <span>
          <img src={arr[0] ? images.fullheart : images.emptyheart} />
          <img src={arr[1] ? images.fullheart : images.emptyheart} />
        </span>
        <span>
          <img src={arr[2] ? images.fullheart : images.emptyheart} />
          <img src={arr[3] ? images.fullheart : images.emptyheart} />
          <img src={arr[4] ? images.fullheart : images.emptyheart} />
        </span>
      </NftDiv>
      <DescDiv>
        <p>
          <img src={images.note} />
          아래 오늘의 질문을 통해 인격을 5번 담아보세요
        </p>
        <p>
          <img src={images.yellownft} />
          네오의 소유권과 함께 캐릭터 액자가 같이 발급돼요!
        </p>
      </DescDiv>
      <StyledButton
        color={remain > 4 ? "purple" : "paleGrey"}
        disabled={remain < 5}
      >
        NFT 발급받기
      </StyledButton>
    </SectionContainer>
  );
}

export default GetNft;
