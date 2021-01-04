import React, { useState, useEffect } from "react";
import { TouchableOpacity } from "react-native";
import TickIcon from "components/icons/tick.svg";
import { colors } from "constants/index";

type Props = {
  color?: string;
  onChange: (state: boolean) => void;
  showActive: boolean;
  disabled?: boolean;
  size?: number;
};

export default ({ color, onChange, showActive, disabled, size }: Props) => {
  const [active, setActive] = useState<boolean>(showActive || false);
  function handleChecked() {
    setActive(!active);
    onChange(!active);
  }

  useEffect(() => {
    setActive(showActive);
  }, [showActive]);

  return (
    <TouchableOpacity
      style={{
        borderRadius: 25,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor:
          color && active ? color : color ? colors.white : colors.gray900,
        borderWidth: active ? 0 : 1,
        borderColor: active ? "transparent" : color ? color : colors.gray600,
        elevation: active ? 10 : 0,
        shadowColor: active ? colors.dark : "transparent",
        shadowOpacity: 0.1,
        shadowOffset: { width: 0, height: 5 },
        shadowRadius: 5,
        marginRight: 5,
        width: size ?? 25,
        height: size ?? 25,
      }}
      onPress={!disabled ? handleChecked : () => null}
      activeOpacity={!disabled ? 0.7 : 1}
    >
      {active && <TickIcon width={12} height={12} fill={colors.white} />}
    </TouchableOpacity>
  );
};
