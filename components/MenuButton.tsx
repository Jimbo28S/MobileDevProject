import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

interface MenuButtonProps {
  buttonText: string;
  onPress: () => void;
}

const MenuButton: React.FC<MenuButtonProps> = ({ buttonText, onPress }) => {
  return (
    <View style={styles.MenuButton}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.ButtonText}>{buttonText}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MenuButton;

const styles = StyleSheet.create({
  MenuButton: {
    height: 80,
    width: 275,
    backgroundColor: "#AA845F",
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 50,
    marginTop: 30,
  },

  ButtonText: {
    fontSize: 40,
  },
});
