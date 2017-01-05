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
        case 'TOGGLE_NONPROCESS_INVOICE_RECORD_SHOW':
            return update(state,{
                NPI:{
                    [action.targetItemIndex]:{
                        show:{$set:action.toggle}
                    }
                }
            })
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

export var createLogesticRecord = (state = {
    date:'',
    logisticID:'',
    licencePlate:'',
}, action) => {
    switch (action.type){
        case 'ADD_NEW_LOGISTIC_ID_DATE':
            return{
                ...state,
                date:action.date,
                logisticID:action.id
            }
        case 'ADD_NEW_LOGISTIC_PLATE':
            return{
                ...state,
                licencePlate:action.plate
            }
        case 'CLEAR_NEW_LOGISTIC':
            return{
                date:'',
                logisticID:'',
                licencePlate:'',
            }
        default:
            return state
    }
}
