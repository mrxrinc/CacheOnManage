import React, { useState } from "react";
import {
  View,
  Dimensions,
  StyleSheet,
  Image,
  TouchableOpacity,
  Switch,
} from "react-native";
import { FormattedText } from "components/format-text";
import accept from "images/kyc-process/accept.png";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../customType";
import { showTreeChanged, signUpStepChanged } from "redux/actions/User";

const KycProgress = () => {
  const dispatch = useDispatch();
  const [switch1Value, setSwitch1Value] = useState(false);
  const signUpSteps = useSelector<RootState, any>(
    (state) => state.user.signUpSteps
  );
  const toggleSwitch1 = (value: boolean) => {
    setSwitch1Value(value);
  };
  React.useEffect(() => {
    if (signUpSteps != "otp") setSwitch1Value(true);
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.inputPack}>
        <View style={styles.stepBox}>
          {signUpSteps == "otp" ? (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: "#00c47b",
              }}
            />
          ) : (
            <Image source={accept} style={{ width: 30, height: 30 }} />
          )}
          <FormattedText
            style={[
              styles.line,
              {
                color: "#00c47b",
              },
            ]}
          >
            ----------------------------
          </FormattedText>
          <FormattedText style={{ color: "#00c47b" }}>
            ساخت حساب کاربری
          </FormattedText>
        </View>
        {/* ////////// */}
        <View style={styles.stepBox}>
          {signUpSteps == "2006" || signUpSteps == "otp" ? (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 25,
                borderWidth: 1,
                borderColor: signUpSteps == "otp" ? "#c9cbcc" : "#00c47b",
              }}
            />
          ) : (
            <Image source={accept} style={{ width: 30, height: 30.5 }} />
          )}
          <FormattedText
            style={[
              styles.line,
              { color: signUpSteps == "otp" ? "#c9cbcc" : "#00c47b" },
            ]}
          >
            -------------------------
          </FormattedText>
          <FormattedText
            style={{ color: signUpSteps == "otp" ? "#c9cbcc" : "#00c47b" }}
          >
            دریافت مدارک و آدرس
          </FormattedText>
        </View>
        {/* /////////// */}
        <View style={styles.stepBox}>
          {signUpSteps == "2006" ||
          signUpSteps == "otp" ||
          signUpSteps == "face-detection" ? (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 25,
                borderWidth: 1,
                borderColor:
                  signUpSteps == "otp" || signUpSteps == "2006"
                    ? "#c9cbcc"
                    : "#00c47b",
              }}
            />
          ) : (
            <Image source={accept} style={{ width: 30, height: 30 }} />
          )}
          <FormattedText
            style={[
              styles.line,
              {
                color:
                  signUpSteps == "otp" || signUpSteps == "2006"
                    ? "#c9cbcc"
                    : "#00c47b",
              },
            ]}
          >
            -------------------------------------
          </FormattedText>
          <FormattedText
            style={{
              color:
                signUpSteps == "otp" || signUpSteps == "2006"
                  ? "#c9cbcc"
                  : "#00c47b",
            }}
          >
            احراز هویت
          </FormattedText>
        </View>
        {/* //////// */}
        <View style={styles.stepBox}>
          {signUpSteps == "2006" ||
          signUpSteps == "otp" ||
          signUpSteps == "face-detection" ||
          signUpSteps == "signIn" ? (
            <View
              style={{
                width: 30,
                height: 30,
                borderRadius: 25,
                borderWidth: 1,
                borderColor:
                  signUpSteps == "otp" ||
                  signUpSteps == "2006" ||
                  signUpSteps == "face-detection"
                    ? "#c9cbcc"
                    : "#00c47b",
              }}
            />
          ) : (
            <Image source={accept} style={{ width: 30, height: 30 }} />
          )}
          <FormattedText
            style={[
              styles.line,
              {
                color:
                  signUpSteps == "otp" ||
                  signUpSteps == "2006" ||
                  signUpSteps == "face-detection"
                    ? "#c9cbcc"
                    : "#00c47b",
              },
            ]}
          >
            ---------------------------------
          </FormattedText>
          <FormattedText
            style={{
              color:
                signUpSteps == "otp" ||
                signUpSteps == "2006" ||
                signUpSteps == "face-detection"
                  ? "#c9cbcc"
                  : "#00c47b",
            }}
          >
            بررسی اطلاعات
          </FormattedText>
        </View>
        {/* //////////// */}
      </View>
      {signUpSteps == "otp" && (
        <View style={styles.switch}>
          <Switch
            onValueChange={toggleSwitch1}
            value={switch1Value}
            trackColor={{ false: "#767577", true: "#0c96ff" }}
            thumbColor={"#f4f3f4"}
          />
          <FormattedText style={{ fontSize: 12 }}>پذیرش </FormattedText>
          <TouchableOpacity>
            <FormattedText style={{ fontSize: 12, color: "#0c96ff" }}>
              قوانین و مقررات
            </FormattedText>
          </TouchableOpacity>
        </View>
      )}
      <View
        style={[
          styles.Button,
          {
            backgroundColor: !switch1Value ? "#c9cbcc" : "#00C47B",
          },
        ]}
      >
        <TouchableOpacity
          style={styles.touch}
          disabled={!switch1Value && true}
          onPress={() => {
            dispatch(showTreeChanged(false));
          }}
        >
          <FormattedText style={{ fontSize: 16, color: "white" }}>
            ادامه
          </FormattedText>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height * 0.89,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
    borderTopStartRadius: 20,
    borderTopEndRadius: 20,
  },
  inputPack: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: width * 0.85,
    height: height * 0.35,
    marginTop: "6%",
  },
  stepBox: {
    flexDirection: "row",
    width: "95%",
    height: 60,

    justifyContent: "space-between",
  },
  line: {
    fontSize: 20,
  },
  touch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  textButton: {
    color: "white",
    fontSize: 16,
    justifyContent: "center",
    alignItems: "center",
  },
  Button: {
    width: width * 0.73,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    marginTop: "5%",
  },
  switch: {
    alignItems: "center",
    justifyContent: "flex-start",
    flexDirection: "row",
    width: width * 0.73,
  },
});
export default KycProgress;
