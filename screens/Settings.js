import { useState } from "react";
import { View, Text, StyleSheet, Switch } from "react-native";
import { COLORS, COLORS_LIGHT } from "../constants";

function Settings() {
  const [isDark, setIsDark] = useState(true);

  const colors = isDark ? COLORS : COLORS_LIGHT;

  return (
    <View style={styles.container}>
      <View
        style={[
          styles.content,
          {
            backgroundColor: colors.appBackground,
          },
        ]}
      >
        <Text
          style={[
            styles.chooseColorText,
            {
              color: colors.fontMain,
            },
          ]}
        >
          Choose color theme:
        </Text>

        <Switch
          value={isDark}
          onValueChange={setIsDark}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    flex: 1,
    padding: 20,
  },

  chooseColorText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default Settings;