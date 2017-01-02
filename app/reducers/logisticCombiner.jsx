import { combineReducers } from 'redux'
import {fetchNonProcessInvoice,singleInvoiceDialog} from './logisticReducer'


export default combineReducers({
    fetchNonProcessInvoice,
    singleInvoiceDialog
})
