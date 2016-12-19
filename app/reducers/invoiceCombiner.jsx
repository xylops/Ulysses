import { combineReducers } from 'redux'
import {createInvoice, searchClientDialog} from './invoiceReducer'


export default combineReducers({
    createInvoice,
    searchClientDialog,
})
