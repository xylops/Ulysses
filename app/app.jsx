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
import HomePage from 'HomePage';
var ClientManagement = require('./components/ClientManagement/ClientManagement');
var InvoiceSystem = require('./components/InvoiceSystem/InvoiceSystem');
var ProductDetail = require('./components/ProductDetail/ProductDetail');

//api
var productDetailAPI = require('./api/productDetailAPI')

// Redux Function
var actions = require('actions');
var store = require('configureStore').configure();

store.subscribe(() => {
    var state = store.getState();
    console.log('New state', state);
});
console.log(store.getState())
store.dispatch(actions.setSearchText('HAHAHA'))

// Load foundation
$(document).foundation();

// App css
require('style!css!sass!applicationStyles')

const App = () => (
  <MuiThemeProvider>
        <Provider store = {store}>
            <Router history={hashHistory}>
                <Route path="/" component={Ulysses}>
                    <Route path="CM" component={ClientManagement}/>
                    <Route path="IS" component={InvoiceSystem}/>
                    <Route path="PD" component={ProductDetail}/>
                    <IndexRoute component={HomePage}/>
                </Route>
            </Router>
        </Provider>
  </MuiThemeProvider>
);

ReactDOM.render(
    <App/>,
    document.getElementById('app')
);
