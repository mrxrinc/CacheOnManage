import React from "react";
import { View, Image } from "react-native";
import { FormattedText } from "components/format-text";
import styles from "./styles";
import LogoSquare from "images/logo-square.svg";

export default ({ data }: any) => {
  const { title, image, description } = data;
  return (
    <View style={styles.container}>
      <View style={styles.titleWrapper}>
        <FormattedText style={styles.title}>{title}</FormattedText>
      </View>
      <View style={styles.imageWrapper}>
        <Image source={image} style={styles.image} />
      </View>
      {description && (
        <View style={styles.descriptionWrapper}>
          <View style={styles.descriptionHead}>
            <LogoSquare />
            <FormattedText style={styles.descriptionTitle}>
              ‌BLU junior
            </FormattedText>
          </View>
          <FormattedText style={styles.description}>
            {description}
          </FormattedText>
        </View>
      )}
      <View style={styles.bottomSpace} />
    </View>
  );
};
