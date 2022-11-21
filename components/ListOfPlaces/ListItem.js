import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GlobalStyles from "../../constants/GlobalStyles";

export default function ListItem({ place }) {
  const navigation = useNavigation();

  function buttonHandler() {
    navigation.navigate("PlaceDetails", {
      title: place.title,
      location: place.location,
      imageUri: place.imageUri,
    });
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={buttonHandler}
    >
      <View style={styles.pictureContainer}>
        <Image style={styles.image} source={{ uri: place.imageUri }} />
      </View>
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <Text>{place.location}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: GlobalStyles.Colors.globalBlue,
    borderRadius: 15,
    minHeight: 120,
    flexDirection: "row",
    overflow: "hidden",
  },
  pressed: {
    opacity: 0.45,
  },
  pictureContainer: {
    flex: 1,
    width: "33%",
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
  },
  descriptionContainer: {
    flex: 2,
    width: "66%",
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
