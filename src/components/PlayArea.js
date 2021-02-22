import React, { PureComponent } from "react";

// import PropTypes from 'prop-types';

import PlayAreaImage from '../images/playarea.png';

import BorderTopLeftImage from '../images/borders/topleft.png';
import BorderTopImage from '../images/borders/top.png';
import BorderLeftImage from '../images/borders/left.png';
import BorderBottomLeftImage from '../images/borders/bottomleft.png';
import BorderBottomImage from '../images/borders/bottom.png';
import BorderTopRightImage from '../images/borders/topright.png';
import BorderBottomRightImage from '../images/borders/bottomright.png';
import BorderRightImage from '../images/borders/right.png';

import { GRID_INDEXES } from '../constants';

import BlankSpace from '../containers/BlankSpace';


class PlayArea extends PureComponent {
  render() {

    const bordertopleft = {
        position: 'absolute',  
        top: '4px',
        left: '8px',        
    };

    const bordertop = {
        position: 'absolute',  
        top: '4px',
        left: '14px', 
        width: '490px',
        height: '10px', 
    };

    const borderleft = {
        position: 'absolute',  
        top: '14px',
        left: '8px', 
        width: '10px',
        height: '516px', 
    };

    const borderbottomleft = {
        position: 'absolute',  
        top: '530px',
        left: '8px',        
    };

    const borderbottom = {
        position: 'absolute',  
        top: '530px',
        left: '14px', 
        width: '490px',
        height: '10px', 
    };

    const bordertopright = {
        position: 'absolute',  
        top: '4px',
        left: '504px',        
    };

    const borderbottomright = {
        position: 'absolute',  
        top: '530px',
        left: '504px',        
    };

    const borderright = {
        position: 'absolute',  
        top: '14px',
        left: '504px', 
        width: '10px',
        height: '516px', 
    };

    const playbackgroundsvg = {
        position: 'absolute',  
        top: '4px',
        left: '8px', 
        width: '506px',
        height: '536px', 
    };

    const playbackgroundrect = {
        width: '506px',
        height: '536px', 
        fill: 'rgb(85,107,47)',
    };

    const playarea = {
        position: 'absolute',  
        top: '0px',
        left: '0px', 
    };

    return (
        <div>
          <svg style={playbackgroundsvg} >
            <rect style={playbackgroundrect} />
          </svg>
          <img src={PlayAreaImage} alt="playarea" style={playarea}/> 
          <img src={BorderTopLeftImage} alt="bordertopleft" style={bordertopleft}/> 
          <img src={BorderTopImage} alt="bordertop" style={bordertop}/> 
          <img src={BorderLeftImage} alt="borderleft" style={borderleft}/> 
          <img src={BorderBottomLeftImage} alt="borderbottomleft" style={borderbottomleft}/> 
          <img src={BorderBottomImage} alt="borderbottom" style={borderbottom}/> 
          <img src={BorderTopRightImage} alt="bordertopright" style={bordertopright}/> 
          <img src={BorderBottomRightImage} alt="borderbottomright" style={borderbottomright}/>           
          <img src={BorderRightImage} alt="borderright" style={borderright}/> 
          { 
            GRID_INDEXES.map((col) => 
              GRID_INDEXES.map((row) => 
                <BlankSpace key={`blankspace_${col}_${row}`} col={col} row={row} /> 
            ))
        }
        </div>
    );
  }
}

// PlayArea.propTypes = {
// };


export default PlayArea;
