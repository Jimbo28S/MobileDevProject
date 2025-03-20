import React, { useState } from 'react';
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity, } from "react-native";
import { useRouter } from "expo-router";
import MenuButton from "../components/MenuButton";


export default function GameScreen() {
  const router = useRouter();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");

  const PlacePiece = (index: number) => 
    {
        if (board[index] !== null) {alert("Please Select an Empty Sqaure")};

        setBoard(prevBoard => {
            const newBoard = [...prevBoard];
            newBoard[index] = player;
            return newBoard;
        });

        setPlayer(prev => (prev === "X" ? "O" : "X"));
    }

  return (
    <View style={styles.container}>
      <Text>You: </Text>
      <Text>Opponent: </Text>

      <View style={styles.GameBoard}>
        <TouchableOpacity style={{borderRightWidth: 2, borderBottomWidth: 2, width: 100, height: 100}} onPress={() => PlacePiece()}></TouchableOpacity>
        <TouchableOpacity style={{borderRightWidth: 2, borderBottomWidth: 2, borderLeftWidth: 2, width: 100, height: 100}}></TouchableOpacity>
        <TouchableOpacity style={{borderLeftWidth: 2, borderBottomWidth: 2, width: 100, height: 100}}></TouchableOpacity>

        <TouchableOpacity style={{borderRightWidth: 2, borderBottomWidth: 2, borderTopWidth: 2, width: 100, height: 100}}></TouchableOpacity>
        <TouchableOpacity style={{borderWidth: 2, width: 100, height: 100}}></TouchableOpacity>
        <TouchableOpacity style={{borderLeftWidth: 2, borderBottomWidth: 2, borderTopWidth: 2, width: 100, height: 100}}></TouchableOpacity>

        <TouchableOpacity style={{borderRightWidth: 2, borderTopWidth: 2, width: 100, height: 100}}></TouchableOpacity>
        <TouchableOpacity style={{borderRightWidth: 2, borderLeftWidth: 2, borderTopWidth: 2, width: 100, height: 100}}></TouchableOpacity>
        <TouchableOpacity style={{borderLeftWidth: 2, borderTopWidth: 2, width: 100, height: 100}}></TouchableOpacity>
      </View>

      <MenuButton
        buttonText="End Game"
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

  GameBoard: {
    width: 302,
    height: 302,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap"
  },
});
