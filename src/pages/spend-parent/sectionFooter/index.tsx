import React from "react";
import { View } from "react-native";
import { FormattedText } from "components/format-text";
import styles from "./styles";

const SectionFooter = (props: any) => {
  const { data } = props.data;
  const isEmpty = data.length === 0 ? true : false;
  return isEmpty ? (
    <FormattedText style={styles.empty}>
      تراکنشی برای نمایش وجود ندارد!
    </FormattedText>
  ) : (
    <View style={styles.footer} />
  );
};
export default SectionFooter;
