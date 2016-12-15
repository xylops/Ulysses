import update from 'react-addons-update';

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

export var singleOBDialog = (state = {open:false,item:[], amountAdd:0}, action) => {
    switch (action.type){
        case 'OPEN_DIALOG':
            return {
                open:true,
                item:[action.id, action.name],
            }
        case 'CLOSE_DIALOG':
            return {
                open:false,
                item:[],
            }
        default:
            return state;
    }
}

        export var newInStockList = (state = {newEntry:[]}, action)=>{
            switch (action.type){
                case 'INSERT_NEW_ITEM_TO_INSTOCK_LIST':
                    return {
                        newEntry:[...state.newEntry, action.item]
                    };
                case 'REMOVE_ITEM_FROM_INSTOCK_LIST':
                    return {
                        newEntry:[
                            ...state.newEntry.slice(0, action.targetItemIndex),
                            ...state.newEntry.slice(action.targetItemIndex + 1)
                        ]
                    }
                case 'EDIT_ITEM_FROM_INSTOCK_LIST':
                    return update(state,{
                        newEntry:{
                            [action.targetItemIndex]:{
                                amount:{$set : action.amount}
                            }
                        }
                    })
                default:
                    return state;
            }
        }
