import React from 'react';
import { GridLoader } from 'halogen';
import '../css/LoadingTable.css';

export const LoadingTable = ({ children }) => (
  <div className="LoadingTable">
    <GridLoader color="#2D3142" />
  </div>
);
