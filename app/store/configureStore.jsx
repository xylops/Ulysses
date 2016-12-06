 var redux = require('redux');
 var thunk = require('redux-thunk').default;
 import productDetailCombiner from '../reducers/productDetailCombiner'
 import snackBarCombiner from '../reducers/snackBarCombiner'


 export var configure = (initialState = {})=>{
     var reducers = redux.combineReducers({
        snackBarCombiner,
        productDetailCombiner
     })

     var store = redux.createStore(reducers, initialState,redux.compose(
         redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension(): f => f
     ));

     return store;
 };
