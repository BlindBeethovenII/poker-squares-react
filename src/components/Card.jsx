import React from 'react';

import PropTypes from 'prop-types';

import { motion } from 'framer-motion';

import CardBlankImage from '../images/cards/cardblank.png';

import { cardNumberToString, cardSuitToImage, cardSuitToFillColour } from '../shared/card-functions';

import { SUIT_CLUBS, SUIT_SPADES } from '../shared/constants';

const Card = (props) => {
  // everything we are interested in comes from our card (which is defined at this point - it cannot be CARD_NONE)
  const { card } = props;
  const { suit, number, left, top, id } = card;

  const cardbasestyle = {
    position: 'relative',
    left: '0px',
    top: '0px',
  };

  const cardnumberstyle = {
    position: 'absolute',
    left: '0px',
    top: '40px',
    width: '40px',
    height: '40px',
    fontWeight: 'bold',
    fontSize: '36px',
    letterSpacing: '-0.1em',
  };

  let height = '42px';
  if (suit === SUIT_SPADES) {
    height = '38px';
  } else if (suit === SUIT_CLUBS) {
    height = '40px';
  }

  const cardsuitstyle = {
    position: 'absolute',
    left: '22px',
    top: suit === SUIT_SPADES ? '2px' : '0px',
    width: '40px',
    height,
  };

  // if we are moving set our zIndex so we appear on top of everything else
  const { zIndex } = props;

  return (
    <motion.div id={id} style={{ position: 'absolute', zIndex }} animate={{ left, top }} initial={false}>
      <img src={CardBlankImage} alt="cardblank" style={cardbasestyle} />
      <div style={cardnumberstyle}>
        <svg width="60px" height="40px">
          <text x="10" y="30" fill={cardSuitToFillColour(suit)}>
            {cardNumberToString(number)}
          </text>
        </svg>
      </div>
      <img src={cardSuitToImage(suit)} alt="cardsuit" style={cardsuitstyle} />
    </motion.div>
  );
};

Card.propTypes = {
  card: PropTypes.shape({
    id: PropTypes.string.isRequired,
    suit: PropTypes.string.isRequired,
    number: PropTypes.number.isRequired,
    left: PropTypes.number.isRequired,
    top: PropTypes.number.isRequired,
  }).isRequired,
  zIndex: PropTypes.number.isRequired,
};

export default Card;
