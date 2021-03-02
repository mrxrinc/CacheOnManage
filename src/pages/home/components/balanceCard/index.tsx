import React, { useState } from "react";
import { View, Image, TouchableOpacity } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { FormattedText } from "components/format-text";
import { formatNumber } from "utils";
import { BalanceCardType } from "constants/types";
import ChildrenPaymentLimits from "components/childrenPaymentLimits";
import CashIcon from "components/icons/cash.svg";
import SavingIcon from "components/icons/saving.svg";
import ArrowIcon from "components/icons/blueArrow.svg";
import style from "./style";
import { withTheme } from "themeCore/themeProvider";

const BalanceCard = ({
  id,
  balance,
  available,
  avatar,
  onPress,
  nickname,
  paymentMethods,
  incomes,
  spending,
  theme,
}: BalanceCardType) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  return (
    <>
      <TouchableOpacity
        style={style.container}
        key={id}
        activeOpacity={0.6}
        onPress={onPress}
      >
        <View style={[style.head]}>
          <Image
            source={{ uri: `data:image/png;base64,${avatar}` }}
            style={[style.avatar, { borderColor: theme.home.avatarBorder }]}
          />
        </View>
        <View
          style={[
            style.accountDetailSection,
            { borderBottomColor: theme.home.linearColor },
          ]}
        >
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
              {formatNumber(`${available}`)}{" "}
              <FormattedText style={style.currency} id={"home.rial"} />
            </FormattedText>
          </View>
        </View>

        <View
          style={[
            style.chartSection,
            { borderBottomColor: theme.home.linearColor },
          ]}
        >
          <FormattedText style={style.chartTitle}>روند خرج هفتگی</FormattedText>
          <View style={style.chart}>
            <LinearGradient
              colors={[theme.BlueGradient_Right, theme.BlueGradient_Left]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={[
                style.progress,
                { width: `${(spending / incomes) * 100}%` },
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
        childId={id}
        data={paymentMethods}
      />
    </>
  );
};

export default withTheme(BalanceCard);
