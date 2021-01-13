import React from "react";
import { View, StyleSheet } from "react-native";
import { FormattedText } from "components/format-text";
import { formatNumber } from "utils";
import { width, height, colors } from "constants/index";

let allowanceForChart: any = null;
const AllowanceChart = ({ childInfo }: any) => {
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
            {"  "}
            ریال
          </FormattedText>
        </View>

        <View style={styles.chartUi}>
          <View
            style={{
              backgroundColor: colors.buttonOpenActive,
              width: handleChartValueWidth(allowanceForChart, sum) + "%",
              borderTopLeftRadius: 15,
              borderBottomLeftRadius: 15,
            }}
          />
          <View
            style={{
              backgroundColor: colors.buttonSubmitActive,
              width: handleChartValueWidth(paidTaskAmount, sum) + "%",
              borderTopRightRadius: remaining ? 0 : 15,
              borderBottomRightRadius: remaining ? 0 : 15,
            }}
          />
          <View
            style={{
              backgroundColor: colors.placeholder,
              width: handleChartValueWidth(incomes, sum) + "%",
              borderTopRightRadius: remaining ? 0 : 15,
              borderBottomRightRadius: remaining ? 0 : 15,
            }}
          />
          <View
            style={{
              backgroundColor: colors.gray900,
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
                    backgroundColor: colors.buttonOpenActive,
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
                    backgroundColor: colors.buttonSubmitActive,
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
                    backgroundColor: colors.placeholder,
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
                    backgroundColor: "#e8e8e8",
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

const styles = StyleSheet.create({
  container: {
    height: height * 0.35,
    justifyContent: "space-between",
    alignItems: "center",
    width: width,
    backgroundColor: "white",
    marginTop: 10,
  },
  content: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "95%",
  },
  bigAmountContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  chartUi: {
    width: width * 0.89,
    height: 12,
    borderRadius: 150,
    overflow: "hidden",
    flexDirection: "row",
    backgroundColor: colors.gray800,
    borderWidth: 0.5,
    borderColor: colors.gray700,
  },
  detailBox: {
    width: width * 0.89,
    flexDirection: "column",
    alignItems: "flex-start",
  },
  detailContent: {
    width: "100%",
    paddingVertical: 2,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  detailTextBox: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  detailText: {
    fontSize: 12,
    padding: 3,
    color: colors.gray250,
  },
  circleVector: {
    width: 16,
    height: 16,
    borderRadius: 30,
  },
  detailAmountText: {
    color: colors.gray550,
    fontSize: 14,
  },
});
export default AllowanceChart;
