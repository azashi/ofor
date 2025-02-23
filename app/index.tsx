import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useRouter } from "expo-router";
import { Button } from "@/components/Button";

export default function HomeScreen() {
  const insets = useSafeAreaInsets();

  const router = useRouter();

  return (
    <View
      style={{
        paddingTop: insets.top,
        flex: 1,
        alignItems: "center",
      }}
    >
      <View style={{ marginTop: 64, gap: 24 }}>
        <Button
          onPress={() => {
            router.push("/SimpleList");
          }}
        >
          Simple Todo List
        </Button>
        <Button
          onPress={() => {
            router.push("/LargeList");
          }}
        >
          Large Todo List
        </Button>
      </View>
    </View>
  );
}
