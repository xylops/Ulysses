 var redux = require('redux');
 var {searchTextReducer} = require('reducers');

 export var configure = (initialState = {})=>{
     var reducers = redux.combineReducers({
        searchText: searchTextReducer,
     })

     var store = redux.createStore(reducers, initialState,redux.compose(
        window.devToolsExtension ? window.devToolsExtension(): f => f
     ));

     return store;
 };
