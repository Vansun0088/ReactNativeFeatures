import { useLayoutEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

import HollowButton from "../components/UI/HollowButton";
import GlobalStyles from "../constants/GlobalStyles";

export default function PlaceDetails({ navigation, route }) {
  const title = route.params.title;
  const location = route.params.location;
  const imageUri = route.params.imageUri;

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
    });
  });

  return (
    <View style={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: imageUri }} />
      </View>
      <Text style={styles.text}>{location}</Text>
      <HollowButton
        iconName="map"
        color={GlobalStyles.Colors.globalBlue}
        iconSize={20}
        text="View on Map"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    maxHeight: 350,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 5,
  },
  text: {
    color: GlobalStyles.Colors.globalBlue,
  },
});
