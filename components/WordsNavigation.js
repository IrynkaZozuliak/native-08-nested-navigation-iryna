import { createNativeStackNavigator } from "@react-navigation/native-stack";

import AllWords from "../screens/Words/AllWords";
import AddWord from "../screens/Words/AddWord";
import EditWord from "../screens/Words/EditWord";

import { COLORS } from "../constants";

const Stack = createNativeStackNavigator();

function WordsNavigation() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerTitleStyle: {
          fontWeight: "800",
        },
        headerStyle: {
          backgroundColor: COLORS.appBackground,
        },
        headerTintColor: COLORS.primary900,
        headerTitleAlign: "center",
        contentStyle: {
          backgroundColor: COLORS.appBackground,
        },
      }}
    >
      <Stack.Screen
        name="AllWords"
        component={AllWords}
        options={{
          headerShown: false,
        }}
      />

      <Stack.Screen
        name="AddWord"
        component={AddWord}
      />

      <Stack.Screen
        name="EditWord"
        component={EditWord}
        options={({ route }) => ({
          title: `Editing word "${route.params.wordData.word}"`,
        })}
      />
    </Stack.Navigator>
  );
}

export default WordsNavigation;