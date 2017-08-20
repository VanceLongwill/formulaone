import React from 'react';
import '../css/FixedHeader.css';
export const FixedHeader = ({year, champion}) => (
  <div id="fixedHeader">
    <p>World Champion {year}: {champion}</p>
  </div>
)
