import React, { useState } from "react";
import {
  View,
  Image,
  Text,
  Dimensions,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import LinearGradient from "react-native-linear-gradient";
import { FormattedText } from "components/format-text";
import close from "images/drawer/close.png";
import { DrawerActions } from "@react-navigation/native";
import { Icon } from "images";
import HighDesign from "images/drawer/top-design.svg";
import BottomDesign from "images/drawer/bottom-design.svg";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../../customType";
import AlertController from "components/alertController";
import SupportController from "components/supportController";
import { signout } from "utils/api";
var pkg = require("../../../package.json");

const { width, height } = Dimensions.get("window");
export function DrawerContent(props: any) {
  const token = useSelector<RootState, any>((state) => state.user.token);
  const isChild = useSelector<any, any>((state) => state.user.ischild);
  const profileInfo = useSelector<RootState, any>(
    (state) => state.home.homeData
  );
  const [exitModal, setExitModal] = useState<boolean>(false);
  const [supportModal, setSupportModal] = useState<boolean>(false);

  async function handleSignout() {
    try {
      const declareSignout = await signout(token);
      console.log({ declareSignout });
      AsyncStorage.removeItem("token");
      setExitModal(false);
      DrawerActions.closeDrawer();
      props.navigation.reset({ index: 0, routes: [{ name: "splash" }] });
    } catch (err) {
      console.warn("ERROR DECLARING SIGNOUT: ", err, err.response);
    }
  }

  return (
    <LinearGradient
      colors={["#bb6aff", "#397fff"]}
      style={{
        height: height,
      }}
      start={{ x: 0, y: 1 }}
      end={{ x: 1, y: 0 }}
    >
      <View style={styles.container}>
        <View style={styles.contentBox}>
          <View style={[styles.drawerHeader, {}]}>
            <HighDesign height={140} width={110} style={{ marginLeft: -20 }} />
            <TouchableOpacity
              style={styles.closeTouch}
              onPress={() =>
                props.navigation.dispatch(DrawerActions.closeDrawer())
              }
            >
              <Image source={close} style={{ width: 30, height: 30 }} />
            </TouchableOpacity>
          </View>
          <View style={styles.profileInfo}>
            <Image
              source={{ uri: `data:image/png;base64,${profileInfo.avatar}` }}
              style={{ width: 60, height: 60, borderRadius: 30 }}
            />
            <FormattedText style={{ color: "white" }}>
              {profileInfo.nickname || profileInfo.name}
            </FormattedText>
          </View>
          <View style={styles.itemsBox}>
            {!isChild && (
              <>
                <TouchableOpacity
                  style={styles.itemBox}
                  onPress={() =>
                    props.navigation.navigate("addChild", {
                      noBackButton: false,
                    })
                  }
                >
                  <Icon name="addCild" size="small" />
                  <FormattedText
                    style={styles.itemsFont}
                    id="drawer.addChild"
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.itemBox}
                  onPress={() => props.navigation.navigate("setting")}
                >
                  <Icon name="setting" size="small" />
                  <FormattedText style={styles.itemsFont} id="drawer.setting" />
                </TouchableOpacity>
              </>
            )}

            <TouchableOpacity
              style={styles.itemBox}
              onPress={() => props.navigation.navigate("invoice")}
            >
              <Icon name="bills" size="small" />
              <FormattedText style={styles.itemsFont} id="drawer.bills" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.itemBox}>
              <Icon name="help" size="small" />
              <FormattedText style={styles.itemsFont} id="drawer.help" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.itemBox}
              onPress={() => setSupportModal(true)}
            >
              <Icon name="suppurt" size="small" />
              <FormattedText style={styles.itemsFont} id="drawer.suppurt" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.itemBox}
              onPress={() => setExitModal(true)}
            >
              <Icon name="signOut" size="small" />
              <FormattedText style={styles.itemsFont} id="drawer.signOut" />
            </TouchableOpacity>
          </View>
          <View style={styles.versionBox}>
            <FormattedText
              style={{
                color: "white",
                fontSize: 14,
                right: 40,
                bottom: 60,
              }}
            >
              {/* {pkg.version.split("").reverse().join("").slice(0, 4) + "23"} */}
              ۱.۴.۳
            </FormattedText>
            <BottomDesign
              height={120}
              width={100}
              style={{ marginRight: -15 }}
            />
          </View>
        </View>
      </View>
      <AlertController
        showModal={exitModal}
        setShowModal={() => setExitModal(false)}
        handleMainAction={handleSignout}
        title="خروج"
        description="آیا می‌خواهید از برنامه خارج شوید؟"
      />
      <SupportController
        showModal={supportModal}
        setShowModal={() => setSupportModal(false)}
        title="پشتیبانی‌"
        phoneNumber="02147474747"
      />
    </LinearGradient>
  );
}
const styles = StyleSheet.create({
  container: { height: height, justifyContent: "center", alignItems: "center" },
  contentBox: {
    position: "absolute",
    height: height,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  drawerHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    // alignItems: "flex-st",
    width: "100%",
    height: 40,
  },
  closeTouch: {
    width: 35,
    height: 55,
    justifyContent: "center",
    alignItems: "center",
    right: 10,
  },
  itemsBox: { width: "80%", height: height * 0.5 },
  itemBox: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 15,
  },
  profileInfo: {
    justifyContent: "center",
    alignItems: "center",
    // marginTop: 20,
  },
  itemsFont: { color: "white", fontSize: 15, marginLeft: 8 },
  versionBox: {
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "flex-end",
    width: "100%",
    height: 80,
  },
});
