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

//*****************************Pick List ****************************//

export var fetchPickList = (state = {isFetching: false , PL: []}, action, singleLogRecord={}) => {
    switch (action.type){
        case 'START_FETCHING_PICKLIST':
            return{
                ...state,
                isFetching:true,
                PL:[]
            }
        case 'COMPLETE_FETCHING_PICKLIST':
            return{
                ...state,
                isFetching:false,
                PL: action.PL
            }
        case 'UPDATE_SINGLE_LOG_RECORD':
            return{
                ...state,
                singleLogRecord: action.record
            }
        default:
            return state
    }
}


//*****************************Dispatch Record ****************************//

export var dispatchRecord = (state = {isFetching: false , DR: [], singleDR:null}, action) => {
    switch (action.type){
        case 'START_FETCHING_DR':
            return{
                ...state,
                isFetching:true,
                DR:[]
            }
        case 'COMPLETE_FETCHING_DR':
            return{
                ...state,
                isFetching:false,
                DR: action.DR
            }
        case 'UPDATE_SINGLE_DR':
            return{
                ...state,
                singleDR: action.record
            }
        default:
            return state
    }
}
