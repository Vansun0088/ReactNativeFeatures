import { useLayoutEffect, useState } from "react";
import { StyleSheet, Text, View, Image, Pressable, Alert, ScrollView } from "react-native";

import HollowButton from "../components/UI/HollowButton";
import GlobalStyles from "../constants/GlobalStyles";
import { deletePlace, fetchPlaceDetails } from "../util/database";

export default function PlaceDetails({ navigation, route }) {
  const [place, setPlace] = useState({});
  const selectedPlaceId = route.params.placeId;
  const title = route.params.title;

  function deleteHandler() {
    Alert.alert("Do you want to delete this place?", "", [
      {
        text: "Confirm",
        onPress: () => {
          deletePlace(selectedPlaceId);
          navigation.goBack();
        },
        style: "destructive",
      },
      { text: "Back", style: "cancel" },
    ]);
  }

  useLayoutEffect(() => {
    async function handle() {
      const place = await fetchPlaceDetails(selectedPlaceId);
      setPlace(place);
    }
    handle();
  }, [selectedPlaceId]);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: title,
      headerRight: () => (
        <Pressable
          style={({ pressed }) => [styles.deleteButton, pressed && styles.pressed]}
          onPress={deleteHandler}
        >
          <Text style={styles.deleteText}>Delete</Text>
        </Pressable>
      ),
    });
  });

  function viewMapHandler() {
    navigation.navigate("Map", {
      lat: place.lat,
      lng: place.lng,
      watch: true,
    });
  }

  function viewPhoto() {
    navigation.navigate("Photo", {
      uri: place.imageUri,
    });
  }

  if (!place) {
    return (
      <View style={styles.fallback}>
        <Text>Loading place data...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.rootContainer}>
        <Pressable onPress={viewPhoto} style={styles.imageContainer}>
          <Image style={styles.image} source={{ uri: place.imageUri }} />
        </Pressable>
        <Text style={styles.text}>{place.address}</Text>
        <HollowButton
          iconName="map"
          color={GlobalStyles.Colors.globalBlue}
          iconSize={20}
          text="View on Map"
          onPress={viewMapHandler}
        />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  fallback: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  rootContainer: {
    flex: 1,
    alignItems: "center",
  },
  deleteButton: {
    padding: 5,
  },
  pressed: {
    opacity: 0.45,
  },
  deleteText: {
    fontSize: 16,
    color: "#ee2323",
    fontWeight: "400",
  },
  imageContainer: {
    width: "100%",
    height: "35%",
    minHeight: 300,
    marginBottom: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  text: {
    color: GlobalStyles.Colors.globalBlue,
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 5,
  },
});
