import React, { PureComponent } from "react";

import PropTypes from 'prop-types';

import CardBaseImage from '../images/cards/cardbase.png';

import { col2Left, row2Top } from '../card-functions';


class BlankSpace extends PureComponent {
  render() {
    // compute card absolute positioning based on grid (col, row) values
    const { col, row } = this.props;

    // redux provides the placeCard action, which needs the top card in the deal, and also provides the deal next card function
    const { placeCard, dealtCard, dealNextCard } = this.props;

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

    return (
      <div id={`blankspace_${col}_${row}`}
           style={blankspacestyle}
           onClick={()=>{console.log(`onClick for ${col} ${row} called`); placeCard(col, row, dealtCard); dealNextCard(col, row);}}>
        <img src={CardBaseImage} alt="cardbase" style={cardbasestyle}/> 
      </div>
    );
  }
}

BlankSpace.propTypes = {
    col: PropTypes.number.isRequired,
    row: PropTypes.number.isRequired,
    dealtCard: PropTypes.shape({
      id: PropTypes.string.isRequired,
      suit: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
    }),    
    placeCard: PropTypes.func.isRequired,
    dealNextCard: PropTypes.func.isRequired,
};

export default BlankSpace;
