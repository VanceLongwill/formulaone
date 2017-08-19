import React from 'react';
import ReactDOM, { render } from 'react-dom';

import { Provider } from 'react-redux';
import { createStore } from 'redux';

import App from './components/App';
import FullApp from './reducers';
import registerServiceWorker from './registerServiceWorker';

render(
  <App />,
  document.getElementById('root')
);
registerServiceWorker();
