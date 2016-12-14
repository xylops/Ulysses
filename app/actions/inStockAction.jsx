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

export var addNewItemToNewInstockList = (item) => {
    return{
        type:'INSERT_NEW_INSTOCK_LIST',
        item
    }
}

export var openSingleOBDialog = (id, name) =>{
    return {
        type:'OPEN_DIALOG',
        id, name,
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

export var removeNewItemFromNewList = (number) =>{
    return {
        type: 'REMOVE_ITEM_FROM_INSTOCK_LIST',
        number
    }
}
