import React from "react";
import { View, TouchableOpacity as Button, StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import CloseIcon from "components/icons/close.svg";
import { colors } from "constants/index";
import { withTheme } from "themeCore/themeProvider";
import styles from "components/button/styles";

interface Props {
  showModal: boolean;
  setShowModal: () => void;
  title?: string;
  titleAlignItems?: any;
  children?: React.ReactNode;
  backdropOpacity?: number;
  showHeader?: boolean;
  theme?: any;
}
const ActionModalBottom: React.FC<Props> = ({
  showModal,
  setShowModal,
  title,
  titleAlignItems,
  children,
  backdropOpacity,
  showHeader,
  theme,
}) => {
  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={setShowModal}
      style={style.modal}
      avoidKeyboard
      backdropOpacity={backdropOpacity}
      useNativeDriver
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={style.scrollView}
      >
        <View style={style.modalContainer}>
          {showHeader && (
            <View style={style.modalHead}>
              <View
                style={[
                  style.modalTitleWrapper,
                  { alignItems: titleAlignItems },
                ]}
              >
                <FormattedText
                  style={[style.modalTitle, { color: theme.titleColor }]}
                >
                  {title}
                </FormattedText>
              </View>
              <Button style={style.modalCloseWrapper} onPress={setShowModal}>
                <CloseIcon width={14} height={14} fill={colors.gray400} />
              </Button>
            </View>
          )}

          <View style={style.modalContent}>{children}</View>
        </View>
      </ScrollView>
    </Modal>
  );
};

export default withTheme(ActionModalBottom);

ActionModalBottom.defaultProps = {
  showHeader: true,
};

const style = StyleSheet.create({
  modal: {
    margin: 0,
  },
  scrollView: { justifyContent: "flex-end", flexGrow: 1 },
  modalContainer: {
    minHeight: 200,
    width: "100%",
    backgroundColor: colors.white,
    borderTopRightRadius: 15,
    borderTopLeftRadius: 15,
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
    fontSize: 16,
  },
  modalContent: {
    padding: 5,
    paddingTop: 0,
  },
});
