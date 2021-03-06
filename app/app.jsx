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
import CreateInvoice from './components/InvoiceSystem/createInvoice/main';
import InvoiceSystem from './components/InvoiceSystem/main';
import ProductDetail from './components/ProductDetail/main';
import InventoryManagement from './components/InventoryManagement/main'
import InStock from './components/InventoryManagement/InStock/main'
import Logistic from './components/Logistic/main'
import SortInvoice from './components/Logistic/sortInvoice/main'
import PickList from './components/Logistic/PickList/main'
import DispatchRecord from './components/logistic/dispatchRecord/main'
import Logging from './components/logging/main'
import Report from './components/Report/main'

// Redux Function
var pdActions = require('./actions/productDetailActions')

var store = require('configureStore').configure();
loadCheck = true;

store.subscribe(() => {
    var state = store.getState();
    console.log('New state', state);
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
                    <Route path="IS" component={CreateInvoice}/>
                    <Route path="IV" component={InvoiceSystem}/>
                    <Route path="PD" component={ProductDetail}/>
                    <Route path="IM" component={InventoryManagement}/>
                    <Route path="IMIS" component={InStock}/>
                    <Route path="LG" component={SortInvoice}/>
                    <Route path="LGSI" component={SortInvoice}/>
                    <Route path="LGPL" component={PickList}/>
                    <Route path="LGDR" component={DispatchRecord}/>
                    <Route path="LOG" component={Logging}/>
                    <Route path="REP" component={Report}/>
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
