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
