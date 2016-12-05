import { combineReducers } from 'redux'
import {createNewDialog, fetchProductData, toggleSingleProductDialog} from './productDetailReducer'


export default combineReducers({
    createNewDialog,
    singleProductDialog: toggleSingleProductDialog,
    productData: fetchProductData,
})
