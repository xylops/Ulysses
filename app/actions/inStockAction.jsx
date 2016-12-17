export var startFetchOwnBrandList = () =>{
    return{
        type:'START_OWN_BRAND_FETCH'
    }
}

export var completeFetchOwnBrandList = (OBL) =>{
    return{
        type:'COMPLETE_OWN_BRAND_FETCH',
        OBL
    }
}

export var ownBrandIDFilter = (id) =>{
    return{
        type:'UPDATE_OWNBRAND_ID_FILTER',
        id
    }
}

export var ownBrandNameFilter = (pName) =>{
    return{
        type:'UPDATE_OWNBRAND_NAME_FILTER',
        pName
    }
}

export var openSingleOBDialog = (id,productID, name, inventory) =>{
    return {
        type:'OPEN_DIALOG',
        id, productID, name, inventory
    }
}

export var closeSingleOBDialog = () =>{
    return {
        type: 'CLOSE_DIALOG'
    }
}

export var addNewItemToNewList = (item) => {
    return {
        type: 'INSERT_NEW_ITEM_TO_INSTOCK_LIST',
        item
    }
}

export var removeNewItemFromNewList = (targetItemIndex) =>{
    return {
        type: 'REMOVE_ITEM_FROM_INSTOCK_LIST',
        targetItemIndex
    }
}

export var editNewItemFromNewList = (targetItemIndex, amount) =>{
    return {
        type: 'EDIT_ITEM_FROM_INSTOCK_LIST',
        targetItemIndex,
        amount
    }
}

export var clearInstockList = () =>{
    return {
        type: 'CLEAR_INSTOCK_LIST'
    }
}

export var changeDate = (date) =>{
    return {
        type: 'CHANGE_DATE',
        date
    }
}

export var startFetchingDateList = () =>{
    return {
        type: 'START_FETCHING_DATE_LIST',
    }
}

export var completeFetchingDateList = () =>{
    return {
        type: 'COMPLETE_FETCHING_DATE_LIST',
    }
}

export var openInStockDialog = () =>{
    return {
        type: 'OPEN_SUBMIT_DIALOG',
    }
}

export var closeInStockDialog = () =>{
    return {
        type: 'CLOSE_SUBMIT_DIALOG',
    }
}
