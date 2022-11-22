import { Alert } from "react-native";
import { useForegroundPermissions, PermissionStatus } from "expo-location";
import { useCameraPermissions } from "expo-image-picker";

async function verifyPermissions(verify) {
  let verification = verify;

  console.log(verification);

  if (verify === "location") {
    verification = useForegroundPermissions();
  } else if (verify === "camera") {
    verification = useCameraPermissions();
  }

  const [PermissionInformation, requestPermission] = verification();

  if (PermissionInformation.status === PermissionStatus.UNDETERMINED) {
    const permissionResponse = await requestPermission();

    return permissionResponse.granted;
  }

  if (PermissionInformation.status === PermissionStatus.DENIED) {
    Alert.alert(
      "Insufficient Permissions!",
      "You need to grant location permissions to use this app"
    );
    return false;
  }

  return true;
}

export default verifyPermissions;
