export var createNewDialog = (state = false, action)=>{
    switch (action.type){
        case 'TOGGLE_CREATE_NEW_DIALOG':
            return !state;
        default:
            return state;
    }
}

export var toggleSingleProductDialog = (state = {open:false, SPA:{}}, action) =>{
    switch (action.type){
        case 'OPEN_SINGLE_PRODUCT_DIALOG':
            return {
                open:true,
                SPA: action.SPA
            };
        case 'CLOSE_SINGLE_PRODUCT_DIALOG':
            return {
                open:false,
                SPA: {}
            }
        default:
            return state;
    }
}

export var productFilterText = (state={productFilterText:undefined}, action) =>{
    switch(action.type){
        case 'UPDATE_PRODUCT_FILTER_TEXT':
            return action.text
        default:
            return state
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
