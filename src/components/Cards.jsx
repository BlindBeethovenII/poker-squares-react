import React, { useContext } from 'react';

import GameStateContext from '../context/GameStateContext';

import Card from './Card';

const Cards = () => {
  const { deck, currentCardIndex } = useContext(GameStateContext);

  // we show all cards in the deck, up to and including the currentCardIndex
  return (
    <div>
      {deck.map((card, cardIndex) =>
        cardIndex <= currentCardIndex ? (
          <Card key={deck[cardIndex].id} card={deck[cardIndex]} zIndex={cardIndex === currentCardIndex ? 0 : 10} />
        ) : null,
      )}
    </div>
  );
};

export default Cards;
