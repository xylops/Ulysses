 var redux = require('redux');
 var thunk = require('redux-thunk').default;
 var {searchTextReducer} = require('reducers');
 import productDetailCombiner from '../reducers/productDetailCombiner'


 export var configure = (initialState = {})=>{
     var reducers = redux.combineReducers({
        searchText: searchTextReducer,
        productDetailCombiner
     })

     var store = redux.createStore(reducers, initialState,redux.compose(
         redux.applyMiddleware(thunk),
        window.devToolsExtension ? window.devToolsExtension(): f => f
     ));

     return store;
 };
