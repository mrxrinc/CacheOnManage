import React, { FC } from "react";
import { View } from "react-native";
import Button from "components/button";
import styles from "./styles";

type Props = {
  buttonType?: "equal" | "unequal" | "single";
  mainColor: string;
  mainText: string;
  mainOnPress: any;
  secondaryColor: string;
  secondaryText: string;
  secondaryOnPress: () => void;
  style: any;
  mainLoading?: boolean;
  secondaryLoading?: boolean;
  titleSecondaryStyle?: any;
  mainStyle?: any;
  secondaryStyle?: any;
};

const UnequalTwinButtons: FC<Props> = ({
  buttonType = "unequal",
  mainColor,
  mainText,
  mainOnPress,
  secondaryColor,
  secondaryText,
  secondaryOnPress,
  style,
  mainLoading,
  secondaryLoading,
  titleSecondaryStyle,
  mainStyle,
  secondaryStyle,
}) => {
  return (
    <View
      style={[
        styles.container,
        style,
        {
          justifyContent: buttonType !== "single" ? "space-between" : "center",
        },
      ]}
    >
      <View style={{ width: buttonType === "equal" ? "50%" : "62%" }}>
        <Button
          color={mainColor}
          title={mainText}
          onPress={mainOnPress}
          loading={mainLoading}
          style={mainStyle}
        />
      </View>
      {buttonType !== "single" && (
        <>
          <View style={styles.spacer} />
          <View
            style={[
              styles.smallerButton,
              { width: buttonType == "equal" ? "50%" : "34%" },
            ]}
          >
            <Button
              titleStyle={titleSecondaryStyle}
              color={secondaryColor}
              title={secondaryText}
              onPress={secondaryOnPress}
              loading={secondaryLoading}
              style={secondaryStyle}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default UnequalTwinButtons;
