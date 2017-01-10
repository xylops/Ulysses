import { combineReducers } from 'redux'
import {
    fetchNonProcessInvoice,
    singleInvoiceDialog,
    createLogesticRecord,
    fetchPickList,
    dispatchRecord
} from './logisticReducer'


export default combineReducers({
    fetchNonProcessInvoice,
    singleInvoiceDialog,
    createLogesticRecord,
    fetchPickList,
    dispatchRecord
})
