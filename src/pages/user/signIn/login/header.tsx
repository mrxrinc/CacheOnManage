import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Platform,
} from "react-native";
import Support from "components/icons/support.svg";
import { colors, width } from "constants/index";

const Header = (props: any) => {
  return (
    <TouchableOpacity style={styles.container} onPress={props.onPress}>
      <Support style={styles.icon} fill={colors.dark} />
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
