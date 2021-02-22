import React, { PureComponent } from "react";

import PropTypes from 'prop-types';

import {Motion, spring} from 'react-motion';

import CardBlankImage from '../images/cards/cardblank.png';
import CardSuitSImage from '../images/cards/spades.png';
import CardSuitHImage from '../images/cards/hearts.png';
import CardSuitDImage from '../images/cards/diamonds.png';
import CardSuitCImage from '../images/cards/clubs.png';

import { 
  SUIT_CLUBS,
  SUIT_DIAMONDS,
  SUIT_HEARTS,
  SUIT_SPADES,

  NUMBER_A,
  NUMBER_J,
  NUMBER_Q,
  NUMBER_K,

} from './../constants';


class Card extends PureComponent {
  render() {
    // everything we are interested in comes from our card (which is defined at this point - it cannot be CARD_NONE)
    const { card } = this.props;
    const { suit, number, left, top, id} = card;

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

    const cardsuitstyle = {
        position: 'absolute',
        left: '22px',
        top: suit===SUIT_SPADES?'2px':'0px',
        width: '40px',
        height: suit===SUIT_SPADES?'38px':(suit===SUIT_CLUBS?'40px':'42px'),
    };

    // if we are moving set our zIndex so we appear on top of everything else
    // const zIndex = this.state.currentVelocity.left !== 0 || this.state.currentVelocity.top !== 0 ? 10 : 0;
    // nope - currentVelocity is in Motion's state not ours, stupid!
    // so we are now given our zIndex from Cards as we are dealt
    const { zIndex } = this.props;

    return (
      <Motion style={{left: spring(left), top:spring(top)}}>
        {({left, top}) =>
           <div id={id} style={{position: 'absolute', left: `${left}px`, top: `${top}px`, zIndex, }}>
              <img src={CardBlankImage} alt="cardblank" style={cardbasestyle}/> 
              <div style={cardnumberstyle}>
                <svg width="60px" height="40px">
                  <text x="10" y="30" fill={(suit===SUIT_SPADES||suit===SUIT_CLUBS)?'black':'red'}>{number===NUMBER_A?'A':(number===NUMBER_J?'J':(number===NUMBER_Q?'Q':(number===NUMBER_K?'K':number)))}</text>
                </svg>
              </div>
              <img src={suit===SUIT_CLUBS?CardSuitCImage:(suit===SUIT_DIAMONDS?CardSuitDImage:(suit===SUIT_HEARTS?CardSuitHImage:CardSuitSImage))} alt="cardsuit" style={cardsuitstyle}/>
            </div>
        }
      </Motion>
    );
  }
}

// Card.defaultProps = {
//   allowOnClick: true,
// };

Card.propTypes = {
    card: PropTypes.shape({
      id: PropTypes.string.isRequired,
      suit: PropTypes.string.isRequired,
      number: PropTypes.number.isRequired,
      left: PropTypes.number.isRequired,
      top: PropTypes.number.isRequired,
      }),    
    zIndex: PropTypes.number.isRequired,
};

export default Card;
