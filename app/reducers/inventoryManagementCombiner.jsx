import { combineReducers } from 'redux'
import {fetchOwnBrandList, ownBrandFilter} from './InStockReducer'


export default combineReducers({
    fetchOwnBrandList,
    ownBrandFilter
})
