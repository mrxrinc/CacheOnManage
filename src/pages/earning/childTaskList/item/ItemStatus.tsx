import React from "react";
import { StyleSheet, View } from "react-native";
import SoilClockIcon from "components/icons/soilClock.svg";
import SoilClockIconBr from "components/icons/soilClock-br.svg";
import FailIcon from "components/icons/fail.svg";
import FailIconBr from "components/icons/fail-br.svg";
import PaymentTag from "./PaymentTag";

const ItemStatus = (props: any) => {
  const { status, item, theme } = props;
  return (
    <View style={styles.container}>
      {item.status == "FAILED" &&
        (theme.key == "FATHER BLU JUNIOR" ? (
          <FailIconBr style={styles.failIcon} />
        ) : (
          <FailIcon style={styles.failIcon} />
        ))}
      {item.status == "DONE" &&
        (theme.key == "FATHER BLU JUNIOR" ? (
          <SoilClockIconBr style={styles.failIcon} />
        ) : (
          <SoilClockIcon style={styles.failIcon} />
        ))}
      {item.status == "TODO" && (
        <View
          style={[styles.todoIcon, { borderColor: theme.ButtonGreenColor }]}
        />
      )}
      {item.status == "ACCEPT" && <PaymentTag />}
      {item.status == "PAIED" && <PaymentTag theme={theme} status={status} />}
    </View>
  );
};

export default ItemStatus;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginRight: 11,
  },
  todoIcon: {
    width: 20,
    height: 20,
    borderRadius: 30,
    borderWidth: 1,
    marginRight: 3,
  },
  failIcon: {
    marginHorizontal: -7,
    marginTop: 5,
  },
});
