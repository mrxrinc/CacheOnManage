import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { FormattedText } from "components/format-text";
import styles from "./styles";
import Tick from "components/icons/tick.svg";
import { colors } from "constants/index";

const Column = (props: any) => {
  const { title, isFavorite, onPress } = props;
  return (
    <TouchableOpacity
      onPress={() => {
        onPress(title);
      }}
      style={styles.selectChild}
    >
      <View
        style={[
          styles.avatarCheckbox,
          {
            backgroundColor: isFavorite ? colors.buttonSubmitActive : "white",
          },
        ]}
      >
        <Tick width={14} height={14} fill={"white"} />
      </View>
      <Image
        source={{ uri: `data:image/png;base64,${title.avatar}` }}
        style={styles.avatar}
      />
      <FormattedText style={styles.childName} numberOfLines={1}>
        {title.nickname}
      </FormattedText>
    </TouchableOpacity>
  );
};
export default Column;
