
import React from 'react';
import ReactDOM from 'react-dom';

import App from './pages/app';
import './styles/index.less';
import reportWebVitals from './report-web-vitals';
import { Metric } from 'web-vitals';


function myLog({ name, delta, value, id}: Metric) {
  console.log(`name: ${name}, value: ${value}, delta: ${delta},  id: ${id}`)
}
reportWebVitals(myLog);
ReactDOM.render(<App />, document.getElementById('app'));
