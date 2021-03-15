import React, { FC, useEffect, useState } from "react";
import { View, ScrollView, TouchableOpacity } from "react-native";
import { colors } from "constants/index";
import { useSelector } from "react-redux";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import styles from "./styles";
import Button from "components/button";
import CheckBox from "components/checkbox";
import { RootStateType } from "../../../../customType";
import Irancell from "images/carriers/irancell.svg";
import Mci from "images/carriers/mci.svg";
import Rightel from "images/carriers/rightel.svg";

type SimcardType = "permanent" | "perpaid";

type Carrier = "MCI" | "IRANCELL" | "RIGHTEL";
const carriersName: Carrier[] = ["MCI", "IRANCELL", "RIGHTEL"];

export const SelectCarrier: FC = (props: any) => {
  const mobileNumber = useSelector<RootStateType, any>(
    (state) => state.quickAccess.childPhone || ""
  );
  const operatorName = useSelector<RootStateType, any>(
    (state) => state.quickAccess.operatorName
  );

  const [chosenCarrier, setChosenCarrier] = useState<Carrier | null>("MCI");
  const [simcardType, setSimcardType] = useState<SimcardType>("perpaid");

  const handleNextPage = () => {
    props.navigation.navigate("packages", {
      mobileNumber,
      chosenCarrier,
      simcardType,
    });
  };

  const handleChooseCarrier = (carrier: Carrier) => {
    setChosenCarrier(carrier);
  };

  const handleSimcardType = (value: SimcardType) => {
    setSimcardType(value);
  };

  const handleOperatorIcon = (carrier: Carrier) => {
    switch (carrier) {
      case "MCI":
        return <Mci />;
      case "IRANCELL":
        return <Irancell />;
      case "RIGHTEL":
        return <Rightel />;
      default:
        return null;
    }
  };

  const handleDefaultCarrier = (number: string) => {
    const thirdDigit = number.slice(2, 3);
    if (thirdDigit === "1") return <Mci width={32} height={32} />;
    else if (thirdDigit === "3" || thirdDigit === "0")
      return <Irancell width={32} height={32} />;
    else return <Rightel width={32} height={32} />;
  };

  useEffect(() => {
    setChosenCarrier(operatorName);
  }, []);

  const renderCarrierRow = (carrier: Carrier) => (
    <TouchableOpacity
      onPress={() => handleChooseCarrier(carrier)}
      style={[
        styles.carrierWrapper,
        {
          backgroundColor:
            chosenCarrier === carrier ? colors.gray900 : "transparent",
        },
      ]}
      key={carrier}
    >
      <View style={styles.carrierLogoTitleWrapper}>
        {handleOperatorIcon(carrier)}
        <FormattedText id={carrier} style={styles.carrierName} />
      </View>
      <CheckBox
        onChange={() => null}
        showActive={chosenCarrier === carrier}
        color={colors.buttonSubmitActive}
        disabled
        size={20}
      />
    </TouchableOpacity>
  );

  return (
    <Layout>
      <Header
        staticTitle={"internetPackage"}
        handleBack={() => props.navigation.goBack()}
      />
      <ScrollView>
        <View style={styles.phoneNumberWrapper}>
          <FormattedText id="otp.mobileNumber" style={styles.phoneNumber} />
          <View style={styles.mobileAndLogo}>
            <FormattedText
              style={styles.phoneNumberBesideLogo}
              fontFamily="Regular-FaNum"
            >
              {mobileNumber}
            </FormattedText>
            <View style={styles.currentCarrierLogo}>
              {handleDefaultCarrier(mobileNumber)}
            </View>
          </View>
        </View>

        <View style={styles.simcardTypeWrapper}>
          <View style={styles.switcherWrapper}>
            <CheckBox
              onChange={() => handleSimcardType("permanent")}
              showActive={simcardType === "permanent"}
              color={colors.buttonSubmitActive}
              size={20}
            />
            <FormattedText id="permanent" style={styles.simcardTypeTitle} />
          </View>
          <View style={styles.switcherWrapper}>
            <CheckBox
              onChange={() => handleSimcardType("perpaid")}
              showActive={simcardType === "perpaid"}
              color={colors.buttonSubmitActive}
              size={20}
            />
            <FormattedText id="perpaid" style={styles.simcardTypeTitle} />
          </View>
        </View>
        <FormattedText style={styles.chooseCarrierText}>
          در صورت ترابرد، لطفا اپراتور جدید خود را انتخاب کنید.{" "}
        </FormattedText>

        {carriersName.map((carrier: Carrier) => renderCarrierRow(carrier))}
      </ScrollView>
      <View style={styles.buttonWrapper}>
        <Button
          title="ادامه"
          onPress={handleNextPage}
          color={colors.buttonOpenActive}
          disabled={mobileNumber && chosenCarrier && simcardType ? false : true}
        />
      </View>
    </Layout>
  );
};
