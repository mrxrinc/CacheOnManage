import React, { useEffect } from "react";
import { View, StyleSheet, Dimensions } from "react-native";
import { FormattedText } from "components/format-text";
import { useDispatch } from "react-redux";
import { useNavigation, NavigationProp } from "@react-navigation/core";
import { currentStepChanged, signUpStepChanged } from "redux/actions/User";
import Button from "components/button";
import { colors } from "constants/index";
import { StackParamList } from "navigation/splash-stack-navigator";
type Navigation = NavigationProp<StackParamList>;
const CheckInfo = () => {
  const navigation = useNavigation<Navigation>();
  const dispatch = useDispatch();
  const handleClick = () => {
    navigation.reset({ index: 0, routes: [{ name: "main" }] });
    dispatch(currentStepChanged(""));
  };
  useEffect(() => {
    dispatch(currentStepChanged(4));
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.box}>
        <FormattedText style={styles.title}>
          اطلاعات شما بررسی‌ خواهد شد.
        </FormattedText>
        <FormattedText style={styles.description}>
          نتیجه بررسی‌ طی‌ ۲۴ ساعت آینده از طریق پیامک و پوش نوتیفیکیشن به شما
          اطلاع داده خواهد شد،پس از آن میتوانید از خدمات برنامه بهره مند گردید.
        </FormattedText>
      </View>
      <View style={[styles.Button]}>
        <Button
          color={colors.buttonSubmitActive}
          title="تایید"
          onPress={() => handleClick()}
        />
      </View>
    </View>
  );
};

const { width, height } = Dimensions.get("window");
const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
    backgroundColor: "white",
    justifyContent: "flex-start",
    alignItems: "center",
  },
  box: {
    height: height * 0.17,
    width: width * 0.89,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "6 %",
  },
  title: {
    color: "#00015d",
    fontSize: 16,
  },
  description: {
    color: "#515c6f",
    fontSize: 16,
    textAlign: "center",
  },
  Button: {
    width: width * 0.89,
    height: 44,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
    marginTop: "15%",
  },
});
export default CheckInfo;
