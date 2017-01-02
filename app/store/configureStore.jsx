var redux = require('redux');
var thunk = require('redux-thunk').default;
import clientManagement from '../reducers/clientManagementCombiner'
import productDetail from '../reducers/productDetailCombiner'
import inStock from '../reducers/inStockCombiner'
import invoice from '../reducers/invoiceCombiner'
import logistic from '../reducers/logisticCombiner'
import snackBar from '../reducers/snackBarCombiner'
import main from '../reducers/mainCombiner'



 export var configure = (initialState = {})=>{
     var reducers = redux.combineReducers({
        snackBar,
        productDetail,
        clientManagement,
        inStock,
        invoice,
        logistic,
        main,
     })

     var store = redux.createStore(reducers, initialState,redux.compose(
         redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension(): f => f
     ));

     return store;
 };
