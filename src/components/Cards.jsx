import React, { useContext } from 'react';

import GameStateContext from '../context/GameStateContext';

import Card from './Card';
import { isCardNone } from '../shared/card-placement-algorithms';

const Cards = () => {
  const { deck, opponentPlacedCards, currentCardIndex } = useContext(GameStateContext);

  // here are all the cards we show
  const cardsToShow = [];

  // first the play's deck up to and including the currentCardIndex
  deck.forEach((card, cardIndex) => {
    if (cardIndex <= currentCardIndex) {
      cardsToShow.push(<Card key={card.id} card={card} zIndex={cardIndex === currentCardIndex ? 0 : 10} />);
    }
  });

  // and now all the defined opponent's cards
  for (let col = 0; col < 5; col += 1) {
    for (let row = 0; row < 5; row += 1) {
      const opponentCard = opponentPlacedCards[col][row];
      if (!isCardNone(opponentCard)) {
        cardsToShow.push(<Card key={opponentCard.id} card={opponentCard} zIndex={10} />);
      }
    }
  }
  return cardsToShow;
};

export default Cards;
