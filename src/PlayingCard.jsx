import React from "react";

const PlayingCard = ({ card, player, isWinner }) => {
  return (
    <div className={`playing-card ${isWinner ? "winner" : "loser"}`}>
      <h3>Player {player}</h3>
      <p>
        {card.name} of {card.suit}
      </p>
    </div>
  );
};

export default PlayingCard;
