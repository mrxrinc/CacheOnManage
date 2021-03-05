import React from "react";
import { TouchableOpacity, View, Image } from "react-native";
import { FormattedText } from "components/format-text";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";
import Checkbox from "components/checkbox";

const Column = (props: any) => {
  const theme = props.theme;
  const { title, isFavorite, onPress } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={() => {
        onPress(title);
      }}
      style={styles.selectChild}
    >
      <View style={styles.avatarCheckbox}>
        <Checkbox
          color={theme.ButtonGreenColor}
          disabled
          showActive={isFavorite}
        />
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
export default withTheme(Column);
