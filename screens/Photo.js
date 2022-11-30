import { Image, ScrollView, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function Photo({ route }) {
  return (
    <ScrollView contentContainerStyle={styles.rootContainer}>
      <View style={styles.imageContainer}>
        <Image style={styles.image} source={{ uri: route.params.uri }} />
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  rootContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    width: "100%",
    height: "69%",
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
