import React, { Component } from "react";
import {View, TouchableOpacity, StyleSheet } from "react-native";

const BUTTON_SIZE = 100;

import Option from "./option";
import More from "components/icons/quick-access.svg";
import Close from "components/icons/quick-access-close.svg";
import Bill from "components/icons/barcode.svg";
import Internet from "components/icons/internet-package.svg";
import Charge from "components/icons/simcard.svg";
import QrCode from "components/icons/qr-payment-quick-access.svg";

export default class FanButton extends Component {
  state = {
    status: false,
    options: [
      { id: 0, type: "internet", icon: <Internet width={24} height={24} fill={this.props.theme.backgroundColor} /> },
      { id: 1, type: "mobileTopUp", icon: <Charge width={24} height={24} fill={this.props.theme.backgroundColor} /> },
      { id: 2, type: "mobileBillPayment", icon: <Bill width={24} height={24} fill={this.props.theme.backgroundColor} /> },
      { id: 3, type: "sepQrPayment", icon: <QrCode width={24} height={24} fill={this.props.theme.backgroundColor} /> },
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
          colorText={theme.fanBtnTextColor}
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
    const { theme } = this.props;
    return (
      <View style={[styles.container]}>
        {this._renderOptions()}

        {!status ? (
          <TouchableOpacity
            style={[styles.button, { backgroundColor: theme.backgroundColor }]}
            onPress={() => this._showOptions()}>
            <More width={38} height={38} fill={theme.fanBtnMore} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity onPress={() => this._hideOptions()}>
            <Close width={38} height={38} fill={theme.fanBtnMore}/>
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
