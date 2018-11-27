import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import CustomerApp from './CustomerApp';
import TrainingApp from './TrainingApp';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<CustomerApp />, document.getElementById('cRoot'));
ReactDOM.render(<TrainingApp />, document.getElementById('tRoot'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.register();
