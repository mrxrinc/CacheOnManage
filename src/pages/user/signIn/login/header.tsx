import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";
import Support from "components/icons/support.svg";
import { width } from "constants/index";

const Header = (props: any) => {
  const { onPress, theme } = props;
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <Support style={styles.icon} fill={theme.support} />
    </TouchableOpacity>
  );
};
export default Header;

const styles = StyleSheet.create({
  container: {
    marginHorizontal: width * 0.05,
    alignSelf: "flex-start",
  },
  icon: {
    marginTop: 5,
    width: 24,
    height: 24,
  },
});
