export var searchTextReducer = (state = 'WEEWWE', action)=>{
    switch (action.type){
        case 'SET_SEARCH_TEXT':
            return action.searchText;
        default:
            return state;
    }
}
