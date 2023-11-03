import { useState } from 'react';

const initialBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
];

export default function GameBoard({ onSelectSquare, activePlayerSymbol }) {
  const [ gameBoard, setGameBoard ] = useState(initialBoard)

  function handleSelectSquare(rowIndex, cellIndex) {
    setGameBoard((prevGameBoard) => {
      const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])]
      updatedGameBoard[rowIndex][cellIndex] = activePlayerSymbol;
      return updatedGameBoard;
    })

    onSelectSquare();
  }

  return (
    <ol id="game-board">
      {gameBoard.map((row, rowIndex) => (
        <li key={rowIndex}>
          <ol>
            {row.map((cell, cellIndex) => (
              <li key={cellIndex}>
                <button
                  onClick={() => handleSelectSquare(rowIndex, cellIndex)}
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