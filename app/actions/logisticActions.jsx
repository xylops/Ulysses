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
