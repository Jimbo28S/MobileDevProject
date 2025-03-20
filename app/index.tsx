import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import MenuButton from "../components/MenuButton";

export default function App() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.TitleText}>Jan</Text>
      <Text style={styles.TitleText}>Jon</Text>
      <Text style={styles.TitleText}>Joe</Text>
      <Image
        source={require("../assets/coffeeCup.png")}
        style={styles.CoffeeCup}
      />
      <MenuButton
        buttonText="Start"
        onPress={() => router.push("./SelectDifficulty")}
      />

      <MenuButton buttonText="Stats" onPress={() => router.push("./Stats")} />

      <MenuButton
        buttonText="Settings"
        onPress={() => router.push("./Settings")}
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
});
