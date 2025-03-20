import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import MenuButton from "../components/MenuButton";

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.TitleText}>Settings</Text>

      <View style={styles.SettingContainer}>
        <Text style={styles.SettingText}>Player 1 Color</Text>
        <Text style={styles.SettingText}>Player 2 Color</Text>
        <Text style={styles.SettingText}>Game Board Color</Text>
        <Text style={styles.SettingText}>Reset Stats</Text>
      </View>
      

      <MenuButton buttonText="Save" onPress={() => alert("Settings saved successfully")} />

      <MenuButton
        buttonText="Back"
        onPress={() => router.push("/")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFEBC6",
    alignItems: "center",
    justifyContent: "center",
  },

  TitleText: {
    fontSize: 50,
    color: "#573B1B",
  },

  CoffeeCup: {
    height: 100,
    width: 100,
  },

  SettingText: {
    fontSize: 25,
    color: "black",
    marginTop: 25
  },

  SettingContainer: {
    width: 340,
    marginVertical: 75
  }
});
