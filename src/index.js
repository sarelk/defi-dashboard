import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from "react-router-dom";
import {createStore} from 'redux'
import rootReducer from './reducers'
import {Provider} from 'react-redux'
import App from './App';
import * as serviceWorker from './serviceWorker';

const store = createStore(
    rootReducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__() 
)

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));