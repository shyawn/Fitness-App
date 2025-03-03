import React, { useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import { Workout } from "@/types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function DraggableList({ data }) {
  const [newData, setNewData] = useState(data);

  function keyExtractor(item: Workout) {
    return item.id;
  }

  function deleteWorkout(name) {
    setNewData(newData.filter((item) => item.name !== name));
  }

  function renderItem(info: DragListRenderItemInfo<Workout>) {
    const { item, onDragStart, onDragEnd } = info;
    // console.log("item: ", item);
    return (
      <TouchableOpacity
        key={item.id}
        onPressIn={onDragStart}
        onPressOut={onDragEnd}
        className="w-80 p-3 border-[1px] border-[#A9A9A9] rounded-lg flex flex-row justify-between items-center"
      >
        <View className="flex">
          <Text className="font-semibold text-[15px]">{item?.name}</Text>
          <Text className="text-[13px] text-[#636363]">
            {item?.sets} x {item?.weight} {item.weight ? "kg" : "sets"}
          </Text>
        </View>
        <TouchableOpacity
          className="bg-rose-500 rounded-full p-[1px]"
          onPress={() => deleteWorkout(item.name)}
        >
          <Ionicons name="remove-outline" size={hp(3)} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  function onReordered(fromIndex: number, toIndex: number) {
    const reorderedList = [...newData]; // Make a copy of store data instead of modifying
    const [movedItem] = reorderedList.splice(fromIndex, 1);
    reorderedList.splice(toIndex, 0, movedItem); // Insert movedItem at new position to reorder

    setNewData(reorderedList);
    // console.log("new data:", newData);
  }

  return (
    <View>
      <DragList
        data={newData}
        keyExtractor={(item) => keyExtractor(item)}
        onReordered={onReordered}
        renderItem={renderItem}
      />
    </View>
  );
}
