var axios = require('axios')


export var createNewDialog = (state = false, action)=>{
    switch (action.type){
        case 'TOGGLE_CREATE_NEW_DIALOG':
            return !state;
        default:
            return state;
    }
}

export var toggleSingleProductDialog = (state = false, action) =>{
    switch (action.type){
        case 'OPEN_SINGLE_PRODUCT_DIALOG':
            return state = true;
        case 'CLOSE_SINGLE_PRODUCT_DIALOG':
            return state = false;
        default:
            return state;
    }
}

export var fetchProductData = (state = {isFetching: false , productList: []}, action) => {
    switch (action.type){
        case 'START_PDL_FETCH':
            return{
                isFetching:true,
                productList:[]
            }
        case 'COMPLETE_PDL_FETCH':
            return{
                isFetching:false,
                productList: action.PDL
            }
        default:
            return state
    }
}
