import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import { useEffect } from "react";
import { RealmProvider } from "@realm/react";
import "react-native-reanimated";
import { Todo } from "@/db/schema";

// import { Realm } from "realm";
// Realm.deleteFile({ path: Realm.defaultPath });

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
  });

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <RealmProvider schema={[Todo]} schemaVersion={0}>
      <Stack screenOptions={{ headerShown: true }}>
        <Stack.Screen name="index" options={{ title: "Home" }} />
        <Stack.Screen name="SimpleList" options={{ title: "Simple List" }} />
        <Stack.Screen name="LargeList" options={{ title: "Large List" }} />
        <Stack.Screen name="+not-found" options={{ title: "Not Found" }} />
      </Stack>
    </RealmProvider>
  );
}
