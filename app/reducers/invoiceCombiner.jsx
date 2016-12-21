import { combineReducers } from 'redux'
import {createInvoice, searchClientDialog, addItemDialog, advanceProductAdd} from './invoiceReducer'


export default combineReducers({
    createInvoice,
    searchClientDialog,
    addItemDialog,
    advanceProductAdd,
})
