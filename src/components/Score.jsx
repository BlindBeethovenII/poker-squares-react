import React, { useState, useEffect } from 'react';

import PropTypes from 'prop-types';

import styled, { keyframes, css } from 'styled-components';

import { CARD_WIDTH, CARD_HEIGHT } from '../shared/constants';

// The pulse based on the scoreColour prop
const pulse = keyframes`
  0% {
    transform: scale(1);
    color: ${(props) => props.scoreColour};
    opacity: 0;
  }
  50% {
    transform: scale(2.5);
    color: red;
    opacity: 0.5;
  }
  100% {
    transform: scale(1);
    color: ${(props) => props.scoreColour};
    opacity: 1;
  }
`;

const PulseDiv = styled.div`
  animation: ${({ useAnimation }) =>
    useAnimation
      ? css`
          ${pulse} 0.4s ease-in-out
        `
      : css`
        none
      `};
`;

const Score = (props) => {
  // compute score absolute positioning based on grid (col, row) values
  const { col, row, score, isTotalScore, winningScore } = props;

  const [useAnimation, setUseAnimation] = useState(false);

  // when the score changes, set the animation, so it pulses, and set it back to false when the animation has finished, so it will pulse when the score changes again
  useEffect(() => {
    setUseAnimation(true);
  }, [score]);

  const onAnimationEnd = () => {
    // console.log('onAnimationEnd fired');
    setUseAnimation(false);
  };

  let scoreColour = 'white';
  if (isTotalScore) {
    if (winningScore) {
      scoreColour = 'gold';
    } else {
      scoreColour = 'silver';
    }
  }

  const fontSize = isTotalScore && winningScore ? '44px' : '36px';
  const adjustLeft = isTotalScore && winningScore && score > 9 ? -12 : 0;
  const adjustTop = isTotalScore && winningScore ? -8 : 0;

  const scorestyle = {
    position: 'absolute',
    left: `${28 + adjustLeft + col * CARD_WIDTH + (col === 5 ? 10 : 0)}px`,
    top: `${40 + adjustTop + row * CARD_HEIGHT}px`,
    width: '40px',
    height: '40px',
    fontWeight: 'bold',
    fontSize,
    // letterSpacing: '-0.1em',
    textAlign: 'center',
    color: `${scoreColour}`,
  };

  return (
    <div id={`score_${col}_${row}`} style={scorestyle} onAnimationEnd={onAnimationEnd}>
      {score !== 0 && (
        <PulseDiv scoreColour={scoreColour} useAnimation={useAnimation}>
          {score}
        </PulseDiv>
      )}
    </div>
  );
};

Score.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
  isTotalScore: PropTypes.bool.isRequired,
  winningScore: PropTypes.bool,
};

Score.defaultProps = {
  winningScore: false,
};

export default Score;
