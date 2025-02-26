import React, { useState } from "react";
import "./App.css";
import { makeShuffledDeck } from "./utils.jsx";
import PlayingCard from "./PlayingCard";

function App() {
  const [cardDeck, setCardDeck] = useState(makeShuffledDeck());
  const [currCards, setCurrCards] = useState([]);
  const [player1Score, setPlayer1Score] = useState(0);
  const [player2Score, setPlayer2Score] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  const dealCards = () => {
    if (cardDeck.length >= 2) {
      const newCurrCards = [cardDeck.pop(), cardDeck.pop()];
      setCurrCards(newCurrCards);

      // تحديد الفائز في الجولة
      if (newCurrCards[0].rank > newCurrCards[1].rank) {
        setPlayer1Score((prevScore) => prevScore + 1);
      } else if (newCurrCards[0].rank < newCurrCards[1].rank) {
        setPlayer2Score((prevScore) => prevScore + 1);
      }
    } else {
      setGameOver(true);
    }
  };

  const restartGame = () => {
    setCardDeck(makeShuffledDeck());
    setCurrCards([]);
    setPlayer1Score(0);
    setPlayer2Score(0);
    setGameOver(false);
  };

  const getWinnerIndex = () => {
    if (currCards.length === 2) {
      if (currCards[0].rank > currCards[1].rank) return 0;
      else if (currCards[0].rank < currCards[1].rank) return 1;
    }
    return -1;
  };

  const winnerIndex = getWinnerIndex();

  return (
    <div className="App">
      <header className="App-header">
        <h2>React High Card 🚀</h2>
        {gameOver ? (
          <div>
            <h3>Game Over!</h3>
            <p>Player 1: {player1Score} wins</p>
            <p>Player 2: {player2Score} wins</p>
            <button onClick={restartGame}>Restart Game</button>
          </div>
        ) : (
          <div>
            <div className="cards-container">
              {currCards.map((card, index) => (
                <PlayingCard
                  key={`${card.name}${card.suit}`}
                  card={card}
                  player={index + 1}
                  isWinner={index === winnerIndex}
                />
              ))}
            </div>
            <br />
            <button onClick={dealCards}>Deal</button>
            <div className="scores">
              <p>Player 1: {player1Score}</p>
              <p>Player 2: {player2Score}</p>
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
