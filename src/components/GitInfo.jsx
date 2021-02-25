import React from 'react';
import moment from 'moment';

import { CARD_WIDTH, CARD_HEIGHT } from '../constants';

import gitLog from '../_generated_git_log';

const builtstyle = {
  position: 'absolute',
  left: `${28 + 6 * CARD_WIDTH + 20}px`,
  top: `${40 + 5 * CARD_HEIGHT + 25}px`,
  width: '40px',
  height: '40px',
  fontWeight: 'italic',
  fontSize: '12px',
  textAlign: 'center',
  color: 'black',
};

const datestyle = {
  position: 'absolute',
  left: `${28 + 6 * CARD_WIDTH + 20}px`,
  top: `${40 + 5 * CARD_HEIGHT + 40}px`,
  width: '40px',
  height: '40px',
  fontWeight: 'italic',
  fontSize: '12px',
  textAlign: 'center',
  color: 'black',
};

const GitInfo = () => (
  // just showing build date for now
  <div>
    <div style={builtstyle}>Built</div>
    <div style={datestyle}>{moment(gitLog.date).format('DMMMYY')}</div>
  </div>
);

export default GitInfo;
