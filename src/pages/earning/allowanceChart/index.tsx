import React from "react";
import { View } from "react-native";
import { FormattedText } from "components/format-text";
import { formatNumber } from "utils";
import { colors } from "constants/index";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";

let allowanceForChart: any = null;
const AllowanceChart = ({ childInfo, theme }: any) => {
  const themes = theme.earning;
  const allowanceAmount = childInfo.allowanceAmount;
  allowanceForChart = allowanceForChart ?? allowanceAmount;
  const remaining = childInfo.doneTaskAmount + childInfo.acceptTaskAmount;
  const incomes = childInfo.incoms;
  const paidTaskAmount = childInfo.paiedTaskAmount;
  const sum = allowanceForChart + remaining + incomes + paidTaskAmount;

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
            {formatNumber(allowanceForChart + incomes + paidTaskAmount) || 0}
          </FormattedText>
          <FormattedText style={{ fontSize: 15 }} fontFamily="Regular">
            ریال
          </FormattedText>
        </View>

        <View style={styles.chartUi}>
          <View
            style={{
              backgroundColor: themes.chartBlue,
              width: handleChartValueWidth(allowanceForChart, sum) + "%",
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
          <View style={styles.detailContent}>
            <View style={styles.detailTextBox}>
              <View
                style={[
                  styles.circleVector,
                  {
                    backgroundColor: themes.chartBlue,
                  },
                ]}
              />
              <FormattedText style={styles.detailText}>
                پول توجیبی
              </FormattedText>
            </View>
            <FormattedText
              fontFamily="Regular-FaNum"
              style={styles.detailAmountText}
            >
              {formatNumber(allowanceForChart) || 0} ریال
            </FormattedText>
          </View>

          <View style={styles.detailContent}>
            <View style={styles.detailTextBox}>
              <View
                style={[
                  styles.circleVector,
                  {
                    backgroundColor: themes.chartGreen,
                  },
                ]}
              />
              <FormattedText style={styles.detailText}>
                درآمد حاصل از فعالیت‌ها
              </FormattedText>
            </View>
            <FormattedText
              fontFamily="Regular-FaNum"
              style={styles.detailAmountText}
            >
              {formatNumber(paidTaskAmount) || 0} ریال
            </FormattedText>
          </View>
          <View style={styles.detailContent}>
            <View style={styles.detailTextBox}>
              <View
                style={[
                  styles.circleVector,
                  {
                    backgroundColor: themes.chartPurple,
                  },
                ]}
              />
              <FormattedText style={styles.detailText}>
                سایر واریزی‌ها
              </FormattedText>
            </View>
            <FormattedText
              fontFamily="Regular-FaNum"
              style={styles.detailAmountText}
            >
              {formatNumber(incomes) || 0} ریال
            </FormattedText>
          </View>

          <View style={styles.detailContent}>
            <View style={styles.detailTextBox}>
              <View
                style={[
                  styles.circleVector,
                  {
                    backgroundColor: themes.chartGray,
                  },
                ]}
              />
              <FormattedText style={styles.detailText}>
                فعالیت‌های در انتظار تائید و واریز
              </FormattedText>
            </View>
            <FormattedText
              fontFamily="Regular-FaNum"
              style={styles.detailAmountText}
            >
              {formatNumber(remaining) || 0} ریال
            </FormattedText>
          </View>
        </View>
      </View>
    </View>
  );
};

export default withTheme(AllowanceChart);
