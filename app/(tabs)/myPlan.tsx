import DraggableList from "@/components/DraggableList";
import { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Modal,
  TouchableOpacity,
} from "react-native";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";

export default function MyPlan() {
  const [modalVisible, setModalVisible] = useState(false);
  const [searchWorkout, setSearchWorkout] = useState("");
  const [workoutRounds, setWorkoutRounds] = useState("");
  const [weight, setWeight] = useState("");
  const [workoutList, setWorkoutList] = useState([]);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const addWorkout = () => {
    const workout = {
      id: workoutList.length,
      name: searchWorkout,
      sets: workoutRounds,
      weight: weight,
    };
    setSearchWorkout("");
    setWorkoutRounds("");
    setWeight("");
    workoutList.push(workout);
    toggleModal();
  };
  const deleteWorkout = (name) => {
    setWorkoutList(workoutList.filter((item) => item.name !== name));
  };
  const validateWorkoutRounds = (set) => {
    const number = set.replace("/[0^9/g", "");
    setWorkoutRounds(number);
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

      {/* <Modal isVisible={modalVisible}>
        <Modal.Container>
          <View>
            <Modal.Body>
              <TouchableOpacity
                onPress={toggleModal}
                className="absolute right-3 top-3"
              >
                <Ionicons name="close" size={hp(3)} color="gray" />
              </TouchableOpacity>

              <TextInput
                className="w-full mb-2 rounded-lg border-[1px] border-[#A9A9A9]"
                placeholder="Search.."
                value={searchWorkout}
                onChangeText={(text) => {
                  setSearchWorkout(text);
                }}
              />
              <View className="flex flex-row justify-around mb-3 gap-10">
                <TextInput
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: "#A9A9A9",
                  }}
                  placeholder="Sets"
                  value={workoutRounds}
                  // keyboardType="numeric"
                  onChangeText={(text) => {
                    validateWorkoutRounds(text);
                  }}
                />
                <TextInput
                  style={{
                    flex: 1,
                    borderBottomWidth: 1,
                    borderColor: "#A9A9A9",
                  }}
                  placeholder="Weight"
                  value={weight}
                  // keyboardType="numeric"
                  onChangeText={(text) => {
                    setWeight(text);
                  }}
                />
              </View>
              <TouchableOpacity
                onPress={addWorkout}
                className="w-full bg-rose-500 p-2 rounded-lg flex items-center"
              >
                <Text className="font-semibold text-white">Add workout</Text>
              </TouchableOpacity>
            </Modal.Body>
          </View>
        </Modal.Container>
      </Modal> */}

      <Modal animationType="fade" transparent={true} visible={modalVisible}>
        <View style={styles.centeredView}>
          <View
            style={[styles.modalView, { width: wp(80) }]}
            className="bg-white rounded-xl p-[20px] pt-[50px] items-center"
          >
            <TextInput
              className="w-full mb-2 rounded-lg border-[1px] border-[#A9A9A9]"
              placeholder="Search.."
              value={searchWorkout}
              onChangeText={(text) => {
                setSearchWorkout(text);
              }}
            />
            <View className="flex flex-row justify-around mb-3 gap-10">
              <TextInput
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderColor: "#A9A9A9",
                }}
                placeholder="Sets"
                value={workoutRounds}
                keyboardType="numeric"
                onChangeText={(text) => {
                  validateWorkoutRounds(text);
                }}
              />
              <TextInput
                style={{
                  flex: 1,
                  borderBottomWidth: 1,
                  borderColor: "#A9A9A9",
                }}
                placeholder="Weight"
                value={weight}
                keyboardType="numeric"
                onChangeText={(text) => {
                  setWeight(text);
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
              onPress={addWorkout}
              className="w-full bg-rose-500 p-2 rounded-lg flex items-center"
            >
              <Text className="font-semibold text-white">Add workout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* {workoutList.map((item: any) => {
        return (
          <View className="w-80 p-3 border-[1px] border-[#A9A9A9] rounded-lg flex flex-row justify-between items-center">
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
          </View>
        );
      })} */}

      {workoutList.length > 0 && (
        <View>
          <DraggableList
            data={workoutList}
            onReordered={(updatedData) => setWorkoutList(updatedData)}
          />
        </View>
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
});
