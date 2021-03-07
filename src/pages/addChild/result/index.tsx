import React from "react";
import { View, ScrollView } from "react-native";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import { colors } from "constants/index";
import style from "./style";
import Button from "components/button";
import { useNavigation } from "@react-navigation/core";

const resultKeys: any = {
  firstname: "نام",
  lastname: "نام خانوادگی",
  birthday: "تاریخ تولد",
  nationalId: "کد ملی",
  username: "نام کاربری",
  password: "رمز عبور",
  mobile: "شماره همراه",
  address: "آدرس",
};

export default (props: any) => {
  const navigation = useNavigation();
  const { params } = props.route;
  const result: any = [];
  for (const [key, value] of Object.entries(params)) {
    if (key !== "id") result.push({ key, value });
  }

  const renderRow = (item: any) => (
    <View style={style.rowWrapper} key={item.key}>
      <FormattedText style={style.keyText}>
        {resultKeys[item.key]}
      </FormattedText>
      <View style={style.midLine} />
      <View style={style.valueTextWrapper}>
        <FormattedText style={style.valueText} fontFamily="Regular-FaNum">
          {item.value}
        </FormattedText>
      </View>
    </View>
  );

  return (
    <Layout>
      <Header />
      <View style={style.container}>
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={style.contentWrapper}>
            <FormattedText style={style.title}>
              مشخصات فرزند شما به شرح زیر ثبت گردید:
            </FormattedText>

            {result.map(
              (item: any) =>
                item.key !== "username" &&
                item.key !== "password" &&
                item.key !== "mobile" &&
                item.key !== "address" &&
                renderRow(item)
            )}

            <FormattedText style={style.title}>
              حساب کاربری فرزند شما:
            </FormattedText>

            {result.map(
              (item: any) =>
                (item.key === "username" || item.key === "password") &&
                renderRow(item)
            )}

            <FormattedText style={style.description} fontFamily="Regular-FaNum">
              <FormattedText>
                کارت بانکی‌ فرزند شما حداکثر تا ۱۰ روز دیگر به آدرس{": "}
              </FormattedText>
              <FormattedText>{params?.address}</FormattedText>
              <FormattedText> ارسال خواهد شد.</FormattedText>
            </FormattedText>

            <View style={style.buttonsWrapper}>
              <Button
                color={colors.buttonOpenActive}
                title="افزودن فرزند دیگر"
                onPress={() => {
                  props.navigation.reset({
                    index: 0,
                    routes: [{ name: "addChild" }],
                  });
                }}
                style={{ marginBottom: 10 }}
              />
              <Button
                color={colors.buttonSubmitActive}
                title="بازگشت به صفحه اصلی‌"
                onPress={() => {
                  navigation.navigate("homeTab");
                }}
              />
            </View>
          </View>
        </ScrollView>
      </View>
    </Layout>
  );
};
