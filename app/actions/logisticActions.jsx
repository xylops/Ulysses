export var startNonProcessInvoice = () =>{
    return{
        type:'START_NONPORCESS_INVOICE',
    }
}

export var completeNonProcessInvoice = (NPI) =>{
    return{
        type:'COMPLETE_NONPORCESS_INVOICE',
        NPI
    }
}

export var openLogisticInvoiceDialog = (invoice) =>{
    return{
        type:'OPEN_LOGISTIC_INVOICE_DIALOG',
        invoice
    }
}
export var closeLogisticInvoiceDialog = () =>{
    return{
        type:'CLOSE_LOGISTIC_INVOICE_DIALOG',
    }
}

export var toggleNonprocessInvoiceRecordShow = (targetItemIndex, toggle) =>{
    return{
        type:'TOGGLE_NONPROCESS_INVOICE_RECORD_SHOW',
        targetItemIndex,
        toggle
    }
}

export var addNewLogisticIDDate = (date, id) =>{
    return{
        type:'ADD_NEW_LOGISTIC_ID_DATE',
        date,
        id
    }
}
export var addNewLogisticPlate = (plate) =>{
    return{
        type:'ADD_NEW_LOGISTIC_PLATE',
        plate
    }
}
