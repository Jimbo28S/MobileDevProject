import AsyncStorage from "@react-native-async-storage/async-storage";

const COLOR_X_KEY = "X_COLOR";
const COLOR_O_KEY = "O_COLOR";
const COLOR_BOARD_KEY = "BOARD_COLOR";

// Save color to AsyncStorage
export const saveColor = async (key: string, color: string) => {
  try {
    await AsyncStorage.setItem(key, color);
  } catch (error) {
    console.error("Error saving color:", error);
  }
};

// Get color from AsyncStorage
export const getColor = async (key: string, defaultColor: string) => {
  try {
    const color = await AsyncStorage.getItem(key);
    return color ?? defaultColor; // Return stored color or default
  } catch (error) {
    console.error("Error retrieving color:", error);
    return defaultColor;
  }
};

export const saveXColor = (color: string) => saveColor(COLOR_X_KEY, color);
export const saveOColor = (color: string) => saveColor(COLOR_O_KEY, color);
export const saveBoardColor = (color: string) =>
  saveColor(COLOR_BOARD_KEY, color);
export const getXColor = () => getColor(COLOR_X_KEY, "blue");
export const getOColor = () => getColor(COLOR_O_KEY, "red");
export const getBoardColor = () => getColor(COLOR_BOARD_KEY, "black");
