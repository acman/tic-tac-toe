import { useState } from 'react';

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

export default function GameBoard({ onSelectSquare, turns }) {
  let gameBoard = initialBoard;

  for (const turn of turns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((cell, cellIndex) => (
              <li key={cellIndex}>
                <button
                  onClick={() => onSelectSquare(rowIndex, cellIndex)}
                >
                  {cell}
                </button>
              </li>
            ))}
          </ol>
        </li>
      ))
      }
    </ol>
  );
}