import React, { FC, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { FormattedText } from "components/format-text";
import { colors } from "constants/index";
import styles from "./styles";
import { formatNumber } from "utils";

type Props = {
  id: number;
  title: string;
  period: string;
  amount: number;
  selected?: boolean;
  handleSelection: (id: number) => void;
};

const PackageItem = ({
  id,
  title,
  period,
  amount,
  selected,
  handleSelection,
}: Props) => {
  return (
    <TouchableOpacity
      key={id}
      activeOpacity={0.8}
      onPress={() => handleSelection(id)}
      style={[
        styles.container,
        {
          borderWidth: selected ? 2 : 0,
        },
      ]}
    >
      <FormattedText style={styles.title}>{title}</FormattedText>
      <View style={styles.periodPriceWrapper}>
        <FormattedText style={styles.period}>{period}</FormattedText>
        <FormattedText style={styles.amount} fontFamily="Bold-FaNum">
          {formatNumber(`${amount}`)} ریال
        </FormattedText>
      </View>
    </TouchableOpacity>
  );
};

export default PackageItem;
