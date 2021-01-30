import React, { useState } from "react";
import { View, TouchableOpacity } from "react-native";
import { FormattedText } from "components/format-text";
import styles from "./styles";
import Activation from "images/cards/mainPage/activation.svg";
import Active from "images/cards/mainPage/active.svg";
import Block from "images/cards/mainPage/block.svg";
import ChangePassword from "images/cards/mainPage/changePassword.svg";
import {
  setCardBlock,
  setCardDeactivate,
  setNewPassword,
  setUnblockTemporary,
} from "utils/api";
import { useDispatch, useSelector } from "react-redux";
import { RootState, RootStateType } from "../../../../../customType";
import AlertController from "components/alertController";
import ActionModalCentered from "components/modal/actionModalCentered";
import LottieView from "lottie-react-native";
import Check from "images/cards/mainPage/check.json";
import Input from "components/input";
import UnequalTwinButtons from "components/unequalTwinButtons";
import { colors } from "constants/index";
import CardsActions from "store/Cards/cards.action";

const CardItems = (props: any) => {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [showModalCentered, setModalCentered] = useState(false);
  const [successChangePassword, setSuccessChangePassword] = useState(false);
  const [isBlock, setIsBlock] = useState(false);
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [reEnterPassword, setReEnterPassword] = useState("");
  const [errorText, setErrorText] = useState("");
  const token = useSelector<RootStateType, any>((state) => state.user.token);
  const cardInfo = props.cardsInfo;
  const isChild = useSelector<RootState, any>((state) => state.user.ischild);

  const handleBlock = () => {
    setLoading(true);
    console.log("setCardBlock called");
    const data = {
      childId: cardInfo.childId,
    };
    console.log("setCardBlock response", data);
    setCardBlock(token, data)
      .then((response) => {
        console.log("setCardBlock response", response);
        setShowModal(!showModal);
        dispatch(CardsActions.callCardInfo("block"));
        setLoading(false);
      })
      .catch((err) => {
        console.log("setCardBlock err", err.response);
      });
  };

  const handleDeactive = () => {
    setLoading(true);
    const data = {
      childId: cardInfo.childId,
    };
    if (cardInfo.status == "ACTIVE") {
      setCardDeactivate(token, data)
        .then((response) => {
          setShowModal(!showModal);
          dispatch(CardsActions.callCardInfo("deactive"));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("handleDeactive err", err.response);
        });
    } else {
      setUnblockTemporary(token, data)
        .then((response) => {
          setShowModal(!showModal);
          dispatch(CardsActions.callCardInfo("active"));
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
          console.log("handleUnblock err", err.response);
        });
    }
  };

  const handleChangePassword = () => {
    const data = {
      pin: password,
    };
    if (password == reEnterPassword) {
      setNewPassword(token, data)
        .then((response) => {
          console.log("handleChangePassword response", response);
          setSuccessChangePassword(true);
          setErrorText("");
          dispatch(CardsActions.callCardInfo("changePassword"));
        })
        .catch((err) => {
          console.log("handleChangePassword err", err);
          setErrorText(err.response.data.message);
        });
    } else {
      setErrorText("رمز صحیح تکرار نشده است.");
    }
  };

  const renderChangePassword = () => {
    return (
      <View style={[styles.inquiryResultWrapper]}>
        <View style={styles.changePasswordDescription}>
          <FormattedText
            id="changePasswordDescription"
            style={styles.changePasswordDescriptionText}
          />
        </View>
        <View style={styles.modalResultRow}>
          <FormattedText style={styles.modalResultKeyText}>
            رمز جدید
          </FormattedText>
          <View>
            <Input
              customStyle={styles.changePasswordInput}
              boxMode
              maxLength={4}
              secureTextEntry={true}
              keyboardType={"number-pad"}
              onChangeText={(value: string) => {
                setPassword(value);
              }}
              value={password}
            />
          </View>
        </View>
        <View style={styles.modalResultRow}>
          <FormattedText style={styles.modalResultKeyText}>
            تکرار رمز جدید
          </FormattedText>
          <View style={{}}>
            <Input
              customStyle={styles.changePasswordInput}
              boxMode
              maxLength={4}
              secureTextEntry={true}
              keyboardType={"number-pad"}
              onChangeText={(value: string) => {
                setReEnterPassword(value);
              }}
              value={reEnterPassword}
            />
          </View>
        </View>
        <View style={styles.errorBox}>
          {errorText != "" && (
            <FormattedText style={styles.errorText}>{errorText}</FormattedText>
          )}
        </View>
        <View style={styles.buttonBox}>
          {!successChangePassword ? (
            <UnequalTwinButtons
              mainColor={colors.buttonSubmitActive}
              mainText={"ذخیره"}
              mainOnPress={handleChangePassword}
              secondaryColor={colors.buttonDestructiveActive}
              buttonType={"single"}
              style={{ marginHorizontal: "-19%" }}
            />
          ) : (
            <LottieView
              style={{ width: 50, height: 50 }}
              source={Check}
              autoPlay
              loop={false}
              duration={4000}
              onAnimationFinish={() => {}}
            />
          )}
        </View>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      {!isChild && (
        <TouchableOpacity
          onPress={() => {
            setIsBlock(false);
            setShowModal(!showModal);
          }}
          style={styles.itemBox}
        >
          {cardInfo.status == "ACTIVE" ? <Activation /> : <Active />}
          <FormattedText style={styles.itemFont}>
            {cardInfo.status == "ACTIVE" ? "غیرفعالسازی" : "فعالسازی"}
          </FormattedText>
        </TouchableOpacity>
      )}
      <TouchableOpacity
        onPress={() => {
          setIsBlock(true);
          setShowModal(!showModal);
        }}
        style={styles.itemBox}
      >
        <Block />
        <FormattedText style={styles.itemFont}>ابطال کارت</FormattedText>
      </TouchableOpacity>
      {isChild && (
        <TouchableOpacity
          onPress={() => setModalCentered(true)}
          style={styles.itemBox}
        >
          <ChangePassword />
          <FormattedText style={styles.itemFont}>تغییر رمز</FormattedText>
        </TouchableOpacity>
      )}
      <AlertController
        showModal={showModal}
        setShowModal={() => setShowModal(false)}
        title={
          isBlock
            ? "مسدود کردن"
            : cardInfo.status == "ACTIVE"
            ? "غیرفعالسازی"
            : "فعالسازی"
        }
        description={
          isBlock
            ? "در صورت تائید، کارت ابطال خواهد شد. جهت دریافت کارت جدید باید گزینه سفارش کارت را انتخاب کنید. "
            : cardInfo.status == "ACTIVE"
            ? "با انتخاب این گزینه کارت موقتا غیرفعال میشود.شما میتوانید دوباره کارت را فعال کنید."
            : "با انتخاب این گزینه کارت موقتا فعال میشود. شما میتوانید دوباره کارت را غیرفعال کنید."
        }
        mainLoading={loading}
        leftTitle={
          isBlock
            ? "ابطال کارت"
            : cardInfo.status == "ACTIVE"
            ? "غیرفعالسازی"
            : "فعالسازی"
        }
        leftColor={
          cardInfo.status == "ACTIVE" || isBlock
            ? colors.red
            : colors.buttonSubmitPressed
        }
        leftAction={isBlock ? handleBlock : handleDeactive}
        rightTitle="انصراف"
        rightAction={() => setShowModal(false)}
        centerText
      />
      <ActionModalCentered
        title="تغییر رمز"
        showModal={showModalCentered}
        setShowModal={() => {
          setModalCentered(false);
          setErrorText("");
          setSuccessChangePassword(false);
          setPassword("");
          setReEnterPassword("");
        }}
        onBackdropPress={() => {
          setModalCentered(false);
          setErrorText("");
          setSuccessChangePassword(false);
          setPassword("");
          setReEnterPassword("");
        }}
      >
        {renderChangePassword()}
      </ActionModalCentered>
    </View>
  );
};
export default CardItems;
