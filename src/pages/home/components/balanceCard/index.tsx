import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FormattedText } from "components/format-text";
import { formatNumber } from "utils";
import { BalanceCardType } from "constants/types";
import { colors } from "constants/index";
import ChildrenPaymentLimits from "components/childrenPaymentLimits";
import CashIcon from "components/icons/cash.svg";
import SavingIcon from "components/icons/saving.svg";
import ArrowIcon from "components/icons/blueArrow.svg";
import style from "./style";

type PaymentMethodType = {
  method: string;
  amount: string;
};

export default ({
  id,
  balance,
  liable,
  avatar,
  onPress,
  nickname,
}: BalanceCardType) => {
  const [showModal, setShowModal] = useState<boolean>(false);

  const handleGetPaymentLimits = (data: any) => {
    console.log(data);
  };

  return (
    <>
      <TouchableOpacity
        style={style.container}
        key={id}
        activeOpacity={0.6}
        onPress={onPress}
      >
        <View style={style.head}>
          <Image
            source={{ uri: `data:image/png;base64,${avatar}` }}
            style={style.avatar}
          />
        </View>
        <View style={style.accountDetailSection}>
          <View style={style.amountWrapper}>
            <CashIcon />
            <FormattedText style={style.balances} fontFamily="Regular-FaNum">
              {formatNumber(`${balance}`)}{" "}
              <FormattedText style={style.currency} id={"home.rial"} />
            </FormattedText>
          </View>
          <View style={style.amountWrapper}>
            <SavingIcon />
            <FormattedText style={style.balances} fontFamily="Regular-FaNum">
              {formatNumber(`${liable}`)}{" "}
              <FormattedText style={style.currency} id={"home.rial"} />
            </FormattedText>
          </View>
        </View>

        <View style={style.chartSection}>
          <FormattedText style={style.chartTitle}>روند خرج هفتگی</FormattedText>
          <View style={style.chart}>
            <LinearGradient
              colors={[colors.gradientRight, colors.gradientLeft]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                style.progress,
                { width: `${(liable / balance) * 100}%` },
              ]}
            />
          </View>
        </View>
        <View style={style.paymentMethodWrapper}>
          <TouchableOpacity
            style={style.paymentMethod}
            onPress={() => setShowModal(true)}
          >
            <FormattedText style={style.paymentMethodText}>
              ویرایش محدودیت‌های خرید موبایلی {nickname}
            </FormattedText>
            <ArrowIcon style={style.paymentButtonArrow} />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>

      <ChildrenPaymentLimits
        title="تعیین سقف پرداخت"
        showModal={showModal}
        setShowModal={() => setShowModal(false)}
        // handleGetPaymentLimits={handleGetPaymentLimits}
        childId={id}
      />
    </>
  );
};
