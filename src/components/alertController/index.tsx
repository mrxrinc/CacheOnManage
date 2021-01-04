import React from "react";
import {
  View,
  TouchableOpacity as Button,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import Modal from "react-native-modal";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";

export default ({
  showModal,
  setShowModal,
  title,
  description,
  handleMainAction,
  handleNewAction,
  backOpacity,
  acceptButton,
  isNewAction,
  centerText,
  mainLoading,
}: any) => {
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
          <FormattedText
            style={[
              style.description,
              centerText && {
                textAlign: "center",
              },
            ]}
          >
            {description}
          </FormattedText>
        </View>
        <View style={style.footer}>
          <Button style={style.button} onPress={handleMainAction}>
            <FormattedText
              style={[
                style.buttonTitle,
                { color: isNewAction ? colors.accent : colors.red },
              ]}
            >
              {isNewAction ? isNewAction : "بله"}
            </FormattedText>
          </Button>

          <View style={style.footerMiddleBorder} />
          {!mainLoading ? (
            <Button
              style={style.button}
              onPress={() =>
                isNewAction ? handleNewAction() : setShowModal(false)
              }
            >
              <FormattedText
                style={[
                  style.buttonTitle,
                  { color: acceptButton ? colors.red : colors.accent },
                ]}
              >
                {acceptButton ? acceptButton : "انصراف"}
              </FormattedText>
            </Button>
          ) : (
            <ActivityIndicator style={style.button} />
          )}
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
    minHeight: 190,
    width: "100%",
    maxWidth: 300,
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 15,
  },
  modalContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  title: {
    color: colors.gray200,
    fontSize: 20,
    marginTop: 10,
    textAlign: "center",
  },
  description: {
    color: colors.gray500,
    fontSize: 14,
    lineHeight: 23,
    marginTop: 5,
    marginBottom: 20,
  },
  footer: {
    width: "100%",
    height: 44,
    borderTopWidth: 1,
    borderTopColor: colors.gray600,
    position: "absolute",
    bottom: 0,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  footerMiddleBorder: {
    width: 1,
    backgroundColor: colors.gray600,
  },
  buttonTitle: {
    fontSize: 18,
    textAlign: "center",
  },
});
