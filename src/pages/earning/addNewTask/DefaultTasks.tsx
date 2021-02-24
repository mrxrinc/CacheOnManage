import React from "react";
import { FlatList } from "react-native";
import TaskItem from "./taskItem";

const DefaultTasks = (props: any) => {
  const { defaulTask, onItem, isVisible } = props;
  return (
    <>
      {isVisible ? (
        <FlatList
          scrollEnabled={false}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          data={defaulTask}
          keyExtractor={(item: any) => item.id.toString()}
          renderItem={({ item }) => (
            <TaskItem
              taskName={item.taskName}
              icon={item.icon}
              amount={item.amount}
              onPress={onItem}
            />
          )}
        />
      ) : null}
    </>
  );
};

export default DefaultTasks;
