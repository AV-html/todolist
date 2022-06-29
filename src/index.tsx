import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppUseReducer from './AppUseReducer';

ReactDOM.render(<AppUseReducer />,  document.getElementById('root'));


serviceWorker.unregister();
