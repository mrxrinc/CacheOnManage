import React, { useState } from "react";
import {
  Image,
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";

import {
  phoneNumberChanged,
  signUpStepChanged,
  otpTokenChanged,
} from "redux/actions/User";
import { checkVerifyCode } from "utils/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../customType";
import { FormattedText } from "components/format-text";
import edit from "images/otp/edit.png";
import errorIcon from "images/error.png";
import OTPInputView from "@twotalltotems/react-native-otp-input";
import Button from "components/button";
import { colors } from "constants/index";

interface IError {
  errorText: string;
  isError: boolean;
}

const COUNTER = 120;

const VeryfiCode = () => {
  const [timeLeft, setTimeLeft] = useState(COUNTER);
  const [loading, setLoading] = useState(false);
  const phone = useSelector<RootState, any>((state) => state.user.phone);
  const [verifyCode, setVerifyCode] = useState("");
  const [error, setError] = useState<IError>({
    errorText: "",
    isError: false,
  });
  const dispatch = useDispatch();
  const handleClick = () => {
    console.log("code is ", verifyCode, phone);
    setLoading(true);
    checkVerifyCode(phone, verifyCode)
      .then((response: any) => {
        if (response.status == 200) {
          setLoading(false);
          const token = response.data.access_token;
          dispatch(otpTokenChanged(token));
          dispatch(signUpStepChanged(response.data.current));
          dispatch(phoneNumberChanged(""));
        } else {
          setError({ errorText: "خطای شبکه", isError: true });
        }
      })
      .catch((err) => {
        setLoading(false);
        setError({ errorText: err.response.data.message, isError: true });
      });
  };
  const handleSendCodeAgain = () => {
    setTimeLeft(COUNTER);
  };
  const handleEdit = () => {
    dispatch(signUpStepChanged("otp"));
  };

  React.useEffect(() => {
    if (!timeLeft) return;
    const intervalId = setInterval(() => {
      setTimeLeft(timeLeft - 1);
    }, 1000);
    return () => clearInterval(intervalId);
  }, [timeLeft]);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <View style={{ flexDirection: "row" }}>
            <FormattedText style={styles.textStyle}>
              کد تایید ارسال شد به
            </FormattedText>
            <TouchableOpacity
              style={{ flexDirection: "row", marginLeft: "2%" }}
              onPress={handleEdit}
            >
              <FormattedText style={styles.phoneText}>{phone}</FormattedText>
              <Image style={{ width: 25, height: 25 }} source={edit} />
            </TouchableOpacity>
          </View>
        </View>
        <OTPInputView
          style={{ width: "80%", height: 100 }}
          pinCount={6}
          code={verifyCode}
          onCodeChanged={(code) => setVerifyCode(code)}
          autoFocusOnLoad
          editable
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          // onCodeFilled={handleClick}
        />
        {error.isError && (
          <View style={styles.errorBox}>
            <Image source={errorIcon} style={{ width: 16, height: 16 }} />
            <FormattedText style={styles.errorText}>
              {error.errorText}
            </FormattedText>
          </View>
        )}
        {timeLeft == 0 ? (
          <View style={styles.Button}>
            <TouchableOpacity
              onPress={() => handleSendCodeAgain()}
              style={styles.touch}
            >
              <FormattedText style={styles.textButton}>
                ارسال مجدد
              </FormattedText>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.timer}>
            <FormattedText style={[styles.timeText, { color: "#515c6f" }]}>
              زمان باقی مانده
            </FormattedText>
            <FormattedText style={styles.timeText}>
              {("0" + Math.floor(timeLeft / 60)).slice(-2)}:
              {("0" + (timeLeft % 60)).slice(-2)}
            </FormattedText>
          </View>
        )}
        <View style={[styles.handleClickStyle]}>
          <Button
            color={colors.buttonSubmitActive}
            title="تایید و ادامه"
            onPress={() => handleClick()}
            disabled={verifyCode.length < 6 && true}
            loading={loading}
          />
        </View>
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
  },
  textStyle: {
    fontSize: 14,
    marginBottom: 5,
  },
  inputContainer: {
    width: width * 0.89,
    height: height * 0.4,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 8,
    marginTop: "6%",
  },
  inputBox: {
    width: width * 0.89,
    height: height * 0.04,
    alignItems: "center",
  },
  Button: {
    width: "35%",
    height: "12%",
    backgroundColor: "#43e6c5",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 25,
    marginTop: "10%",
  },
  touch: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  textButton: {
    color: "white",
    fontSize: 16,
  },
  timer: {
    width: "45%",
    height: "22%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: "10%",
  },
  timeText: {
    color: "#8d8b8b",
    fontSize: 16,
  },
  phoneText: {
    color: "#0c96ff",
    fontSize: 16,
  },
  errorBox: {
    width: width * 0.85,
    height: height * 0.04,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
  },
  errorText: {
    fontSize: 12,
    color: "#f52727",
    marginLeft: "2%",
  },

  underlineStyleBase: {
    width: 40,
    height: 45,
    color: "#8d8b8b",
    borderWidth: 0,
    borderColor: "#8d8b8b",
    borderBottomWidth: 2,
  },

  underlineStyleHighLighted: {
    borderColor: "#00015d",
  },
  handleClickStyle: {
    width: width * 0.89,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: "15%",
  },
});

export default VeryfiCode;
