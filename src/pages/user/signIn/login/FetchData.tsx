import { FormattedText } from "components/format-text";
import React, { useEffect, useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import LottieView from "lottie-react-native";
import LoginLoading from "images/signIn/login-loading.json";
import LoginLoadingError from "images/signIn/login-loading-error.json";
import { useNavigation } from "@react-navigation/core";
import { colors } from "constants/index";
import { initUser } from "utils/api";
import Button from "components/button";

const FetchData = (props: any) => {
  const navigation = useNavigation();
  const [isError, setIsError] = useState(false);
  const { token } = props.route.params;

  const getData = () => {
    setIsError(false);
    initUser(token, {})
      .then(() => {
        navigation.navigate("app");
        setIsError(false);
      })
      .catch(() => {
        setIsError(true);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.contentContainer}
      style={styles.container}
    >
      <View style={styles.content}>
        {isError ? (
          <LottieView
            style={styles.loading}
            source={LoginLoadingError}
            autoPlay
            loop={false}
            duration={4000}
          />
        ) : (
          <LottieView
            style={styles.loading}
            source={LoginLoading}
            autoPlay
            loop
            duration={4000}
          />
        )}

        <FormattedText style={styles.dsc} fontFamily="Medium">
          {isError
            ? "متاسفانه دریافت اطلاعات شما از بلو بانک با خطا مواجه شد"
            : "ما در حال دریافت اطلاعات حساب شما از بلو بانک هستیم"}
        </FormattedText>
        {isError ? (
          <Button
            color={"#f45757"}
            title={"تلاش مجدد"}
            onPress={getData}
            style={styles.btn}
          />
        ) : (
          <FormattedText style={styles.hint}>لطفا شکیبا باشید</FormattedText>
        )}
      </View>
    </ScrollView>
  );
};
export default FetchData;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: colors.blujrBtnOpenActive,
  },
  contentContainer: {
    flexGrow: 1,
    justifyContent: "center",
  },

  content: {
    alignItems: "center",
    width: "68%",
    alignSelf: "center",
  },
  loading: { width: 120, height: 120 },
  dsc: {
    fontSize: 20,
    textAlign: "center",
    lineHeight: 30,
    marginTop: 20,
    color: colors.white,
  },
  hint: {
    color: colors.white,
    fontSize: 16,
    marginTop: 10,
  },
  btn: {
    width: "75%",
    marginTop: 20,
  },
});
