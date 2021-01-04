import React from "react";
import { Text, View } from "react-native";
import { RNCamera } from "react-native-camera";
import styles from "./styles";
import Modal from "react-native-modal";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FormattedText } from "components/format-text";
import Layout from "components/layout";
import Header from "components/header";
import ByHandPayment from "./components/ByHandPayment";
import PayAmount from "./components/PayAmount";
import { useDispatch } from "react-redux";
import QRPaymentActions from "store/QRPayment/qrPayment.actions";

interface BarcodeInfo {
  type: any;
  data: any;
}
const QRPayment: React.FC = (props: any) => {
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
    if (scanResult.data != null) {
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
      <View style={styles.container}>
        {payAmount ? (
          <PayAmount guId={barcode ? barcode : ""} />
        ) : (
          <>
            <View style={styles.buttonsWrapper}>
              <TouchableOpacity
                style={[styles.button, byHandBtnActive && styles.activeButton]}
                onPress={handleHandPayment}
              >
                <FormattedText
                  style={[styles.blueText, byHandBtnActive && styles.whiteText]}
                >
                  پرداخت دستی
                </FormattedText>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, qrBtnActive && styles.activeButton]}
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
            <Modal
              isVisible={showModal}
              onBackdropPress={() => setShowModal(false)}
            >
              <View>
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
              <View style={[styles.overlay, styles.topOverlay]}>
                <Text style={styles.scanScreenMessage}>
                  لطفا بارکد را داخل کادر قرار دهید و نگه دارید.
                </Text>
              </View>
            </Modal>
          </>
        )}
      </View>
    </Layout>
  );
};

export default QRPayment;
