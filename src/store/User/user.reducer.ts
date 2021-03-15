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

const INSTIAL_STATE = {
  phone: "",
  verifyCode: "",
  userName: "",
  password: "",
  nationalCode: "",
  signUpSteps: "signIn",
  cardSerial: "",
  postalcode: "",
  telephone: "",
  frontImg: "",
  backImg: "",
  faceImg: "",
  token: "",
  showTree: false,
  currentSteps: null,
  ischild: false,
};

export default (state = INSTIAL_STATE, action: any) => {
  switch (action.type) {
    case USER_OTP_PHONE:
      return { ...state, phone: action.payload };
    case USER_OTP_VERIFYCODE:
      return { ...state, verifyCode: action.payload };
    case USER_OTP_TOKEN:
      return { ...state, token: action.payload };
    case USER_SIGNUP_STEP:
      return { ...state, signUpSteps: action.payload };
    case USER_CURRENT_STEP:
      return { ...state, currentSteps: action.payload };
    case USER_SHOW_TREE:
      return { ...state, showTree: action.payload };
    case USER_LOGIN_USERNAME:
      return { ...state, userName: action.payload };
    case USER_LOGIN_PASSWORD:
      return { ...state, password: action.payload };
    case USER_NATIONALCARD_SERIAL:
      return { ...state, cardSerial: action.payload };
    case USER_ADDRESS_POSTALCODE:
      return { ...state, postalcode: action.payload };
    case USER_ADDRESS_TELEPHONE:
      return { ...state, telephone: action.payload };
    case USER_NATIONALCARD_FRONTIMAGE:
      return { ...state, frontImg: action.payload };
    case USER_NATIONALCARD_BACKIMAGE:
      return { ...state, backImg: action.payload };
    case USER_NATIONALCARD_FACEIMAGE:
      return { ...state, faceImg: action.payload };
    case ENTRYTYPE_ISCHILD:
      return { ...state, ischild: action.payload };
    default:
      return state;
  }
};
