import { useState } from "react";
import styled from "styled-components";
import Textarea from "../Ul/Textarea";
import Button from "../Ul/Button";
import { zIndex_Modal } from "../../Util/z-index";
import { MdOutlineAddAPhoto } from "react-icons/md";
import { BiPhotoAlbum } from "react-icons/bi";
import { HiXMark } from "react-icons/hi2";
// import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { useAppDispatch, useAppSelector } from "../../Redux/hooks";
import { getReviewListActions } from "../../Redux/slice/getReviewSlice";
import { useNavigate } from "react-router-dom";

interface Props {
  setIsReviewFormShown: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function WriteReviewForm({ setIsReviewFormShown }: Props) {
  const [imageSrc, setImageSrc]: any = useState(null);
  const onUpload = (e: any) => {
    const file = e.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.readAsDataURL(file);
    return new Promise<void>((resolve) => {
      reader.onload = () => {
        setImageSrc(reader.result || null);
        resolve();
      };
    });
  };

  const [reviewList, setReviewList]: any = useState({
    reviewIdx: 0,
    content: "",
    rating: 0,
    createdAt: "",
  });

  const handlerText = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setReviewList({
      ...reviewList,
      [name]: value,
    });
  };

  const handlerRate = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setReviewList({
      ...reviewList,
      [name]: value,
    });
  };

  const prevReviewList = useAppSelector((state: any) => {
    return state.getReview.response.storeReview;
  });
  // console.log(prevReviewList);

  // const navigate = useNavigate();
  const onSubmit: any = (e: { preventDefault: () => void; target: HTMLFormElement | undefined }) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const review = formData.get("content");
    const star = formData.get("rating");

    let newData = {
      reviewIdx: 53,
      content: review,
      rating: star,
      createdAt: new Date(),
    };

    const postReview = async () => {
      try {
        await axios({
          url: "http://localhost:3003/response",
          method: "post",
          data: newData,
          //화면에 보여줄려고 data바꿈
          // data: [...prevReviewList, newData],
        });
      } catch (error) {
        console.log(error);
      }
    };
    postReview();
    // window.location.href = "http://localhost:5173/";
  };

  return (
    <WriteReviewContainer onSubmit={onSubmit}>
      <InputTop className="wide">
        <HiXMark aria-hidden="true" className="except" onClick={() => setIsReviewFormShown(false)} />
      </InputTop>
      <InputTop>
        <HiddenLabel htmlFor="review" />
        <Textarea
          id="review"
          name="content"
          placeholder="무분별한 비방, 비하, 욕설은 지양해주세요 :)"
          isValid={true}
          rows={3}
          icon={false}
          value={reviewList.content}
          onChange={handlerText}
        />
        <ReviewImgContainer>
          <ReviewImgInput id="img" type="file" onChange={(e) => onUpload(e)} accept="image/*"></ReviewImgInput>
          {imageSrc ? (
            <ReviewImg src={imageSrc} />
          ) : (
            <Instead>
              <BiPhotoAlbum aria-hidden="true" />
            </Instead>
          )}
          <Label htmlFor="img">
            <MdOutlineAddAPhoto aria-hidden="true" />
          </Label>
        </ReviewImgContainer>
      </InputTop>
      <InputBot>
        <Rating>
          <StarContainer>
            <Star
              src={`${reviewList.rating > 0 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReviewList({
                  ...reviewList,
                  rating: 1,
                })
              }
            />
            <Star
              src={`${reviewList.rating > 1 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReviewList({
                  ...reviewList,
                  rating: 2,
                })
              }
            />
            <Star
              src={`${reviewList.rating > 2 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReviewList({
                  ...reviewList,
                  rating: 3,
                })
              }
            />
            <Star
              src={`${reviewList.rating > 3 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={() =>
                setReviewList({
                  ...reviewList,
                  rating: 4,
                })
              }
            />
            <Star
              src={`${reviewList.rating > 4 ? "./Images/fillstar.png" : "./Images/emstar.png"}`}
              onClick={(e) =>
                setReviewList({
                  ...reviewList,
                  rating: 5,
                })
              }
            />
          </StarContainer>
          <RateNum readOnly type="text" name="rating" value={`${reviewList.rating}`} onChange={handlerRate}></RateNum>
        </Rating>
        <Button type="submit" color="blue" size="md" text="작성완료" icon={true} />
      </InputBot>
    </WriteReviewContainer>
  );
}

const WriteReviewContainer = styled.form`
  position: absolute;
  display: flex;
  flex-direction: column;
  right: 20px;
  bottom: 20px;
  padding: 15px;
  gap: 8px;
  width: 430px;
  border-radius: 10px;
  background-color: var(--white);
  border: 0.5px solid var(--blue-300);
  box-shadow: 0px 0px 5px var(--black-200);
  z-index: ${zIndex_Modal.WriteReviewContainer};
  .wide {
    display: flex;
    justify-content: flex-end;
    width: 400px;
    font-size: 20px;
    color: var(--black-300);
    transition: 0.2s;
    #close:hover {
      color: var(--black-600);
      transition: 0.2s;
    }
  }
  @media (max-width: 768px) {
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    bottom: 20px;
    left: 40px;
    min-height: 210px;
  }
`;
const InputTop = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ReviewImgContainer = styled.section`
  display: inline-block;
  position: relative;
`;
const ReviewImgInput = styled.input`
  position: absolute;
  display: none;
`;
const ReviewImg = styled.img`
  object-fit: cover;
  height: 80px;
  width: 100px;
  border-radius: 5px;
`;
const Instead = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80px;
  width: 100px;
  font-size: 40px;
  color: var(--white);
  border-radius: 5px;
  background-color: var(--black-075);
`;
const Label = styled.label`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  bottom: 0;
  right: 0;
  height: 26px;
  width: 26px;
  background-color: var(--white);
  color: var(--black-100);
  border-radius: 50%;
  box-shadow: 0px 0px 5px 0.5px var(--black-200);
`;
const HiddenLabel = styled.label`
  display: none;
`;
const InputBot = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const Rating = styled.section`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 35px;
  width: 280px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 5px 0.5px var(--black-100) inset;
`;
const StarContainer = styled.span`
  display: flex;
  padding: 10px;
  gap: 10px;
`;
const Star = styled.img`
  width: 20px;
`;
const RateNum = styled.input`
  display: none;
  margin-left: 3px;
  width: 4rem;
  color: var(--black-300);
  font-size: 23px;
  font-weight: bold;
  border: none;
  &:focus {
    border: none;
    outline: none;
  }
`;
