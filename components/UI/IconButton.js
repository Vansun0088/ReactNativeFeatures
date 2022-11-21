import { Pressable, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function IconButton({ name, color, size, onPress }) {
  return (
    <Pressable
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
      onPress={onPress}
    >
      <Ionicons name={name} color={color} size={size} />
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingRight: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.45,
  },
});
