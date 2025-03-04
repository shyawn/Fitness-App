import DraggableList from "@/components/DraggableList";
import { RootState } from "@/store/store";
import { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { setWorkoutOrder } from "@/store/workoutPlan/workoutSlice";
import { ScrollView } from "react-native-virtualized-view";
import { Workout } from "@/types";
import WorkoutModal from "@/components/WorkoutModal";
import Schedule from "@/components/Schedule";
import { StatusBar } from "expo-status-bar";

export default function MyPlan() {
  const [modalVisible, setModalVisible] = useState(false);

  const dispatch = useDispatch();
  const workoutList = useSelector((state: RootState) => state.workout);

  const toggleModal = () => {
    // console.log("LENGTH:", workoutList.length);
    setModalVisible(!modalVisible);
  };

  return (
    <SafeAreaView className="flex-1 bg-white flex space-y-5" edges={["top"]}>
      <StatusBar style="auto" />
      <View style={styles.container}>
        <Schedule />
        {workoutList.length === 0 && (
          <Text className="font-semibold text-gray-500">
            Add your workout plan
          </Text>
        )}

        <TouchableOpacity
          onPress={toggleModal}
          className="absolute p-1 right-7 top-32 mt-2 bg-[#A9A9A9] rounded-full"
        >
          <Ionicons name="add" size={wp(5)} color="white" />
        </TouchableOpacity>

        {modalVisible && (
          <WorkoutModal
            modalVisible={modalVisible}
            setModalVisible={setModalVisible}
          />
        )}

        {workoutList.length > 0 && (
          <ScrollView style={{ paddingVertical: hp(15) }}>
            <DraggableList
              data={workoutList}
              onReordered={(updatedData: Workout[]) => {
                // console.log("Updated order:", updatedData);
                dispatch(setWorkoutOrder(updatedData));
              }}
            />
          </ScrollView>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
