import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import BackIcon from "components/icons/back.svg";
import { FormattedText } from "components/format-text";
import { useNavigation } from "@react-navigation/core";

const Header = (props: any) => {
  const navigation = useNavigation();
  const { title } = props;
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.icon}>
        <BackIcon color="black" />
      </TouchableOpacity>
      <FormattedText style={styles.title}>{title}</FormattedText>
    </View>
  );
};
export default Header;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "white",
    height: 42,
  },
  title: {
    flex: 1,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  icon: {
    position: "absolute",
    left: 20,
  },
});
