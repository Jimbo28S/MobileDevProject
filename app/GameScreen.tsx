import React, { useState, useEffect } from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import MenuButton from "../components/MenuButton";
import { getXColor, getOColor } from "../util/Storage";

export default function GameScreen() {
  const player1Piece = "../assets/player1Piece.png";
  const player2Piece = "../assets/player2Piece.png";
  const router = useRouter();
  const [board, setBoard] = useState(Array(9).fill(null));
  const [player, setPlayer] = useState("X");
  const [player1Color, setPlayer1Color] = useState("blue");
  const [player2Color, setPlayer2Color] = useState("red");

  useEffect(() => {
    const loadColors = async () => {
      setPlayer1Color(await getXColor());
      setPlayer2Color(await getOColor());
    };
    loadColors();
  }, []);

  const PlacePiece = (index: number) => {
    if (board[index] !== null) {
      alert("Please Select an Empty Sqaure");
    } else {
      setBoard((prevBoard) => {
        const newBoard = [...prevBoard];
        newBoard[index] = player;
        return newBoard;
      });

      setPlayer((prev) => (prev === "X" ? "O" : "X"));
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.PieceLegend}>
        <View style={styles.PlayerContainer}>
          <Text>You: </Text>
          <Image
            source={require(player1Piece)}
            style={[styles.CoffeeCup, { tintColor: player1Color }]}
          />
        </View>

        <View style={styles.PlayerContainer}>
          <Text>Opponent: </Text>
          <Image
            source={require(player2Piece)}
            style={[styles.CoffeeCup, { tintColor: player2Color }]}
          />
        </View>
      </View>

      {/* Square 1 */}
      <View style={styles.GameBoard}>
        {board.map((value, index) => (
          <TouchableOpacity
            key={index}
            style={[
              styles.BoardSegment,
              index % 3 !== 2 && styles.RightBorder,
              index < 6 && styles.BottomBorder,
            ]}
            onPress={() => PlacePiece(index)}
          >
            {value && (
              <Image
                source={
                  value === "X" ? require(player1Piece) : require(player2Piece)
                }
                style={[
                  styles.Piece,
                  { tintColor: value === "X" ? player1Color : player2Color },
                ]}
              />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <MenuButton buttonText="End Game" onPress={() => router.push("/")} />
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
    height: 40,
    width: 40,
  },

  GameBoard: {
    width: 302,
    height: 302,
    display: "flex",
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 50,
  },

  BoardSegment: {
    width: 100,
    height: 100,
    justifyContent: "center",
  },

  RightBorder: {
    borderRightWidth: 2,
  },

  BottomBorder: {
    borderBottomWidth: 2,
  },

  Piece: {
    height: 70,
    width: 70,
    alignSelf: "center",
  },

  PieceLegend: {
    width: 250,
    height: 100,
    alignItems: "center",
    justifyContent: "center",
    gap: 20,
    marginBottom: 90,
  },

  PlayerContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 20,
  },
});
