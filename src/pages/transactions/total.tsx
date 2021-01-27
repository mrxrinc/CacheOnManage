import React from "react";
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  FlatList,
} from "react-native";
import Header from "./header";
import Item from "./item";
import Timeline from "./timeline";

const Total = (props: any) => {
  return (
    <SafeAreaView style={styles.container}>
      <Header title="تراکنش‌ها" />
      <Timeline />
      <FlatList
        style={styles.content}
        contentContainerStyle={styles.contentFlatList}
        data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12]}
        renderItem={() => <Item />}
      />
    </SafeAreaView>
  );
};
export default Total;
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  content: {
    backgroundColor: "#f4f6fa",
    flex: 1,
  },
  contentFlatList: {
    paddingVertical: 20,
  },
});
