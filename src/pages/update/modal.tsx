import { FormattedText } from "components/format-text";
import React, { useState } from "react";
import { View, Text, StyleSheet, BackHandler, Linking } from "react-native";
import Modal from "react-native-modal";
import UnequalTwinButtons from "components/unequalTwinButtons";
import RNRestart from "react-native-restart"; // Import package from node modules

const ModalUpdate = (props: any) => {
  const [isOpen, setIsOpen] = useState(true);
  const { isCodePush, data } = props;
  return (
    <Modal
      onBackdropPress={() => setIsOpen(false)}
      onBackButtonPress={() => setIsOpen(false)}
      useNativeDriver
      isVisible={isOpen}
    >
      <View style={styles.content}>
        <FormattedText id="appUpdate.title" style={styles.title} />
        <FormattedText fontFamily="Regular-FaNum" style={styles.version}>
          نسخه {data?.comingVersion}
        </FormattedText>
        <FormattedText
          id={isCodePush ? "appUpdate.dsc.codePush" : "appUpdate.dsc.light"}
          style={styles.dsc}
        />
        {data?.updateDetails?.map((item: any, index: any) => {
          return (
            <View key={index.toString()} style={styles.item}>
              <View style={styles.itemPoint} />
              <FormattedText style={styles.itemText}>{item}</FormattedText>
            </View>
          );
        })}
        <UnequalTwinButtons
          mainText={isCodePush ? "خروج از برنامه" : "دانلود جدیدترین نسخه"}
          mainColor={"#307fe2"}
          secondaryText="بعدا"
          secondaryColor={"#f5f7fa"}
          style={styles.buttons}
          titleSecondaryStyle={styles.titleSecondary}
          secondaryOnPress={() => setIsOpen(false)}
          mainOnPress={() =>
            isCodePush
              ? RNRestart.Restart()
              : Linking.openURL(data.downloadLink)
          }
        />
      </View>
    </Modal>
  );
};
export default ModalUpdate;
const styles = StyleSheet.create({
  content: {
    backgroundColor: "#ffffff",
    borderRadius: 15,
    paddingHorizontal: 16,
    paddingBottom: 22,
    paddingTop: 16,
  },
  title: {
    color: "#110820",
    fontSize: 18,
    fontWeight: "500",
    lineHeight: 19,
    letterSpacing: 0,
    textAlign: "center",
  },
  version: {
    color: "#707070",
    textAlign: "center",
    fontSize: 14,
    fontWeight: "normal",
    lineHeight: 15,
    letterSpacing: 0,
    marginTop: 4,
  },
  dsc: {
    color: "#110820",
    fontSize: 16,
    fontWeight: "normal",
    lineHeight: 24,
    letterSpacing: 0,
    textAlign: "left",
    marginTop: 25,
    marginBottom: 20,
  },
  item: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    marginLeft: 8,
  },
  itemText: {
    color: "#110820",
    fontSize: 16,
    fontWeight: "normal",
    letterSpacing: 0,
    textAlign: "left",
  },
  itemPoint: {
    backgroundColor: "#00bfb2",
    width: 6,
    height: 6,
    borderRadius: 10,
    marginBottom: -5,
    marginRight: 4,
  },
  buttons: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: -16,
    marginTop: 15,
  },
  titleSecondary: {
    color: "#307fe2",
  },
});
