import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {store} from './state/store';
import {Provider} from 'react-redux';
import AppRedux from './AppRedux';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <Provider store={store}>
    <AppRedux />
  </Provider>
);

reportWebVitals();
