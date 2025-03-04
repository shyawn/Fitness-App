import { Stack } from "expo-router/stack";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { PersistGate } from "redux-persist/integration/react";
import { persistor } from "../store/store";
import { ActivityIndicator, View } from "react-native";

export default function RootLayout() {
  const renderLoading = () => {
    return (
      <View>
        <ActivityIndicator size={"large"} />
      </View>
    );
  };
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} loading={renderLoading()}>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </PersistGate>
    </Provider>
  );
}
