import * as React from "react";
import {
  Dimensions,
  StatusBar,
  View,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { FormattedText } from "components/format-text";
import Background from "components/background";
import Otp from "./otp";
import SignIn from "./signIn";
import VerifyCode from "./otp/verifyCode";
import DateOfBirth from "./dateOfbirth";
import NationalCard from "./national-card";
import Address from "./address";
import Register from "./signUp";
import VideoRecorder from "./video-recorder";
import FaceDetection from "./face-recognition";
import CardUpload from "./national-card/upload";
import KycProgress from "./kyc-progress-step";
import { RootState } from "../../../customType";
import { signUpStepChanged } from "redux/actions/User";
import Steps from "react-native-steps";
import Close from "components/icons/close.svg";
import CheckInformation from "./check-information";

const Login: React.FC = () => {
  const dispatch = useDispatch();
  const signUpSteps = useSelector<RootState, any>(
    (state) => state.user.signUpSteps
  );
  const currentSteps = useSelector<RootState, any>(
    (state) => state.user.currentSteps
  );
  const showTree = useSelector<RootState, any>((state) => state.user.showTree);
  console.log("showTree is", showTree, signUpSteps);

  const configs = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 1,
    stepStrokeCurrentColor: "#00c47b",
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: "#00c47b",
    stepStrokeUnFinishedColor: "#00c47b",
    separatorFinishedColor: "#00c47b",
    separatorUnFinishedColor: "white",
    stepIndicatorFinishedColor: "#00c47b",
    stepIndicatorUnFinishedColor: "white",
    stepIndicatorCurrentColor:
      currentSteps == 0
        ? "#00c47b"
        : currentSteps == 1
        ? "#00c47b"
        : currentSteps == 2
        ? "#00c47b"
        : "white",
    stepIndicatorLabelFontSize: 13,
    currentStepIndicatorLabelFontSize: 13,
    stepIndicatorLabelCurrentColor: "white",
    stepIndicatorLabelFinishedColor: "#ffffff",
    stepIndicatorLabelUnFinishedColor: "white",
    labelColor: "#c9cbcc",
    labelSize: 10,
    currentStepLabelColor: "white",
    lableStyle: { width: 20 },
  };
  const handleBack = () => {
    dispatch(signUpStepChanged("signIn"));
  };
  return (
    <Background>
      <StatusBar backgroundColor={"transparent"} translucent hidden={false} />
      <View style={styles.container}>
        <View
          style={[
            styles.userStateBox,
            {
              height: signUpSteps != "signIn" ? height * 0.19 : height * 0.112,
            },
          ]}
        >
          <View
            style={{
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "10%",
              width: width * 0.93,
              flexDirection: "row",
            }}
          >
            {signUpSteps != "signIn" ? (
              <TouchableOpacity style={styles.close} onPress={handleBack}>
                <Close width={18} height={18} fill="#fff" />
              </TouchableOpacity>
            ) : (
              <View style={{ width: 32, height: 32 }} />
            )}
            <FormattedText style={{ fontSize: 16, color: "white" }}>
              {signUpSteps == "signIn"
                ? "ورود"
                : signUpSteps == "otp"
                ? "اطلاعات فردی"
                : signUpSteps == "verifyCode"
                ? "اطلاعات فردی"
                : signUpSteps == "1004"
                ? "اطلاعات فردی"
                : signUpSteps == "2006"
                ? "اطلاعات فردی"
                : signUpSteps == "cardUpload"
                ? "اطلاعات فردی"
                : signUpSteps == "2003"
                ? "اطلاعات فردی"
                : signUpSteps == "3002"
                ? "احراز هویت"
                : signUpSteps == "3004"
                ? "احراز هویت"
                : signUpSteps == "1003"
                ? "ساخت حساب  کاربری"
                : signUpSteps == "0" || signUpSteps == "checkInfo"
                ? "بررسی اطلاعات"
                : ""}
            </FormattedText>
            <View style={{ width: 32 }} />
          </View>
          {signUpSteps != "signIn" && (
            <View style={{ width: width * 1.1, marginTop: 20 }}>
              <Steps
                // renderStepIndicator={renderStepIndicator}
                configs={configs}
                current={currentSteps}
                // labels={labels}
                reversed={true}
                count={4}
              />
            </View>
          )}
        </View>
        {signUpSteps == "signIn" && <SignIn />}
        {signUpSteps == "otp" && <Otp />}
        {signUpSteps == "verifyCode" && <VerifyCode />}
        {signUpSteps == "1004" && <DateOfBirth />}
        {(signUpSteps == "2006" || signUpSteps == "2001") && <NationalCard />}
        {signUpSteps == "cardUpload" && <CardUpload />}
        {signUpSteps == "2003" && <Address />}
        {signUpSteps == "1003" && <Register />}
        {signUpSteps == "3002" && <FaceDetection />}
        {(signUpSteps == "3004" || signUpSteps == "3003") && <VideoRecorder />}
        {(signUpSteps == "0" || signUpSteps == "checkInfo") && (
          <CheckInformation />
        )}
        {/* {showTree && <KycProgress />} */}
      </View>
    </Background>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: width,
    height: height,
    // backgroundColor: "#27519e",
  },
  userStateBox: {
    width: width,
    justifyContent: "flex-start",
    alignItems: "center",
    // backgroundColor: "#27519e",
  },
  close: {
    width: 32,
    height: 32,
    justifyContent: "center",
    alignItems: "center",
  },
});
export default Login;
