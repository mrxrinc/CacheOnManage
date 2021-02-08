import React from "react";
import { View, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import Button from "components/button";
import { colors, iosBoxShadow } from "constants/index";
import Fingerprint from "images/signIn/fingerprint.svg";

const FingerModal = (props: any) => {
  const {
    showBiometricModal,
    theme,
    handleSetBiometricsLogin,
    deactive,
  } = props;
  return (
    <Modal
      isVisible={showBiometricModal}
      onBackdropPress={deactive}
      onBackButtonPress={deactive}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <FormattedText style={styles.modalTitle} id="login.fingerprint" />
        <View style={styles.modalIconWrapper}>
          <Fingerprint width={55} height={70} fill={theme.svg.fingerprint} />
        </View>
        <FormattedText
          style={styles.modalDescription}
          id="login.fingerproint-quesion"
        />
        <Button
          title="بله"
          onPress={handleSetBiometricsLogin}
          color={colors.links}
          outline
          style={styles.modalCancelButton}
        />
      </View>
    </Modal>
  );
};
export default FingerModal;
const styles = StyleSheet.create({
  modalDescription: {
    textAlign: "center",
    color: colors.title,
    fontSize: 14,
    lineHeight: 23,
    width: "60%",
  },
  modalCancelButton: {
    width: 170,
    height: 44,
    marginTop: 30,
  },
  modal: {
    margin: 0,
  },
  modalContainer: {
    minHeight: 250,
    width: "100%",
    backgroundColor: colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    alignItems: "center",
    padding: 15,
    paddingTop: 10,
    paddingBottom: 30,
    position: "absolute",
    bottom: 0,
    elevation: 15,
    ...iosBoxShadow,
  },
  modalTitle: {
    fontSize: 14,
  },
  modalIconWrapper: {
    paddingTop: 35,
    paddingBottom: 20,
  },
});
