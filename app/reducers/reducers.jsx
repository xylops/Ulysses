export var searchTextReducer = (state = '', action)=>{
    switch (action.type){
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
}
