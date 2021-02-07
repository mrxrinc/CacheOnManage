import React, { Component } from "react";
import { Animated, View, TouchableOpacity, StyleSheet } from "react-native";

const BUTTON_SIZE = 100;

import Option from "./option";
import More from "../../../../components/icons/quick-access.svg";
import Close from "../../../../components/icons/qr-payment-quick access.svg";
import bill from "../../../../images/collprass-icon/bill.png";
import internet from "../../../../images/collprass-icon/internet.png";
import charge from "../../../../images/collprass-icon/charge.png";
import qrCode from "../../../../images/collprass-icon/qrCode.png";

export default class FanButton extends Component {
  state = {
    // opacity: new Animated.Value(5),
    status: false,
    options: [
      { id: 0, type: "internet", icon: internet },
      { id: 1, type: "mobileTopUp", icon: charge },
      { id: 2, type: "mobileBillPayment", icon: bill },
      { id: 3, type: "sepQrPayment", icon: qrCode },
    ],
  };

  _showOptions() {
    this.setState({ status: true });
    const { options } = this.state;
    options.map((option) => {
      this.refs[option.id].moveOut();
      this.refs[option.id].logRange();
    });
  }

  _hideOptions() {
    const { options } = this.state;
    this.setState({ status: false });
    options.map((option) => {
      this.refs[option.id].moveIn();
    });
  }

  _renderOptions() {
    const { options, status } = this.state;
    const { theme } = this.props;
    return options.map((option, i) => {
      return (
        <Option
          key={i}
          ref={option.id}
          icon={option.icon}
          color={theme.fanBtn}
          colorText={theme.fanBtn}
          colorIcon={theme.backgroundColor}
          type={option.type}
          number={option.id}
          size={BUTTON_SIZE}
          status={status}
          navigation={this.props.navigation}
        />
      );
    });
  }

  render() {
    const { status } = this.state;
    const { theme, bljTheme } = this.props;
    return (
      <View style={[styles.container]}>
        {this._renderOptions()}

        {!status ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.backgroundColor }]}
            onPress={() => this._showOptions()}>
            <More  />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this._hideOptions()}>
            <Close />
          </TouchableOpacity>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 20,
  },
  button: {
    width: 55,
    height: 55,
    backgroundColor: "#f4f6fa",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 30,
  },
});
