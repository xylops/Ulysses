export var addInvoiceClient = (client) =>{
    return{
        type:'ADD_CLIENT',
        client
    }
}

export var removeInvoiceClient = () =>{
    return{
        type:'REMOVE_CLIENT'
    }
}

export var openDialog = () =>{
    return{
        type:'OPEN_DIALOG'
    }
}

export var closeDialog = () =>{
    return{
        type:'CLOSE_DIALOG'
    }
}

export var addDate = (date) =>{
    return {
        type:'ADD_DATE',
        date
    }
}

export var addInvoiceID = (invoiceID) =>{
    return {
        type:'ADD_INVOICE_ID',
        invoiceID
    }
}
