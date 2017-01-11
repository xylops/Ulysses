import { combineReducers } from 'redux'
import {fetchOwnBrandList, ownBrandFilter, newInStockList, singleOBDialog, recordList} from './InStockReducer'


export default combineReducers({
    fetchOwnBrandList,
    ownBrandFilter,
    newInStockList,
    singleOBDialog,
    inventoryRecord: recordList
})
