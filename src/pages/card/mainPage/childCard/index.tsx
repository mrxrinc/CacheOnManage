import React from "react";
import { View } from "react-native";
import { FormattedText } from "components/format-text";
import ActiveCard from "images/cards/mainPage/ActiveCard.svg";
import styles from "./styles";
import { formatNumber } from "utils/index";

const ChildCard = (props: any) => {
  const cardInfo = props.cardsInfo;
  return (
    <View style={styles.container}>
      <View style={styles.cardBox}>
        <ActiveCard style={styles.cardImage} />

        <View>
          <View style={styles.amount}>
            <FormattedText
              fontFamily="Regular-FaNum"
              style={[styles.cartTexts]}
            >
              {formatNumber(cardInfo.balance) + " " + "ریال"}
            </FormattedText>
          </View>
          <View style={styles.ownerInformationWrapper}>
            <FormattedText style={styles.cartTexts}>
              {cardInfo.firstName} {cardInfo.lastName}
            </FormattedText>
            <FormattedText style={[styles.cartTexts]}>
              {cardInfo.status == "ACTIVE" ? "فعال" : "غیرفعال"}
            </FormattedText>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ChildCard;
