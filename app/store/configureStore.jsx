var redux = require('redux');
var thunk = require('redux-thunk').default;
import clientManagement from '../reducers/clientManagementCombiner'
import productDetail from '../reducers/productDetailCombiner'
import InventoryManagement from '../reducers/InventoryManagementCombiner'
import snackBar from '../reducers/snackBarCombiner'


 export var configure = (initialState = {})=>{
     var reducers = redux.combineReducers({
        snackBar,
        productDetail,
        clientManagement,
        InventoryManagement
     })

     var store = redux.createStore(reducers, initialState,redux.compose(
         redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension(): f => f
     ));

     return store;
 };
