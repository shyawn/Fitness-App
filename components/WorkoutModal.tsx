import {
  View,
  Text,
  Modal,
  StyleSheet,
  TextInput,
  FlatList,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useState } from "react";
import { dummyExercises } from "@/constants";
import { useDispatch } from "react-redux";
import { addWorkout } from "@/store/workoutPlan/workoutSlice";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import Ionicons from "react-native-vector-icons/Ionicons";
import ScrollPicker from "react-native-wheel-scrollview-picker";
// import DatePicker, { getFormatedDate } from "react-native-modern-datepicker";

export default function WorkoutModal({ modalVisible, setModalVisible }) {
  const [filteredList, setFilteredList] = useState(dummyExercises);
  const [showDropdown, setShowDropdown] = useState(false);
  const [searchText, setSearchText] = useState("");
  // const [openStartDatePicker, setOpenStartDatePicker] = useState(false);

  // const today = new Date();
  // const startDate = getFormatedDate(
  //   today.setDate(today.getDate() + 1),
  //   "YYYY/MM/DD"
  // );
  // const [selectedStartDate, setSelectedStartDate] = useState("");
  // const [startedDate, setStartedDate] = useState("12/12/2023");

  // const handleChangeStartDate = (propDate) => {
  //   setStartedDate(propDate);
  // };

  const [workout, setWorkout] = useState({
    id: "",
    name: "",
    day: "",
    sets: "",
    weight: "",
  });

  const dispatch = useDispatch();

  const toggleModal = () => {
    setModalVisible(false);
  };
  const submitWorkout = () => {
    dispatch(addWorkout({ ...workout, id: Date.now().toString() }));
    setWorkout({ id: "", name: "", day: "", sets: "", weight: "" });
    toggleModal();
    console.log("submit workout: ", workout);
  };
  const handleSelect = (selectedItem: string) => {
    setSearchText(selectedItem);
    setWorkout((prev) => ({ ...prev, name: selectedItem }));
    setShowDropdown(false);
  };
  // const handleOnPressStartDate = () => {
  //   setOpenStartDatePicker(!openStartDatePicker);
  // };

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

  return (
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

          <View className="w-full mt-3 h-[100px]">
            <Text className="text-neutral-600">Select Date</Text>
            <ScrollPicker
              dataSource={[
                "Monday",
                "Tuesday",
                "Wednesday",
                "Thursday",
                "Friday",
                "Saturday",
                "Sunday",
              ]}
              selectedIndex={1}
              renderItem={(data, index) => (
                <View key={index} className="items-center">
                  <Text className="">{data}</Text>
                </View>
              )}
              onValueChange={(data, selectedIndex) => {
                console.log("Selected:", data, "Index:", selectedIndex);
                setWorkout((prev) => ({ ...prev, day: data }));
              }}
              wrapperHeight={90}
              wrapperBackground="#FFFFFF"
              itemHeight={40}
              highlightColor="#d8d8d8"
              highlightBorderWidth={2}
            />
            {/* <TouchableOpacity
              className="my-1 p-2 pl-1 rounded-lg border-[1px] border-[#A9A9A9]"
              onPress={handleOnPressStartDate}
            >
              <Text>{selectedStartDate}</Text>
            </TouchableOpacity> */}
          </View>

          {/* Date picker modal */}
          {/* <Modal
            animationType="slide"
            transparent={true}
            visible={openStartDatePicker}
          >
            <View style={styles.centeredDateView}>
              <View style={styles.modalDateView}>
                <DatePicker
                  mode="calendar"
                  minimumDate={startDate}
                  selected={startedDate}
                  onDateChanged={(date) => handleChangeStartDate(date)}
                  onSelectedChange={(date) => setSelectedStartDate(date)}
                  options={{
                    backgroundColor: "#080516",
                    textHeaderColor: "#469ab6",
                    textDefaultColor: "#FFFFFF",
                    selectedTextColor: "#FFF",
                    mainColor: "#469ab6",
                    textSecondaryColor: "#FFFFFF",
                    borderColor: "rgba(122, 146, 165, 0.1)",
                  }}
                />
                <TouchableOpacity onPress={handleOnPressStartDate}>
                  <Text style={{ color: "white" }}>Close</Text>
                </TouchableOpacity>
              </View>
            </View>
          </Modal> */}

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
  );
}

const styles = StyleSheet.create({
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
  // centeredDateView: {
  //   flex: 1,
  //   alignItems: "center",
  //   justifyContent: "center",
  // },
  // modalDateView: {
  //   margin: 20,
  //   backgroundColor: "#080516",
  //   alignItems: "center",
  //   justifyContent: "center",
  //   borderRadius: 20,
  //   padding: 35,
  //   width: "90%",
  //   shadowColor: "#000",
  //   shadowOffset: {
  //     width: 0,
  //     height: 2,
  //   },
  //   shadowOpacity: 0.25,
  //   shadowRadius: 4,
  //   elevation: 5,
  // },
});
