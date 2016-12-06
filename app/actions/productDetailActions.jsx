export var toggleCreateNewDialog = () =>{
    return {
        type:'TOGGLE_CREATE_NEW_DIALOG',
    }
}

export var startFetchPDL = () =>{
    return{
        type:'START_PDL_FETCH'
    }
}

export var completeFetchPDL = (PDL) =>{
    return{
        type:'COMPLETE_PDL_FETCH',
        PDL
    }
}

export var openSingleProductDialog = (SPA)=>{
    return {
        type:'OPEN_SINGLE_PRODUCT_DIALOG',
        SPA
    }
}

export var closeSingleProductDialog = ()=>{
    return {
        type:'CLOSE_SINGLE_PRODUCT_DIALOG'
    }
}

export var updateProductFilterText = (text)=>{
    return {
        type:'UPDATE_PRODUCT_FILTER_TEXT',
        text
    }
}
