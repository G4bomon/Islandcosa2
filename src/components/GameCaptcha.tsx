"use client";
import { useState, useEffect } from 'react';

interface GameCaptchaProps {
  onSolved: () => void;
  onFailed: () => void;
}

const GameCaptcha = ({ onSolved, onFailed }: GameCaptchaProps) => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [isXTurn, setIsXTurn] = useState(true);
  const [gameStatus, setGameStatus] = useState<'playing' | 'solved' | 'failed'>('playing');

  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const checkWinner = (currentBoard: (string | null)[]) => {
    for (let combo of winningCombinations) {
      const [a, b, c] = combo;
      if (currentBoard[a] && currentBoard[a] === currentBoard[b] && currentBoard[a] === currentBoard[c]) {
        return currentBoard[a];
      }
    }
    return null;
  };

  useEffect(() => {
    if (!isXTurn) {
      const timer = setTimeout(() => aiMove(), 500);
      return () => clearTimeout(timer);
    }
  }, [isXTurn]);

  const handleClick = (index: number) => {
    if (board[index] || gameStatus !== 'playing' || !isXTurn) return;

    const newBoard = [...board];
    newBoard[index] = 'X';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner === 'X') {
      setGameStatus('solved');
      onSolved();
    } else if (!newBoard.includes(null)) {
      setGameStatus('failed');
      onFailed();
    } else {
      setIsXTurn(false);
    }
  };

  const aiMove = () => {
    const emptyIndices = board.map((val, idx) => val === null ? idx : null).filter(idx => idx !== null) as number[];

    // IA trata de ganar o bloquear
    const tryWinningOrBlocking = (symbol: string) => {
      for (let combo of winningCombinations) {
        const [a, b, c] = combo;
        const cells = [board[a], board[b], board[c]];
        if (cells.filter(cell => cell === symbol).length === 2 && cells.includes(null)) {
          const emptyIndex = combo[cells.indexOf(null)];
          return emptyIndex;
        }
      }
      return null;
    };

    let move = tryWinningOrBlocking('O') || tryWinningOrBlocking('X');
    if (move === null) {
      move = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    }

    const newBoard = [...board];
    newBoard[move] = 'O';
    setBoard(newBoard);

    const winner = checkWinner(newBoard);
    if (winner === 'O') {
      setGameStatus('failed');
      onFailed();
    } else if (!newBoard.includes(null)) {
      setGameStatus('failed');
      onFailed();
    } else {
      setIsXTurn(true);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(null));
    setIsXTurn(true);
    setGameStatus('playing');
  };

  return (
    <div className="border p-4 rounded shadow-md max-w-sm mx-auto text-center">
      {gameStatus === 'solved' && (
        <div className="text-green-500">
          <p>¡Ganaste! Eres humano.</p>
          <button onClick={resetGame} className="mt-2 bg-blue-500 text-white p-2 rounded">
            Jugar de nuevo
          </button>
        </div>
      )}

      {gameStatus === 'failed' && (
        <div className="text-red-500">
          <p>Perdiste. Inténtalo de nuevo.</p>
          <button onClick={resetGame} className="mt-2 bg-blue-500 text-white p-2 rounded">
            Reintentar
          </button>
        </div>
      )}

      {gameStatus === 'playing' && (
        <>
          <p className="mb-2">Gana el juego para verificar que eres humano:</p>
          <div className="grid grid-cols-3 gap-2">
            {board.map((cell, idx) => (
              <button
                key={idx}
                className="w-16 h-16 border rounded text-2xl font-bold flex items-center justify-center"
                onClick={() => handleClick(idx)}
                disabled={!!cell}
              >
                {cell}
              </button>
            ))}
          </div>
          <p className="mt-4">Turno de: {isXTurn ? 'Tú (X)' : 'IA (O)'}</p>
        </>
      )}
    </div>
  );
};

export default GameCaptcha;
