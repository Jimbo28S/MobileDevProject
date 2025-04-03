import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Dimensions,
} from 'react-native';

const initialBoard = Array(9).fill(null);
const screenWidth = Dimensions.get('window').width;
const boardSize = screenWidth * 0.9;
const squareSize = boardSize / 3;

export default function GameScreen() {
  const [board, setBoard] = useState(initialBoard);
  const [isPlayerTurn, setIsPlayerTurn] = useState(true);
  const [gameOver, setGameOver] = useState(false);
  const [winningLine, setWinningLine] = useState<number[] | null>(null);

  useEffect(() => {
    if (!isPlayerTurn && !gameOver) {
      const timer = setTimeout(() => {
        makeComputerMove();
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isPlayerTurn]);

  const handlePress = (index: number) => {
    if (board[index] || gameOver || !isPlayerTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);
    setIsPlayerTurn(false);

    const winner = checkWinner(newBoard);
    if (winner) {
      endGame(winner);
    } else if (newBoard.every(cell => cell)) {
      endGame('Draw');
    }
  };

  const makeComputerMove = () => {
    const emptyIndices = board
      .map((val, idx) => (val === null ? idx : null))
      .filter(val => val !== null) as number[];

    if (emptyIndices.length === 0) return;

    const randomIndex =
      emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    const newBoard = [...board];
    newBoard[randomIndex] = 'O';
    setBoard(newBoard);
    setIsPlayerTurn(true);

    const winner = checkWinner(newBoard);
    if (winner) {
      endGame(winner);
    } else if (newBoard.every(cell => cell)) {
      endGame('Draw');
    }
  };

  const checkWinner = (b: string[]): string | null => {
    const lines = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let line of lines) {
      const [a, bIdx, c] = line;
      if (b[a] && b[a] === b[bIdx] && b[a] === b[c]) {
        setWinningLine(line);
        return b[a];
      }
    }
    return null;
  };

  const endGame = (result: string) => {
    setGameOver(true);
    setTimeout(() => {
      Alert.alert(
        result === 'Draw' ? 'Draw!' : `${result} wins!`,
        '',
        [{ text: 'Play Again', onPress: resetGame }]
      );
    }, 200);
  };

  const resetGame = () => {
    setBoard(initialBoard);
    setIsPlayerTurn(true);
    setGameOver(false);
    setWinningLine(null);
  };

  const renderSquare = (index: number) => (
    <TouchableOpacity
      key={index}
      style={styles.square}
      onPress={() => handlePress(index)}
      activeOpacity={0.7}
    >
      <Text style={styles.mark}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Tic Tac Toe</Text>
      <View style={styles.board}>
        {board.map((_, index) => renderSquare(index))}
        {winningLine && <WinningLine line={winningLine} />}
      </View>
    </View>
  );
}

const WinningLine = ({ line }: { line: number[] }) => {
  const sortedLine = [...line].sort((a, b) => a - b);
  const lineKey = sortedLine.join('-');

  const getLineStyle = () => {
    // Horizontal lines
    if (lineKey === '0-1-2') return { top: squareSize/2 - 2, left: 0, width: boardSize, height: 4 };
    if (lineKey === '3-4-5') return { top: squareSize*1.5 - 2, left: 0, width: boardSize, height: 4 };
    if (lineKey === '6-7-8') return { top: squareSize*2.5 - 2, left: 0, width: boardSize, height: 4 };

    // Vertical lines
    if (lineKey === '0-3-6') return { top: 0, left: squareSize/2 - 2, width: 4, height: boardSize };
    if (lineKey === '1-4-7') return { top: 0, left: squareSize*1.5 - 2, width: 4, height: boardSize };
    if (lineKey === '2-5-8') return { top: 0, left: squareSize*2.5 - 2, width: 4, height: boardSize };

    // Diagonal lines - using precise mathematical calculations
    if (lineKey === '0-4-8') {
      return {
        position: 'absolute',
        top: 0,
        left: 0,
        width: Math.sqrt(2) * boardSize,
        height: 4,
        transform: [{ rotate: '45deg' }],
        transformOrigin: '0% 0%',
      };
    }
    if (lineKey === '2-4-6') {
      return {
        position: 'absolute',
        top: 0,
        right: 0,
        width: Math.sqrt(2) * boardSize,
        height: 4,
        transform: [{ rotate: '-45deg' }],
        transformOrigin: '100% 0%',
      };
    }

    return null;
  };

  const lineStyle = getLineStyle();
  if (!lineStyle) return null;

  return (
    <View
      style={[
        {
          position: 'absolute',
          backgroundColor: 'red',
          borderRadius: 2,
          zIndex: 10,
        },
        lineStyle,
      ]}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  title: {
    fontSize: 40,
    fontWeight: '600',
    color: '#333',
    marginBottom: 40,
  },
  board: {
    width: boardSize,
    height: boardSize,
    flexDirection: 'row',
    flexWrap: 'wrap',
    backgroundColor: '#FFFFFF',
    overflow: 'hidden',
    position: 'relative',
  },
  square: {
    width: squareSize,
    height: squareSize,
    borderWidth: 1,
    borderColor: '#DDD',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAFAFA',
  },
  mark: {
    fontSize: 70,
    fontWeight: 'bold',
    color: '#444',
  },
});