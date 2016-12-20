import { combineReducers } from 'redux'
import {createInvoice, searchClientDialog, addItemDialog} from './invoiceReducer'


export default combineReducers({
    createInvoice,
    searchClientDialog,
    addItemDialog,
})
