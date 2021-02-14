import React from "react";
import { View, StyleSheet, TouchableOpacity } from "react-native";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import Button from "components/button";
import { colors, iosBoxShadow } from "constants/index";
import Fingerprint from "components/icons/fingerprint.svg";
import FaceIDIcon from "components/icons/face-id.svg";
import CloseIcon from "components/icons/close.svg";

const BioModal = (props: any) => {
  const {
    showBiometricModal,
    handleSetBiometricsLogin,
    deactive,
    isFace,
  } = props;
  return (
    <Modal
      isVisible={showBiometricModal}
      onBackdropPress={deactive}
      onBackButtonPress={deactive}
      useNativeDriver
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <TouchableOpacity style={styles.close} onPress={deactive}>
          <CloseIcon width={14} height={14} fill={colors.gray400} />
        </TouchableOpacity>

        <FormattedText
          style={styles.modalTitle}
          id={isFace ? "login.FaceId" : "login.fingerprint"}
        />
        <View style={styles.modalIconWrapper}>
          {isFace ? (
            <FaceIDIcon width={55} height={70} fill={colors.title} />
          ) : (
            <Fingerprint width={55} height={70} fill={colors.title} />
          )}
        </View>
        <FormattedText
          style={styles.modalDescription}
          id={isFace ? "login.FaceId-quesion" : "login.fingerproint-quesion"}
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
export default BioModal;
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
  close: {
    alignSelf: "flex-start",
    marginLeft: 5,
    marginTop: 5,
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
    fontSize: 16,
    color: colors.title,
  },
  modalIconWrapper: {
    paddingTop: 35,
    paddingBottom: 20,
  },
});
