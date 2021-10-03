import React from 'react';

import PlayAreaImage from '../images/playarea.png';

import BorderTopLeftImage from '../images/borders/topleft.png';
import BorderTopImage from '../images/borders/top.png';
import BorderLeftImage from '../images/borders/left.png';
import BorderBottomLeftImage from '../images/borders/bottomleft.png';
import BorderBottomImage from '../images/borders/bottom.png';
import BorderTopRightImage from '../images/borders/topright.png';
import BorderBottomRightImage from '../images/borders/bottomright.png';
import BorderRightImage from '../images/borders/right.png';

import { GRID_INDEXES } from '../shared/constants';

import BlankSpace from './BlankSpace';

const bordertopleft = {
  position: 'absolute',
  top: '4px',
  left: '8px',
};

const bordertop = {
  position: 'absolute',
  top: '4px',
  left: '14px',
  width: '894px',
  height: '10px',
};

const borderleft = {
  position: 'absolute',
  top: '14px',
  left: '8px',
  width: '10px',
  height: '602px',
};

const borderbottomleft = {
  position: 'absolute',
  top: '616px',
  left: '8px',
};

const borderbottom = {
  position: 'absolute',
  top: '616px',
  left: '14px',
  width: '894px',
  height: '10px',
};

const bordertopright = {
  position: 'absolute',
  top: '4px',
  left: '908px',
};

const borderbottomright = {
  position: 'absolute',
  top: '616px',
  left: '908px',
};

const borderright = {
  position: 'absolute',
  top: '14px',
  left: '908px',
  width: '10px',
  height: '602px',
};

const playbackgroundsvg = {
  position: 'absolute',
  top: '4px',
  left: '8px',
  width: '940px',
  height: '622px',
};

const playbackgroundrect = {
  width: '910px',
  height: '622px',
  fill: 'rgb(85,107,47)',
};

const playarea = {
  position: 'absolute',
  top: '0px',
  left: '0px',
};

const playarea2 = {
  position: 'absolute',
  top: '0px',
  left: '544px',
};

const PlayArea = () => (
  <div>
    <svg style={playbackgroundsvg}>
      <rect style={playbackgroundrect} />
    </svg>
    <img src={PlayAreaImage} alt="playarea" style={playarea} />
    <img src={PlayAreaImage} alt="playarea2" style={playarea2} />
    <img src={BorderTopLeftImage} alt="bordertopleft" style={bordertopleft} />
    <img src={BorderTopImage} alt="bordertop" style={bordertop} />
    <img src={BorderLeftImage} alt="borderleft" style={borderleft} />
    <img src={BorderBottomLeftImage} alt="borderbottomleft" style={borderbottomleft} />
    <img src={BorderBottomImage} alt="borderbottom" style={borderbottom} />
    <img src={BorderTopRightImage} alt="bordertopright" style={bordertopright} />
    <img src={BorderBottomRightImage} alt="borderbottomright" style={borderbottomright} />
    <img src={BorderRightImage} alt="borderright" style={borderright} />
    {GRID_INDEXES.map((col) =>
      GRID_INDEXES.map((row) => <BlankSpace key={`blankspace_${col}_${row}`} col={col} row={row} clickable />),
    )}
    {GRID_INDEXES.map((col) =>
      GRID_INDEXES.map((row) => (
        <BlankSpace key={`blankspace_${col + 8}_${row}`} col={col + 8} row={row} clickable={false} />
      )),
    )}
  </div>
);

export default PlayArea;
