import React, { useState, useEffect, useRef } from "react";
import { Image, Dimensions, View, StyleSheet } from "react-native";
import {
  signUpStepChanged,
  frontImgChanged,
  backImgChanged,
  faceImgChanged,
} from "redux/actions/User";
import { RootState } from "../../../../customType";
import { FormattedText } from "components/format-text";
import { useDispatch, useSelector } from "react-redux";
import { nationalIdSerial, uploadImg } from "utils/api";
import MaterialTextField from "components/materialTextfield";
import Button from "components/button";
import { colors } from "constants/index";

const Upload = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const frontImg = useSelector<RootState, any>((state) => state.user.frontImg);
  const backImg = useSelector<RootState, any>((state) => state.user.backImg);
  const faceImg = useSelector<RootState, any>((state) => state.user.faceImg);
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [error, setError] = useState<any>({ field: "", message: "" });
  const [serial, setSerial] = useState("");

  const clearError = () => {
    setError({
      field: "",
      message: "",
    });
  };

  const handleTouch = () => {
    setLoading(true);

    if (serial != "") {
      nationalIdSerial(token, serial)
        .then((response: any) => {
          if (response.status == 200) {
            uploadImg(token, faceImg, backImg, frontImg)
              .then((response) => {
                if (response.status == 200) {
                  dispatch(frontImgChanged(""));
                  dispatch(backImgChanged(""));
                  dispatch(faceImgChanged(""));
                  dispatch(signUpStepChanged(response.data.current));
                  setLoading(false);
                }
              })
              .catch((err) => {
                setError({
                  field: "invalidSerial",
                  message: err.response.data.message,
                });
              });
          } else {
            setError({ field: "invalidSerial", message: "خطای شبکه" });
          }
        })
        .catch((err) => {
          setError({
            field: "invalidSerial",
            message: err.response.data.message,
          });
          setLoading(false);
        });
    }
  };
  const isMounted = useRef(false);
  useEffect(() => {
    isMounted.current = true;
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: "flex-start",
        },
      ]}
    >
      <View
        style={[
          styles.inputPack,
          {
            height: height * 0.2,
          },
        ]}
      >
        <View style={styles.inputBox}>
          <View style={styles.inputTitle}>
            <FormattedText
              style={styles.textStyle}
              id="nationalCode.serialNumber"
            />
          </View>
          <MaterialTextField
            label="سریال کارت یا شماره پیگیری"
            keyboardType="default"
            maxLength={10}
            onChange={clearError}
            onChangeText={(code: string) => setSerial(code)}
            value={serial}
            error={error.field === "invalidSerial" ? error.message : null}
          />
        </View>
      </View>
      <View style={styles.picsBox}>
        <View>
          <Image
            source={{
              uri: faceImg,
            }}
            style={{
              width: width * 0.14,
              height: height * 0.11,
              borderRadius: 5,
            }}
          />
        </View>
        <View
          style={{
            flexDirection: "row",
            width: width * 0.89,
            justifyContent: "space-between",
          }}
        >
          <View>
            <Image
              source={{
                uri: frontImg,
              }}
              style={styles.nationalCardImg}
            />
          </View>

          <View>
            <Image
              source={{
                uri: backImg,
              }}
              style={styles.nationalCardImg}
            />
          </View>
        </View>
      </View>
      <View style={[styles.Button]}>
        <Button
          color={colors.buttonSubmitActive}
          title="تایید و ارسال"
          onPress={() => handleTouch()}
          disabled={serial.length != 10 && true}
          loading={loading}
        />
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
    alignItems: "center",
  },
  inputPack: {
    justifyContent: "flex-start",
    alignItems: "center",
    width: width * 0.85,
    height: height * 0.35,
  },
  inputBox: {
    width: width * 0.89,
    height: height * 0.2,

    justifyContent: "space-between",
  },
  inputTitle: {
    width: width * 0.89,
    justifyContent: "flex-start",
    alignItems: "flex-start",
    marginTop: "3%",
  },
  textStyle: {
    color: "#00015d",
    fontSize: 16,
    // textAlign: "center",
  },
  picsBox: {
    width: width * 0.9,
    height: height < 700 ? height * 0.23 : height * 0.3,
    justifyContent: "space-around",
    alignItems: "flex-start",
  },
  TextInput: {
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.23,
    shadowRadius: 2.62,
    elevation: 10,
    fontSize: 18,
    color: "black",
    width: "100%",
    height: 45,
    borderRadius: 5,
    textAlign: "center",
    marginTop: "2%",
  },
  errorBox: {
    width: width * 0.85,
    height: height * 0.04,
    justifyContent: "flex-start",
    alignItems: "center",
    flexDirection: "row",
    marginTop: "5%",
  },
  errorText: {
    fontSize: 12,
    color: "#f52727",
    marginLeft: "2%",
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
  },
  nationalCardImg: {
    width: width * 0.42,
    height: height * 0.13,
    borderRadius: 5,
  },
  Button: {
    width: width * 0.89,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: "15%",
  },
});
export default Upload;
