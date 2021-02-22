import React, { PureComponent } from "react";

import PropTypes from 'prop-types';

import Card from '../containers/Card';



class CurrentCard extends PureComponent {
  render() {
    // redux provides the current card in the deal
    const { currentCard } = this.props;

    return (
      <Card key="currentcard" col={6} row={2} card={currentCard}/>
    );
  }
}

CurrentCard.propTypes = {
    currentCard: PropTypes.shape({
      suit: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
    }),    
};


export default CurrentCard;
