import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import store from './store/store';
import App from './view/App';

document.addEventListener("DOMContentLoaded", () => {
    let el = document.getElementById('content');

    store.subscribe(() => {
        console.log(store.getState());
    });

    ReactDOM.render(<Provider store = {store}>
            <App/>
        </Provider>, el);
});
