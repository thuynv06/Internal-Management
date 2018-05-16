import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { store } from './_helpers/store.js';
import { App } from './App/App.jsx';

// setup fake backend
//import { configureFakeBackend } from './_helpers/fake-backend.js';
//configureFakeBackend();

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);