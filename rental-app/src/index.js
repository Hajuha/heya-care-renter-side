import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store';
import setAuthorizationHeader from './utils/setAuthorizationHeader';
import { userLoggedIn } from './actions/auth';

if (localStorage.access_token) {
    const user = {
        token: localStorage.access_token,
    };
    setAuthorizationHeader(localStorage.access_token);
    store.dispatch(userLoggedIn(user));
}
ReactDOM.render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
