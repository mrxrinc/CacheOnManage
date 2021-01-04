import React from "react";
import { View, TouchableOpacity as Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import CloseIcon from "components/icons/close.svg";
import { colors } from "constants/index";

export default ({ showModal, setShowModal, title, children }: any) => {
  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      style={style.modal}
    >
      <View style={style.modalContainer}>
        <View style={style.modalHead}>
          <View style={style.modalTitleWrapper}>
            <FormattedText style={style.modalTitle} fontFamily="Bold">
              {title}
            </FormattedText>
          </View>
          <Button
            style={style.modalCloseWrapper}
            onPress={() => setShowModal(false)}
          >
            <CloseIcon width={14} height={14} fill={colors.gray300} />
          </Button>
        </View>

        <View style={style.modalContent}>{children}</View>
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
    minHeight: "20%",
    width: "90%",
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 15,
  },
  modalHead: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  modalCloseWrapper: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    right: 0,
  },
  modalTitleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    height: 48,
  },
  modalTitle: {
    color: colors.black,
    fontSize: 16,
  },
  modalContent: {
    padding: 0,
    paddingTop: 0,
  },
});
