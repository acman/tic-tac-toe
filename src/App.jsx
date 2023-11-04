import {useState} from "react";

import Player from "./Components/Player.jsx";
import GameBoard from "./Components/GameBoard.jsx";
import Log from "./Components/Log.jsx"
import {WINNING_COMBINATIONS} from "./data/winning-combinations.js";
import GameOver from "./Components/GameOver.jsx";


function deriveActivePlayer(prevTurns) {
  let currentPlayer = 'X';

  if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer
}

function App() {
  const [players, setPlayers] = useState({
    X: "Player1",
    O: "Player2",
  })
  const [gameTurns, setGameTurns] = useState([]);
  const initialBoard = [
    [null, null, null],
    [null, null, null],
    [null, null, null]
  ];

  let gameBoard = [...initialBoard.map(array => [...array])];

  for (const turn of gameTurns) {
    const {square, player} = turn;
    const {row, col} = square;

    gameBoard[row][col] = player;
  }

  let winner;

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol = gameBoard[combination[0].row][combination[0].column];
    const secondSquareSymbol = gameBoard[combination[1].row][combination[1].column];
    const thirdSquareSymbol = gameBoard[combination[2].row][combination[2].column];

    if (firstSquareSymbol && firstSquareSymbol === secondSquareSymbol && firstSquareSymbol === thirdSquareSymbol) {
      winner = players[firstSquareSymbol];
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;
  const currentPlayer = deriveActivePlayer(gameTurns)

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      const updatedTurns = [{square: {row: rowIndex, col: colIndex}, player: currentPlayer}, ...prevTurns]

      return updatedTurns;
    })
  }

  function handleRestart() {
    setGameTurns([]);
  }

  function handlePlayerNameChange(symbol, newName) {
    setPlayers(prevPlayers => {
      return {
        ...prevPlayers,
        [symbol]: newName
      }
    })
  }

  return (<main>
    <div id="game-container">
      <ol id="players" className="highlight-player">
        <Player
          initialName="Player 1"
          symbol="X"
          isActive={currentPlayer === 'X'}
          onChangeName={handlePlayerNameChange}
        />
        <Player
          initialName="Player 2"
          symbol="O"
          isActive={currentPlayer === 'O'}
          onChangeName={handlePlayerNameChange}
        />
      </ol>
      {(winner || hasDraw) && <GameOver winner={winner} onRestart={handleRestart}/>}
      <GameBoard
        onSelectSquare={handleSelectSquare}
        board={gameBoard}
      />
    </div>
    <Log turns={gameTurns}/>
  </main>)
}

export default App
