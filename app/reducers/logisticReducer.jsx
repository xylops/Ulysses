import update from 'react-addons-update';

export var fetchNonProcessInvoice = (state = {isFetching: false , NPI: []}, action) => {
    switch (action.type){
        case 'START_NONPORCESS_INVOICE':
            return{
                isFetching:true,
                NPI:[]
            }
        case 'COMPLETE_NONPORCESS_INVOICE':
            return{
                isFetching:false,
                NPI: action.NPI
            }
        default:
            return state
    }
}

export var singleInvoiceDialog = (state = {open: false, invoice:undefined }, action) => {
    switch (action.type){
        case 'OPEN_LOGISTIC_INVOICE_DIALOG':
            return{
                open:true,
                invoice:action.invoice
            }
        case 'CLOSE_LOGISTIC_INVOICE_DIALOG':
            return{
                open:false,
                invoice:undefined
            }
        default:
            return state
    }
}
