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

export var openAddItemDialog = () =>{
    return{
        type:'OPEN_ADD_ITEM_DIALOG'
    }
}

export var closeAddItemDialog = () =>{
    return{
        type:'CLOSE_ADD_ITEM_DIALOG'
    }
}

export var addItemDialogSearchText = (text) => {
    return {
        type : 'UPDATE_ADD_ITEM_SEARCH_TEXT',
        text
    }
}

export var updateDialogItem = (item) => {
    return {
        type : 'UPDATE_DIALOG_ITEM',
        item
    }
}

export var updateAmount = (amount) => {
    return {
        type : 'UPDATE_AMOUNT',
        amount
    }
}

export var addItem = (item) => {
    return {
        type : 'ADD_ITEM',
        item
    }
}
