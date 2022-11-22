import { Alert, StyleSheet, View, Text, Image, Pressable } from "react-native";
import { getCurrentPositionAsync, useForegroundPermissions, PermissionStatus } from "expo-location";
import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";

import HollowButton from "../UI/HollowButton";
import GlobalStyles from "../../constants/GlobalStyles";
import { getMapPreview } from "../../util/location";

export default function LocationPicker({ currentLocation }) {
  const [locationUri, setLocationUri] = useState();
  const [foregroundPermissionInformation, requestPermission] = useForegroundPermissions();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (currentLocation && isFocused) {
      setLocationUri(currentLocation);
    }
  }, [currentLocation, isFocused]);

  const navigation = useNavigation();

  async function verifyPermissions() {
    if (foregroundPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (foregroundPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant location permissions to locate yourself"
      );

      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions("locateUser");

    if (!hasPermission) {
      return;
    }
    const location = await getCurrentPositionAsync();
    setLocationUri({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  async function pickOnMapHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      navigation.navigate("Map");
      return;
    }
    if (locationUri) {
      navigation.navigate("Map", {
        lat: locationUri.lat,
        lng: locationUri.lng,
      });
    }
    const location = await getCurrentPositionAsync();
    navigation.navigate("Map", {
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  return (
    <View>
      <View style={styles.imageContainer}>
        {!locationUri || locationUri.length === 0 ? (
          <Text>No location picked yet</Text>
        ) : (
          <Image
            style={styles.image}
            source={{
              uri: getMapPreview(locationUri.lat, locationUri.lng),
            }}
          />
        )}
      </View>
      <View style={styles.buttons}>
        <HollowButton
          iconName="location"
          color={GlobalStyles.Colors.globalBlue}
          iconSize={20}
          text="Locate User"
          onPress={getLocationHandler}
        />
        <HollowButton
          iconName="map"
          color={GlobalStyles.Colors.globalBlue}
          iconSize={20}
          text="Pick on Map"
          onPress={pickOnMapHandler}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
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
    justifyContent: "space-around",
    alignItems: "center",
  },
});
