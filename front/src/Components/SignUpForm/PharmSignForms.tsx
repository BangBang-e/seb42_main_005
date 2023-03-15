import { useRef, useState } from "react";
import styled from "styled-components";
import Button from "../Ul/Button";
import PharmAddress from "./PharmAddress";
import SignUpInput from "./SignUpInput";
import { validators } from "./Validation";
import { BsPersonCircle } from "react-icons/bs";
import { AiOutlineLock, AiOutlineCamera } from "react-icons/ai";
import { FaUserEdit, FaMapMarkerAlt } from "react-icons/fa";
import ErrorAlert from "./ErrorAlert";

export default function PharmSignForms() {
  const [businessImg, setBusinessImg] = useState<string>("");
  const [pharmImg, setPharmImg] = useState<string>("");
  const [businessImgFile, setbusinessImgFile] = useState<File | null>(null);
  const [pharmImgFile, setPharmImgFile] = useState<File | null>(null);
  //나중에 파일 넘겨줄때 businessImgFile, pharmImgFile 넘겨주면 돼!

  const [pSignForm, setpSignForms] = useState({
    email: "",
    password: "",
    name: "",
    address: "",
  });

  const [error, setError] = useState({
    email: false,
    password: false,
    name: false,
  });

  const [checks, setChecks] = useState(false);

  const FORM_FIELD_NAMES = {
    EMAIL: "email",
    PASSWORD: "password",
    NAME: "name",
    ADDRESS: "address",
  };

  const changeEmailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setpSignForms({
      ...pSignForm,
      [name]: value,
    });
    let errors = false;
    if (name === FORM_FIELD_NAMES.EMAIL) {
      errors = validators.validateEmail(value);
    }
    setError({
      ...error,
      [name]: errors,
    });
  };

  const changePasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setpSignForms({
      ...pSignForm,
      [name]: value,
    });
    let errors = false;
    if (name === FORM_FIELD_NAMES.PASSWORD) {
      errors = validators.validatePassword(value);
    }
    setError({
      ...error,
      [name]: errors,
    });
  };

  const changeNameHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setpSignForms({
      ...pSignForm,
      [name]: value,
    });
    let errors = false;
    if (name === FORM_FIELD_NAMES.NAME) {
      errors = validators.validateName(value);
    }
    setError({
      ...error,
      [name]: errors,
    });
  };

  const changeAddressHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setpSignForms({
      ...pSignForm,
      [name]: value,
    });
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const { email, password, name, address } = pSignForm;

    if (!email || !password || !name || !address || !businessImg || !pharmImg) {
      return alert("모든 항목을 입력해주세요");
    }
    if (error.email === true || error.password === true || error.name === true) {
      return alert("항목을 다시 확인해주세요");
    }
    if (checks === false) {
      return alert("회원가입시, 사용자의 현재 위치를 사용하는 것에 동의해주세요");
    }
  };

  const BusinessImg = useRef<HTMLInputElement>(null);
  const PharmImg = useRef<HTMLInputElement>(null);
  const onClickBusinessImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    BusinessImg.current?.click();
  };

  const onClickPharmImg = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    PharmImg.current?.click();
  };

  const checkHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChecks(e.target.checked);
  };

  return (
    <Container>
      <Google>
        <button className="google_button">
          <GoogleButton>
            <img className="google_img" alt="google" src="Images/google.png" />
            <span className="google">Sign up with Google</span>
          </GoogleButton>
        </button>
      </Google>
      <SignUpForm onSubmit={onSubmit}>
        <InputContainer className={`${error.email ? "red" : null}`}>
          <BsPersonCircle className="inputImage" aria-hidden="true" />
          <label htmlFor="pharmemail-input"></label>
          <SignUpInput
            type={"email"}
            name={FORM_FIELD_NAMES.EMAIL}
            placeholder={"이메일을 입력하세요."}
            value={pSignForm.email}
            onChange={changeEmailHandler}
          />
        </InputContainer>
        <ErrorAlert Error={error.email} ErrorText={"이메일 형식이 올바르지 않습니다."} />
        <InputContainer className={`${error.password ? "red" : null}`}>
          <AiOutlineLock className="inputImage" aria-hidden="true" />
          <label htmlFor="pharmpassword-input"></label>
          <SignUpInput
            type={"password"}
            name={FORM_FIELD_NAMES.PASSWORD}
            placeholder={"비밀번호를 입력하세요."}
            value={pSignForm.password}
            onChange={changePasswordHandler}
          />
        </InputContainer>
        <ErrorAlert Error={error.password} ErrorText={"문자 숫자 특수문자 조합 8자 이상으로 조합해주세요."} />
        <InputContainer className={`${error.name ? "red" : null}`}>
          <FaUserEdit className="inputImage" aria-hidden="true" />
          <label htmlFor="pharmname-input"></label>
          <SignUpInput
            type={"text"}
            name={FORM_FIELD_NAMES.NAME}
            placeholder={"닉네임을 입력하세요."}
            value={pSignForm.name}
            onChange={changeNameHandler}
          />
        </InputContainer>
        <ErrorAlert Error={error.name} ErrorText={"이름에는 공백이 들어갈 수 없습니다."} />
        <InputContainer>
          <FaMapMarkerAlt className="inputImage" aria-hidden="true" />
          <label htmlFor="pharmaddress-input"></label>
          <SignUpInput
            readOnly
            type={"text"}
            name={"address"}
            placeholder={"주소를 입력하세요."}
            value={pSignForm.address}
            onChange={changeAddressHandler}
          />
          <PharmAddress setpSignForms={setpSignForms} />
        </InputContainer>
        <InputContainer>
          <AiOutlineCamera className="inputImage" aria-hidden="true" />
          <label htmlFor="business-img"></label>
          <ImgInput readOnly value={businessImg} placeholder="사업자 등록증을 올려주세요" />
          <div className="photo_upload">
            <Button color="l_blue" size="sm" text="사진업로드" onClick={onClickBusinessImg} />
          </div>
          <label htmlFor="business-imgfile"></label>
          <Img
            type="file"
            ref={BusinessImg}
            name="fileName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.files && setBusinessImg(e.target.files[0].name);
              e.target.files && setbusinessImgFile(e.target.files[0]);
            }}
          />
        </InputContainer>

        <InputContainer>
          <AiOutlineCamera className="inputImage" aria-hidden="true" />
          <label htmlFor="pharm-img"></label>
          <ImgInput readOnly value={pharmImg} placeholder="약사면허증 사진을 올려주세요" />
          <div className="photo_upload">
            <Button color="l_blue" size="sm" text="사진업로드" onClick={onClickPharmImg} />
          </div>
          <label htmlFor="pharm-imgfile"></label>
          <Img
            type="file"
            ref={PharmImg}
            name="fileName"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              e.target.files && setPharmImg(e.target.files[0].name);
              e.target.files && setPharmImgFile(e.target.files[0]);
            }}
          />
        </InputContainer>
        <CheckContainer>
          <Check type="checkbox" onChange={checkHandler} checked={checks} />
          <span className="checkbox_content">
            회원가입시, 사용자의 현재 위치를 사용하는 것에 동의하는 것으로 간주됩니다.
          </span>
        </CheckContainer>
        <button className="signup_button">회원가입</button>
      </SignUpForm>
    </Container>
  );
}
const Container = styled.div`
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 3rem 1rem 1.5rem 1rem;
  width: 40rem;
  border: 1px solid var(--black-200);
  border-top: none;
  border-bottom-left-radius: 18px;
  border-bottom-right-radius: 18px;
  box-shadow: 0 1px 4px -3px hsla(0, 0%, 0%, 0.09), 0 3px 8px -3px hsla(0, 0%, 0%, 0.1),
    0 4px 13px -3px hsla(0, 0%, 0%, 0.13);
`;

const Google = styled.div`
  padding-bottom: 1rem;
  .google_button {
    height: 3.3rem;
    width: 37.875rem;
    border: 1px solid var(--black-200);
    border-radius: 10px;
    background-color: transparent;
    cursor: pointer;
    box-shadow: var(--bs-md);
    &:hover {
      background-color: var(--black-050);
    }
  }
`;
const GoogleButton = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  .google_img {
    width: 2.6rem;
  }
  .google {
    padding-left: 0.3rem;
    font-size: 1.1rem;
    color: var(--black-500);
  }
`;
const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;

  .signup_button {
    background-color: var(--blue-500);
    border: none;
    width: 15rem;
    height: 2.8rem;
    font-size: 1.1rem;
    color: var(--white);
    margin: auto;
    margin-top: 1rem;
    border-radius: 7px;
    box-shadow: var(--bs-md);
    &:hover {
      background-color: var(--blue-400);
    }
  }
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  border: 1px solid var(--black-150);
  border-radius: 10px;
  box-shadow: var(--bs-sm);
  margin-bottom: 0.5rem;
  padding: 0 10px;
  .inputImage {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 1.7rem;
    height: 1.7rem;
    margin: auto;
    color: var(--black-200);
  }
  .photo_upload {
    align-items: center;
    display: flex;
  }
  .adress_find {
    align-items: center;
    display: flex;
  }
  &:focus-within {
    box-shadow: var(--wrapped-shadow);
  }
  &.red {
    box-shadow: var(--wrapped-shadow-red);
  }
`;

const ImgInput = styled.input`
  width: 27rem;
  height: 2.7rem;
  outline: none;
  font-size: 1.1rem;
  padding-left: 0.5rem;
  border: none;
  text-overflow: ellipsis;
  color: var(--black-500);
  display: flex;
  flex-grow: 1;
`;
const CheckContainer = styled.div`
  display: flex;
  flex-direction: row;
  .checkbox_content {
    color: var(--black-500);
  }
`;

const Check = styled.input`
  cursor: pointer;
  appearance: none;
  width: 1.3rem;
  height: 1.3rem;
  border: 1px solid var(--black-100);
  box-shadow: var(--bs-btn);
  margin-right: 0.6rem;
  padding-left: 1rem;
  border-radius: 3.5px;
  transition: 0.1s;
  :active {
    box-shadow: var(--bs-btn-click);
    transition: 0.1s;
  }
  &:checked {
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 130% 130%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: var(--blue-400);
    transition: 0.1s;
  }
`;
const Img = styled.input`
  display: none;
`;
