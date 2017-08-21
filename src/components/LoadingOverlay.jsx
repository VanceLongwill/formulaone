import React from 'react';
import { ClipLoader } from 'halogen';
import '../css/LoadingOverlay.css';

export const LoadingOverlay = () => (
  <div className="LoadingOverlay">
    <ClipLoader color="#000" />
    <p id="message"> Fetching initial data </p>

  </div>
);
