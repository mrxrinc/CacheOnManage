import React, { useState } from "react";
import {
  Dimensions,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
  Platform,
} from "react-native";
import {
  signUpStepChanged,
  frontImgChanged,
  backImgChanged,
  faceImgChanged,
} from "redux/actions/User";
import { useDispatch, useSelector } from "react-redux";
import { FormattedText } from "components/format-text";
const BlinkIDReactNative = require("blinkid-react-native");
import ScanIcon from "components/icons/qr-code.svg";
import Button from "components/button";
import { colors } from "constants/index";

const licenseKey = Platform.select({
  ios:
    "sRwAAAENY29tLmFsbG93YW5jZQ21TPzY9lK0dQsiXjVjDYgWJqN3qlSdT0lB1U4wVG5aBoR/sJ5yofQz7qZc7mfxzQ6Grf5K8mGg5YyppChbCLcHvPn7YKhsTjp41P7vJcTSBBXarV6Gbq42K9Blb0f1TyaaNzwF7JgCE0F48YUQ+WiT6/kleMSby4f3h/YqhroMiiaQhdgQJo7TJpLELeB+Z9RR39TofydOA46F0JyWNkVYiYd9HbppMRciE7Zo8E2e+BXkjUelYCSYS+9M5Wk3pDGPfTeg",
  android:
    "sRwAAAANY29tLmFsbG93YW5jZUm37JKoiJRrIL7IeX0mdoW0whlJDc5m/7Eptjcy/shFoYTWrV1aywk8w0S3lWzErJ6jACbENMSZGH+hw+TgEV9EwrKY6IEDMoSZcRwU1dzkJHY6rgjHYavyyVbG1zzVJmGhNRJN4pYUPpIEUJwbvBSc1/w4LlwsoCyBFmxGUGh7xZXg98H5JemJOFnn1I9YrP2LCFrg8ZNu3T3b1+Qx2GWbmj5Ewxgwm8+v8jhroggUex397zb8ZobN4WbelNw4+aOyCkdX",
});

interface IError {
  errorText: string;
  isError: boolean;
}

const NationalCard = () => {
  const [loading, setLoading] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  const [error, setError] = useState<IError>({
    errorText: "",
    isError: false,
  });
  const dispatch = useDispatch();
  async function scan() {
    try {
      var blinkIdCombinedRecognizer = new BlinkIDReactNative.BlinkIdCombinedRecognizer();
      blinkIdCombinedRecognizer.returnFullDocumentImage = true;
      blinkIdCombinedRecognizer.returnFaceImage = true;
      var v = new BlinkIDReactNative.BlinkIdOverlaySettings();
      v.flipInstructions = "تصویر پشت کارت ملی";
      v.firstSideInstructionsText = "تصویر جلوی کارت ملی";
      v.errorMoveFarther = "عقب تر ببرید";
      const scanningResults = await BlinkIDReactNative.BlinkID.scanWithCamera(
        v,
        new BlinkIDReactNative.RecognizerCollection([
          blinkIdCombinedRecognizer /*, mrtdSuccessFrameGrabber*/,
        ]),
        licenseKey
      );

      if (scanningResults) {
        let newState = {
          showFrontImageDocument: false,
          resultFrontImageDocument: "",
          showBackImageDocument: false,
          resultBackImageDocument: "",
          showImageFace: false,
          resultImageFace: "",
          results: "",
          showSuccessFrame: false,
          successFrame: "",
        };

        for (let i = 0; i < scanningResults.length; ++i) {
          let localState = handleResult(scanningResults[i]);
          newState.showFrontImageDocument =
            newState.showFrontImageDocument ||
            localState.showFrontImageDocument;
          if (localState.showFrontImageDocument) {
            newState.resultFrontImageDocument =
              localState.resultFrontImageDocument;
          }
          newState.showBackImageDocument =
            newState.showBackImageDocument || localState.showBackImageDocument;
          if (localState.showBackImageDocument) {
            newState.resultBackImageDocument =
              localState.resultBackImageDocument;
          }
          newState.showImageFace =
            newState.showImageFace || localState.showImageFace;
          if (localState.resultImageFace) {
            newState.resultImageFace = localState.resultImageFace;
          }
          newState.results += localState.results;
          newState.showSuccessFrame =
            newState.showSuccessFrame || localState.showSuccessFrame;
          if (localState.successFrame) {
            newState.successFrame = localState.successFrame;
          }
        }

        newState.results += "\n";
        newState.showFrontImageDocument = false;
        newState.resultFrontImageDocument = "";
        newState.showBackImageDocument = false;
        newState.resultBackImageDocument = "";
        newState.showImageFace = false;
        newState.resultImageFace = "";
        newState.results = "";
        newState.showSuccessFrame = false;
        newState.successFrame = "";
      }
    } catch (error) {}
  }

  function handleResult(result: any) {
    var localState = {
      showFrontImageDocument: false,
      resultFrontImageDocument: "",
      showBackImageDocument: false,
      resultBackImageDocument: "",
      showImageFace: false,
      resultImageFace: "",
      results: "",
      showSuccessFrame: false,
      successFrame: "",
    };

    if (result instanceof BlinkIDReactNative.BlinkIdCombinedRecognizerResult) {
      let blinkIdResult = result;

      if (blinkIdResult.fullDocumentFrontImage) {
        localState.showFrontImageDocument = true;
        dispatch(
          frontImgChanged(
            "data:image/jpg;base64," + blinkIdResult.fullDocumentFrontImage
          )
        );
        localState.resultFrontImageDocument =
          "data:image/jpg;base64," + blinkIdResult.fullDocumentFrontImage;
      }
      if (blinkIdResult.fullDocumentBackImage) {
        localState.showBackImageDocument = true;
        dispatch(
          backImgChanged(
            "data:image/jpg;base64," + blinkIdResult.fullDocumentBackImage
          )
        );
        localState.resultBackImageDocument =
          "data:image/jpg;base64," + blinkIdResult.fullDocumentBackImage;
      }

      if (blinkIdResult.faceImage) {
        localState.showImageFace = true;
        dispatch(
          faceImgChanged("data:image/jpg;base64," + blinkIdResult.faceImage)
        );
        localState.resultImageFace =
          "data:image/jpg;base64," + blinkIdResult.faceImage;
      }

      if (
        blinkIdResult.fullDocumentBackImage &&
        blinkIdResult.fullDocumentFrontImage &&
        blinkIdResult.faceImage
      ) {
        dispatch(signUpStepChanged("cardUpload"));
      } else {
        setError({ errorText: "اسکن کارت با موفقیت انجام نشد", isError: true });
      }
    }
    return localState;
  }

  return (
    <View
      style={[
        styles.container,
        {
          justifyContent: showUpload ? "space-around" : "flex-start",
        },
      ]}
    >
      <View style={styles.scanContainer}>
        <View style={styles.textBox}>
          <FormattedText style={styles.description} id="nationalCard.scan" />
        </View>
        <View style={styles.scanBox}>
          <ScanIcon />
        </View>
      </View>

      <View style={[styles.Button]}>
        <Button
          color={colors.buttonSubmitActive}
          title="شروع"
          onPress={() => scan()}
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
  scanContainer: {
    width: width,
    height: height * 0.65,
    justifyContent: "center",
    alignItems: "center",
  },

  scanBox: {
    justifyContent: "center",
    alignItems: "center",
    width: width * 0.8,
  },

  textBox: {
    width: width * 0.89,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  description: {
    color: "#00015d",
    fontSize: 16,
    textAlign: "center",
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
    fontSize: 18,
    color: "#f52727",
    marginLeft: "2%",
  },
  Button: {
    width: width * 0.89,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
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
    fontSize: 20,
  },
});
export default NationalCard;
