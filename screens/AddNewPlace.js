import { useState } from "react";
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  ScrollView,
  Image,
  Pressable,
  Dimensions,
} from "react-native";

import HollowButton from "../components/UI/HollowButton";
import GlobalStyles from "../constants/GlobalStyles";

const windowHeight = Dimensions.get("window").height;

export default function AddNewPlace() {
  const [imageUri, setImage] = useState("");
  const [enteredText, setEnteredText] = useState("");

  function changeTextHandler(enteredText) {
    setEnteredText(enteredText);
  }

  function takeImage() {
    setImage(
      "https://upload.wikimedia.org/wikipedia/commons/4/47/New_york_times_square-terabass.jpg"
    );
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <Text style={styles.title}>Title</Text>
      <TextInput onChangeText={changeTextHandler} value={enteredText} style={styles.input} />
      <View style={styles.imageContainer}>
        {!imageUri || imageUri.length === 0 ? (
          <Text>No picture was chosen yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: imageUri }} />
        )}
      </View>
      <HollowButton
        iconName="camera"
        color={GlobalStyles.Colors.globalBlue}
        iconSize={20}
        text="Take Image"
        style={{ width: "95%", alignSelf: "stretch", alignSelf: "center" }}
        onPress={takeImage}
      />
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={require("../assets/icon.png")} />
      </View>
      <View style={styles.buttons}>
        <HollowButton
          iconName="location"
          color={GlobalStyles.Colors.globalBlue}
          iconSize={20}
          text="Locate User"
        />
        <HollowButton
          iconName="map"
          color={GlobalStyles.Colors.globalBlue}
          iconSize={20}
          text="Pick on Map"
        />
      </View>
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
  imageContainer: {
    width: "100%",
    height: 200,
    borderRadius: 5,
    backgroundColor: GlobalStyles.Colors.globalBlue,
    marginVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-evenly",
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
