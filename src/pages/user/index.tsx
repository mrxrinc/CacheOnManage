import * as React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../customType";
import { signUpStepChanged } from "redux/actions/User";
import Otp from "./otp";
import SignIn from "./signIn/login";
import VerifyCode from "./otp/verifyCode";
import DateOfBirth from "./dateOfbirth";
import NationalCard from "./national-card";
import Address from "./address";
import Register from "./signUp";
import VideoRecorder from "./video-recorder";
import FaceDetection from "./face-recognition";
import CardUpload from "./national-card/upload";
import CheckInformation from "./check-information";
import License from "./License";

const AuthRoot = () => {
  const dispatch = useDispatch();
  const signUpSteps = useSelector<RootState, any>(
    (state) => state.user.signUpSteps
  );

  const handleBack = () => {
    dispatch(signUpStepChanged("signIn"));
  };

  const SwitchSteps = () => {
    switch (signUpSteps) {
      case "signIn":
        return <SignIn />;
      case "license":
        return <License />;
      case "otp":
        return <Otp />;
      case "verifyCode":
        return <VerifyCode />;
      case "1004":
        return <DateOfBirth />;
      case "2006" || "2001":
        return <NationalCard />;
      case "cardUpload":
        return <CardUpload />;
      case "2003":
        return <Address />;
      case "1003":
        return <Register />;
      case "3002":
        return <FaceDetection />;
      case "3004":
        return <VideoRecorder />;
      case "0" || "checkInfo":
        return <CheckInformation />;
      default:
        return <SignIn />;
    }
  };

  return SwitchSteps();
};

export default AuthRoot;
