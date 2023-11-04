import { useState } from "react";

import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import Log from "./Components/Log.jsx"


function deriveActivePlayer(prevTurns) {
  let currentPlayer = 'X';

  if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);

  const currentPlayer = deriveActivePlayer(gameTurns)

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns,
      ]

      return updatedTurns;
    })
  }

  return (
    <main>
      <div id="game-container">
        <ol id="players" className="highlight-player">
          <Player initialName="Player 1" symbol="X" isActive={currentPlayer === 'X'}/>
          <Player initialName="Player 2" symbol="O" isActive={currentPlayer === 'O'}/>
        </ol>
        <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
        />
      </div>
      <Log turns={gameTurns}/>
    </main>
  )
}

export default App
