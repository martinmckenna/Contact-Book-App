import React from 'react';
import {render} from 'react-dom';
import App from '.././imports/ui/App.js';
import '../imports/startup/accounts-config.js';
import 'react-toastify/dist/ReactToastify.min.css';
import './main.css';

Meteor.startup(() => {
  render(
    <App/>, document.getElementById('root'));
});
