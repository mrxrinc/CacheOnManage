import React, { FC, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { width } from "constants/index";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import styles from "./styles";
import Button from "components/button";
import { withTheme } from "themeCore/themeProvider";
import VipCardFront from "images/card-design/vip-front.png";
import VipCardBack from "images/card-design/vip-back.png";
import PlusIcon from "components/icons/plus.svg";
import FlipIcon from "components/icons/flip.svg";
import CARDS_DATA from "./assets/cards";
import GalleryIcon from "components/icons/gallery.svg";
import CameraIcon from "components/icons/camera.svg";
import TrashIcon from "components/icons/trash.svg";
import ActionModalButtom from "components/modal/actionModalBottom";
import {
  handleCamera,
  handleImagePicker,
} from "pages/setting/tabPages/constants";

type TabType = "VIP" | "OTHER";

type ActiveCard =
  | "VIP"
  | "BLUJR_1"
  | "BLUJR_2"
  | "BLUJR_3"
  | "BLUJR_4"
  | "BLUJR_5";

const DefineCard: FC = ({ navigation, route, theme }: any) => {
  const childId = route.params?.childId;
  const fromAddChild = route.params?.fromAddChild;
  const [activeTab, setActiveTab] = useState<TabType>("VIP");
  const [flip, setFlip] = useState<boolean>(false);
  const [flipSecondary, setFlipSecondary] = useState<string | null>(null);
  const [activeCard, setActiveCard] = useState<ActiveCard>("VIP");
  const [avatar, setAvatar] = useState<string | null>(null);
  const [imagePickerModal, setImagePickerModal] = useState<boolean>(false);

  const handleNextPage = () => {
    navigation.navigate("confirmCard", {
      frontImage:
        activeTab === "VIP"
          ? VipCardFront
          : CARDS_DATA.filter((n) => n.id === activeCard)[0].front,
      backImage:
        activeTab === "VIP"
          ? VipCardBack
          : CARDS_DATA.filter((n) => n.id === activeCard)[0].back,
      avatar,
      template: activeTab === "OTHER" ? activeCard : "VIP",
      vip: activeTab === "VIP",
      childId,
      fromAddChild,
    });
  };

  const switchTab = (tab: TabType) => {
    setActiveTab(tab);
    if (tab === "VIP") setActiveCard("VIP");
    else if (tab === "OTHER") setActiveCard("BLUJR_1");
  };

  const handleChosenCard = (index: number) => {
    switch (index) {
      case 0:
        return "BLUJR_1";
      case 1:
        return "BLUJR_2";
      case 2:
        return "BLUJR_3";
      case 3:
        return "BLUJR_4";
      case 4:
        return "BLUJR_5";
      default:
        return "VIP";
    }
  };

  const renderTabs = () => {
    return (
      <View style={styles.tabsWrapper}>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "VIP" && {
              backgroundColor: theme.ButtonBlueColor,
            },
          ]}
          onPress={() => switchTab("VIP")}
        >
          <FormattedText
            style={[
              styles.tabButtonText,
              {
                color: activeTab === "VIP" ? "#fff" : theme.ButtonBlueColor,
              },
            ]}
          >
            کارت با طرح دلخواه
          </FormattedText>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.tabButton,
            activeTab === "OTHER" && {
              backgroundColor: theme.ButtonBlueColor,
            },
          ]}
          onPress={() => switchTab("OTHER")}
        >
          <FormattedText
            style={[
              styles.tabButtonText,
              {
                color: activeTab === "OTHER" ? "#fff" : theme.ButtonBlueColor,
              },
            ]}
          >
            سایر طرح‌ها
          </FormattedText>
        </TouchableOpacity>
      </View>
    );
  };

  const renderVipTab = () => {
    return (
      <View style={styles.customTabContainer}>
        <FormattedText style={styles.pageTitle} fontFamily="Bold">
          کارت بانکی‌ با عکس دلخواه شما
        </FormattedText>
        <FormattedText style={styles.pageDescription}>
          با انتخاب این گزینه شما می‌توانید عکس فرزندتان را روی کارت او چاپ
          کنید.
        </FormattedText>
        <View style={styles.cardBuilderContainer}>
          <View style={styles.customCardBody}>
            <Image
              source={flip ? VipCardBack : VipCardFront}
              style={styles.customCardImage}
            />
            {!flip && !avatar && (
              <TouchableOpacity
                style={styles.avatarUploadButton}
                onPress={() => setImagePickerModal(true)}
              >
                <PlusIcon width={40} height={40} style={styles.plusIcon} />
                <FormattedText style={styles.avatarUploadText}>
                  آپلود عکس
                </FormattedText>
              </TouchableOpacity>
            )}
            {!flip && !!avatar && (
              <View style={styles.avatarWrapper}>
                <Image
                  style={styles.avatar}
                  source={{
                    uri: `data:image/png;base64, ${avatar}`,
                  }}
                />
                <TouchableOpacity
                  style={styles.avatarEditWrapper}
                  onPress={() => setImagePickerModal(true)}
                >
                  <FormattedText id="editImage" style={styles.avatarEdit} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.flipButtonContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() => setFlip(!flip)}
            >
              <FlipIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const renderOtherTab = () => {
    return (
      <View style={styles.otherTabContainer}>
        <View style={styles.otherTabTextWrapper}>
          <FormattedText style={styles.pageTitle} fontFamily="Bold">
            سایر طرح ها
          </FormattedText>
          <FormattedText style={styles.pageDescription}>
            با انتخاب این گزینه می‌توانید از بین کارت‌های پیشنهادی، یکی‌ را
            انتخاب کنید.
          </FormattedText>
        </View>
        <View style={styles.cardBuilderContainer}>
          <View style={styles.carouselContainer}>
            <Carousel
              data={CARDS_DATA}
              renderItem={_renderSlide}
              sliderWidth={width}
              itemWidth={254}
              inactiveSlideScale={0.8}
              inactiveSlideOpacity={0.7}
              containerCustomStyle={{ height: 166 }}
              onSnapToItem={(i: number) => {
                setActiveCard(handleChosenCard(i));
              }}
            />
          </View>

          <View style={styles.flipButtonContainer}>
            <TouchableOpacity
              style={styles.flipButton}
              onPress={() =>
                setFlipSecondary(
                  flipSecondary === activeCard ? null : activeCard
                )
              }
            >
              <FlipIcon />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  const _renderSlide = ({ item }: any) => {
    return (
      <TouchableOpacity
        style={styles.carouselSlide}
        key={item.id}
        onPress={() => {
          setActiveCard(item.id);
        }}
      >
        <Image
          source={flipSecondary === item.id ? item.back : item.front}
          style={styles.customCardImage}
        />
      </TouchableOpacity>
    );
  };

  const renderAvatarEdit = () => (
    <View>
      <View style={styles.imageUploadWrapper}>
        <TouchableOpacity
          onPress={() => {
            handleCamera(setAvatar, () => null);
            setImagePickerModal(false);
          }}
        >
          <CameraIcon />
          <FormattedText style={styles.uploadTitle}>دوربین</FormattedText>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            handleImagePicker(setAvatar, () => null);
            setImagePickerModal(false);
          }}
        >
          <GalleryIcon />
          <FormattedText style={styles.uploadTitle}>آلبوم</FormattedText>
        </TouchableOpacity>
        {!!avatar && avatar.length > 0 && (
          <TouchableOpacity
            onPress={() => {
              setAvatar("");
              setImagePickerModal(false);
            }}
          >
            <TrashIcon />
            <FormattedText style={styles.uploadTitle}>حذف</FormattedText>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );

  return (
    <Layout>
      <Header
        staticTitle={"defineCard"}
        handleBack={() => navigation.goBack()}
      />
      <View style={{ flex: 1 }}>
        {renderTabs()}

        {activeTab === "VIP" && renderVipTab()}

        {activeTab === "OTHER" && renderOtherTab()}
      </View>
      <View style={styles.buttonWrapper}>
        <Button
          title="ادامه"
          onPress={handleNextPage}
          color={theme.ButtonBlueColor}
        />
      </View>

      <ActionModalButtom
        showModal={imagePickerModal}
        setShowModal={() => setImagePickerModal(false)}
        containerStyle={{ height: 200 }}
      >
        {renderAvatarEdit()}
      </ActionModalButtom>
    </Layout>
  );
};

export default withTheme(DefineCard);
