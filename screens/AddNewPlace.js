import { useState } from "react";
import { StyleSheet, Text, TextInput, ScrollView, Pressable, Dimensions } from "react-native";

import ImagePicker from "../components/Pickers/ImagePicker";
import LocationPicker from "../components/Pickers/LocationPicker";
import GlobalStyles from "../constants/GlobalStyles";

const windowHeight = Dimensions.get("window").height;

export default function AddNewPlace({ route }) {
  const [enteredText, setEnteredText] = useState("");
  const coordinates = route.params?.coordinates;

  function changeTextHandler(enteredText) {
    setEnteredText(enteredText);
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <Text style={styles.title}>Title</Text>
      <TextInput onChangeText={changeTextHandler} value={enteredText} style={styles.input} />
      <ImagePicker />
      <LocationPicker currentLocation={coordinates} />
      <Pressable style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}>
        <Text style={styles.addButtonText}>Add Place</Text>
      </Pressable>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    paddingHorizontal: "5%",
    paddingTop: 25,
    height: windowHeight + 40,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: GlobalStyles.Colors.globalBlue,
  },
  input: {
    borderRadius: 2,
    backgroundColor: "#A1DDFC",
    marginVertical: 10,
    paddingVertical: 15,
    paddingHorizontal: 5,
    fontSize: 18,
  },
  addButton: {
    backgroundColor: "#013B8A",
    height: 50,
    marginTop: 5,
    marginBottom: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
  pressed: {
    opacity: 0.45,
  },
});
