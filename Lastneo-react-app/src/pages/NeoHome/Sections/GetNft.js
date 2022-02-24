/* eslint-disable */
import React, { useState } from "react";
import SectionContainer from "../../../components/SectionContainer";
import styled from "styled-components";
import images from "../../../assets";
import Button from "../../../components/Button";
import { customMedia } from "../../../styles/GlobalStyle";
import { createNft, getOwnerInfo } from "../../../modules/owner";
import Modal from "../../../components/modals/NftModal";
import LoadingModal from "../../../components/modals/LoadingModal";
import { useDispatch, useSelector } from "react-redux";
import { setTab, setScroll } from "../../../modules/neohome";

function GetNft({ store, remain }) {
  const arr = [];
  for (let i = 0; i < 5; i++) {
    if (i < remain) {
      arr.push(true);
    } else {
      arr.push(false);
    }
  }

  const dispatch = useDispatch();
  const store_neohome = useSelector((store) => store.neohome);
  const [nftImg, setNftImg] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    dispatch(getOwnerInfo(store_neohome.nickname)).then(() => {
      setModalVisible(false);
    });
  };
  const scrollModal = () => {
    dispatch(setTab("character"));
    dispatch(setScroll("frame"));
  };

  const openLoadingModal = () => {
    setLoadingModalVisible(true);
  };
  const closeLoadingModal = () => {
    setLoadingModalVisible(false);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    openLoadingModal();
    createNft().then((response) => {
      setNftImg(response.payload.nft_image);
      closeLoadingModal();
      openModal();
    });
  };

  return (
    <SectionContainer color="purple">
      <p className="section-title">소유하기</p>
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
        onClick={onSubmitHandler}
      >
        NFT 발급받기
      </StyledButton>
      {modalVisible && (
        <Modal
          visible={modalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeModal}
          onScroll={scrollModal}
        >
          <ModalContent>
            {/* 아래 정의되어 있음 */}
            <h3>
              캐릭터 액자와 함께
              <br />
              NFT가 발급되었어요!
            </h3>
            <img className="nft-logo" src={images.shiningnft} />
            <img className="nft-img" src={nftImg} />
            <p>발급된 nft 주소가 생성되면 알려드릴게요!</p>
          </ModalContent>
        </Modal>
      )}

      {loadingModalVisible && (
        <LoadingModal
          visible={loadingModalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeLoadingModal}
          nft
        ></LoadingModal>
      )}
    </SectionContainer>
  );
}

export default GetNft;

const ModalContent = styled.div`
  h3 {
    margin: 0px;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 40px;
  }
  img {
    margin: auto;
  }
  img.nft-logo {
    width: 80px;
    height: 80px;
    margin-bottom: 20px;
  }
  img.nft-img {
    width: 292px;
    height: 292px;
    border-radius: 20px;
    margin-bottom: 8px;
  }
  p {
    text-align: center;
    font-size: 14px;
    font-weight: 400;
  }

  ${customMedia.lessThan("mobile")`
    h3 {
      font-size: 20px;
      margin-bottom: 24px;
      line-height: 29px;
    }
    img.nft-logo {
      width: 64px;
      height: 64px;
      margin-bottom: 12px;
    }
    img.nft-img {    
      width: 240px;
      height: 240px;
      margin-bottom: 4px;
    }
    p {
      font-size: 12px;
    }
  `}

  }
`;

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
    color: ${(props) => props.theme.palette.darkGrey};
    font-weight: 400;
    font-size: 14px;
    img {
      width: 20px;
      height: 20px;
      margin-right: 20px;
    }
  }
  ${customMedia.lessThan("mobile")`
  p {
    font-size: 12px;
    margin-bottom: 16px;
    img {
      width: 16px;
      height: 16px;
      margin-right: 16px;
    }
  }
  `}
`;

const NftDiv = styled.div`
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
  img {
    width: 80px;
    height: 80px;
    margin-left: 10px;
    margin-right: 10px;
  }
  ${customMedia.lessThan("mobile")`
  margin-bottom: 48px;
  img {
    width: 40px;
    height: 40px;
    margin: 0 6px;
  }
  `}
`;
const StyledButton = styled(Button)`
  margin-top: 20px;
  position: static;
  &:hover {
    background: ${(props) => props.theme.palette.darkPurple};
    color: ${(props) => props.theme.palette.grey};
  }
  ${customMedia.lessThan("mobile")`
    margin-top: 8px;
  `}
`;

const generateDates = (store) => {
  const arr = [];
  const dates = store.neodata_infos;
  dates.map((date, idx) => {
    if (date == store.today_datetime) {
      arr.push({ idx: idx + 1, date: "오늘" });
    } else {
      arr.push({ idx: idx + 1, date: date });
    }
  });

  return arr;
};
