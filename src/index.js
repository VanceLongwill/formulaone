import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import ConnectedApp from './containers/App';
import configureStore from './configureStore';

// INCLUDED CDN IN public/index.html - no need to import from node_modules
/* import 'semantic-ui-css/semantic.min.css'; */

import registerServiceWorker from './registerServiceWorker';

const store = configureStore();

render(
  <Provider store={store}>
    <ConnectedApp />
  </Provider>,
  document.getElementById('root'),
);
registerServiceWorker();
