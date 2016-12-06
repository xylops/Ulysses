import { combineReducers } from 'redux'
import {createNewDialog, fetchProductData, toggleSingleProductDialog, productFilterText} from './productDetailReducer'


export default combineReducers({
    createNewDialog,
    productFilterText,
    singleProductDialog: toggleSingleProductDialog,
    productData: fetchProductData,
})
