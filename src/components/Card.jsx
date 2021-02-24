import React from 'react';

import PropTypes from 'prop-types';

import { Motion, spring } from 'react-motion';

import CardBlankImage from '../images/cards/cardblank.png';

import { cardNumberToString, cardSuitToImage, cardSuitToFillColour } from '../card-functions';

import { SUIT_CLUBS, SUIT_SPADES } from '../constants';

const Card = (props) => {
  // everything we are interested in comes from our card (which is defined at this point - it cannot be CARD_NONE)
  const { card } = props;
  const { suit, number, left: cardLeft, top: cardTop, id } = card;

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
  // const zIndex = this.state.currentVelocity.left !== 0 || this.state.currentVelocity.top !== 0 ? 10 : 0;
  // nope - currentVelocity is in Motion's state not ours, stupid!
  // so we are now given our zIndex from Cards as we are dealt
  const { zIndex } = props;

  return (
    <Motion style={{ left: spring(cardLeft), top: spring(cardTop) }}>
      {({ left, top }) => (
        <div id={id} style={{ position: 'absolute', left: `${left}px`, top: `${top}px`, zIndex }}>
          <img src={CardBlankImage} alt="cardblank" style={cardbasestyle} />
          <div style={cardnumberstyle}>
            <svg width="60px" height="40px">
              <text x="10" y="30" fill={cardSuitToFillColour(suit)}>
                {cardNumberToString(number)}
              </text>
            </svg>
          </div>
          <img src={cardSuitToImage(suit)} alt="cardsuit" style={cardsuitstyle} />
        </div>
      )}
    </Motion>
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
