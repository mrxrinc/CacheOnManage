import React from "react";
import { View, TouchableOpacity as Button, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import LinearGradient from "react-native-linear-gradient";
import { FormattedText } from "components/format-text";
import CloseIcon from "components/icons/close.svg";
import { colors, IOS } from "constants/index";
import { withTheme } from "themeCore/themeProvider";

const ActionModalFullScreen = ({
  showModal,
  setShowModal,
  title,
  children,
  theme,
}: any) => {
  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      style={styles.modal}
    >
      <View style={styles.modalContainer}>
        <LinearGradient
          colors={[theme.BlueGradient_Right, theme.BlueGradient_Left]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={[styles.modalHead, { height: IOS ? 73 : 50 }]}
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

export default withTheme(ActionModalFullScreen);
