import { NavigationContainer } from "@react-navigation/native";
import { StatusBar } from "expo-status-bar";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import AppLoading from "expo-app-loading";

import FavoritePlaces from "./screens/FavoritePlaces";
import AddNewPlace from "./screens/AddNewPlace";
import IconButton from "./components/UI/IconButton";
import PlaceDetails from "./screens/PlaceDetails";
import GlobalStyles from "./constants/GlobalStyles";
import Map from "./screens/Map";
import { init } from "./util/database";
import Photo from "./screens/Photo";

const Stack = createNativeStackNavigator();

export default function App() {
  const [dbInitialized, setDbInitialized] = useState(false);

  useEffect(() => {
    init()
      .then(() => {
        setDbInitialized(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (!dbInitialized) {
    return <AppLoading />;
  }

  return (
    <>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            contentStyle: { backgroundColor: GlobalStyles.Colors.globalGrey },
            headerStyle: { backgroundColor: GlobalStyles.Colors.globalBlue },
            headerTintColor: GlobalStyles.Colors.globalGrey,
          }}
        >
          <Stack.Screen
            name="FavoritePlaces"
            component={FavoritePlaces}
            options={({ navigation }) => ({
              title: "Favorite Places",
              headerRight: ({ tintColor }) => (
                <IconButton
                  name="add"
                  color={tintColor}
                  size={30}
                  onPress={() => {
                    navigation.navigate("AddNewPlace");
                  }}
                />
              ),
            })}
          />
          <Stack.Screen
            name="AddNewPlace"
            component={AddNewPlace}
            options={{
              title: "Add a new Place",
            }}
          />
          <Stack.Screen
            name="PlaceDetails"
            component={PlaceDetails}
            options={{
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="Map"
            component={Map}
            options={{
              headerBackTitle: "Back",
            }}
          />
          <Stack.Screen
            name="Photo"
            component={Photo}
            options={{
              contentStyle: { backgroundColor: "black" },
              headerStyle: { backgroundColor: "black" },
              headerTintColor: "#e5e51d",
              headerTitleStyle: { fontWeight: 0 },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}
