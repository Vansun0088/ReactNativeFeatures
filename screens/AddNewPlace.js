import {
  StyleSheet,
  Text,
  TextInput,
  ScrollView,
  Pressable,
  Dimensions,
  Alert,
} from "react-native";
import { useCallback, useState } from "react";

import ImagePicker from "../components/Pickers/ImagePicker";
import LocationPicker from "../components/Pickers/LocationPicker";
import GlobalStyles from "../constants/GlobalStyles";
import { getAddress } from "../util/location";
import { Place } from "../models/place";
import { insertPlace } from "../util/database";

const windowHeight = Dimensions.get("window").height;

export default function AddNewPlace({ route, navigation }) {
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();
  const [enteredText, setEnteredText] = useState("");
  const coordinates = route.params?.coordinates;

  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }

  const pickLocationHandler = useCallback(async (location) => {
    const address = await getAddress(location.lat, location.lng);
    setPickedLocation({ address, ...location });
  }, []);

  function changeTextHandler(enteredText) {
    setEnteredText(enteredText);
  }

  function addPlaceHandler() {
    if (!enteredText || !selectedImage || !pickedLocation) {
      Alert.alert(
        "Please fill every field",
        "You need to write title, take image and pick location"
      );
      return;
    }
    async function addPlace() {
      const placeData = new Place(enteredText, selectedImage, pickedLocation);
      await insertPlace(placeData);
      navigation.navigate("FavoritePlaces");
    }
    addPlace();
  }

  return (
    <ScrollView style={styles.rootContainer}>
      <Text style={styles.title}>Title</Text>
      <TextInput onChangeText={changeTextHandler} value={enteredText} style={styles.input} />
      <ImagePicker onTakeImage={takeImageHandler} />
      <LocationPicker currentLocation={coordinates} onPickLocation={pickLocationHandler} />
      <Pressable
        style={({ pressed }) => [styles.addButton, pressed && styles.pressed]}
        onPress={addPlaceHandler}
      >
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
    paddingHorizontal: 12,
    paddingVertical: 12,
    marginTop: 5,
    marginBottom: 50,
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center",
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  addButtonText: {
    color: "white",
    fontSize: 16,
  },
  pressed: {
    opacity: 0.45,
  },
});
