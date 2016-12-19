var redux = require('redux');
var thunk = require('redux-thunk').default;
import clientManagement from '../reducers/clientManagementCombiner'
import productDetail from '../reducers/productDetailCombiner'
import InStock from '../reducers/inStockCombiner'
import invoice from '../reducers/invoiceCombiner'
import snackBar from '../reducers/snackBarCombiner'
import main from '../reducers/mainCombiner'



 export var configure = (initialState = {})=>{
     var reducers = redux.combineReducers({
        snackBar,
        productDetail,
        clientManagement,
        InStock,
        invoice,
        main,
     })

     var store = redux.createStore(reducers, initialState,redux.compose(
         redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension(): f => f
     ));

     return store;
 };
