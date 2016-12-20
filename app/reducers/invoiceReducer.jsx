import update from 'react-addons-update';

export var createInvoice = (state ={
    client:{},
    date:'',
    invoiceID:'',
    item:[]
}, action) => {
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
        case 'ADD_DATE':
            return{
                ...state,
                date:action.date
            }
        case 'ADD_INVOICE_ID':
            return{
                ...state,
                invoiceID:action.invoiceID
            }
        case 'ADD_ITEM':
            return {
                ...state,
                item:[...state.item, action.item]
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

export var addItemDialog = (state = {dialog:false, searchText:'', item:undefined, itemAmount:null}, action) =>{
    switch(action.type){
        case 'OPEN_ADD_ITEM_DIALOG':
            return {
                ...state,
                dialog:true
            }
        case 'CLOSE_ADD_ITEM_DIALOG':
            return{
                ...state,
                dialog:false
            }
        case 'UPDATE_ADD_ITEM_SEARCH_TEXT':
            return{
                ...state,
                searchText: action.text
            }
        case 'UPDATE_DIALOG_ITEM':
            return{
                ...state,
                item:action.item
            }
        case 'UPDATE_AMOUNT':
            return{
                ...state,
                itemAmount:action.amount
            }
        default:
            return state
    }
}
