import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux'; // Redux store
import ConnectedApp from './containers/App';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

// INCLUDED CDN IN public/index.html - no need to import from node_modules
/* import 'semantic-ui-css/semantic.min.css'; */

const store = configureStore(); // Initialises redux store

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
