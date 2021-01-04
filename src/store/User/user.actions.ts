import {
  USER_OTP_PHONE,
  USER_OTP_VERIFYCODE,
  USER_LOGIN_USERNAME,
  USER_LOGIN_PASSWORD,
  USER_SIGNUP_STEP,
  USER_NATIONALCARD_SERIAL,
  USER_ADDRESS_POSTALCODE,
  USER_ADDRESS_TELEPHONE,
  USER_NATIONALCARD_FRONTIMAGE,
  USER_NATIONALCARD_BACKIMAGE,
  USER_NATIONALCARD_FACEIMAGE,
  USER_OTP_TOKEN,
  USER_SHOW_TREE,
  USER_CURRENT_STEP,
  ENTRYTYPE_ISCHILD,
} from "./user.constants";

// otp - mobile number
export const phoneNumberChanged = (text: string) => {
  return {
    type: USER_OTP_PHONE,
    payload: text,
  };
};
// otp - verify code
export const verifyCodeChanged = (verifyCode: string) => {
  return {
    type: USER_OTP_VERIFYCODE,
    payload: verifyCode,
  };
};
export const otpTokenChanged = (token: string) => {
  return {
    type: USER_OTP_TOKEN,
    payload: token,
  };
};
// signUp - steps
export const signUpStepChanged = (signUpSteps: string) => {
  return {
    type: USER_SIGNUP_STEP,
    payload: signUpSteps,
  };
};
export const currentStepChanged = (currentSteps: string) => {
  return {
    type: USER_CURRENT_STEP,
    payload: currentSteps,
  };
};

export const showTreeChanged = (showTree: boolean) => {
  return {
    type: USER_SHOW_TREE,
    payload: showTree,
  };
};
// login - username
export const userNameChanged = (userName: string) => {
  return {
    type: USER_LOGIN_USERNAME,
    payload: userName,
  };
};

// login - password
export const passwordChanged = (password: string) => {
  return {
    type: USER_LOGIN_PASSWORD,
    payload: password,
  };
};
// nationalCard - serial
export const nationalCardSerialChanged = (cardSerial: string) => {
  return {
    type: USER_NATIONALCARD_SERIAL,
    payload: cardSerial,
  };
};

// address - postalcode
export const postalCodeChanged = (postalcode: string) => {
  return {
    type: USER_ADDRESS_POSTALCODE,
    payload: postalcode,
  };
};
// address - home phone
export const telephoneChanged = (telephone: string) => {
  return {
    type: USER_ADDRESS_TELEPHONE,
    payload: telephone,
  };
};
// national - card
export const frontImgChanged = (frontImg: string) => {
  return {
    type: USER_NATIONALCARD_FRONTIMAGE,
    payload: frontImg,
  };
};

export const backImgChanged = (backImg: string) => {
  return {
    type: USER_NATIONALCARD_BACKIMAGE,
    payload: backImg,
  };
};
export const faceImgChanged = (faceImg: string) => {
  return {
    type: USER_NATIONALCARD_FACEIMAGE,
    payload: faceImg,
  };
};

export const isChild = (ischild: boolean) => {
  return {
    type: ENTRYTYPE_ISCHILD,
    payload: ischild,
  };
};
