import React from 'react';

import PropTypes from 'prop-types';

import Card from './Card';

const Cards = (props) => {
  // redux provides the deck and the current card we are up to
  // we include all cards in the deck, up to and including the currentCardIndex
  const { deck, currentCardIndex } = props;

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

Cards.propTypes = {
  deck: PropTypes.array.isRequired,
  currentCardIndex: PropTypes.number.isRequired,
};

export default Cards;
