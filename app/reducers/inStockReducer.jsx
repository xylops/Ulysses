export var fetchOwnBrandList = (state = {isFetching: false , OBL: []}, action) => {
    switch (action.type){
        case 'START_OWN_BRAND_FETCH':
            return{
                isFetching:true,
                OBL:[]
            }
        case 'COMPLETE_OWN_BRAND_FETCH':
            return{
                isFetching:false,
                OBL: action.OBL
            }
        default:
            return state
    }
}

export var ownBrandFilter = (state = {id: "" , name: ""}, action) => {
    switch (action.type){
        case 'UPDATE_OWNBRAND_ID_FILTER':
            return{
                id:action.id,
                name:""
            }
        case 'UPDATE_OWNBRAND_NAME_FILTER':
            return{
                id:"",
                name:action.pName
            }
        default:
            return state
    }
}
