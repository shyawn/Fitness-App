import "./global.css";

import { registerRootComponent } from "expo";
import { ExpoRoot } from "expo-router";
import { PersistGate } from "redux-persist/integration/react";

// Must be exported or Fast Refresh won't update the context
// export function App() {
//   const ctx = require.context("./app");
//   return (
//     <PersistGate loading={<Text>Loading...</Text>} persistor={persistor}>
//       <ExpoRoot context={ctx} />
//     </PersistGate>
//   );
// }
export function App() {
  const ctx = require.context("./app");
  return <ExpoRoot context={ctx} />;
}

registerRootComponent(App);
