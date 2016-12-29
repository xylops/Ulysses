import { combineReducers } from 'redux'
import {createInvoice, searchClientDialog, addItemDialog, allInvoice} from './invoiceReducer'


export default combineReducers({
    createInvoice,
    searchClientDialog,
    addItemDialog,
    allInvoice,
})
