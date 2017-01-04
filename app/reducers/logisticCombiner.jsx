import { combineReducers } from 'redux'
import {fetchNonProcessInvoice,singleInvoiceDialog, createLogesticRecord} from './logisticReducer'


export default combineReducers({
    fetchNonProcessInvoice,
    singleInvoiceDialog,
    createLogesticRecord
})
