import React, { PureComponent } from 'react';

import PropTypes from 'prop-types';

import styled, { keyframes } from 'styled-components';

import { CARD_WIDTH, CARD_HEIGHT } from '../constants';

class Score extends PureComponent {
  render() {
    // compute score absolute positioning based on grid (col, row) values
    const { col, row, score } = this.props;

    const scoreColour = col === row ? 'gold' : 'white';

    const scorestyle = {
      position: 'absolute',
      left: `${28 + col * CARD_WIDTH + (col === 5 ? 10 : 0)}px`,
      top: `${40 + row * CARD_HEIGHT}px`,
      width: '40px',
      height: '40px',
      fontWeight: 'bold',
      fontSize: '36px',
      // letterSpacing: '-0.1em',
      textAlign: 'center',
      color: `${scoreColour}`,
    };

    const pulse = keyframes`
      0% {
        transform: scale(1);
        color: ${scoreColour};
        opacity: 0;
      }
      50% {
        transform: scale(2.5);
        color: red;
        opacity: 0.5;
      }
      100% {
        transform: scale(1);
        color: ${scoreColour};
        opacity: 1;
      }
    `;
    // from {
    //   font-size: 36px;
    //   transform: rotate(0deg);
    // }
    // to {
    //   font-size: 72px;
    //   transform: rotate(360deg);
    // }

    const PulseDiv = styled.div`
      animation: ${pulse} 0.4s ease-in-out;
    `;
    //       animation-iteration-count: infinite;

    return (
      <div id={`score_${col}_${row}`} style={scorestyle}>
        {/* <svg>
          <text x="10" y="30" fill={col===row?'gold':'white'}>{score===0?'':score}</text>
        </svg> */}
        {score !== 0 && <PulseDiv>{score}</PulseDiv>}
      </div>
    );
  }
}

Score.propTypes = {
  col: PropTypes.number.isRequired,
  row: PropTypes.number.isRequired,
  score: PropTypes.number.isRequired,
};

export default Score;
