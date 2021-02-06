import React from "react";
import {
  TouchableHighlight,
  TouchableOpacity,
  ActivityIndicator,
  View,
} from "react-native";
import { FormattedText } from "components/format-text";
import { colors, IOS, width } from "constants/index";
import styles from "./styles";
import { withTheme } from "themeCore/themeProvider";
import Fingerprint from "images/signIn/fingerprint.svg";
import FaceIDIcon from "components/icons/face-id.svg";
type Props = {
  title: string;
  onPress: () => void;
  outline?: boolean;
  style?: any;
  titleStyle?: any;
  fontSize?: number;
  color?: string;
  disabled?: boolean;
  loading?: boolean;
  theme: any;
  isFinger?: any;
  isFaceId?: any;
};

function handleBackground(
  color?: string,
  outline?: boolean,
  disabled?: boolean
) {
  if (outline) return colors.white;
  if (color && !outline && !disabled) return color;
  if (color && !outline && disabled) return `${color}77`;
  return colors.gray700;
}

const Button = ({
  theme,
  title,
  outline,
  onPress,
  color,
  fontSize,
  style,
  titleStyle,
  disabled,
  loading,
  isFinger,
  isFaceId,
  ...props
}: Props) => {
  return (
    <TouchableOpacity
      style={[
        styles.container,
        {
          backgroundColor: handleBackground(color, outline, disabled),
          borderWidth: disabled ? 0 : outline ? 1 : 0,
          borderColor: outline ? color : "transparent",
          elevation: disabled ? 0 : 3,
          shadowOpacity: disabled ? 0 : 0.18,
          borderRadius: theme.buttonBorderRadius,
          ...style,
        },
      ]}
      disabled={disabled}
      onPress={onPress}
      {...props}
    >
      {!loading ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {isFaceId && (
            <FaceIDIcon fill={colors.white} width={16} height={16} />
          )}
          {isFinger && (
            <Fingerprint fill={colors.white} width={16} height={16} />
          )}
          <FormattedText
            fontFamily="Bold"
            style={{
              lineHeight: IOS ? 15 : 25,
              marginLeft: isFinger || isFaceId ? 8 : 0,
              fontSize: fontSize ? fontSize : 16,
              color: disabled ? colors.white : outline ? color : colors.white,
              ...titleStyle,
            }}
          >
            {title}
          </FormattedText>
        </View>
      ) : (
        <ActivityIndicator color={colors.white} />
      )}
    </TouchableOpacity>
  );
};

export default withTheme(Button);
