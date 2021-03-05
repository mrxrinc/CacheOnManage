import React from "react";
import { TouchableOpacity, View, StyleSheet } from "react-native";
import { FormattedText } from "components/format-text";
import Close from "components/icons/close.svg";
import { colors } from "constants/index";

const Header = (props: any) => {
  const { title, onClose } = props;
  return (
    <View style={styles.container}>
      <FormattedText fontFamily="Regular-FaNum" style={styles.title}>
        {title}
      </FormattedText>
      <TouchableOpacity style={styles.closeBtn} onPress={onClose}>
        <Close width={14} height={14} fill={colors.dark} />
      </TouchableOpacity>
    </View>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  title: {
    flex: 1,
    fontSize: 18,
    color: colors.eggplant,
    textAlign: "center",
  },
  closeBtn: {
    zIndex: 3,
    position: "absolute",
    right: 0,
    alignItems: "center",
    width: 24,
    height: 24,
    justifyContent: "center",
  },
});
