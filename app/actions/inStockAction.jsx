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
