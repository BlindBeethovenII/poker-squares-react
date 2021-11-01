import React from 'react';
import moment from 'moment';

import { col2Left, row2Top } from '../shared/card-functions';

import gitLog from '../_generated_git_log';

const left = col2Left(0) + 6;
const top = row2Top(6) + 44;

const builtstyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top}px`,
  width: '40px',
  height: '40px',
  fontWeight: 'italic',
  fontSize: '12px',
  textAlign: 'center',
  color: 'black',
};

const datestyle = {
  position: 'absolute',
  left: `${left}px`,
  top: `${top + 15}px`,
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
    <div style={datestyle}>{moment(gitLog.date, 'ddd MMM D YYYY HH:mm:ss').format('DMMMYY')}</div>
  </div>
);

export default GitInfo;
