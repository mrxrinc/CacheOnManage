import React from "react";
import { StyleSheet } from "react-native";
import Button from "components/button";
import { width } from "constants/index";

const ButtonLogin = (props: any) => {
  const { password, onPress, loading, isFace, isFinger, theme } = props;
  const Title = password
    ? "ورود"
    : isFace
    ? `ورود با تشخیص چهره`
    : isFinger
    ? "ورود با اثر انگشت"
    : "ورود";

  return (
    <Button
      isFaceId={password ? false : isFace}
      isFinger={password ? false : isFinger}
      title={Title}
      color={theme.addChild.mainButton}
      onPress={onPress}
      disabled={loading}
      loading={loading}
      style={styles.button}
    />
  );
};
export default ButtonLogin;

const styles = StyleSheet.create({
  button: { width: width * 0.89, height: 44 },
});
