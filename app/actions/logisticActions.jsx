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
