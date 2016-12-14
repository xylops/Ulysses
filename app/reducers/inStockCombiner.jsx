import { combineReducers } from 'redux'
import {fetchOwnBrandList, ownBrandFilter, newInStockList, singleOBDialog} from './InStockReducer'


export default combineReducers({
    fetchOwnBrandList,
    ownBrandFilter,
    newInStockList,
    singleOBDialog
})
