import { useState } from "react";
import { FlatList, StyleSheet, Text, Pressable } from "react-native";
import GlobalStyles from "../../constants/GlobalStyles";
import { useNavigation } from "@react-navigation/native";

import ListItem from "./ListItem";

export default function List({ data }) {
  const [places, setPlaces] = useState([
    {
      title: "MyTV",
      location: "USA California",
      imageUri:
        "https://www.tourmyindia.com/blog//wp-content/uploads/2020/11/Taj-Mahal-Agra-feature.jpg",
    },
  ]);
  const navigation = useNavigation();

  function addingTextHandler() {
    navigation.navigate("AddNewPlace");
  }

  if (!places || places.length === 0) {
    return (
      <Pressable
        onPress={addingTextHandler}
        style={({ pressed }) => [styles.fallbackContainer, pressed && styles.pressed]}
      >
        <Text style={styles.fallbackText}>No places added yet - start adding some</Text>
      </Pressable>
    );
  }

  return (
    <FlatList
      style={styles.list}
      data={places}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => <ListItem place={item} />}
    />
  );
}

const styles = StyleSheet.create({
  list: {
    width: "100%",
    flex: 1,
    paddingVertical: 30,
  },
  fallbackContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  pressed: {
    opacity: 0.45,
  },
  fallbackText: {
    fontSize: 16,
    color: GlobalStyles.Colors.globalBlue,
  },
});
