//! 모달 컴포넌트 오른편 약국 정보 부분입니다
import { useState, useEffect } from "react";
import styled from "styled-components";
import PharmRank from "../Ul/PharmRank";
import AnyDropDown from "./AnyDropDown";
import axios from "axios";
import { getPharmDActions } from "../../Redux/slice/getPharmSlice";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
interface Props {
  like: boolean;
  setLike: React.Dispatch<React.SetStateAction<boolean>>;
  pharmListDetail: any;
}

export default function PharmInfo({ like, setLike, pharmListDetail }: Props) {
  const [isDropDownDown, setIsDropDownDown] = useState(false);

  return (
    <InfoContainer>
      <InfoHeader>
        <InfoTitle>{pharmListDetail.name}</InfoTitle>
        {pharmListDetail && <PharmRank rating={pharmListDetail.rating} />}
      </InfoHeader>
      <InfoImgContainer>
        {pharmListDetail.image ? (
          <PharmImg src={pharmListDetail.image as string}/>
        ) : (
          <PharmImg src="Images/ImgPreparing.png" alt="이미지 준비중입니다."/>
        )}
        <LikeButton onClick={() => setLike(!like)}>
          {like ? <img src="./Images/Heart.png" alt="like" /> : <img src="./Images/UnHeart.png" alt="unlike" />}
        </LikeButton>
      </InfoImgContainer>
      <InfoInfo>
        <InfoUnit>
          <InfoInfoTitle>영업시간</InfoInfoTitle>
          <InfoInfoContent>
            09:00 ~ 21:00
            {!isDropDownDown ? (
              <More id={`dropDown ${isDropDownDown ? "close" : "open"}`} onClick={() => setIsDropDownDown(true)}>
                영업시간 더보기
              </More>
            ) : null}
            {isDropDownDown ? <AnyDropDown setIsDropDownDown={setIsDropDownDown} /> : null}
          </InfoInfoContent>
        </InfoUnit>
        <InfoUnit>
          <InfoInfoTitle>주소</InfoInfoTitle>
          <InfoInfoContent>{pharmListDetail.address}</InfoInfoContent>
        </InfoUnit>
        <InfoUnit>
          <InfoInfoTitle>전화번호</InfoInfoTitle>
          <InfoInfoContent>{pharmListDetail.tel}</InfoInfoContent>
        </InfoUnit>
      </InfoInfo>
    </InfoContainer>
  );
}

const InfoContainer = styled.aside`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 450px;
  padding: 10px 20px 20px 0px;
  border-right: 1px solid var(--black-100);
  @media (max-width: 768px) {
    height: auto;
    margin-bottom: 30px;
    padding: 0px;
    border-right: none;
    border-bottom: 1px solid var(--black-100);
  }
`;
const InfoHeader = styled.header`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 10px;
  gap: 10px;
  border-bottom: 1px solid var(--black-100);
  @media (max-width: 768px) {
    display: none;
  }
`;
const InfoTitle = styled.h1`
  font-weight: bold;
  font-size: 30px;
  @media (max-width: 768px) {
    margin-top: 30px;
  }
`;
const InfoImgContainer = styled.section`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px 5px;
  border-bottom: 1px solid var(--black-100);
`;
const Img = styled.img`
  object-fit: cover;
  width: 23.75rem;
  height: 15.625rem;
  border-radius: 5px;
`;
const LikeButton = styled.button`
  position: absolute;
  right: 51px;
  top: 17px;
  width: 20px;
  border: none;
  background-color: transparent;
  @media (max-width: 768px) {
    right: 60px;
  }
`;
const InfoInfo = styled.section`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 20px 20px 10px 20px;
  gap: 10px;
  @media (max-width: 768px) {
    padding: 20px;
  }
`;
const InfoUnit = styled.article`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 20px;
`;
const InfoInfoTitle = styled.h2`
  width: 70px;
  color: var(--black-350);
  font-size: 18px;
  font-weight: bold;
`;
const InfoInfoContent = styled.span`
  display: flex;
  align-items: center;
  height: 25px;
  gap: 3px;
  font-size: 19px;
`;
const More = styled.button`
  cursor: pointer;
  display: inline-block;
  color: var(--l_button-mint);
  margin-left: 5px;
  padding: 3px 5px;
  font-size: 12px;
  border-radius: 15px;
  border: 1px solid var(--l_button-mint);
  background-color: transparent;
  :hover {
    color: var(--l_button-mint-hover);
    border: 1px solid var(--l_button-mint-hover);
  }
`;
const PharmImg = styled.img`
  object-fit: cover;
  width: 23.75rem;
  height: 15.625rem;
  border-radius: 5px;
  border: 2px solid var(--black-100);
`;
