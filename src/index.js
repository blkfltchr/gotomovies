import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from "react-redux";
import 'bootstrap/dist/css/bootstrap.css'
import './App.css';
import store from './store'
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';

ReactDOM.render(<Provider store={store}><Router><App /></Router></Provider>, document.getElementById('root'));
