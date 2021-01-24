import React from "react";
// Ui Frameworks
import { View } from "react-native";
// Common Components
import { FormattedText } from "components/format-text";
//Helpers & Utils
import { formatNumber } from "utils";
// Styles
import styles from "./styles";

interface SavingInfo {
  totalAmount: string;
  weeklySavings: string;
}
interface Props {
  data: SavingInfo;
}
const SavingInfo: React.FC<Props> = (props) => {
  return (
    <View style={styles.savingInfoBox}>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "center",
        }}
      >
        <FormattedText fontFamily="Bold-FaNum" style={styles.totalAmount}>
          {formatNumber(props.data.totalAmount)}
        </FormattedText>
        <FormattedText style={[styles.unit, { marginTop: "1%" }]}>
          ریال
        </FormattedText>
      </View>
      <FormattedText fontFamily="Regular-FaNum" style={styles.weeklySavings}>
        پس انداز هفتگی :{formatNumber(props.data.weeklySavings)}
        ریال
      </FormattedText>
    </View>
  );
};

export default SavingInfo;
