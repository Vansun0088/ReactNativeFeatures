import { StyleSheet, View } from "react-native";

import List from "../components/ListOfPlaces/List";

export default function FavoritePlaces() {
  return (
    <View style={styles.rootContainer}>
      <List />
    </View>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: "5%",
  },
});
