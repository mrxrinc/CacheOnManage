import React, { Component } from "react";
import { Animated, View, Image, StyleSheet } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { FormattedText } from "../../../../components/format-text";
import store from "../../../../store";
import { QuickAccessRootPage } from "../../../../store/QuickAccess/quickAccess.actions";

class Option extends Component {
  state = {
    move: new Animated.ValueXY(0),
    scale: new Animated.Value(1),
  };

  validRange = {
    x0: 0,
    x1: 0,
    y0: 0,
    y1: 0,
  };

  logRange() {
    console.log(this.validRange);
  }

  _getStyle() {
    const { size } = this.props;
    const { scale, move } = this.state;
    return {
      width: size / 2,
      height: size / 2,
      backgroundColor: "#43e6c5",
      borderRadius: size / 4,
      justifyContent: "center",
      alignItems: "center",
      transform: [
        {
          translateX: move.x,
        },
        {
          translateY: move.y,
        },
        {
          scale,
        },
      ],
    };
  }

  moveOut() {
    const { number, size } = this.props;
    let offset = { x: 0, y: 0 };
    switch (number) {
      case 0:
        offset = { x: -(size - (size / 4) * number), y: 0 };
        break;
      case 1:
        offset = {
          x: -(size - (size / 2) * number),
          y: -(size - (size / 6) * number),
        };
        break;
      case 2:
        offset = {
          x: size - (size / 4) * number,
          y: -(size - (size / 12) * number),
        };
        break;
      case 3:
        offset = { x: size, y: 0 };
    }

    Animated.timing(this.state.move, { toValue: offset }).start();
  }

  moveIn() {
    Animated.timing(this.state.move, { toValue: 0 }).start();
  }

  handleAction() {
    const { navigation, type } = this.props;
    if (type == "sepQrPayment") {
      navigation.navigate("QRPayment");
    } else if (type == "mobileTopUp") {
      store.dispatch(QuickAccessRootPage("mobileTopUp"));
      navigation.navigate("quickAccess");
    } else if (type == "mobileBillPayment") {
      store.dispatch(QuickAccessRootPage("mobileBillPayment"));
      navigation.navigate("quickAccess");
    } else if (type == "internet") {
      navigation.navigate("selectCarrier");
    }
  }
  render() {
    const { icon, number, status } = this.props;

    return (
      <View style={styles.container}>
        <Animated.View style={this._getStyle()}>
          <TouchableOpacity
            style={styles.itemTouch}
            onPress={() => this.handleAction()}
          >
            <Image source={icon} style={{ width: 24, height: 24 }} />
          </TouchableOpacity>
          <View style={styles.itemNameBox}>
            {status && (
              <FormattedText style={styles.itemText}>
                {number == 0
                  ? "خرید بسته اینترنت"
                  : number == 1
                  ? "خرید شارژ"
                  : number == 2
                  ? "قبض موبایل"
                  : "پرداخت QR"}
              </FormattedText>
            )}
          </View>
        </Animated.View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  itemTouch: {
    width: 54,
    height: 54,
    justifyContent: "center",
    alignItems: "center",
  },
  itemNameBox: {
    position: "absolute",
    top: 50,
    width: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  itemText: { color: "#00015d", fontSize: 12 },
});

export default Option;
