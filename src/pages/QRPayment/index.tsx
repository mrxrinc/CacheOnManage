import React from "react";
// Hooks
import { useDispatch } from "react-redux";
// UI Frameworks
import { Button, Text, View } from "react-native";
import { RNCamera } from "react-native-camera";
import { ScrollView, TouchableOpacity } from "react-native-gesture-handler";
// Actions
import QRPaymentActions from "store/QRPayment/qrPayment.actions";
// Common components
import Layout from "components/layout";
import Header from "components/header";
import { FormattedText } from "components/format-text";
// Local components
import ByHandPayment from "./components/ByHandPayment";
import PayAmount from "./components/PayAmount";
// Styles
import styles from "./styles";

interface BarcodeInfo {
  type: string;
  data: any;
}
interface Props {
  navigation: any;
}
const QRPayment: React.FC<Props> = (props) => {
  const dispatch = useDispatch();
  const camera = React.useRef(null);
  const [barcode, setBarcode] = React.useState("");
  const [cameraInfo] = React.useState({
    type: RNCamera.Constants.Type.back,
    flashMode: RNCamera.Constants.FlashMode.auto,
  });
  const [showModal, setShowModal] = React.useState(true);
  const [qrBtnActive, setQrBtnActive] = React.useState(true);
  const [payAmount, setPayAmount] = React.useState(false);
  const [byHandBtnActive, setByHandPaymentBtnActive] = React.useState(false);

  function onBarCodeRead(scanResult: BarcodeInfo) {
    console.warn(scanResult.type);
    console.warn(scanResult.data);
    if (scanResult.data === null) {
      setShowModal(false);
      setQrBtnActive(false);
      setByHandPaymentBtnActive(true);
    }
    const guId = scanResult.data.split("=");

    setBarcode(guId[1]);
    const data = {
      qrGuidId: guId[1],
    };
    dispatch(QRPaymentActions.getQrInquiry(data as any, { sagas: true }));

    if (barcode) {
      setShowModal(false);

      setPayAmount(true);
    }
  }

  function handleQRScan() {
    setShowModal(true);
    setPayAmount(false);
    setByHandPaymentBtnActive(false);
    setQrBtnActive(true);
  }
  function handleHandPayment() {
    setShowModal(false);
    setPayAmount(false);
    setQrBtnActive(false);
    setByHandPaymentBtnActive(true);
  }

  return (
    <Layout>
      <Header
        staticTitle={"qrHeader"}
        handleBack={() => props.navigation.goBack()}
      />
      <ScrollView
        style={[styles.container, showModal && styles.containerBgColor]}
      >
        {payAmount ? (
          <PayAmount guId={barcode ? barcode : ""} />
        ) : (
          <>
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity
                style={[styles.button, byHandBtnActive && styles.activeButton1]}
                onPress={handleHandPayment}
              >
                <FormattedText
                  style={[styles.blueText, byHandBtnActive && styles.whiteText]}
                >
                  پرداخت دستی
                </FormattedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, qrBtnActive && styles.activeButton2]}
                onPress={handleQRScan}
              >
                <FormattedText
                  style={[styles.blueText, qrBtnActive && styles.whiteText]}
                >
                  اسکن بارکد
                </FormattedText>
              </TouchableOpacity>
            </View>
            {byHandBtnActive && (
              <ByHandPayment payAmount={() => setPayAmount(true)} />
            )}

            {showModal && (
              <View style={styles.qrContainer}>
                <View style={styles.qrPreview}>
                  <RNCamera
                    ref={camera}
                    flashMode={cameraInfo.flashMode}
                    onBarCodeRead={onBarCodeRead.bind(this)}
                    permissionDialogTitle={"Permission to use camera"}
                    permissionDialogMessage={
                      "We need your permission to use your camera phone"
                    }
                    style={styles.preview}
                    type={cameraInfo.type}
                  />
                </View>
                <View style={[styles.topOverlay, styles.overlay]}>
                  <Text style={styles.scanScreenMessage}>
                    لطفا بارکد را داخل کادر قرار دهید و نگه دارید.
                  </Text>
                </View>
              </View>
            )}
          </>
        )}
      </ScrollView>
    </Layout>
  );
};

export default QRPayment;
