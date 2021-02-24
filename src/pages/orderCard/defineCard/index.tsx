import React, { FC, useState } from "react";
import { View, TouchableOpacity, Image } from "react-native";
import Carousel from "react-native-snap-carousel";
import { colors, width } from "constants/index";
import { FormattedText } from "components/format-text";
import Header from "components/header";
import Layout from "components/layout";
import styles from "./styles";
import Button from "components/button";
import { withTheme } from "themeCore/themeProvider";
import VipCardFront from "images/card-design/custom-front.png";
import VipCardBack from "images/card-design/custom-back.png";
import PlusIcon from "components/icons/plus.svg";
import FlipIcon from "components/icons/flip.svg";
import CARDS_DATA from "./assets/cards";

type TabType = "VIP" | "OTHER";

const DefineCard: FC = ({ navigation, theme }: any) => {
  const [activeTab, setActiveTab] = useState<TabType>("VIP");
  const [flip, setFlip] = useState<boolean>(false);
  const [flipSecondary, setFlipSecondary] = useState<number | null>(null);
  const [activeCard, setActiveCard] = useState<number>(5);

  const handleNextPage = () => {
    navigation.navigate("confirmCard", {
      frontImage:
        activeTab === "VIP"
          ? VipCardFront
          : CARDS_DATA[reverseIndex(activeCard, 5)].front,
      backImage:
        activeTab === "VIP"
          ? VipCardBack
          : CARDS_DATA[reverseIndex(activeCard, 5)].back,
    });
  };

  const reverseIndex = (min: number, max: number) => {
    return max - min;
  };

  const switchTab = (tab: TabType) => {
    setActiveTab(tab);
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
            {!flip && (
              <TouchableOpacity style={styles.avatarUploadButton}>
                <PlusIcon width={40} height={40} style={styles.plusIcon} />
                <FormattedText style={styles.avatarUploadText}>
                  آپلود عکس
                </FormattedText>
              </TouchableOpacity>
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
                setActiveCard(reverseIndex(i, 5));
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
    </Layout>
  );
};

export default withTheme(DefineCard);
