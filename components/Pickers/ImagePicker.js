import { Alert, View, Text, StyleSheet, Image, Platform } from "react-native";
import { launchCameraAsync, useCameraPermissions, PermissionStatus } from "expo-image-picker";
import { useState } from "react";

import GlobalStyles from "../../constants/GlobalStyles";
import HollowButton from "../UI/HollowButton";

export default function ImagePicker({ onTakeImage }) {
  const [imageUri, setImageUri] = useState();
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const isIphone = true ? Platform.OS === "ios" : false;

  async function verifyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();

      return permissionResponse.granted;
    }

    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Insufficient Permissions!",
        "You need to grant camera permissions to use this app"
      );
      return false;
    }

    return true;
  }

  async function takeImageHandler() {
    const hasPermission = await verifyPermissions();

    if (!hasPermission) {
      return;
    }

    const image = await launchCameraAsync({
      allowsEditing: isIphone ? false : true,
      quality: 0.5,
    });
    console.log(image);
    setImageUri(image.assets[0].uri);
    onTakeImage(image.assets[0].uri);
  }

  return (
    <View>
      <View style={styles.imageContainer}>
        {!imageUri || imageUri.length === 0 ? (
          <Text>No picture chosen yet</Text>
        ) : (
          <Image style={styles.image} source={{ uri: imageUri }} />
        )}
      </View>
      <HollowButton
        iconName="camera"
        color={GlobalStyles.Colors.globalBlue}
        iconSize={20}
        text="Take Image"
        onPress={takeImageHandler}
      />
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
});
