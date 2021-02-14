import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import Close from "components/icons/close.svg";
import { colors } from "constants/index";
import { fontFamily, fontSize } from "global";

const KycHeader = (props: any) => {
  const { title, onClose } = props;

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Close fill={colors.eggplant} style={styles.closeIcon} />
      </TouchableOpacity>
      <Text style={styles.titleText}>{title}</Text>
    </View>
  );
};
export default KycHeader;

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    alignItems: "center",
    flexDirection: "row",
    height: 42,
  },
  closeBtn: {
    position: "absolute",
    left: 20,
    zIndex: 2,
  },
  closeIcon: {
    width: 20,
    height: 20,
  },
  titleText: {
    textAlign: "center",
    alignSelf: "center",
    flex: 1,
    fontFamily: fontFamily.yekanBold,
    fontSize: fontSize.large,
  },
});
