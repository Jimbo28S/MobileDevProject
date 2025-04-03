// SelectDifficulty.tsx
import React from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { useRouter } from "expo-router";
import MenuButton from "../components/MenuButton";

export default function SelectDifficulty() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.TitleText}>Select</Text>
      <Text style={styles.TitleText}>Difficulty</Text>

      <View style={styles.spacer}></View>

      <MenuButton
        buttonText="Easy"
        onPress={() => router.push({ pathname: "/GameScreen", params: { difficulty: "easy" } })}
      />

      <MenuButton
        buttonText="Medium"
        onPress={() => router.push({ pathname: "/GameScreen", params: { difficulty: "medium" } })}
      />

      <MenuButton
        buttonText="Hard"
        onPress={() => router.push({ pathname: "/GameScreen", params: { difficulty: "hard" } })}
      />

      <View style={styles.spacer}></View>
      <View style={styles.spacer}></View>

      <MenuButton buttonText="Back" onPress={() => router.push("/")} />
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

  spacer: {
    marginTop: 40,
  },
});