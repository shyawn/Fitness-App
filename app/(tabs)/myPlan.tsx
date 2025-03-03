import DraggableList from "@/components/DraggableList";
import { AppDispatch, RootState } from "@/store/store";
import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
  FlatList,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useDispatch, useSelector } from "react-redux";
import { addWorkout, setWorkoutOrder } from "@/store/workoutPlan/workoutSlice";
import { ScrollView } from "react-native-virtualized-view";
import { Workout } from "@/types";
import { dummyExercises } from "@/constants";

export default function MyPlan() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [filteredList, setFilteredList] = useState(dummyExercises);
  const [showDropdown, setShowDropdown] = useState(false);

  const [workout, setWorkout] = useState({
    id: "",
    name: "",
    sets: "",
    weight: "",
  });

  const dispatch = useDispatch();
  const workoutList = useSelector((state: RootState) => state.workout);

  const toggleModal = () => {
    // console.log("LENGTH:", workoutList.length);
    setModalVisible(!modalVisible);
  };
  const submitWorkout = () => {
    dispatch(addWorkout({ ...workout, id: Date.now().toString() }));
    setWorkout({ id: "", name: "", sets: "", weight: "" });
    toggleModal();
  };

  useEffect(() => {
    if (searchText.trim() === "") {
      setFilteredList(dummyExercises);
    } else {
      const filtered = dummyExercises.filter((item) =>
        item.name.toLowerCase().includes(searchText.toLowerCase())
      );
      setFilteredList(filtered);
    }
  }, [searchText]);

  const handleSelect = (selectedItem) => {
    setSearchText(selectedItem);
    setWorkout((prev) => ({ ...prev, name: selectedItem }));
    setShowDropdown(false);
  };

  return (
    <View style={styles.container}>
      {workoutList.length === 0 && (
        <Text className="font-semibold text-gray-500">
          Add your workout plan
        </Text>
      )}

      <TouchableOpacity
        onPress={toggleModal}
        className="absolute p-1 right-7 top-10 bg-[#A9A9A9] rounded-full"
      >
        <Ionicons name="add" size={wp(5)} color="white" />
      </TouchableOpacity>

      {modalVisible && (
        // Popup modal to add workout
        <Modal animationType="fade" transparent={true} visible={modalVisible}>
          <View style={styles.centeredView}>
            <View
              style={[styles.modalView, { width: wp(80) }]}
              className="bg-white rounded-xl p-[20px] pt-[50px] items-center"
            >
              <TextInput
                className="w-full rounded-lg border-[1px] border-[#A9A9A9]"
                placeholder="Search.."
                value={workout.name}
                onChangeText={(text) => {
                  setSearchText(text);
                  setWorkout((prev) => ({ ...prev, name: text }));
                  setShowDropdown(true);
                }}
              />
              {showDropdown && (
                <FlatList
                  style={{ width: "100%", maxHeight: hp(30) }}
                  data={filteredList}
                  keyExtractor={(item) => item.id.toString()}
                  renderItem={({ item }) => (
                    <TouchableOpacity
                      style={styles.listItem}
                      onPress={() => handleSelect(item.name)}
                    >
                      <Text>{item.name}</Text>
                    </TouchableOpacity>
                  )}
                />
              )}

              <View className="flex flex-row justify-around mt-1 mb-3 gap-10">
                <TextInput
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: "#A9A9A9",
                  }}
                  placeholder="Sets"
                  value={workout.sets}
                  keyboardType="numeric"
                  onChangeText={(text) =>
                    setWorkout((prev) => ({ ...prev, sets: text }))
                  }
                />
                <TextInput
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: "#A9A9A9",
                  }}
                  placeholder="Weight"
                  value={workout.weight}
                  keyboardType="numeric"
                  onChangeText={(text) => {
                    setWorkout({ ...workout, weight: text });
                  }}
                />
              </View>

              <TouchableOpacity
                onPress={toggleModal}
                className="absolute right-3 top-3"
              >
                <Ionicons name="close" size={hp(3)} color="gray" />
              </TouchableOpacity>

              <TouchableOpacity
                onPress={submitWorkout}
                className="w-full bg-rose-500 p-2 rounded-lg flex items-center"
              >
                <Text className="font-semibold text-white">Add workout</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, .5)",
  },
  modalView: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  listItem: {
    padding: 10,
    borderWidth: 1,
    borderColor: "#eee",
    backgroundColor: "#fefefd",
  },
});
