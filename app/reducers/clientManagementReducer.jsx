import update from 'react-addons-update';

export var createNewClientDialog = (state = false, action)=>{
    switch (action.type){
        case 'TOGGLE_CREATE_NEW_CLIENT_DIALOG':
            return !state;
        default:
            return state;
    }
}

export var fetchClientList = (state = {isFetching: false , clientList: []}, action) => {
    switch (action.type){
        case 'START_CLIENT_LIST_FETCH':
            return{
                isFetching:true,
                clientList:[]
            }
        case 'COMPLETE_CLIENT_LIST_FETCH':
            return{
                isFetching:false,
                clientList: action.CL
            }
        default:
            return state
    }
}

export var toggleSingleClientDialog = (state = {open:false, singleClientAttr:{}}, action) =>{
    switch (action.type){
        case 'OPEN_SINGLE_CLIENT_DIALOG':
            return {
                open:true,
                singleClientAttr: action.SC
            };
        case 'CLOSE_SINGLE_CLIENT_DIALOG':
            return {
                open:false,
                singleClientAttr: {}
            }
        case 'UPDATE_SINGLE_CLIENT':
            return {
                ...state,
                singleClientAttr: action.client
            };
        default:
            return state;
    }
}

export var clientFilterText = (state={clientFilterText:undefined}, action) =>{
    switch(action.type){
        case 'UPDATE_CLIENT_FILTER_TEXT':
            return action.text
        default:
            return state
    }
}
