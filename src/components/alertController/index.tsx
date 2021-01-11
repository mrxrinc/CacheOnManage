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
  backOpacity,
  centerText,
  mainLoading,
  rightTitle,
  rightColor,
  rightAction,
  leftTitle,
  leftColor,
  leftAction,
  middleAction,
  middleTitle,
  middleColor,
}: any) => {
  return (
    <Modal
      isVisible={showModal}
      onBackdropPress={() => setShowModal(false)}
      style={style.modal}
      backdropOpacity={backOpacity ?? 0.3}
    >
      <View style={style.modalContainer}>
        <View style={style.modalContent}>
          <FormattedText style={style.title} fontFamily="Regular-FaNum">
            {title}
          </FormattedText>
          <FormattedText
            style={[
              style.description,
              centerText && {
                textAlign: "center",
              },
            ]}
            fontFamily="Regular-FaNum"
          >
            {description}
          </FormattedText>
        </View>
        <View style={style.footer}>
          {middleTitle && (
            <Button
              style={[style.button, style.middleButton]}
              onPress={middleAction}
            >
              <FormattedText
                style={[
                  style.buttonTitle,
                  { color: middleColor ? middleColor : colors.title },
                ]}
              >
                {middleTitle}
              </FormattedText>
            </Button>
          )}
          {!middleTitle && (
            <>
              <Button style={style.button} onPress={rightAction}>
                <FormattedText
                  style={[
                    style.buttonTitle,
                    { color: rightColor ? rightColor : colors.title },
                  ]}
                >
                  {rightTitle}
                </FormattedText>
              </Button>

              <View style={style.footerMiddleBorder} />
              {!mainLoading ? (
                <Button style={style.button} onPress={leftAction}>
                  <FormattedText
                    style={[
                      style.buttonTitle,
                      { color: leftColor ? leftColor : colors.title },
                    ]}
                  >
                    {leftTitle}
                  </FormattedText>
                </Button>
              ) : (
                <ActivityIndicator style={style.button} />
              )}
            </>
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
    minHeight: 162,
    width: "100%",
    maxWidth: 270,
    backgroundColor: colors.white,
    borderRadius: 15,
    elevation: 15,
  },
  modalContent: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    color: colors.gray100,
    fontSize: 16,
    lineHeight: 18,
    textAlign: "center",
  },
  description: {
    color: colors.gray500,
    fontSize: 12,
    lineHeight: 22,
    marginTop: 5,
  },
  footer: {
    width: "100%",
    height: 44,
    borderTopWidth: 0.7,
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
  middleButton: {
    width: "100%",
  },
  footerMiddleBorder: {
    width: 0.7,
    backgroundColor: colors.gray600,
  },
  buttonTitle: {
    fontSize: 16,
    textAlign: "center",
    lineHeight: 22,
  },
});
