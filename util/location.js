const GOOGLE_API_KEY = "AIzaSyDmh4t0Nkgc8ufmUhUMfLEmfxkFbbj9-uY";
import axios from "axios";
import { Alert } from "react-native";

export function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:%7C${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export function getAddress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  return axios
    .get(url)
    .then((response) => {
      return response.data.results[0].formatted_address;
    })
    .catch((err) => {
      Alert.alert("Something has gone wrong", "Please try again later");
    });
}
