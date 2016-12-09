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
