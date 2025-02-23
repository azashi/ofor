import { PropsWithChildren } from "react";
import { Pressable, Text, ViewStyle } from "react-native";

export const Button: React.FC<
  PropsWithChildren & { onPress: () => void; style?: ViewStyle }
> = ({ children, onPress, style }) => {
  return (
    <Pressable
      style={[
        {
          borderWidth: 1,
          padding: 16,
          borderRadius: 16,
          minWidth: 200,
          alignItems: "center",
        },
        style,
      ]}
      onPress={onPress}
    >
      <Text style={{ fontSize: 18, fontWeight: 500 }}>{children}</Text>
    </Pressable>
  );
};
