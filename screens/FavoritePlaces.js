import { StyleSheet, View } from "react-native";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import List from "../components/ListOfPlaces/List";
import { fetchPlaces } from "../util/database";

export default function FavoritePlaces() {
  const [places, setPlaces] = useState([]);

  const isFocused = useIsFocused();

  useEffect(() => {
    async function loadPlaces() {
      const result = await fetchPlaces();
      setPlaces(result);
    }
    if (isFocused) {
      loadPlaces();
    }
  }, [isFocused]);

  return (
    <View style={styles.rootContainer}>
      <List data={places} />
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
