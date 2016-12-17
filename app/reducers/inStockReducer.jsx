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
                item:[action.id, action.name, action.inventory, action.productID,],
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

export var newInStockList = (state = {
    newEntry:[],
    date:true,
    fetchingDateList: false,
    submitDialog:false,
    advDialog:false
}, action)=>{
    switch (action.type){
        case 'INSERT_NEW_ITEM_TO_INSTOCK_LIST':
            return {
                ...state,
                newEntry:[...state.newEntry, action.item]
            };
        case 'REMOVE_ITEM_FROM_INSTOCK_LIST':
            return {
                ...state,
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
        case 'CLEAR_INSTOCK_LIST':
            return {
                ...state,
                newEntry : []
            }
        case 'CHANGE_DATE':
            return{
                ...state,
                date:action.date
            }
        case 'START_FETCHING_DATE_LIST':
            return {
                ...state,
                fetchingDateList: true
            }
        case 'COMPLETE_FETCHING_DATE_LIST':
            return {
                ...state,
                fetchingDateList: false
            }
        case 'OPEN_SUBMIT_DIALOG':
            return {
                ...state,
                submitDialog:true
            }
        case 'CLOSE_SUBMIT_DIALOG':
            return {
                ...state,
                submitDialog:false
            }
        case 'OPEN_ADV_DIALOG':
            return {
                ...state,
                advDialog:true
            }
        case 'CLOSE_ADV_DIALOG':
            return {
                ...state,
                advDialog:false
            }
        default:
            return state;
    }
}
