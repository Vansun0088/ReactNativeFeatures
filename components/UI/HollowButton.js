import { Pressable, StyleSheet, Text } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function HollowButton({ iconName, color, iconSize, text, style, onPress }) {
  return (
    <Pressable onPress={onPress} style={[styles.container, { borderColor: color }, style]}>
      <Ionicons name={iconName} color={color} size={iconSize} />
      <Text style={[styles.text, { color: color }]}>{text}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    marginVertical: 5,
    alignSelf: "center",
    borderRadius: 2,
    flexDirection: "row",
    padding: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    fontSize: 16,
    paddingHorizontal: 5,
  },
});
