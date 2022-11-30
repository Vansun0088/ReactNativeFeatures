import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import GlobalStyles from "../../constants/GlobalStyles";

export default function ListItem({ place, setPlaces }) {
  const navigation = useNavigation();

  function buttonHandler() {
    navigation.navigate("PlaceDetails", {
      title: place.title,
      placeId: place.id,
    });
  }

  return (
    <Pressable
      style={({ pressed }) => [styles.container, pressed && styles.pressed]}
      onPress={buttonHandler}
    >
      <Image style={styles.image} source={{ uri: place.imageUri }} />
      <View style={styles.descriptionContainer}>
        <Text style={styles.title}>{place.title}</Text>
        <Text>{place.address}</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: GlobalStyles.Colors.globalBlue,
    marginVertical: 10,
    borderRadius: 15,
    minHeight: 120,
    flexDirection: "row",
    alignItems: "flex-start",
    elevation: 2,
    shadowColor: "black",
    shadowOpacity: 0.15,
    shadowOffset: { width: 1, height: 1 },
    shadowRadius: 2,
  },
  pressed: {
    opacity: 0.45,
  },
  image: {
    flex: 1,
    width: "100%",
    height: "100%",
    borderTopLeftRadius: 15,
    borderBottomLeftRadius: 15,
  },
  descriptionContainer: {
    flex: 2,
    paddingVertical: 15,
    paddingHorizontal: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 5,
  },
});
