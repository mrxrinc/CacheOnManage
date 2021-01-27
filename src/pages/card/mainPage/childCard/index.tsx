import React from "react";
import { View, Image, Dimensions } from "react-native";
import { FormattedText } from "components/format-text";
import ActiveCard from "images/cards/mainPage/ActiveCard.svg";
import SimCard from "images/cards/mainPage/simcard.svg";
import blueLogo from "images/cards/mainPage/blue-logo.png";
import styles from "./styles";
import { formatNumber } from "utils/index";

const { width, height } = Dimensions.get("window");

const ChildCard = (props: any) => {
  const cardInfo = props.cardsInfo;
  return (
    <View style={styles.container}>
      <View style={styles.cardBox}>
        <View style={styles.cardPack}>
          <ActiveCard />
          <View style={styles.cardInfoBox}>
            <View style={styles.imagesCard}>
              <Image source={blueLogo} style={styles.blueLogo} />
              <SimCard />
            </View>

            <View style={styles.cardOwnerInfo}>
              <FormattedText style={styles.frontCardInfo}>
                {cardInfo.firstName} {cardInfo.lastName}
              </FormattedText>
              <FormattedText
                fontFamily="Regular-FaNum"
                style={styles.frontCardInfo}
              >
                {formatNumber(cardInfo.balance) + "  " + "ریال"}
              </FormattedText>
            </View>
            <View style={styles.userStateBox}>
              <FormattedText style={styles.frontCardInfo}>
                {cardInfo.status == "ACTIVE" ? "فعال" : "غیرفعال"}
              </FormattedText>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};
export default ChildCard;
