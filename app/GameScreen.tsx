// GameScreen.tsx
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, View, Image, TouchableOpacity, Alert } from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import MenuButton from "../components/MenuButton";
import { getXColor, getOColor } from "../util/Storage";

export default function GameScreen() {
  const router = useRouter();
  const params = useLocalSearchParams();
  const difficulty = params.difficulty || "medium"; // default to medium if not specified
  
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [playerColor, setPlayerColor] = useState("blue");
  const [computerColor, setComputerColor] = useState("red");
  const [gameOver, setGameOver] = useState(false);

  // Load colors from storage
  useEffect(() => {
    const loadColors = async () => {
      setPlayerColor(await getXColor());
      setComputerColor(await getOColor());
    };
    loadColors();
  }, []);

  // Computer move logic
  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 800);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn, gameOver]);

  const calculateWinner = (squares: (string | null)[]) => {
    const lines = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6], // diagonals
    ];

    for (let line of lines) {
      const [a, b, c] = line;
      if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
        return squares[a];
      }
    }

    return squares.includes(null) ? null : "draw";
  };

  const makeComputerMove = () => {
    const emptyIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter(val => val !== null) as number[];

    if (emptyIndices.length === 0) return;

    // Different AI behavior based on difficulty
    switch (difficulty) {
      case "easy":
        makeEasyMove(emptyIndices);
        break;
      case "medium":
        makeMediumMove(emptyIndices);
        break;
      case "hard":
        makeHardMove(emptyIndices);
        break;
      default:
        makeMediumMove(emptyIndices);
    }
  };

  const makeEasyMove = (emptyIndices: number[]) => {
    // Easy: completely random moves
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    finishMove(randomIndex);
  };

  const makeMediumMove = (emptyIndices: number[]) => {
    // Medium: tries to win or block, otherwise random
    // Try to win
    for (let index of emptyIndices) {
      const newBoard = [...board];
      newBoard[index] = "O";
      if (calculateWinner(newBoard) === "O") {
        finishMove(index);
        return;
      }
    }

    // Block player
    for (let index of emptyIndices) {
      const newBoard = [...board];
      newBoard[index] = "X";
      if (calculateWinner(newBoard) === "X") {
        finishMove(index);
        return;
      }
    }

    // Random move
    makeEasyMove(emptyIndices);
  };

  const makeHardMove = (emptyIndices: number[]) => {
    // Hard: perfect AI using minimax algorithm
    const bestMove = findBestMove();
    if (bestMove !== -1) {
      finishMove(bestMove);
    }
  };

  const findBestMove = (): number => {
    // Minimax algorithm implementation
    let bestScore = -Infinity;
    let bestMove = -1;

    for (let i = 0; i < 9; i++) {
      if (board[i] === null) {
        board[i] = "O";
        let score = minimax(board, 0, false);
        board[i] = null;
        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  const minimax = (board: (string | null)[], depth: number, isMaximizing: boolean): number => {
    const winner = calculateWinner(board);
    if (winner === "O") return 10 - depth;
    if (winner === "X") return depth - 10;
    if (winner === "draw") return 0;

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "O";
          let score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < 9; i++) {
        if (board[i] === null) {
          board[i] = "X";
          let score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  const finishMove = (index: number) => {
    const newBoard = [...board];
    newBoard[index] = "O";
    setBoard(newBoard);
    checkGameEnd(newBoard);
    setIsPlayerTurn(true);
  };

  const checkGameEnd = (newBoard: (string | null)[]) => {
    const winner = calculateWinner(newBoard);
    if (winner) {
      setGameOver(true);
      setTimeout(() => {
        Alert.alert(
          winner === "draw" ? "Game Over" : `${winner === "X" ? "You" : "Computer"} Won!`,
          winner === "draw" ? "It's a draw!" : `${winner === "X" ? "Congratulations!" : "Better luck next time!"}`,
          [{ text: "Play Again", onPress: resetGame }]
        );
      }, 300);
    }
  };

  const handlePress = (index: number) => {
    if (board[index] || !isPlayerTurn || gameOver) return;

    const newBoard = [...board];
    newBoard[index] = "X";
    setBoard(newBoard);
    setIsPlayerTurn(false);
    checkGameEnd(newBoard);
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsPlayerTurn(true);
    setGameOver(false);
  };

  const renderSquare = (index: number) => {
    const value = board[index];
    const imageSource = value === "X" 
      ? require("../assets/player1Piece.png") 
      : require("../assets/player2Piece.png");
    const tintColor = value === "X" ? playerColor : computerColor;

    return (
      <TouchableOpacity
        key={index}
        style={[
          styles.BoardSegment,
          index % 3 !== 2 && styles.RightBorder,
          index < 6 && styles.BottomBorder,
        ]}
        onPress={() => handlePress(index)}
        disabled={!isPlayerTurn || gameOver}
      >
        {value && (
          <Image
            source={imageSource}
            style={[styles.Piece, { tintColor }]}
          />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.PieceLegend}>
        <View style={styles.PlayerContainer}>
          <Text style={styles.PlayerText}>You: </Text>
          <Image
            source={require("../assets/player1Piece.png")}
            style={[styles.PieceSmall, { tintColor: playerColor }]}
          />
        </View>

        <View style={styles.PlayerContainer}>
          <Text style={styles.PlayerText}>Computer: </Text>
          <Image
            source={require("../assets/player2Piece.png")}
            style={[styles.PieceSmall, { tintColor: computerColor }]}
          />
        </View>
      </View>

      <Text style={styles.statusText}>
        {gameOver 
          ? "Game Over" 
          : isPlayerTurn 
            ? "Your turn" 
            : "Computer thinking..."}
      </Text>
      
      <Text style={styles.difficultyText}>
        Difficulty: {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}
      </Text>

      <View style={styles.GameBoard}>
        {Array(9).fill(null).map((_, index) => renderSquare(index))}
      </View>

      <MenuButton 
        buttonText={gameOver ? "Play Again" : "Quit Game"} 
        onPress={gameOver ? resetGame : () => router.push("/")} 
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
    padding: 20,
  },
  statusText: {
    fontSize: 20,
    marginVertical: 15,
    color: "#573B1B",
    height: 30,
  },
  difficultyText: {
    fontSize: 16,
    color: "#573B1B",
    marginBottom: 10,
  },
  Piece: {
    height: 70,
    width: 70,
    alignSelf: "center",
  },
  PieceSmall: {
    height: 30,
    width: 30,
  },
  GameBoard: {
    width: 300,
    height: 300,
    flexDirection: "row",
    flexWrap: "wrap",
    marginBottom: 30,
    backgroundColor: "#FFF",
    borderRadius: 10,
    overflow: "hidden",
    elevation: 3,
  },
  BoardSegment: {
    width: 100,
    height: 100,
    justifyContent: "center",
    backgroundColor: "#FAFAFA",
  },
  RightBorder: {
    borderRightWidth: 2,
    borderColor: "#DDD",
  },
  BottomBorder: {
    borderBottomWidth: 2,
    borderColor: "#DDD",
  },
  PieceLegend: {
    flexDirection: "row",
    justifyContent: "space-around",
    width: "100%",
    marginBottom: 20,
  },
  PlayerContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  PlayerText: {
    fontSize: 16,
    color: "#573B1B",
  },
});