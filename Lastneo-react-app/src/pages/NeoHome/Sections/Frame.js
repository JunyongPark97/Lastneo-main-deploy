/* eslint-disable */
import React, { useEffect, useState } from "react";
import styled, { css } from "styled-components";
import { useSelector } from "react-redux";
import NewItemModal from "../../../components/NewItemModal";
import yellowalert from "../../../assets/yellowalert.png";
import ItemsContainer from "../../../components/ItemsContainer";
import SectionContainer from "../../../components/SectionContainer";
import SmallPinkBtn from "../../../components/SmallPinkBtn";
import { customMedia } from "../../../styles/GlobalStyle";
import images from "../../../assets";

const FramesContainer = styled.div`
  width: 640px;
  height: 562px;
  border-radius: 24px;
  background-color: ${(props) => props.theme.palette.palePink};
  color: ${(props) => props.theme.palette.darkGrey};
  align-items: center;
  position: relative;
  padding: 32px;
  overflow: hidden;

  p.title {
    margin-bottom: 32px;
    font-size: 18px;
    font-weight: 500;
    span {
      color: ${(props) => props.theme.palette.pink};
    }
  }
  ${customMedia.lessThan("mobile")`
    width: calc(100vw - 48px);
    // height: calc((100vw - 48px) * 0.9908);
    height: 443px;
    padding: 24px;
    p.title {
      margin-bottom: 24px;
      font-size: 16px;
    }
  `}
`;
const DescDiv = styled.div`
  /* background: lavender; */
  align-items: center;
  width: 100%;
  border-top: solid 1px ${(props) => props.theme.palette.lightPink};
  padding-top: 32px;
  p.nft-date,
  p.nft-desc {
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.palette.gray};
  }
  p.nft-date {
    margin-bottom: 316px;
  }
  p.nft-desc {
    margin-bottom: 16px;
  }
  span.new-alert {
    color: ${(props) => props.theme.palette.pink};
    font-weight: 700;
  }

  ${customMedia.lessThan("mobile")`
  padding-top: 24px;
  p {
    font-size: 12px;
  }
  p.nft-date {
    margin-bottom: 248px;
    font-size: 12px;
  }
  p.nft-desc {
    font-size: 12px;
    margin-bottom: 12px;
  }
  `}
`;
const FrameDiv = styled.div`
  display: grid;
  grid-template-columns: 300px 20px 300px 20px 300px;
  column-gap: 20px;
  align-items: center;

  position: absolute;
  top: 150px;
  img.nft-img {
    width: 300px;
    height: 300px;
    border-radius: 24px;
  }
  img.nft-arr {
    width: 20px;
    height: 20px;
  }

  ${({ noLeft, noRight }) => {
    console.log(noRight);
    if (noLeft && noRight) {
      return css`
        span.goLeft-btn {
          visibility: hidden;
        }
        span.goRight-btn {
          visibility: hidden;
        }
      `;
    }
    if (noLeft) {
      return css`
        span.goLeft-btn {
          visibility: hidden;
        }
      `;
    }
    if (noRight) {
      return css`
        span.goRight-btn {
          visibility: hidden;
        }
      `;
    }
  }}

  ${customMedia.lessThan("mobile")`
  grid-template-columns: 240px 16px 240px 16px 240px;
  column-gap: 8px;
  top: 117px;
  img.nft-img {
    width: 240px;
    height: 240px;
    border-radius: 20px;
  }
  img.nft-arr {
    width: 16px;
    height: 16px;
  }
  `}
`;
const msgGenerator = (idx) => {
  if (idx == 0) {
    return (
      <>
        <p className="msg-web">
          아직 발급받은 액자가 없어요. 네오 방에서 인격을 공유해보세요!
        </p>
        <p className="msg-mobile">
          아직 발급받은 액자가 없어요. <br />
          네오 방에서 인격을 공유해보세요!
        </p>
      </>
    );
  } else {
    return (
      <>
        <p className="msg-web">
          새로운 캐릭터 액자가 있어요! 네오의 소유권이 생겼네요!
        </p>
        <p className="msg-mobile">
          새로운 캐릭터 액자가 있어요!
          <br />
          네오의 소유권이 생겼네요!
        </p>
      </>
    );
  }
};

const isThereNewFrame = (arr) => {
  const newFrame = arr.some((item) => {
    if (item.today_received) {
      return true;
    }
    return false;
  });
  return newFrame;
};
function Frame({ store, owner }) {
  const arr = store.nfts_info;
  // nft 배열(nft_image, created_at, today_received, opensea_link)

  const newFrame = isThereNewFrame(arr);
  const [modal, setModal] = useState(newFrame);
  const [modalMsg, setModalMsg] = useState(-1);
  const [center, setCenter] = useState(0);
  console.log(newFrame);
  useEffect(() => {
    if (arr.length == 0) {
      setModal(true);
      setModalMsg(0);
    }
  }, []);

  console.log(arr.length);
  console.log(center);

  const onClickHandler = () => {
    // arr[center].opensea_link 새 창으로 연결
  };

  const goLeft = () => {
    setCenter(center - 1);
  };
  const goRight = () => {
    setCenter(center + 1);
  };
  return (
    <SectionContainer color="pink" frame owner={owner}>
      <p>액자</p>
      <h3 className={!modal ? "broad-margin" : undefined}>
        네오 소유권과 함께
        <br />
        캐릭터 액자가 <span>{arr.length}번</span> 발급되었어요
      </h3>
      {modal && (
        <NewItemModal newItem={newFrame}>
          <img src={yellowalert} />
          {msgGenerator(modalMsg)}
        </NewItemModal>
      )}
      {arr.length != 0 && (
        <FramesContainer>
          <p className="title">
            네오 캐릭터의 <span>아이템</span>이에요!
          </p>
          <DescDiv>
            <p className="nft-date">
              {center + 1}번째&nbsp;|&nbsp;
              {arr[center].today_received ? "오늘" : arr[center].created_at}
              &nbsp;발급&nbsp;
              {arr[center].today_received ? (
                <span className="new-alert">N</span>
              ) : null}
            </p>
            {arr[center].opensea_link == null ? (
              <p className="nft-desc">
                발급된 nft 주소가 생성되면 알려드릴게요!
              </p>
            ) : (
              <p className="nft-desc">액자와 함께 발급된 nft를 확인해보세요</p>
            )}
            <SmallPinkBtn
              className="nft-btn"
              onClick={onClickHandler}
              disabled={arr[center].opensea_link == null}
            >
              보러가기
            </SmallPinkBtn>
          </DescDiv>
          <FrameDiv noLeft={center == 0} noRight={center == arr.length - 1}>
            {center != 0 ? (
              <img src={arr[center - 1].nft_image} className="nft-img" />
            ) : (
              <img src={images.emptyframe} className="nft-img" />
            )}
            <span onClick={goLeft} className="goLeft-btn">
              <img src={images.goleft} className="nft-arr" />
            </span>
            <img src={arr[center].nft_image} className="nft-img" />
            <span onClick={goRight} className="goRight-btn">
              <img src={images.goright} className="nft-arr" />
            </span>
            {center != arr.length - 1 ? (
              <img src={arr[center + 1].nft_image} className="nft-img" />
            ) : (
              <img src={images.emptyframe} className="nft-img" />
            )}
          </FrameDiv>
        </FramesContainer>
      )}
    </SectionContainer>
  );
}

export default Frame;
