import React from "react";
import { View, TouchableOpacity as Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
import { FormattedText } from "components/format-text";
import CloseIcon from "components/icons/close.svg";
import { colors } from "constants/index";

export default ({ showModal, setShowModal, title, children }: any) => {
  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={[colors.gradientRight, colors.gradientLeft]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={styles.modalHead}
        >
          <View style={styles.modalTitleWrapper}>
            <FormattedText style={styles.modalTitle}>{title}</FormattedText>
          </View>
          <Button
            style={styles.modalCloseWrapper}
            onPress={() => setShowModal(false)}
          >
            <CloseIcon width={14} height={14} fill={colors.white} />
          </Button>
        </LinearGradient>

        <View style={styles.modalContent}>{children}</View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modal: {
    margin: 0,
  },
  modalContainer: {
    height: "100%",
    width: "100%",
  },
  modalHead: {
    width: "100%",
    height: 73,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-end",
  },
  modalCloseWrapper: {
    width: 48,
    height: 48,
    alignItems: "center",
    justifyContent: "center",
    position: "absolute",
    left: 0,
  },
  modalTitleWrapper: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: 25,
    height: 48,
  },
  modalTitle: {
    color: colors.white,
    fontSize: 16,
  },
  modalContent: {
    flex: 1,
    padding: 5,
    paddingTop: 0,
    backgroundColor: colors.white,
  },
});
