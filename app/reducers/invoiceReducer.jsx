import update from 'react-addons-update';

export var createInvoice = (state ={
    client:{},
    date:'',
    invoiceID:''
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
