import React, { useState, useRef, useEffect } from "react";
import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  TouchableOpacity,
  Image,
} from "react-native";
import axios from "axios";
import { FormattedText } from "components/format-text";
import { RNCamera } from "react-native-camera";

import { getLivenessText } from "utils/api";
import { signUpStepChanged, currentStepChanged } from "redux/actions/User";
import { BASE_URL } from "config/index";
import RNFS from "react-native-fs";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../customType";
import * as Progress from "react-native-progress";
import Button from "components/button";
import { colors } from "constants/index";
import Modal from "react-native-modal";

const CameraScreen = () => {
  const dispatch = useDispatch();
  const [recording, setRecording] = useState(false);
  const [percentage, setPercentage] = useState(0);
  const [processing, setProcessing] = useState(false);
  const [livenessText, setLivenessText] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const cameraRef = useRef(null);
  const token = useSelector<RootState, any>((state) => state.user.token);

  const startRecording = async () => {
    console.log("startRecording call");
    setRecording(true);
    const promise = cameraRef.current.recordAsync();
    setRecording(true);
    const data = await promise;
    setRecording(false);
    setProcessing(true);
    setModalVisible(true);

    const options = {
      headers: {
        authorization: `Bearer ${token}`,
      },
      onUploadProgress: (progressEvent: any) => {
        const { loaded, total } = progressEvent;
        let precent = Math.floor((loaded * 100) / total);
        console.log("precent is", precent);
        if (precent < 100) {
          setPercentage(precent);
        }
      },
    };

    await RNFS.readFile(data.uri, "base64").then((res) => {
      console.log("video base64 res is:", res);
      console.log("token data is", token);
      console.log("startRecording call2");
      axios
        .post(
          BASE_URL + "/api/v1/onboarding/notarization",
          {
            video: "data:video/mp4;base64," + res,
          },

          options
        )
        .then((res) => {
          console.log("video base64 is:", res);
          if ((res.status = 200)) {
            setPercentage(0);
            dispatch(signUpStepChanged(res.data.current));
            dispatch(currentStepChanged(2));
            console.log("respons is::", res);
          }
        })
        .catch((error) => {
          console.log(
            "There has been a problem with your fetch operation: " +
              error.response.data.message
          );
          throw error;
        });
    });
    setProcessing(false);
  };

  const stopRecording = async () => {
    await cameraRef.current.stopRecording();
  };

  useEffect(() => {
    getLivenessText(token)
      .then((response: any) => {
        console.log("getLivenessText api is", response.data);
        if (response.status == 200) {
          setLivenessText(response.data.text);
        }
      })
      .catch(function (error) {
        console.log(
          "There has been a problem with your fetch operation: " + error.message
        );
        throw error;
      });
  }, []);

  // const { recording, processing, livenessText } = this.state;

  let button = (
    <View style={[styles.Button]}>
      <Button
        color={colors.buttonSubmitActive}
        title="آماده ام"
        onPress={startRecording.bind(this)}
      />
    </View>
  );

  if (recording) {
    button = (
      <View style={[styles.Button]}>
        <Button
          color={colors.red}
          title="پایان"
          onPress={stopRecording.bind(this)}
        />
      </View>
    );
  }

  if (processing) {
    button = (
      <View style={styles.capture}>
        <ActivityIndicator animating size={18} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.aboutVideoBox}>
        <FormattedText style={styles.aboutVideoText}>
          لطفا با حفظ شئونات اسلامی یک ویدیوی ۴۵ ثانیه‌ای با عبارت خواسته شده
          ضبط و ارسال نمائید.
        </FormattedText>
      </View>
      <RNCamera
        ref={cameraRef}
        style={{
          width: 90,
          height: height < 700 ? 300 : 300,
          borderRadius: 50,
        }}
        type={RNCamera.Constants.Type.front}
        flashMode={RNCamera.Constants.FlashMode.on}
        permissionDialogTitle={"Permission to use camera"}
        defaultVideoQuality={"288p"}
        permissionDialogMessage={
          "We need your permission to use your camera phone"
        }
      />
      <View style={styles.aboutVideoBox}>
        <FormattedText style={styles.livenessText}>
          {livenessText}
        </FormattedText>
      </View>
      <View style={{ flex: 0, flexDirection: "row", justifyContent: "center" }}>
        {button}
      </View>
      {percentage > 0 && (
        <Modal
          isVisible={true}
          onBackButtonPress={() => setModalVisible(false)}
        >
          <View style={styles.uploadBox}>
            <FormattedText style={styles.aboutVideoText}>
              در حال ارسال ویدیو
            </FormattedText>
            <FormattedText style={[styles.aboutVideoText, { fontSize: 14 }]}>
              لطفا منتظر بمانید…
            </FormattedText>
            <Progress.Bar
              progress={percentage / 100}
              width={200}
              color={"#00c47b"}
            />
          </View>
        </Modal>
      )}
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
  aboutVideoText: {
    color: "#00015d",
    fontSize: 16,
    textAlign: "center",
  },
  aboutVideoBox: {
    width: width * 0.89,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
  },
  livenessText: {
    color: "#333333",
    fontSize: 14,
    textAlign: "center",
  },
  Button: {
    width: width * 0.89,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: "15%",
  },
  uploadBox: {
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    width: width * 0.89,
    height: height * 0.25,
    borderRadius: 10,
  },
});

export default CameraScreen;
