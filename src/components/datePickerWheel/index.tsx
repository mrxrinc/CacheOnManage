import React, { useState, useEffect } from "react";
import { View, SafeAreaView, StyleSheet } from "react-native";
import { WheelPicker } from "react-native-wheel-picker-android";
import moment from "moment-jalaali";
import { colors } from "constants/index";
const monthNames = [
  "فروردین",
  "اردیبهشت",
  "خرداد",
  "تیر",
  "مرداد",
  "شهریور",
  "مهر",
  "ابان",
  "آذر",
  "دی",
  "بهمن",
  "اسفند",
];

const DatePickerWheel = (props: any) => {
  const limited = props?.limited;
  const currentYear = moment().jYear();
  //day of birthdate
  const days = Array.from({ length: 31 }, (_, i) => i + 1);
  const daystring = days.map(String);
  //year of birthdate
  const years = Array.from(
    { length: limited ? 7 : 100 },
    (_, i) => i + (limited ? currentYear - 15 : 1300)
  );
  const yearString = years.map(String);
  const [selectedDay, setSelectedDay] = useState(days.length / 2);
  const [selectedMonth, setSelectedMonth] = useState(monthNames.length / 2);
  const [selectedYear, setSelectedYear] = useState(years.length / 2);

  useEffect(() => {
    props.value(
      yearString[selectedYear] +
        "/" +
        (selectedMonth < 9 ? "0" + (selectedMonth + 1) : selectedMonth + 1) +
        "/" +
        (selectedDay < 10
          ? "0" + daystring[selectedDay]
          : daystring[selectedDay])
    );
  }, [selectedDay, selectedMonth, selectedYear]);

  return (
    <SafeAreaView>
      <View style={styles.dateBox}>
        <View style={styles.column}>
          <WheelPicker
            selectedItem={selectedDay}
            data={daystring}
            onItemSelected={(index) => setSelectedDay(index)}
            itemTextColor={colors.gray600}
            selectedItemTextFontFamily="IRANSansMobileFaNum"
            itemTextFontFamily="IRANSansMobileFaNum"
            selectedItemTextColor={colors.title}
            selectedItemTextSize={22}
            hideIndicator={true}
            {...props}
          />
        </View>
        <View style={styles.column}>
          <WheelPicker
            selectedItem={selectedMonth}
            data={monthNames}
            onItemSelected={(index) => setSelectedMonth(index)}
            itemTextColor={colors.gray600}
            selectedItemTextFontFamily="IRANSansMobileFaNum"
            itemTextFontFamily="IRANSansMobileFaNum"
            selectedItemTextColor={colors.title}
            selectedItemTextSize={22}
            hideIndicator={true}
            {...props}
          />
        </View>
        <View style={styles.column}>
          <WheelPicker
            selectedItem={selectedYear}
            data={yearString}
            onItemSelected={(index) => setSelectedYear(index)}
            itemTextColor={colors.gray600}
            selectedItemTextFontFamily="IRANSansMobileFaNum"
            itemTextFontFamily="IRANSansMobileFaNum"
            selectedItemTextColor={colors.title}
            selectedItemTextSize={22}
            hideIndicator={true}
            {...props}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  dateBox: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
  },
  column: {
    width: "33.33333%",
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
export default DatePickerWheel;
