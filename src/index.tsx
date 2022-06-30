import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import AppRedux from './AppRedux';
import {Provider} from 'react-redux';
import {store} from './state/store';

ReactDOM.render(
    <Provider store={store}>
        <AppRedux />
    </Provider>,
    document.getElementById('root')
);


serviceWorker.unregister();
