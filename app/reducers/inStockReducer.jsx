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
