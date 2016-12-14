var React = require('react');
var ReactDOM = require('react-dom');
var {Provider} = require('react-redux');
var {Route, Router, IndexRoute, hashHistory} = require('react-router');

//Material UI
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
injectTapEventPlugin();

//Custom Component
import Ulysses from 'Ulysses';
import HomePage from 'HomePage';
import ClientManagement from './components/ClientManagement/main';
var InvoiceSystem = require('./components/InvoiceSystem/InvoiceSystem');
import ProductDetail from './components/ProductDetail/main';
import InventoryManagement from './components/InventoryManagement/main'
import InStock from './components/InventoryManagement/InStock/main'


// Redux Function
var pdActions = require('./actions/productDetailActions')

var store = require('configureStore').configure();

store.subscribe(() => {
    var state = store.getState();
    console.log('New state', state.InStock);
});
console.log(store.getState())

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
                    <Route path="IM" component={InventoryManagement}/>
                    <Route path="IM/InStock" component={InStock}/>
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
