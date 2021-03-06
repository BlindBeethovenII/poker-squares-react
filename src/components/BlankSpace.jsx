import React, { useContext, useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import styled, { keyframes, css } from 'styled-components';

import CardBaseImage from '../images/cards/cardbase.png';

import { col2Left, row2Top } from '../shared/card-functions';
import GameStateContext from '../context/GameStateContext';

// The pulse
const pulse = keyframes`
  0% {
    transform: scale(1);
  }
  100% {
    transform: scale(0);
  }
`;

const PulseDiv = styled.div`
  animation: ${({ useAnimation }) =>
    useAnimation
      ? css`
          ${pulse} 0.4s ease-in
        `
      : css`
        none
      `};
`;

const BlankSpace = (props) => {
  // compute the card blank space using absolute positioning based on grid (col, row) values
  const { col, row } = props;

  const { deck, placeCurrentCard } = useContext(GameStateContext);

  const [processedClick, setProcessedClick] = useState(false);
  const [useAnimation, setUseAnimation] = useState(false);
  const [showCardBase, setShowCardBase] = useState(true);

  // we need to know when a new deck has been dealt, so we can set our state - as we are only rendered once when the app is loaded, and then re-used
  useEffect(() => {
    // a new deck, so set our state back for re-use
    setProcessedClick(false);
    setUseAnimation(false);
    setShowCardBase(true);
  }, [deck]);

  const blankspacestyle = {
    position: 'absolute',
    left: `${col2Left(col)}px`,
    top: `${row2Top(row)}px`,
  };

  const cardbasestyle = {
    position: 'relative',
    left: '0px',
    top: '0px',
  };

  // the onClick/onKeyDown function to place a card here, and then deal the next card - but only if we've not done that already
  const placeThenDeal = () => {
    // console.log(`onClick for ${col} ${row} called`);
    if (!processedClick) {
      setUseAnimation(true);
      placeCurrentCard(col, row);
      setProcessedClick(true);
    }
  };

  const onAnimationEnd = () => {
    // console.log('onAnimationEnd fired');
    setShowCardBase(false);
  };

  return (
    // we don't want tabIndex (yet) - as it shows a white outline that looks bad, and allows multiple clicks on the same card (TODO: considering support for keyboard only)
    // eslint-disable-next-line jsx-a11y/interactive-supports-focus
    <div
      id={`blankspace_${col}_${row}`}
      style={blankspacestyle}
      role="button"
      // tabIndex={col + row * 5}
      onClick={placeThenDeal}
      onKeyDown={placeThenDeal}
      onAnimationEnd={onAnimationEnd}>
      <PulseDiv useAnimation={useAnimation}>
        {showCardBase && <img src={CardBaseImage} alt="cardbase" style={cardbasestyle} />}
      </PulseDiv>
    </div>
  );
};

BlankSpace.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
};

export default BlankSpace;
