import { Text, TouchableOpacity, View } from "react-native";
import DragList, { DragListRenderItemInfo } from "react-native-draglist";
import { Workout } from "@/types";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../store/store";
import {
  deleteWorkout,
  setWorkoutOrder,
} from "@/store/workoutPlan/workoutSlice";

export default function DraggableList() {
  const dispatch = useDispatch<AppDispatch>();

  const workoutList = useSelector((state: RootState) => state.workout);

  function keyExtractor(item: Workout) {
    return item.id;
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
          onPress={() => {
            dispatch(deleteWorkout(item));
          }}
        >
          <Ionicons name="remove-outline" size={hp(3)} color="white" />
        </TouchableOpacity>
      </TouchableOpacity>
    );
  }

  function onReordered(fromIndex: number, toIndex: number) {
    const reorderedList = [...workoutList]; // Make a copy of store data instead of modifying
    const [movedItem] = reorderedList.splice(fromIndex, 1);
    reorderedList.splice(toIndex, 0, movedItem); // Insert movedItem at new position to reorder
    // console.log("new data:", newData);
    dispatch(setWorkoutOrder(reorderedList));
  }

  return (
    <View>
      <DragList
        data={workoutList}
        keyExtractor={(item) => keyExtractor(item)}
        onReordered={onReordered}
        renderItem={renderItem}
      />
    </View>
  );
}
