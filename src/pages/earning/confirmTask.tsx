import React, { useState } from "react";
import { View, StyleSheet, ScrollView, Image } from "react-native";
import StarRating from "react-native-star-rating";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import AlertController from "components/alertController";
import { useNavigation } from "@react-navigation/core";
import { confirmTask } from "utils/api";
import { useDispatch, useSelector } from "react-redux";
import Button from "components/button";
import { colors } from "constants/index";
import { RootState } from "../../../customType";
import { formatNumber } from "utils";
import { getEarningData } from "redux/actions/Earning";

const confirmTaskPage = ({ route }: any) => {
  const dispatch = useDispatch();
  const { item } = route.params;
  console.log({ item });
  const navigation = useNavigation();
  const token = useSelector<RootState, any>((state) => state.user.token);
  const [confirmationModal, setConfirmationModal] = useState(false);
  const [rejectionModal, setRejectionModal] = useState(false);
  const [taskName, setTaskName] = useState("");
  const [amount, setAmount] = useState("");
  const [stars, setStars] = useState(0);
  const [status, setStatus] = useState<"ACCEPT" | "FAILED">("ACCEPT");

  const handleConfirmation = (value: "ACCEPT" | "FAILED") => {
    setStatus(value);
    if (value === "ACCEPT") setConfirmationModal(true);
    if (value === "FAILED") setRejectionModal(true);
    return;
  };

  const handleAction = (value: "ACCEPT" | "FAILED") => {
    const data = {
      id: item.id,
      star: stars,
      status: value,
    };
    confirmTask(token, data)
      .then(() => {
        dispatch(getEarningData(Math.random()));
        navigation.goBack();
      })
      .catch((err) => {
        console.warn("ERROR: ", err.response);
      });
  };

  return (
    <Layout>
      <Header
        staticTitle={"earning.confirmTask"}
        handleBack={() => navigation.goBack()}
      />
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.titleWrapper}>
          <View style={styles.titleAndIcon}>
            <View style={styles.iconWrapper}>
              <Image
                source={{ uri: `data:image/png;base64, ${item.icon}` }}
                style={styles.itemIcon}
              />
            </View>
            <FormattedText>{item.taskName}</FormattedText>
          </View>
          <FormattedText
            style={styles.titleAmount}
            fontFamily="Regular-FaNum"
          >{`${formatNumber(item.amount)} ریال`}</FormattedText>
        </View>

        <FormattedText style={styles.mainText}>
          لطفا کیفیت انجام مسئولیت را مشخص نمائید.
        </FormattedText>
        <FormattedText style={styles.description}>
          لطفا در امتیاز دهی‌ دقت کنید چراکه پس از تائید یا رد امکان تغییر در
          مبلغ در آمد وجود ندارد.
        </FormattedText>

        <StarRating
          disabled={false}
          maxStars={5}
          emptyStar={"star"}
          emptyStarColor={colors.gray650}
          fullStar={"star"}
          fullStarColor={colors.star}
          iconSet={"MaterialIcons"}
          rating={stars}
          selectedStar={(rate: number) => {
            setStars(rate);
          }}
          reversed={true}
          starSize={42}
          containerStyle={styles.stars}
        />

        <View>
          <FormattedText style={styles.rateAmount} fontFamily="Regular-FaNum">
            {formatNumber(`${Math.floor(item.amount / 5) * stars}`)}
            <FormattedText style={{ fontSize: 14 }}> ریال</FormattedText>
          </FormattedText>
        </View>
      </ScrollView>

      <View style={styles.buttonsWrapper}>
        <Button
          title="تائید انجام فعالیت"
          onPress={() => handleConfirmation("ACCEPT")}
          color={colors.buttonSubmitActive}
          style={styles.buttons}
          disabled={!Boolean(stars)}
        />
        <View style={styles.buttonsSpacer} />
        <Button
          title="رد انجام فعالیت"
          onPress={() => handleConfirmation("FAILED")}
          color={colors.buttonDestructiveActive}
          style={styles.buttons}
        />
      </View>
      <AlertController
        showModal={confirmationModal}
        setShowModal={() => setConfirmationModal(false)}
        title={"تائید انجام فعالیت"}
        description=" با تائید انجام فعالیت، درآمد حاصل از این فعالیت از حساب شما کسر و به حساب فرزندتان منتقل میگردد."
        rightTitle={"تائید"}
        rightColor={colors.buttonSubmitPressed}
        rightAction={() => handleAction("ACCEPT")}
        leftTitle="انصراف"
        leftAction={() => setConfirmationModal(false)}
        centerText
      />
      <AlertController
        showModal={rejectionModal}
        setShowModal={() => setRejectionModal(false)}
        title={"رد انجام فعالیت"}
        description=" با رد انجام فعالیت، درآمدی به فرزندتان تعلق نمیگیرد!"
        rightTitle="رد"
        rightColor={colors.red}
        rightAction={() => handleAction("FAILED")}
        leftTitle="انصراف"
        leftAction={() => setRejectionModal(false)}
        centerText
      />
    </Layout>
  );
};
export default confirmTaskPage;

const styles = StyleSheet.create({
  container: {
    paddingTop: 20,
  },
  titleWrapper: {
    width: "100%",
    height: 60,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.gray900,
    paddingHorizontal: 20,
  },
  titleAndIcon: {
    flexDirection: "row",
    alignItems: "center",
  },
  iconWrapper: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 5,
    backgroundColor: colors.gray950,
    borderColor: colors.gray650,
    borderWidth: 0.5,
  },
  itemIcon: {
    width: 32,
    height: 32,
  },
  titleAmount: {
    fontSize: 16,
    color: colors.gray300,
  },
  mainText: {
    fontSize: 16,
    color: colors.title,
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
    paddingHorizontal: 30,
  },
  description: {
    fontSize: 14,
    color: colors.gray600,
    textAlign: "center",
    marginBottom: 20,
    lineHeight: 25,
    paddingHorizontal: 40,
  },
  stars: {
    flexDirection: "row-reverse",
    maxWidth: 250,
    alignSelf: "center",
  },
  rateAmount: {
    fontSize: 20,
    color: colors.title,
    textAlign: "center",
    marginTop: 10,
    marginLeft: 10,
  },
  buttonsWrapper: {
    flexDirection: "row",
    width: "100%",
    padding: 20,
    marginBottom: 30,
  },
  buttonsSpacer: {
    width: 10,
  },
  buttons: {
    flex: 1,
  },
});
