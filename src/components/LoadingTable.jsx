import React from 'react';
import { GridLoader } from 'halogen';
import '../css/LoadingTable.css';

const LoadingTable = ({ children }) => (
  <div className="LoadingTable">
    <GridLoader color="#2D3142" />
  </div>
);

export default LoadingTable;
