import React, { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { useRouter } from "expo-router";
import MenuButton from "../components/MenuButton";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Stats() {
  const router = useRouter();
  const [stats, setStats] = useState({
    eWins: 0,
    eLosses: 0,
    eDraws: 0,
    mWins: 0,
    mLosses: 0,
    mDraws: 0,
    hWins: 0,
    hLosses: 0,
    hDraws: 0,
  });

  useEffect(() => {
    const loadStats = async () => {
      try {
        const statsJSON = await AsyncStorage.getItem("stats");

        if (statsJSON) {
          setStats(JSON.parse(statsJSON));
        }
      } catch (e) {
        console.error("Error loading stats:", e);
      }
    };

    loadStats();
  }, []);

  return (
    <View style={styles.container}>
      <Image
        source={require("../assets/TransparentCoffee.png")}
        style={styles.CoffeeCup}
      />

      <Text style={styles.TitleText}>Stats</Text>

      <View style={styles.EasyMediumContainer}>
        <View style={styles.StatContainer}>
          <Text style={styles.EasyHeader}>Easy</Text>
          <Text style={styles.StatText}>Wins: {stats.eWins}</Text>
          <Text style={styles.StatText}>Losses: {stats.eLosses}</Text>
          <Text style={styles.StatText}>Draws: {stats.eDraws}</Text>
        </View>

        <View style={styles.StatContainer}>
          <Text style={styles.MediumHeader}>Medium</Text>
          <Text style={styles.StatText}>Wins: {stats.mWins}</Text>
          <Text style={styles.StatText}>Losses: {stats.mLosses}</Text>
          <Text style={styles.StatText}>Draws: {stats.mDraws}</Text>
        </View>
      </View>

      <View style={styles.HardContainer}>
        <Text style={styles.HardHeader}>Hard</Text>
        <Text style={styles.StatText}>Wins: {stats.hWins}</Text>
        <Text style={styles.StatText}>Losses: {stats.hLosses}</Text>
        <Text style={styles.StatText}>Draws: {stats.hDraws}</Text>
      </View>

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

  CoffeeCup: {
    height: 100,
    width: 100,
  },

  StatText: {
    fontSize: 20,
    color: "black",
  },

  EasyHeader: {
    color: "#6587AF",
    fontSize: 35,
  },

  MediumHeader: {
    color: "#9265AF",
    fontSize: 35,
  },

  HardHeader: {
    color: "#AF6565",
    fontSize: 35,
  },

  StatContainer: {
    width: 170,
    justifyContent: "center",
    marginTop: 30,
  },

  HardContainer: {
    width: 170,
    justifyContent: "center",
    marginLeft: 90,
    marginTop: 15,
  },

  EasyMediumContainer: {
    display: "flex",
    flexDirection: "row",
    width: 300,
    justifyContent: "center",
    marginLeft: 90,
  },
});
