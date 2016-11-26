var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

// var actions = require('actions');
// var store = require('configureStore').configure();

var TacoApp = require('TacoApp');

injectTapEventPlugin();

// store.subscribe(() => {
//     var state = store.getState();
//     console.log('New state', state);
// });


// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

const App = () => (
  <MuiThemeProvider>
    <TacoApp/>
  </MuiThemeProvider>
);

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
