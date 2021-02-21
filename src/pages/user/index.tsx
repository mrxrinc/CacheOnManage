import React, { useState } from "react";
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
import License from "./kyc/license";
import KycLayout from "./kyc";
import { HeaderTitle } from "./kyc/config";
import AlertController from "components/alertController";
import { colors } from "constants/index";

const AuthRoot = () => {
  const dispatch = useDispatch();
  const [exitModal, setExitModal] = useState<any>(null);
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

  return signUpSteps === "signIn" ? (
    SwitchSteps()
  ) : (
    <>
      <KycLayout
        onClose={() => setExitModal(true)}
        title={HeaderTitle(signUpSteps)}
      >
        {SwitchSteps()}
      </KycLayout>
      <AlertController
        showModal={exitModal ?? false}
        setShowModal={() => setExitModal(false)}
        title="خروج"
        centerText
        description="درصورت خروج از برنامه، با ورود مجدد می‌توانید مابقی مراحل ثبت‌نام را از همین مرحله ادامه دهید."
        leftAction={handleBack}
        rightTitle="انصراف"
        leftColor={colors.pinkRed}
        leftTitle="خروج"
        rightColor={colors.turquoise}
        rightAction={() => setExitModal(false)}
      />
    </>
  );
};

export default AuthRoot;
