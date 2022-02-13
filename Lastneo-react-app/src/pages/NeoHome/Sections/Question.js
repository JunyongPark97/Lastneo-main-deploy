/* eslint-disable */
import React, { useEffect, useState, useRef } from "react";
import SectionContainer from "../../../components/SectionContainer";
import styled, { css } from "styled-components";
import images from "../../../assets";
import Button from "../../../components/Button";
import { sendBig5 } from "../../../_actions/owner_action";
import { useDispatch } from "react-redux";
import { customMedia } from "../../../styles/GlobalStyle";
import { useSelector } from "react-redux";
import Modal from "../../../components/modals/Modal";
import LoadingModal from "../../../components/modals/LoadingModal";

const checked = [images.c1, images.c2, images.c3, images.c4, images.c5];
const unchecked = [images.uc1, images.uc2, images.uc3, images.uc4, images.uc5];

function Question({ store }) {
  const dispatch = useDispatch();
  const myRef = useRef();
  const store_neohome = useSelector((store) => store.neohome);
  const [answers, setAnswers] = useState([0, 0, 0, 0, 0]);
  const [complete, setComplete] = useState(false);
  const [open, setOpen] = useState(false);
  const [done, setDone] = useState(store.is_done);
  const [weekend, setWeekend] = useState(store.is_weekend);
  const [itemName, setItemName] = useState("");
  const [itemImg, setItemImg] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [loadingModalVisible, setLoadingModalVisible] = useState(false);

  const openModal = () => {
    setModalVisible(true);
  };
  const closeModal = () => {
    // 아이템 지급 모달 - '닫기' => 주인정보 새로 요청
    dispatch(getOwnerInfo(store_neohome.nickname)).then(() => {
      setModalVisible(false);
    });
  };
  const scrollModal = () => {
    // 아이템 지급 모달 - '캐릭터 보기' => Charater.js useEffect에서 scroll = true면 주인정보 새로 요청
    dispatch({ type: "set_tab", payload: "character" });
    dispatch({ type: "set_scroll", payload: "character_room" });
  };

  const openLoadingModal = () => {
    setLoadingModalVisible(true);
  };
  const closeLoadingModal = () => {
    setLoadingModalVisible(false);
  };

  useEffect(() => {
    if (!answers.includes(0)) {
      setComplete(true);
      executeScroll();
    }
  }, [answers]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    const arr = [];
    answers.map((answer, i) => {
      arr.push({ question_id: store.neo_questions[i].id, result: answer });
    });
    let body = {
      section: store.neo_questions[0].section,
      questions: arr,
    };
    openLoadingModal();
    dispatch(sendBig5(body)).then((response) => {
      if (response.type == "send_big5_success") {
        setDone(true);
        setOpen(false);
        if (!response.payload.item_status) {
          setItemName(null);
          setItemImg(null);
        } else {
          setItemName(response.payload.item_name);
          setItemImg(response.payload.item_image);
        }
        closeLoadingModal();
        openModal();
      }
    });
  };

  const toggleHandler = () => {
    setOpen(!open);
  };

  const executeScroll = () =>
    myRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
  const descGenerator = (store) => {
    if (weekend) {
      return (
        <>
          <p className="main-desc web">
            주말엔 네오가 편히 쉬고 있어요. 월요일에 다시 와주세요!
          </p>
          <p className="main-desc mobile">
            주말엔 네오가 편히 쉬고 있어요.
            <br />
            월요일에 다시 와주세요!
          </p>
        </>
      );
    } else {
      if (done) {
        return <p className="main-desc">답변 완료! 내일 다시 와주세요!</p>;
      } else {
        return (
          <p className="main-desc">
            나를 담는 오늘의 <span>질문</span>이에요!
          </p>
        );
      }
    }
  };
  return (
    <SectionContainer color="yellow" question>
      <p>인격담기</p>
      <h3>
        매일 질문 5개에 답변하고
        <br />
        네오에 <span>나를 담아</span>보세요
      </h3>
      <QuestionsContainer color={weekend || done ? "lightGrey" : "paleYellow"}>
        <span className="date">{store.today_datetime}</span>
        {descGenerator(store)}
        {open && (
          <Questions>
            {store.neo_questions.map((item, i) => {
              const arr = [0, 1, 2, 3, 4];
              const sizes = [60, 50, 40, 50, 60];
              const mSizes = [48, 40, 32, 40, 48];
              const colors = [
                "#FFF0C1",
                "#FFE194",
                "#FFC859",
                "#FFAA00",
                "#CC7E00",
              ];
              return (
                <SingleQuestion key={i}>
                  <p>
                    {i + 1}. {item.question}
                  </p>
                  <div className="btns-wrapper">
                    <span className="desc-web">전혀 아니다</span>
                    <YellowBtns>
                      {arr.map((idx) => {
                        return (
                          <button
                            key={idx}
                            onClick={() => {
                              const newArr = [...answers];
                              newArr[i] = idx + 1;
                              setAnswers(newArr);
                            }}
                          >
                            <BtnImg
                              size={sizes[idx]}
                              mSize={mSizes[idx]}
                              color={colors[idx]}
                              key={idx}
                              checked={answers[i] == idx + 1}
                            >
                              <img
                                src={
                                  answers[i] == idx + 1
                                    ? checked[idx]
                                    : unchecked[idx]
                                }
                              />
                              <span></span>
                            </BtnImg>
                          </button>
                        );
                      })}
                    </YellowBtns>
                    <span className="desc-web">매우 그렇다</span>
                    <div className="desc-mobile">
                      <span>전혀 아니다</span>
                      <span>매우 그렇다</span>
                    </div>
                  </div>
                </SingleQuestion>
              );
            })}
          </Questions>
        )}
        <ToggleBtn onClick={toggleHandler} disabled={weekend || done}>
          <img
            src={
              weekend || done || open ? images.toggleclose : images.toggleopen
            }
          />
        </ToggleBtn>
      </QuestionsContainer>
      <DescDiv>
        <p>
          <img src={images.calender} />
          평일에 한번씩, 매일 담을 수 있어요
        </p>
        <p>
          <img src={images.time} />
          12시가 되면 다시 담을 수 있어요
        </p>
        <p>
          <img src={images.purpleblock} />
          네오에게 인격을 담으면 캐릭터에 표현돼요!
        </p>
      </DescDiv>
      <div ref={myRef}>
        <StyledButton
          onClick={onSubmitHandler}
          color={weekend || done || !complete ? "paleGrey" : "yellow"}
          disabled={weekend || done || !complete}
        >
          네오에게 인격 담기
        </StyledButton>
      </div>

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
              네오에게 인격이 담겼어요!
              <br />
              캐릭터의 아이템이 달라질거예요
            </h3>
            <img className="heart" src={images.purpleheart} />
            <section>
              <img className="neo" src={images.purpleneo} />
              <ItemDescDiv>
                {itemName == null ? (
                  <p>
                    인격 공유 잘 받았어!
                    <br />
                    이번에는 캐릭터에 아아템을 별로 끼고 싶지 않은걸.
                    <br />
                    아이템이 없는 것도 표현방식 중 하나야!
                    <br />
                    다음에는 아이템을 끼고 싶을지도..
                  </p>
                ) : (
                  <>
                    <p>
                      인격 공유 잘 받았어!
                      <br />
                      이번에는 캐릭터에 '<span>{itemName}</span>' 아이템을
                      <br />
                      껴볼 생각이야!
                    </p>
                    <div>
                      <div className="img-wrapper">
                        <img className="item" src={itemImg}></img>
                      </div>
                    </div>
                  </>
                )}
              </ItemDescDiv>
            </section>
          </ModalContent>
        </Modal>
      )}

      {loadingModalVisible && (
        <LoadingModal
          visible={loadingModalVisible}
          closable={true}
          maskClosable={true}
          onClose={closeLoadingModal}
          item
        ></LoadingModal>
      )}
    </SectionContainer>
  );
}
export default Question;

const QuestionsContainer = styled.div`
  ${(props) => {
    const selected = props.theme.palette[props.color];
    return css`
      background-color: ${selected};
    `;
  }}
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 60px;
  padding: 32px;
  p.main-desc {
    font-size: 18px;
    margin-bottom: 32px;
    span {
      color: ${(props) => props.theme.palette.yellow};
    }
  }
  span.date {
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.palette.darkGrey};
    margin-bottom: 6px;
  }
  .mobile {
    display: none;
    text-align: center;
  }
  ${customMedia.lessThan("mobile")`
  padding: 24px;
  margin-bottom: 48px;
  span.date {
    font-size: 12px;
  }
  p.main-desc {
    font-size: 16px;
  }
  .web {
    display: none;
  }
  .mobile {
    display: block;
  }

`}
`;

const Questions = styled.div``;
const YellowBtns = styled.div`
  flex-direction: row;
  justify-content: center;
  align-items: center;
`;

const DescDiv = styled.div`
  p {
    margin-bottom: 20px;
    font-size: 14px;
    font-weight: 400;
    color: ${(props) => props.theme.palette.darkGrey};
    display: flex;
    align-items: center;
    img {
      width: 16px;
      height: 16px;
      margin-right: 16px;
    }
  }
  ${customMedia.lessThan("mobile")`
  p {
    font-size: 12px;
  }
  `}
`;

const SingleQuestion = styled.div`
  align-items: center;
  margin-bottom: 32px;
  div.btns-wrapper {
    flex-direction: row;
    justify-content: center;
    align-items: center;
    /* background: red; */
    span {
      color: ${(props) => props.theme.palette.gray};
      font-weight: 400;
    }
  }
  div.desc-mobile {
    display: none;
    width: 100%;
    margin-top: 4px;
    /* background: green; */
    justify-content: space-between;
  }
  button {
    background-color: rgba(0, 0, 0, 0);
    padding: 0px;
  }
  p {
    color: ${(props) => props.theme.palette.black};
    margin-bottom: 20px;
    font-size: 18px;
  }
  ${customMedia.lessThan("mobile")`
    div.btns-wrapper {
      flex-direction: column;
      span {
        font-size: 12px;
      }
    }
    .desc-web {
      display: none;
    }
    div.desc-mobile {
      display: flex;
      flex-direction: row;
    }
    p {
      font-size: 16px;
      margin-bottom: 12px;
      font-weight: 500;
      color: ${(props) => props.theme.palette.black};
    }
`}
`;

const BtnImg = styled.div`
  height: 60px;
  align-items: center;
  justify-content: center;
  ${({ color, size }) => {
    return css`
      width: ${size + 20}px;
      span {
        width: ${size}px;
        height: ${size}px;
        background: ${color};
      }
    `;
  }}
  span {
    display: none;
    border-radius: 50%;
  }
  img {
    width: ${(props) => props.size}px;
    height: ${(props) => props.size}px;
  }
  ${({ checked }) => {
    if (!checked) {
      return css`
        &:hover {
          img {
            display: none;
          }
          span {
            display: block;
          }
        }
      `;
    }
  }}
  ${customMedia.lessThan("mobile")`
    height: 48px;
    ${({ color, mSize }) => {
      return css`
        width: ${mSize + 12}px;
        span {
          width: ${mSize}px;
          height: ${mSize}px;
          background: ${color};
        }
        img {
          width: ${({ mSize }) => mSize}px;
          height: ${({ mSize }) => mSize}px;
        }
      `;
    }}
  `}
`;

const StyledButton = styled(Button)`
  margin-top: 20px;
  position: static;
  &:hover {
    background: ${(props) => props.theme.palette.darkYellow};
    color: ${(props) => props.theme.palette.grey};
  }
  ${customMedia.lessThan("mobile")`
    margin-top: 12px;
  `}
`;

const ToggleBtn = styled.button`
  background-color: transparent;
  img {
    width: 20px;
    height: 20px;
  }
  ${customMedia.lessThan("mobile")`
    img {
      width: 16px;
      height: 16px;
    }
  `}
`;

const ModalContent = styled.div`
  img {
    width: 80px;
    height: 80px;
    margin: auto;
  }
  h3 {
    margin: 0px;
    font-size: 24px;
    font-weight: 700;
    margin-bottom: 40px;
  }
  section {
    margin-top:50px;
    display: flex;
    flex-direction: row;
    .neo {
      margin: 0;
      position: relative;
      bottom: 30px;
    }
  }
  ${customMedia.lessThan("mobile")`
    h3 {
      font-size: 20px;
    }
    img.heart {
      width: 64px;
      height: 64px;
    }
    img.neo {
      width: 40px;
      height: 40px;
    }
  `}

  }
`;

const ItemDescDiv = styled.div`
  margin-left: 20px;
  p {
    margin-bottom: 12px;
    padding: 18px 20px;
    font-size: 18px;
    background-color: ${(props) => props.theme.palette.lightPurple};
    font-weight: 400;
    width: fit-content;
    border-radius: 0 12px 12px 12px;
    span {
      font-weight: 500;
      color: ${(props) => props.theme.palette.black};
    }
  }
  div {
    width: 160px;
    height: 160px;
    padding: 20px;
    background-color: ${(props) => props.theme.palette.lightPurple};
    border-radius: 12px;
    align-items: center;
    text-align: center;
    & > .img-wrapper {
      width: 120px;
      height: 120px;
      position: relative;
      padding: 0;
      border-radius: 12px;
      background-color: ${(props) => props.theme.palette.white};
    }
    img.item {
      margin: 0 auto;
      width: 120px;
      height: 120px;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  ${customMedia.lessThan("mobile")`
    p {
      padding: 14px 16px;
      font-size: 16px;
    }
    div {
      width: 112px;
      height: 112px;
      padding: 16px;
      & > .img-wrapper {
        width: 80px;
        height: 80px;
      }
      img.item {
        width: 80px;
        height: 80px;
      }

    }
  `}
`;
