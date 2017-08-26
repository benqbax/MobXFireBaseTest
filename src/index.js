import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';



import {store} from './stores/store'


ReactDOM.render(<App TodoStore={store}/>, document.getElementById('root'));
registerServiceWorker();
