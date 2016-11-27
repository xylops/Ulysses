var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

//Material UI
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

//Custom Component
var Ulysses = require('Ulysses');

// Redux Function
// var actions = require('actions');
// var store = require('configureStore').configure();

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
    <Ulysses/>
  </MuiThemeProvider>
);

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
