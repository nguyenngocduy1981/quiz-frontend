import React from 'react';
import './style.scss';

const SummaryInfo = ({lValue, rValue}) => (
  <div className={'summary'}>
    <div>{lValue}</div>
    <div>{rValue}</div>
  </div>
);

export default SummaryInfo;
