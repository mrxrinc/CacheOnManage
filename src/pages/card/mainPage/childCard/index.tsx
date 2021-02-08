import React from "react";
import { View, Image } from "react-native";
import { FormattedText } from "components/format-text";
import ActiveCard from "images/cards/mainPage/ActiveCard.svg";
import SimCard from "images/cards/mainPage/simcard.svg";
import blueLogo from "images/cards/mainPage/blue-logo.png";
import styles from "./styles";
import { formatNumber } from "utils/index";

const ChildCard = (props: any) => {
  const cardInfo = props.cardsInfo;
  return (
    <View style={styles.container}>
      <View style={styles.cardBox}>
        <ActiveCard style={styles.cardImage} />

        <View style={styles.frontDataWrapper}>
          <View style={styles.logoAndSimCartWrapper}>
            <Image source={blueLogo} style={styles.blueLogo} />
            <SimCard />
          </View>

          <View style={styles.ownerInformationWrapper}>
            <FormattedText style={styles.cartTexts}>
              {cardInfo.firstName} {cardInfo.lastName}
            </FormattedText>
            <FormattedText fontFamily="Regular-FaNum" style={styles.cartTexts}>
              {formatNumber(cardInfo.balance) + "  " + "ریال"}
            </FormattedText>
          </View>

          <View style={styles.userStateWrapper}>
            <FormattedText style={[styles.cartTexts, { fontSize: 14 }]}>
              {cardInfo.status == "ACTIVE" ? "فعال" : "غیرفعال"}
            </FormattedText>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ChildCard;
