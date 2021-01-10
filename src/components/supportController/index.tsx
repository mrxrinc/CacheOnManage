import React from "react";
import { View, TouchableOpacity, StyleSheet, Linking } from "react-native";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import { colors, IOS } from "constants/index";

export default ({
  showModal,
  setShowModal,
  title,
  phoneNumber,
  backOpacity,
}: any) => {
  const handleCall = () => {
    Linking.openURL(`tel:${phoneNumber}`);
  };
  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      style={style.modal}
      backdropOpacity={backOpacity}
    >
      <View style={style.modalContainer}>
        <View style={style.modalContent}>
          <FormattedText style={style.title}>{title}</FormattedText>
          <FormattedText style={style.description}>
            <FormattedText>تماس با </FormattedText>
            <FormattedText style={style.phoneNumber} fontFamily="Regular-FaNum">
              {phoneNumber}
            </FormattedText>
          </FormattedText>
        </View>
        <View style={style.footer}>
          <TouchableOpacity style={style.button} onPress={handleCall}>
            <FormattedText style={[style.buttonTitle]}>تماس</FormattedText>
          </TouchableOpacity>
          <TouchableOpacity
            style={style.button}
            onPress={() => setShowModal(false)}
          >
            <FormattedText style={[style.buttonTitle]}>انصراف</FormattedText>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const style = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    minHeight: 170,
    width: "90%",
    maxWidth: 300,
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 15,
  },
  modalContent: {
    width: "100%",
    minHeight: 110,
    justifyContent: "flex-start",
    alignItems: "center",
  },
  title: {
    color: colors.gray200,
    fontSize: 20,
    marginTop: 15,
  },
  description: {
    color: colors.gray400,
    fontSize: 14,
    marginTop: 5,
  },
  phoneNumber: {
    textAlign: "left",
    direction: "ltr",
  },
  footer: {
    width: "100%",
  },
  button: {
    width: "100%",
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderTopWidth: 1,
    borderTopColor: colors.gray700,
  },
  buttonTitle: {
    fontSize: 16,
    textAlign: "center",
    color: colors.title,
    lineHeight: IOS ? 15 : 20,
  },
});
