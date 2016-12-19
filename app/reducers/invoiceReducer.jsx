import update from 'react-addons-update';

export var invoiceClient = (state ={client:{}}, action) => {
    switch (action.type){
        case 'ADD_CLIENT':
            return{
                ...state,
                client: action.client
            }
        case 'REMOVE_CLIENT':
            return{
                ...state,
                client:{}
            }
        default:
            return state
    }
}

export var searchClientDialog = (state = {dialog:false}, action) =>{
    switch(action.type){
        case 'OPEN_DIALOG':
            return {
                ...state,
                dialog:true
            }
        case 'CLOSE_DIALOG':
            return{
                ...state,
                dialog:false
            }
        default:
            return state
    }
}
