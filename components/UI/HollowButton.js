import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HollowButton({ iconName, color, iconSize, text, onPress }) {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [styles.container, { borderColor: color }, pressed && styles.pressed]}
    >
      <Ionicons name={iconName} color={color} size={iconSize} />
      <Text style={[styles.text, { color: color }]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    padding: 10,
    margin: 5,
    borderRadius: 2,
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
  },
  pressed: {
    opacity: 0.7,
  },
  text: {
    fontSize: 16,
    marginHorizontal: 5,
  },
});
