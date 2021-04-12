import React from "react";
import { View } from "react-native";
import { FormattedText } from "components/format-text";
import { formatNumber } from "utils";
import { colors } from "constants/index";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";
import Item from "./Item";

const cacheonthegoChart = ({ childInfo, theme }: any) => {
  const themes = theme.earning;
  const remaining = childInfo.doneTaskAmount + childInfo.acceptTaskAmount;
  const incomes = childInfo.incoms;
  const paidTaskAmount = childInfo.paiedTaskAmount;
  const paiedcacheonthego = childInfo.paiedcacheonthego;
  const sum = paiedcacheonthego + remaining + incomes + paidTaskAmount;

  const handleChartValueWidth = (val1: number, val2: number) => {
    const res = (val1 / val2) * 100;
    if (res === 0) return 1;
    return res;
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View style={styles.bigAmountContainer}>
          <FormattedText
            fontFamily="Bold-FaNum"
            style={{ fontSize: 28, color: colors.gray250 }}
          >
            {formatNumber(paiedcacheonthego + incomes + paidTaskAmount) || 0}
          </FormattedText>
          <FormattedText style={styles.rial} fontFamily="Regular">
            ریال
          </FormattedText>
        </View>

        <View style={styles.chartUi}>
          <View
            style={{
              backgroundColor: themes.chartBlue,
              width: handleChartValueWidth(paiedcacheonthego, sum) + "%",
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            }}
          />
          <View
            style={{
              backgroundColor: themes.chartGreen,
              width: handleChartValueWidth(paidTaskAmount, sum) + "%",
              borderTopRightRadius: remaining ? 0 : 15,
              borderBottomRightRadius: remaining ? 0 : 15,
            }}
          />
          <View
            style={{
              backgroundColor: themes.chartPurple,
              width: handleChartValueWidth(incomes, sum) + "%",
              borderTopRightRadius: remaining ? 0 : 15,
              borderBottomRightRadius: remaining ? 0 : 15,
            }}
          />
          <View
            style={{
              backgroundColor: themes.chartGray,
              width: handleChartValueWidth(remaining, sum) + "%",
              borderTopRightRadius: 15,
              borderBottomRightRadius: 15,
            }}
          />
        </View>

        <View style={styles.detailBox}>
          <Item
            bubbleColor={themes.chartBlue}
            title="پول توجیبی واریز شده"
            amount={paiedcacheonthego}
          />
          <Item
            bubbleColor={themes.chartGreen}
            title="درآمد حاصل از فعالیت‌ها"
            amount={paidTaskAmount}
          />
          <Item
            bubbleColor={themes.chartPurple}
            title="سایر واریزی‌ها"
            amount={incomes}
          />
          <Item
            bubbleColor={themes.chartGray}
            title="فعالیت‌های در انتظار تائید و واریز"
            amount={remaining}
          />
        </View>
      </View>
    </View>
  );
};

export default withTheme(cacheonthegoChart);
