import React, { FC } from "react";
import { View } from "react-native";
import Button from "components/button";
import styles from "./styles";

type Props = {
  buttonType: "equal" | "unequal" | "single";
  mainColor: string;
  mainText: string;
  mainOnPress: () => void;
  secondaryColor: string;
  secondaryText: string;
  secondaryOnPress: () => void;
  style: any;
  mainLoading?: boolean;
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
              color={secondaryColor}
              title={secondaryText}
              onPress={secondaryOnPress}
            />
          </View>
        </>
      )}
    </View>
  );
};

export default UnequalTwinButtons;
