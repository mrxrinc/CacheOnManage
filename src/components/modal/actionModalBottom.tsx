import React from "react";
import { View, TouchableOpacity as Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import CloseIcon from "components/icons/close.svg";
import { colors } from "constants/index";

export default ({
  showModal,
  setShowModal,
  title,
  titleAlignItems,
  children,
}: any) => {
  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={setShowModal}
      style={style.modal}
      avoidKeyboard
      backdropColor="transparent"
    >
      <View style={style.modalContainer}>
        <View style={style.modalHead}>
          <View
            style={[style.modalTitleWrapper, { alignItems: titleAlignItems }]}
          >
            <FormattedText style={style.modalTitle}>{title}</FormattedText>
          </View>
          <Button style={style.modalCloseWrapper} onPress={setShowModal}>
            <CloseIcon width={14} height={14} fill={colors.gray400} />
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
  },
  modalContainer: {
    minHeight: 200,
    width: "100%",
    backgroundColor: colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
    position: "absolute",
    bottom: 0,
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
    width: "100%",
    paddingHorizontal: 25,
    height: 48,
  },
  modalTitle: {
    color: colors.title,
    fontSize: 16,
  },
  modalContent: {
    padding: 5,
    paddingTop: 0,
  },
});
