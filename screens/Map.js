import { useCallback, useEffect, useLayoutEffect, useState } from "react";
import { Alert, Pressable, StyleSheet, Text } from "react-native";
import MapView, { Marker } from "react-native-maps";

export default function Map({ route, navigation }) {
  const [selectedLocation, setSelectedLocation] = useState();
  const currentLocation = {
    lat: route.params?.lat,
    lng: route.params?.lng,
  };

  const region = {
    latitude: currentLocation ? currentLocation.lat : 54,
    longitude: currentLocation ? currentLocation.lng : 25,
    latitudeDelta: currentLocation ? 0.0922 : 20,
    longitudeDelta: currentLocation ? 0.0421 : 20,
  };

  function selectLocationHandler(event) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    setSelectedLocation({ lat: lat, lng: lng });
  }

  const chooseHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert("No place chosen yet!", "You need to choose a place");
      return;
    }
    navigation.navigate("AddNewPlace", {
      coordinates: selectedLocation,
    });
  }, [navigation, selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }) => (
        <Pressable onPress={chooseHandler}>
          <Text style={styles.chooseText}>Choose</Text>
        </Pressable>
      ),
    });
  }, [navigation, chooseHandler]);

  useEffect(() => {
    if (currentLocation.lat && currentLocation.lng) {
      setSelectedLocation(currentLocation);
    }
  }, []);

  return (
    <MapView onPress={selectLocationHandler} initialRegion={region} style={styles.map}>
      {selectedLocation && (
        <Marker
          coordinate={{ latitude: selectedLocation.lat, longitude: selectedLocation.lng }}
          title="Picked Location"
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
  chooseText: {
    fontWeight: "bold",
    padding: 10,
  },
});
