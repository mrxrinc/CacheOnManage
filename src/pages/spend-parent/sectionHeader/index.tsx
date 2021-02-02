import React from "react";
import { View } from "react-native";
import { FormattedText } from "components/format-text";
import styles from "./styles";

const SectionHeader = (props: any) => {
  const { title } = props.data;
  return (
    <View style={styles.invoiceHeader}>
      <FormattedText style={styles.invoiceTitle}>{title}</FormattedText>
    </View>
  );
};
export default SectionHeader;
