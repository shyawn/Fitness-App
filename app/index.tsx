import { Image, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import "../global.css";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export default function Index() {
  return (
    <View className="flex-1 flex justify-end">
      <StatusBar style="light" />
      <Image
        className="h-full w-full absolute"
        source={require("../assets/images/welcome.png")}
      />
    </View>
  );
}
