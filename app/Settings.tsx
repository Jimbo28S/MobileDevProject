import React, { useEffect, useState } from "react";
import { StatusBar } from "expo-status-bar";
import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Modal,
  Alert,
} from "react-native";
import { useRouter } from "expo-router";
import MenuButton from "../components/MenuButton";
import {
  saveXColor,
  saveOColor,
  getXColor,
  getOColor,
  saveBoardColor,
  getBoardColor,
} from "../util/Storage";
import ColorWheel from "react-native-wheel-color-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function Settings() {
  const router = useRouter();

  const [xColor, setXColor] = useState("blue");
  const [oColor, setOColor] = useState("red");
  const [boardColor, setBoardColor] = useState("black");
  const [pickerVisibility, setPickerVisibility] = useState(false);
  const [pickerVisibilityP2, setPickerVisibilityP2] = useState(false);
  const [pickerVisibilityP3, setPickerVisibilityP3] = useState(false);

  useEffect(() => {
    const loadColors = async () => {
      setXColor(await getXColor());
      setOColor(await getOColor());
      setBoardColor(await getBoardColor());
    };
    loadColors();
  }, []);

  const changeP1Color = () => {
    setPickerVisibility(true);
  };

  const changeP2Color = () => {
    setPickerVisibilityP2(true);
  };

  const changeBoardColor = () => {
    setPickerVisibilityP3(true);
  };

  const handleP1ColorChange = async (color: string) => {
    await saveXColor(color);
    setXColor(color);
  };

  const handleP2ColorChange = async (color: string) => {
    await saveOColor(color);
    setOColor(color);
  };

  const handleBoardColorChange = async (color: string) => {
    await saveBoardColor(color);
    setBoardColor(color);
  };

  const resetStats = async () => {
    const defaultStats = {
      eWins: 0,
      eLosses: 0,
      eDraws: 0,
      mWins: 0,
      mLosses: 0,
      mDraws: 0,
      hWins: 0,
      hLosses: 0,
      hDraws: 0,
    };
    await AsyncStorage.setItem("stats", JSON.stringify(defaultStats));
    Alert.alert("Settings successfully reset!");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.TitleText}>Settings</Text>

      <View style={styles.SettingContainer}>
        <TouchableOpacity
          style={styles.SettingButton}
          onPress={() => changeP1Color()}
        >
          <Text style={styles.SettingText}>Player 1 Color</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.SettingButton}
          onPress={() => changeP2Color()}
        >
          <Text style={styles.SettingText}>Player 2 Color</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.SettingButton}
          onPress={() => changeBoardColor()}
        >
          <Text style={styles.SettingText}>Change Board Color</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.SettingButton}
          onPress={() => resetStats()}
        >
          <Text style={styles.SettingText}>Reset Stats</Text>
        </TouchableOpacity>
      </View>

      <MenuButton
        buttonText="Save"
        onPress={() => alert("Settings saved successfully")}
      />

      <MenuButton buttonText="Back" onPress={() => router.push("/")} />

      <Modal
        visible={pickerVisibility}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pick a Color for Player 1</Text>
          <ColorWheel color={xColor} onColorChange={handleP1ColorChange} />

          <TouchableOpacity
            style={{
              height: 50,
              width: 200,
              backgroundColor: "#FFEBC6",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              marginTop: 25,
              marginBottom: 20,
            }}
            onPress={() => setPickerVisibility(false)}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={pickerVisibilityP2}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pick a Color for Player 2</Text>
          <ColorWheel color={oColor} onColorChange={handleP2ColorChange} />

          <TouchableOpacity
            style={{
              height: 50,
              width: 200,
              backgroundColor: "#FFEBC6",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              marginTop: 25,
              marginBottom: 20,
            }}
            onPress={() => setPickerVisibilityP2(false)}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>

      <Modal
        visible={pickerVisibilityP3}
        transparent={true}
        animationType="slide"
      >
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Pick a Color for the game board</Text>
          <ColorWheel
            color={boardColor}
            onColorChange={handleBoardColorChange}
          />

          <TouchableOpacity
            style={{
              height: 50,
              width: 200,
              backgroundColor: "#FFEBC6",
              alignItems: "center",
              justifyContent: "center",
              borderRadius: 50,
              marginTop: 25,
              marginBottom: 20,
            }}
            onPress={() => setPickerVisibilityP3(false)}
          >
            <Text>Save</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  },

  SettingContainer: {
    width: 340,
    marginVertical: 25,
    alignItems: "center",
  },

  SettingButton: {
    borderWidth: 2,
    borderRadius: 100,
    width: 250,
    height: 75,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 30,
  },

  modalContainer: {
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    height: 500,
    width: 350,
    backgroundColor: "#AA845F",
    marginTop: 200,
    borderWidth: 4,
    padding: 10,
  },

  modalTitle: {
    fontSize: 20,
    color: "#fff",
    marginBottom: 10,
  },
});
