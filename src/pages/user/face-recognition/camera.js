// components/Camera.js
import React, { PureComponent } from "react";
import { RNCamera } from "react-native-camera";
import { FormattedText } from "components/format-text";
import imagessss from "images/error.png";
import {
  Alert,
  StyleSheet,
  View,
  Dimensions,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { signUpStepChanged } from "redux/actions/User";
import { winkImg } from "utils/api";
import RNFS from "react-native-fs";
import { colors } from "constants/index";
import Button from "components/button";

const { width, height } = Dimensions.get("window");

class Camera extends PureComponent {
  smiled = false;
  smiledTaken = true;
  done = false;
  blinkIndex = 1;
  open = false;
  close = false;
  label = "لطفا لبخند بزنید";
  images = new Array();

  constructor(props) {
    super(props);
    this.state = {
      takingPic: false,
      imageUrl: "",
      startDetect: false,
    };
  }

  takePicture = async () => {
    if (this.camera && !this.state.takingPic) {
      let options = {
        quality: 0.85,
        fixOrientation: true,
        forceUpOrientation: true,
      };

      this.setState({ takingPic: true });

      try {
        const data = await this.camera.takePictureAsync(options);

        this.images.push(data);
      } catch (err) {
        Alert.alert("Error", "Failed to take picture: " + (err.message || err));
        return;
      } finally {
        this.setState({ takingPic: false });
      }
    }
  };
  onFaceDetected = async ({ faces }) => {
    if (faces[0]) {
      await this.faceProcess(faces[0]).then(() => {});
    }
  };
  handleTouch = () => this.setState({ startDetect: true });
  async faceProcess(faces) {
    if (this.open && this.close && this.blinkIndex <= 3 && this.smiled) {
      this.close = false;
      this.open = false;
      this.blinkIndex++;
    }

    if (faces.smilingProbability > 0.6 && !this.smiled && this.smiledTaken) {
      this.smiledTaken = false;
      await this.takePicture().then(() => {
        this.label = "لطفا چشمان خود را سه بار باز و بسته کنید";
        this.smiled = true;
      });
    }

    if (
      faces.leftEyeOpenProbability > 0.6 &&
      faces.rightEyeOpenProbability > 0.6 &&
      !this.open &&
      this.smiled &&
      this.blinkIndex <= 3
    ) {
      this.open = true;
      await this.takePicture().then(() => {
      });
    }
    if (
      faces.leftEyeOpenProbability < 0.2 &&
      faces.rightEyeOpenProbability < 0.2 &&
      !this.close &&
      this.smiled &&
      this.blinkIndex <= 3
    ) {
      await this.takePicture().then(() => {
        this.close = true;
      });
    }
    // const data = new FormData();
    if (this.blinkIndex > 3 && !this.done) {
      this.done = true;

      RNFS.readFile(this.images[0].uri, "base64").then((res) => {
        winkImg(this.props.token, res)
          .then((response) => {
            if (response.status == 200) {
              this.props.signUpStepChanged("3004");
            }
          })
          .catch((err) => {
          });
      });

    }
  }

  render() {
    const { startDetect } = this.state;
    return (
      <View
        style={{
          justifyContent: "flex-start",
          alignItems: "center",
          width: width * 0.89,
        }}
      >
        <View style={styles.container}>
          <View style={{ height: 70 }}>
            {startDetect && (
              <FormattedText
                style={{
                  fontSize: 14,
                  color: "#27519e",
                  backgroundColor: "white",
                  textAlign: "center",
                  marginBottom: 100,
                }}
              >
                {this.label}
              </FormattedText>
            )}
          </View>
          <RNCamera
            style={{
              width: width * 0.69,
              height: height * 0.48,
            }}
            ref={(ref) => {
              this.camera = ref;
            }}
            faceDetectionLandmarks={
              RNCamera.Constants.FaceDetection.Landmarks.all
            }
            faceDetectionClassifications={
              RNCamera.Constants.FaceDetection.Classifications.all
            }
            faceDetectionMode={RNCamera.Constants.FaceDetection.Mode.accurate}
            captureAudio={false}
            type={RNCamera.Constants.Type.front}
            onFacesDetected={startDetect && this.onFaceDetected}
            androidCameraPermissionOptions={{
              title: "Permission to use camera",
              message: "We need your permission to use your camera",
              buttonPositive: "Ok",
              buttonNegative: "Cancel",
            }}
          />
          <View
            style={{
              width: width * 0.69,
              height: height * 0.48,
              borderColor: "#a1a4af",
              position: "absolute",
              direction: "horizon",
            }}
          />

          <View style={{ marginTop: 70 }} />
        </View>
        <View style={[styles.Button]}>
          <Button
            color={colors.buttonSubmitActive}
            title="آماده ام"
            onPress={() => {
              this.handleTouch();
            }}
            // loading={loading}
          />
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    width: width * 0.89,
    height: height * 0.46,
    // flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
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

const mapStateToProps = (state: any) => {
  return { token: state.user.token };
};
export default connect(mapStateToProps, {
  signUpStepChanged,
})(Camera);
