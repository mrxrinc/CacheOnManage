import React from "react";
import { View, StatusBar } from "react-native";
import Swiper from "react-native-swiper";
import { colors } from "constants/index";
import { signUpStepChanged, showTreeChanged } from "redux/actions/User";
import { useSelector, useDispatch } from "react-redux";
import Button from "components/button";
import Background from "components/background";
import Slide from "./components/slide";
import { useNavigation } from "@react-navigation/core";
import { RootState } from "../../../customType";
import styles from "./styles";
import ParentImage01 from "images/intro/intro-parent-01.png";
import ParentImage02 from "images/intro/intro-parent-02.png";
import ParentImage03 from "images/intro/intro-parent-03.png";
import ParentImage04 from "images/intro/intro-parent-04.png";
import ChildImage01 from "images/intro/intro-child-01.png";
import ChildImage02 from "images/intro/intro-child-02.png";
import ChildImage03 from "images/intro/intro-child-03.png";
import ChildImage04 from "images/intro/intro-child-04.png";

const PARENT_DATA = [
  {
    id: 1,
    title:
      "برنامه‌ای برای مدیریت مالی فرزندان ۹ تا ۱۵ سال شما با تکیه بر افزایش هوش مالی",
    image: ParentImage01,
  },
  {
    id: 2,
    title:
      "پرداخت اتوماتیک پول توجیبی، واگذاری مسئولیت به فرزندان و کنترل روند انجام آنها",
    image: ParentImage02,
  },
  {
    id: 3,
    title: "آموزش پس انداز به فرزندان از سنین نوجوانی",
    image: ParentImage03,
    description: "سارا به هدف “خرید کفش” رسید.",
  },
  {
    id: 4,
    title:
      "تخصیص کارت بانکی‌ به فرزندان، تعیین سقف خرید و اطلاع از هر تراکنش انجام شده توسط فرزند",
    image: ParentImage04,
    description:
      "سارا ۱،۳۴۰،۰۰۰ ریال از شهر کتاب خرید کرد. از سقف خرید او ۸،۰۰۰،۰۰۰ ریال باقی‌ مانده است.",
  },
];

const CHILD_DATA = [
  {
    id: 1,
    title: "با مانی درآمد داشته باش، پس‌انداز کن و مسئولانه خرج کن.",
    image: ChildImage01,
  },
  {
    id: 2,
    title: "برای خودت هدف تعیین کن و برای داشتنش پس‌انداز کن.",
    image: ChildImage02,
  },
  {
    id: 3,
    title:
      "میتونی‌ کارت بانکی‌ داشته باشی‌، رمزش رو عوض کنی‌، مسدودش کنی‌ و تراکنش‌هات رو ببینی‌.",
    image: ChildImage03,
  },
  {
    id: 4,
    title: "مسولیت‌هات رو انجام بده و پول به جیب بزن.",
    image: ChildImage04,
  },
];

export default () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);
  return (
    <Background>
      <>
        <StatusBar backgroundColor={"transparent"} animated translucent hidden={false} />
        <View style={styles.container}>
          <Swiper
            showsButtons={false}
            paginationStyle={styles.paginationStyle}
            loop={false}
            style={styles.swiperStyle}
          >
            {isChild
              ? CHILD_DATA.map((slide) => <Slide key={slide.id} data={slide} />)
              : PARENT_DATA.map((slide) => (
                  <Slide key={slide.id} data={slide} />
                ))}
          </Swiper>

          <View style={styles.ButtonsContainer}>
            <Button
              title="ورود"
              onPress={() => {
                dispatch(signUpStepChanged("signIn"));
                navigation.navigate("login");
              }}
              color={colors.buttonOpenActive}
              style={{
                width: isChild ? "98%" : "48.5%",
              }}
            />

            {!isChild && (
              <Button
                title="ثبت نام"
                onPress={() => {
                  dispatch(showTreeChanged(true));
                  dispatch(signUpStepChanged("otp"));
                  navigation.navigate("login");
                }}
                color={colors.buttonOpenActive}
                style={styles.button}
              />
            )}
          </View>
        </View>
      </>
    </Background>
  );
};
