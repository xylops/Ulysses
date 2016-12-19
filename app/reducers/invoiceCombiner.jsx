import { combineReducers } from 'redux'
import {invoiceClient, searchClientDialog} from './invoiceReducer'


export default combineReducers({
    invoiceClient,
    searchClientDialog,
})
